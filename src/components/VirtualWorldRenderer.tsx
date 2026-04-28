export default function VirtualWorldRenderer({ data }: { data: any }) {
  if (!data || !data.roomView || !data.roomView.currentMap) return null;

  const { currentMap, avatars } = data.roomView;
  const { widthTiles, heightTiles } = currentMap;

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
      <div
        className="relative bg-slate-900 border-2 border-cyan-700/50 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(15,23,42,0.8)]"
        style={{
          width: '100%',
          aspectRatio: `${widthTiles} / ${heightTiles}`,
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
        }}
      >
        {/* 아바타 표시 */}
        {avatars.map((avatar: any) => {
          const isMe = avatar.memberNo === data.selectedMemberNo;
          return (
            <div
              key={avatar.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300"
              style={{
                left: `${((avatar.positionX + 0.5) / widthTiles) * 100}%`,
                top: `${((avatar.positionY + 0.5) / heightTiles) * 100}%`,
              }}
            >
              <div className={`w-8 h-8 rounded-full border-2 ${isMe ? 'bg-cyan-400 border-white shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10 scale-110' : 'bg-slate-600 border-slate-400'}`} />
              <span className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap ${isMe ? 'bg-cyan-900/80 text-cyan-50' : 'bg-black/70 text-slate-200'}`}>
                {avatar.displayName}
              </span>
            </div>
          );
        })}
      </div>

      {/* 방향키 조작부 */}
      <div className="flex flex-col items-center gap-3 bg-slate-800/80 p-5 rounded-2xl border border-white/10 w-full max-w-sm">
        <p className="text-xs text-cyan-200/70 font-semibold tracking-widest uppercase mb-1">Movement Controls</p>
        <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => console.log('위로 이동')}>↑ (W)</button>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => console.log('왼쪽으로 이동')}>← (A)</button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => console.log('아래로 이동')}>↓ (S)</button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-colors shadow-lg" onClick={() => console.log('오른쪽으로 이동')}>→ (D)</button>
        </div>
      </div>
    </div>
  );
}
