import { useEffect, useMemo, useState } from 'react';
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
import { MAP_IMAGE_W, MAP_IMAGE_H } from '../config/mapConfig';
import { campusSquareCollisionZones, campusSquarePortals } from '../config/campusSquareMap';

// ── Client-side map data override ──────────────────────────────────────────
// When the server mapCode matches a known map, we override collision zones
// and add portal markers using our analyzed visual data.
function isCampusSquare(mapCode: string) {
  const c = mapCode.toLowerCase();
  return c.includes('square') || c.includes('plaza') || c.includes('campus');
}

export default function VirtualWorldRenderer({ data: initialData }: { data: VirtualCampusAdminSnapshot }) {
  const { data, dialogue, moveAvatar, talkToNpc, setDialogue } = useVirtualWorld(initialData);
  const [selectedNpcCode, setSelectedNpcCode] = useState<string | null>(null);
  const [debugGrid, setDebugGrid] = useState(true); // Toggle with ` key

  if (!data || !data.roomView || !data.roomView.currentMap) return null;

  const { currentMap, avatars, npcs } = data.roomView;
  const { widthTiles, heightTiles, mapCode } = currentMap;
  const myAvatar = data.memberView.avatar;
  const isSquare = isCampusSquare(mapCode);

  // ── Apply client-side override for campus square ──
  const activeCollisionZones = useMemo(() => {
    if (isSquare) return campusSquareCollisionZones;
    return data.roomView.collisionZones;
  }, [isSquare, data.roomView.collisionZones]);

  const activePortals = useMemo(() => {
    if (isSquare) {
      // Merge server portals with our analyzed ones (server wins for same key)
      const serverKeys = new Set(data.roomView.portals.map(p => p.sourcePortalKey));
      const clientPortals = campusSquarePortals
        .filter(p => !serverKeys.has(p.id))
        .map(p => ({
          id: p.id,
          sourcePortalKey: p.id,
          sourceX: p.x,
          sourceY: p.y,
          targetMapCode: p.targetMapCode,
          targetX: 1,
          targetY: 1,
          label: p.label,
        }));
      return [...data.roomView.portals, ...clientPortals];
    }
    return data.roomView.portals;
  }, [isSquare, data.roomView.portals]);

  // ── Keyboard shortcut: ` to toggle debug grid ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '`') setDebugGrid(d => !d);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ── Arrow/WASD movement ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || dialogue) return;
      if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault();
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
  }, [myAvatar, dialogue]);

  const handleMove = async (direction: VirtualCampusAvatarDirection) => {
    if (!myAvatar) return;
    let nextX = myAvatar.positionX;
    let nextY = myAvatar.positionY;
    if (direction === 'up') nextY--;
    if (direction === 'down') nextY++;
    if (direction === 'left') nextX--;
    if (direction === 'right') nextX++;
    if (nextX < 0 || nextX >= widthTiles || nextY < 0 || nextY >= heightTiles) return;
    const isBlocked = activeCollisionZones.some(
      zone => nextX >= zone.originX && nextX < zone.originX + zone.widthTiles &&
               nextY >= zone.originY && nextY < zone.originY + zone.heightTiles
    );
    if (isBlocked) return;
    await moveAvatar(direction, myAvatar.positionX, myAvatar.positionY, currentMap.mapCode, data.selectedMemberNo);
  };

  const handleNpcClick = async (npcCode: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNpcCode(npcCode);
    await talkToNpc(npcCode, data.selectedMemberNo);
  };

  const handlePortalClick = async (portalKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const portal = activePortals.find(p => p.sourcePortalKey === portalKey);
    if (!portal || !myAvatar) return;
    await moveAvatar('down', myAvatar.positionX, myAvatar.positionY, portal.targetMapCode, data.selectedMemberNo, portal.targetX, portal.targetY);
  };

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
        { x, y: y - 1, dir: 'up' as const },
        { x, y: y + 1, dir: 'down' as const },
        { x: x - 1, y, dir: 'left' as const },
        { x: x + 1, y, dir: 'right' as const },
      ];
      for (const next of neighbors) {
        const key = `${next.x},${next.y}`;
        if (
          next.x >= 0 && next.x < widthTiles &&
          next.y >= 0 && next.y < heightTiles &&
          !visited.has(key) &&
          !activeCollisionZones.some(z =>
            next.x >= z.originX && next.x < z.originX + z.widthTiles &&
            next.y >= z.originY && next.y < z.originY + z.heightTiles
          )
        ) {
          visited.add(key);
          queue.push({ x: next.x, y: next.y, path: [...path, next] });
        }
      }
      if (queue.length > 800) break;
    }
    return null;
  };

  const handleMapClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!myAvatar || dialogue) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = e.clientX - (rect.left + rect.width / 2);
    const sy = e.clientY - (rect.top + rect.height / 2);
    const cameraPlane = document.getElementById('rpg-camera-plane');
    const cx = Number(cameraPlane?.getAttribute('data-cx') || 0);
    const cy = Number(cameraPlane?.getAttribute('data-cy') || 0);
    const tileW = MAP_IMAGE_W / widthTiles;
    const tileH = MAP_IMAGE_H / heightTiles;
    const targetX = Math.floor((sx - cx) / tileW);
    const targetY = Math.floor((sy - cy) / tileH);
    if (targetX < 0 || targetX >= widthTiles || targetY < 0 || targetY >= heightTiles) return;
    const foundPath = findPath(Math.floor(myAvatar.positionX), Math.floor(myAvatar.positionY), targetX, targetY);
    if (foundPath) {
      for (const step of foundPath) {
        moveAvatar(step.dir, step.x, step.y, currentMap.mapCode, data.selectedMemberNo);
        await new Promise(r => setTimeout(r, 120));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair" onClick={handleMapClick}>
        <MapLayer
          widthTiles={widthTiles}
          heightTiles={heightTiles}
          playerX={myAvatar?.positionX}
          playerY={myAvatar?.positionY}
          debugGrid={debugGrid}
        >
          <CollisionLayer zones={activeCollisionZones} widthTiles={widthTiles} heightTiles={heightTiles} />
          {activePortals.map(portal => (
            <PortalMarker
              key={portal.id}
              portal={portal}
              widthTiles={widthTiles}
              heightTiles={heightTiles}
              onClick={(e) => handlePortalClick(portal.sourcePortalKey, e)}
            />
          ))}
          {npcs.map(npc => (
            <NpcMarker
              key={npc.id}
              npc={npc}
              isSelected={selectedNpcCode === npc.npcCode}
              widthTiles={widthTiles}
              heightTiles={heightTiles}
              onClick={(e) => handleNpcClick(npc.npcCode, e)}
            />
          ))}
          <AvatarLayer avatars={avatars} selectedMemberNo={data.selectedMemberNo} widthTiles={widthTiles} heightTiles={heightTiles} />
        </MapLayer>
      </div>

      {/* HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 pointer-events-auto">
          <div className="bg-slate-900/70 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-cyan-400 font-black text-xl tracking-tight leading-none">{currentMap.title}</div>
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{mapCode}</div>
            <div className="text-slate-600 text-[9px] mt-1">` 키로 그리드 {debugGrid ? '끄기' : '켜기'}</div>
          </div>
        </div>

        <div className="absolute top-32 right-6 bottom-6 w-80 flex flex-col gap-4 pointer-events-auto overflow-y-auto no-scrollbar">
          <QuestPanel data={data} />
          <StatsPanel data={data} />
          <InventoryPanel data={data} />
        </div>

        {npcs.find(n => n.npcCode === selectedNpcCode) && dialogue && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm">
            <DialoguePanel
              npc={npcs.find(n => n.npcCode === selectedNpcCode)!}
              dialogue={dialogue}
              onClose={() => { setDialogue(null); setSelectedNpcCode(null); }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
