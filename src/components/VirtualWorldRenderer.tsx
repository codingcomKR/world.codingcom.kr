import { useEffect, useState } from 'react';
import type { VirtualCampusAdminSnapshot, VirtualCampusAvatarDirection } from '../types/virtual-campus';
import MapLayer from './VirtualWorld/MapLayer';
import AvatarLayer from './VirtualWorld/AvatarLayer';
import NpcMarker from './VirtualWorld/NpcMarker';
import PortalMarker from './VirtualWorld/PortalMarker';
import CollisionLayer from './VirtualWorld/CollisionLayer';
import DialoguePanel from './VirtualWorld/DialoguePanel';
import InventoryPanel from './VirtualWorld/InventoryPanel';
import StatsPanel from './VirtualWorld/StatsPanel';
import QuestPanel from './VirtualWorld/QuestPanel';
import { useVirtualWorld } from '../hooks/useVirtualWorld';

export default function VirtualWorldRenderer({ data: initialData }: { data: VirtualCampusAdminSnapshot }) {
  const { data, dialogue, moveAvatar, talkToNpc, setDialogue } = useVirtualWorld(initialData);
  const [selectedNpcCode, setSelectedNpcCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'2.5d' | '3d'>('2.5d');

  if (!data || !data.roomView || !data.roomView.currentMap) return null;

  const { currentMap, avatars, portals, collisionZones, npcs } = data.roomView;
  const { widthTiles, heightTiles } = currentMap;
  const myAvatar = data.memberView.avatar;

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't move if typing in an input or if dialogue is open
      if (document.activeElement?.tagName === 'INPUT' || dialogue) return;

      const keys = ['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
      if (keys.includes(e.key.toLowerCase())) {
        e.preventDefault(); // Prevent page scrolling
      }

      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': handleMove('up'); break;
        case 's': case 'arrowdown': handleMove('down'); break;
        case 'a': case 'arrowleft': handleMove('left'); break;
        case 'd': case 'arrowright': handleMove('right'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [myAvatar, dialogue]); // Re-bind when state changes

  const handleMove = async (direction: VirtualCampusAvatarDirection) => {
    if (!myAvatar) return;

    let nextX = myAvatar.positionX;
    let nextY = myAvatar.positionY;

    if (direction === 'up') nextY--;
    if (direction === 'down') nextY++;
    if (direction === 'left') nextX--;
    if (direction === 'right') nextX++;

    // 1. Boundary Check
    if (nextX < 0 || nextX >= widthTiles || nextY < 0 || nextY >= heightTiles) return;

    // 2. Collision Zone Check
    const isBlocked = collisionZones.some(zone => 
      nextX >= zone.originX && 
      nextX < zone.originX + zone.widthTiles &&
      nextY >= zone.originY && 
      nextY < zone.originY + zone.heightTiles
    );

    if (isBlocked) return;

    await moveAvatar(
      direction, 
      myAvatar.positionX, 
      myAvatar.positionY, 
      currentMap.mapCode, 
      data.selectedMemberNo
    );
  };

  const handleNpcClick = async (npcCode: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNpcCode(npcCode);
    await talkToNpc(npcCode, data.selectedMemberNo);
  };

  const handlePortalClick = async (portalKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const portal = portals.find(p => p.sourcePortalKey === portalKey);
    if (!portal || !myAvatar) return;

    // 1. Pathfind to portal source first
    const path = findPath(myAvatar.positionX, myAvatar.positionY, portal.sourceX, portal.sourceY);
    
    if (path) {
      for (const step of path) {
        moveAvatar(step.dir, step.x - (step.dir === 'left' ? -1 : step.dir === 'right' ? 1 : 0), step.y - (step.dir === 'up' ? -1 : step.dir === 'down' ? 1 : 0), currentMap.mapCode, data.selectedMemberNo);
        await new Promise(r => setTimeout(r, 120));
      }
    }

    // 2. After reaching source, transition to target
    await moveAvatar(
      'down',
      portal.targetX,
      portal.targetY,
      portal.targetMapCode,
      data.selectedMemberNo
    );
  };

  const selectedNpc = npcs.find(n => n.npcCode === selectedNpcCode);

  const findPath = (startX: number, startY: number, targetX: number, targetY: number) => {
    const queue: { x: number, y: number, path: { x: number, y: number, dir: VirtualCampusAvatarDirection }[] }[] = [
      { x: startX, y: startY, path: [] }
    ];
    const visited = new Set<string>();
    visited.add(`${startX},${startY}`);

    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;

      if (x === targetX && y === targetY) return path;

      const neighbors = [
        { x: x, y: y - 1, dir: 'up' as const },
        { x: x, y: y + 1, dir: 'down' as const },
        { x: x - 1, y: y, dir: 'left' as const },
        { x: x + 1, y: y, dir: 'right' as const },
      ];

      for (const next of neighbors) {
        const key = `${next.x},${next.y}`;
        if (
          next.x >= 0 && next.x < widthTiles && 
          next.y >= 0 && next.y < heightTiles && 
          !visited.has(key) &&
          !collisionZones.some(z => next.x >= z.originX && next.x < z.originX + z.widthTiles && next.y >= z.originY && next.y < z.originY + z.heightTiles)
        ) {
          visited.add(key);
          queue.push({ x: next.x, y: next.y, path: [...path, next] });
        }
      }
      if (queue.length > 1000) break;
    }
    return null;
  };

  const handleMapClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!myAvatar || dialogue) return;

    const rect = e.currentTarget.getBoundingClientRect();
    // Center-relative coordinates
    const sx = e.clientX - (rect.left + rect.width / 2);
    const sy = e.clientY - (rect.top + rect.height / 2);

    // Inverse 2.5D Transformation math (37 deg tilt, 45 deg rotation, 1.4x scale)
    const scale = 1.4;
    const tiltScale = Math.cos(37 * Math.PI / 180);
    const projectedY = sy / (tiltScale * scale);
    const projectedX = sx / scale;

    // 2. Compensate for Rotation (Z-axis -45deg)
    const rotRad = -45 * Math.PI / 180;
    const cosR = Math.cos(-rotRad);
    const sinR = Math.sin(-rotRad);
    
    const worldX = projectedX * cosR - projectedY * sinR;
    const worldY = projectedX * sinR + projectedY * cosR;

    // 3. Convert to Tile Coordinates (Adjust for Padding)
    const tileSize = 80;
    const paddingTiles = 8;
    const playerX_px = (myAvatar.positionX + paddingTiles + 0.5) * tileSize;
    const playerY_px = (myAvatar.positionY + paddingTiles + 0.5) * tileSize;

    const targetX = Math.floor((worldX + playerX_px) / tileSize) - paddingTiles;
    const targetY = Math.floor((worldY + playerY_px) / tileSize) - paddingTiles;

    if (targetX < 0 || targetX >= widthTiles || targetY < 0 || targetY >= heightTiles) return;

    const foundPath = findPath(
      Math.floor(myAvatar.positionX),
      Math.floor(myAvatar.positionY),
      targetX,
      targetY
    );

    if (foundPath && foundPath.length > 0) {
      for (const step of foundPath) {
        moveAvatar(step.dir, step.x, step.y, currentMap.mapCode, data.selectedMemberNo);
        await new Promise(r => setTimeout(r, 120));
      }
    }
  };


  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      {/* Full Screen Map Layer */}
      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair" onClick={handleMapClick}>
        <MapLayer 
          currentMap={currentMap} 
          viewMode={viewMode}
          playerX={myAvatar?.positionX}
          playerY={myAvatar?.positionY}
        >
          <CollisionLayer zones={collisionZones} widthTiles={widthTiles} heightTiles={heightTiles} />
          
          {portals.map(portal => (
            <PortalMarker 
              key={portal.id} 
              portal={portal} 
              widthTiles={widthTiles} 
              heightTiles={heightTiles}
              onClick={(e) => { handlePortalClick(portal.sourcePortalKey, e); }}
            />
          ))}

          {npcs.map(npc => (
            <NpcMarker 
              key={npc.id} 
              npc={npc} 
              isSelected={selectedNpcCode === npc.npcCode}
              widthTiles={widthTiles}
              heightTiles={heightTiles}
              onClick={(e) => { handleNpcClick(npc.npcCode, e); }}
            />
          ))}

          <AvatarLayer 
            avatars={avatars} 
            selectedMemberNo={data.selectedMemberNo} 
            widthTiles={widthTiles} 
            heightTiles={heightTiles} 
            viewMode={viewMode}
          />
        </MapLayer>
      </div>

      {/* Floating HUD Interface */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col gap-1 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-cyan-400 font-black text-xl tracking-tight leading-none">{currentMap.title}</div>
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{currentMap.mapCode}</div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setViewMode(prev => prev === '2.5d' ? '3d' : '2.5d')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border transition-all duration-300 font-black text-xs uppercase tracking-widest ${
                viewMode === '3d' 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:border-white/30 backdrop-blur-md'
              }`}
            >
              {viewMode === '3d' ? 'Eye Level' : 'Isometric'}
            </button>
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-2.5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-slate-300 tracking-widest">{avatars.length} PLAYERS</span>
            </div>
          </div>
        </div>

        {/* Sidebar HUDs */}
        <div className="absolute top-32 right-6 bottom-6 w-80 flex flex-col gap-4 pointer-events-auto overflow-y-auto no-scrollbar">
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/5 p-1">
            <QuestPanel data={data} />
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/5 p-1">
            <StatsPanel data={data} />
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/5 p-1">
            <InventoryPanel data={data} />
          </div>
        </div>

        {/* 대화창 UI */}
        {selectedNpc && (dialogue || selectedNpcCode) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm">
            <DialoguePanel 
              npc={selectedNpc} 
              dialogue={dialogue} 
              onClose={() => {
                setDialogue(null);
                setSelectedNpcCode(null);
              }} 
            />
          </div>
        )}

        {/* Bottom Controls Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl flex gap-8">
          <div className="flex items-center gap-3">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-white/20 text-[10px] font-black text-cyan-400">WASD</kbd>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Move</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-white/20 text-[10px] font-black text-cyan-400">CLICK</kbd>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
