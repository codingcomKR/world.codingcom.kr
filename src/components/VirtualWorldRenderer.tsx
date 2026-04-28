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

  const handlePortalClick = async (portalKey: string) => {
    const portal = portals.find(p => p.sourcePortalKey === portalKey);
    if (!portal) return;

    await moveAvatar(
      'down', // Initial direction in new map
      portal.targetX,
      portal.targetY,
      portal.targetMapCode,
      data.selectedMemberNo
    );
  };

  const selectedNpc = npcs.find(n => n.npcCode === selectedNpcCode);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Canvas Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 상단 맵 정보 헤더 */}
          <div className="flex justify-between items-center w-full px-6 py-4 bg-slate-800/80 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
            <div className="flex flex-col">
              <div className="text-cyan-300 font-black text-xl tracking-tight">{currentMap.title}</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{currentMap.mapCode}</div>
            </div>
            <div className="text-slate-300 text-sm font-semibold px-4 py-1.5 bg-slate-900/80 rounded-full border border-slate-700 backdrop-blur-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
              접속 중: {avatars.length}명
            </div>
          </div>

          {/* 맵 타일 격자 및 캐릭터 렌더링 영역 */}
          <div className="relative">
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
          </div>

          {/* 하단 조작부 및 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-lg">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Navigation</h4>
              <div className="flex flex-col items-center gap-3">
                <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 border-2 border-slate-500/50 rounded-2xl text-xl transition-all shadow-lg active:scale-95" onClick={() => handleMove('up')}>↑</button>
                <div className="flex gap-3">
                  <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 border-2 border-slate-500/50 rounded-2xl text-xl transition-all shadow-lg active:scale-95" onClick={() => handleMove('left')}>←</button>
                  <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 border-2 border-slate-500/50 rounded-2xl text-xl transition-all shadow-lg active:scale-95" onClick={() => handleMove('down')}>↓</button>
                  <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 border-2 border-slate-500/50 rounded-2xl text-xl transition-all shadow-lg active:scale-95" onClick={() => handleMove('right')}>→</button>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col justify-center">
              <div className="text-center space-y-2">
                <div className="text-3xl">🎮</div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">Keyboard Enabled</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Use <span className="text-cyan-400 font-bold">W, A, S, D</span> or <span className="text-cyan-400 font-bold">Arrow Keys</span><br />
                  to move around the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-fit lg:sticky lg:top-8">
          <QuestPanel data={data} />
          <StatsPanel data={data} />
          <InventoryPanel data={data} />
        </div>

      </div>
    </div>
  );
}
