import { useEffect, useState } from 'react';
import type { VirtualCampusAdminSnapshot, VirtualCampusAvatarDirection } from '../types/virtual-campus';
import MapLayer from './VirtualWorld/MapLayer';
import AvatarLayer from './VirtualWorld/AvatarLayer';
import NpcMarker from './VirtualWorld/NpcMarker';
import PortalMarker from './VirtualWorld/PortalMarker';
import CollisionLayer from './VirtualWorld/CollisionLayer';
import WorldObject from './VirtualWorld/WorldObject';
import DialoguePanel from './VirtualWorld/DialoguePanel';
import InventoryPanel from './VirtualWorld/InventoryPanel';
import StatsPanel from './VirtualWorld/StatsPanel';
import QuestPanel from './VirtualWorld/QuestPanel';
import { useVirtualWorld } from '../hooks/useVirtualWorld';

export default function VirtualWorldRenderer({ data: initialData }: { data: VirtualCampusAdminSnapshot }) {
  const { data, dialogue, moveAvatar, talkToNpc, setDialogue } = useVirtualWorld(initialData);
  const [selectedNpcCode, setSelectedNpcCode] = useState<string | null>(null);

  if (!data || !data.roomView || !data.roomView.currentMap) return null;

  const { currentMap, avatars, portals, collisionZones, npcs } = data.roomView;
  const { widthTiles, heightTiles, mapCode } = currentMap;
  const myAvatar = data.memberView.avatar;
  const isSquare = mapCode.toLowerCase().includes('square') || mapCode.toLowerCase().includes('plaza');

  // Asset Paths (Generated)
  const CODINGDONG_URL = 'file:///Users/bagjongdeog/.gemini/antigravity/brain/5cdee275-45ff-4904-a1fb-2cccb372966f/codingdong_building_iso_1777418377582.png';
  const OX_QUIZ_URL = 'file:///Users/bagjongdeog/.gemini/antigravity/brain/5cdee275-45ff-4904-a1fb-2cccb372966f/ox_quiz_hall_iso_1777418747156.png';
  const RANKING_TOWER_URL = 'file:///Users/bagjongdeog/.gemini/antigravity/brain/5cdee275-45ff-4904-a1fb-2cccb372966f/ranking_tower_iso_retry_1777419375425.png';

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || dialogue) return;
      if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) { e.preventDefault(); }
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
    const isBlocked = collisionZones.some(zone => nextX >= zone.originX && nextX < zone.originX + zone.widthTiles && nextY >= zone.originY && nextY < zone.originY + zone.heightTiles);
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
    const portal = portals.find(p => p.sourcePortalKey === portalKey);
    if (!portal || !myAvatar) return;
    await moveAvatar('down', portal.targetX, portal.targetY, portal.targetMapCode, data.selectedMemberNo);
  };

  const findPath = (startX: number, startY: number, targetX: number, targetY: number) => {
    const queue: { x: number, y: number, path: { x: number, y: number, dir: VirtualCampusAvatarDirection }[] }[] = [{ x: startX, y: startY, path: [] }];
    const visited = new Set<string>();
    visited.add(`${startX},${startY}`);
    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;
      if (x === targetX && y === targetY) return path;
      const neighbors = [{ x, y: y - 1, dir: 'up' as const }, { x, y: y + 1, dir: 'down' as const }, { x: x - 1, y, dir: 'left' as const }, { x: x + 1, y, dir: 'right' as const }];
      for (const next of neighbors) {
        const key = `${next.x},${next.y}`;
        if (next.x >= 0 && next.x < widthTiles && next.y >= 0 && next.y < heightTiles && !visited.has(key) && !collisionZones.some(z => next.x >= z.originX && next.x < z.originX + z.widthTiles && next.y >= z.originY && next.y < z.originY + z.heightTiles)) {
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
    const sx = (e.clientX - (rect.left + rect.width / 2));
    const sy = (e.clientY - (rect.top + rect.height / 2));
    const cameraPlane = document.getElementById('rpg-camera-plane');
    const cx = Number(cameraPlane?.getAttribute('data-cx') || 0);
    const cy = Number(cameraPlane?.getAttribute('data-cy') || 0);
    const targetX = Math.round(((sx - cx) / 64 + (sy - cy) / 32) / 2);
    const targetY = Math.round(((sy - cy) / 32 - (sx - cx) / 64) / 2);
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
    <div className="fixed inset-0 bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair" onClick={handleMapClick}>
        <MapLayer currentMap={currentMap} playerX={myAvatar?.positionX} playerY={myAvatar?.positionY}>
          <CollisionLayer zones={collisionZones} widthTiles={widthTiles} heightTiles={heightTiles} />
          
          {/* BUILDINGS (Only in Square) */}
          {isSquare && (
            <>
              <WorldObject x={-4} y={-4} imageUrl={CODINGDONG_URL} width={450} height={450} label="코딩동 (CLASSROOM)" />
              <WorldObject x={8} y={-6} imageUrl={OX_QUIZ_URL} width={500} height={500} label="OX 서바이벌 퀴즈관" />
              <WorldObject x={-8} y={6} imageUrl={RANKING_TOWER_URL} width={400} height={600} label="랭킹 타워" />
            </>
          )}

          {portals.map(portal => (
            <PortalMarker key={portal.id} portal={portal} widthTiles={widthTiles} heightTiles={heightTiles} onClick={(e) => { handlePortalClick(portal.sourcePortalKey, e); }} />
          ))}
          {npcs.map(npc => (
            <NpcMarker key={npc.id} npc={npc} isSelected={selectedNpcCode === npc.npcCode} widthTiles={widthTiles} heightTiles={heightTiles} onClick={(e) => { handleNpcClick(npc.npcCode, e); }} />
          ))}
          <AvatarLayer avatars={avatars} selectedMemberNo={data.selectedMemberNo} widthTiles={widthTiles} heightTiles={heightTiles} />
        </MapLayer>
      </div>

      {/* Floating HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-auto">
          <div className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-cyan-400 font-black text-xl tracking-tight leading-none">{currentMap.title}</div>
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{currentMap.mapCode}</div>
          </div>
        </div>
        
        <div className="absolute top-32 right-6 bottom-6 w-80 flex flex-col gap-4 pointer-events-auto overflow-y-auto no-scrollbar">
          <QuestPanel data={data} />
          <StatsPanel data={data} />
          <InventoryPanel data={data} />
        </div>

        {npcs.find(n => n.npcCode === selectedNpcCode) && dialogue && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm">
            <DialoguePanel npc={npcs.find(n => n.npcCode === selectedNpcCode)!} dialogue={dialogue} onClose={() => { setDialogue(null); setSelectedNpcCode(null); }} />
          </div>
        )}
      </div>
    </div>
  );
}
