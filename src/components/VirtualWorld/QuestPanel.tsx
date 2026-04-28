import type { VirtualCampusAdminSnapshot } from '../../types/virtual-campus';

interface QuestPanelProps {
  data: VirtualCampusAdminSnapshot;
}

export default function QuestPanel({ data }: QuestPanelProps) {
  const quests = data.memberView.questProgress || [];

  return (
    <div className="flex flex-col gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 w-full shadow-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-black text-white tracking-tight">Active Quests</h3>
        <span className="text-[10px] font-black text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
          {quests.length} ACTIVE
        </span>
      </div>

      <div className="space-y-3">
        {quests.length > 0 ? (
          quests.map((quest) => (
            <div 
              key={quest.id} 
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">{quest.title}</h4>
                <span className="text-[9px] font-black uppercase text-cyan-500 tracking-widest">
                  {Math.round(quest.completionRatio * 100)}%
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{quest.summary}</p>
                
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    style={{ width: `${quest.completionRatio * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-4 w-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">{quest.objectiveLabel}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
            <div className="text-3xl mb-2">📜</div>
            <p className="text-xs font-bold text-slate-400">No active quests found</p>
          </div>
        )}
      </div>
    </div>
  );
}
