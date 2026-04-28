import { useEffect, useState } from 'react';
import type { VirtualCampusAdminSnapshot, VirtualCampusAvatarDirection } from '../types/virtual-campus';
import MapLayer from './VirtualWorld/MapLayer';
import AvatarLayer from './VirtualWorld/AvatarLayer';
import NpcMarker from './VirtualWorld/NpcMarker';
import PortalMarker from './VirtualWorld/PortalMarker';
import CollisionLayer from './VirtualWorld/CollisionLayer';
import DialoguePanel from './VirtualWorld/DialoguePanel';
import { useVirtualWorld } from '../hooks/useVirtualWorld';

export default function VirtualWorldRenderer({ data: initialData }: { data: VirtualCampusAdminSnapshot }) {
  const { data, dialogue, moveAvatar, talkToNpc, setDialogue } = useVirtualWorld(initialData);
  const [selectedNpcCode, setSelectedNpcCode] = useState<string | null>(null);

  if (!data || !data.roomView || !data.roomView.currentMap) return null;

  const { currentMap, avatars, portals, collisionZones, npcs } = data.roomView;
  const { widthTiles, heightTiles } = currentMap;
  const myAvatar = data.memberView.avatar;

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't move if typing in an input or if dialogue is open
      if (document.activeElement?.tagName === 'INPUT' || dialogue) return;

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
    await moveAvatar(
      direction, 
      myAvatar.positionX, 
      myAvatar.positionY, 
      currentMap.mapCode, 
      data.selectedMemberNo
    );
  };

  const handleNpcClick = async (npcCode: string) => {
    setSelectedNpcCode(npcCode);
    await talkToNpc(npcCode, data.selectedMemberNo);
  };

  const handlePortalClick = (portalKey: string) => {
    console.log(`포탈 클릭: ${portalKey}`);
  };

  const selectedNpc = npcs.find(n => n.npcCode === selectedNpcCode);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      {/* 상단 맵 정보 헤더 */}
      <div className="flex justify-between items-center w-full px-6 py-4 bg-slate-800/80 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <div className="text-cyan-300 font-black text-xl tracking-tight">{currentMap.title}</div>
        <div className="text-slate-300 text-sm font-semibold px-3 py-1 bg-slate-900 rounded-full border border-slate-600">
          현재 접속: {avatars.length}명
        </div>
      </div>

      {/* 맵 타일 격자 및 캐릭터 렌더링 영역 */}
      <MapLayer currentMap={currentMap}>
        <CollisionLayer zones={collisionZones} widthTiles={widthTiles} heightTiles={heightTiles} />
        
        {portals.map(portal => (
          <PortalMarker 
            key={portal.id} 
            portal={portal} 
            widthTiles={widthTiles} 
            heightTiles={heightTiles}
            onClick={() => handlePortalClick(portal.sourcePortalKey)}
          />
        ))}

        {npcs.map(npc => (
          <NpcMarker 
            key={npc.id} 
            npc={npc} 
            isSelected={selectedNpcCode === npc.npcCode}
            onClick={() => handleNpcClick(npc.npcCode)}
          />
        ))}

        <AvatarLayer 
          avatars={avatars} 
          selectedMemberNo={data.selectedMemberNo} 
          widthTiles={widthTiles} 
          heightTiles={heightTiles} 
        />
      </MapLayer>

      {/* 대화창 UI */}
      {selectedNpc && (dialogue || selectedNpcCode) && (
        <DialoguePanel 
          npc={selectedNpc} 
          dialogue={dialogue} 
          onClose={() => {
            setDialogue(null);
            setSelectedNpcCode(null);
          }} 
        />
      )}

      {/* 방향키 조작부 */}
      <div className="flex flex-col items-center gap-3 bg-slate-800/80 p-5 rounded-2xl border border-white/10 w-full max-w-sm">
        <p className="text-xs text-cyan-200/70 font-semibold tracking-widest uppercase mb-1">Movement Controls</p>
        <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('up')}>↑ (W)</button>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('left')}>← (A)</button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('down')}>↓ (S)</button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('right')}>→ (D)</button>
        </div>
      </div>
    </div>
  );
}
