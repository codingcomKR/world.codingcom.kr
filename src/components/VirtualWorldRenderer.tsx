import { VirtualCampusAdminSnapshot } from '../types/virtual-campus';
import MapLayer from './VirtualWorld/MapLayer';
import AvatarLayer from './VirtualWorld/AvatarLayer';

export default function VirtualWorldRenderer({ data }: { data: VirtualCampusAdminSnapshot }) {
  if (!data || !data.roomView || !data.roomView.currentMap) return null;

  const { currentMap, avatars } = data.roomView;
  const { widthTiles, heightTiles } = currentMap;

  const handleMove = (direction: string) => {
    console.log(`이동 요청: [${direction}]`);
  };

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
        <AvatarLayer 
          avatars={avatars} 
          selectedMemberNo={data.world.worldCode /* 예시: 데이터 구조에 맞게 조정 */} 
          widthTiles={widthTiles} 
          heightTiles={heightTiles} 
        />
      </MapLayer>

      {/* 방향키 조작부 */}
      <div className="flex flex-col items-center gap-3 bg-slate-800/80 p-5 rounded-2xl border border-white/10 w-full max-w-sm">
        <p className="text-xs text-cyan-200/70 font-semibold tracking-widest uppercase mb-1">Movement Controls</p>
        <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('UP')}>↑ (W)</button>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('LEFT')}>← (A)</button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('DOWN')}>↓ (S)</button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => handleMove('RIGHT')}>→ (D)</button>
        </div>
      </div>
    </div>
  );
}
