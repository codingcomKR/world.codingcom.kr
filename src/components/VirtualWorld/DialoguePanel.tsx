import type { VirtualCampusNpcSummary, VirtualCampusNpcDialoguePayload } from '../../types/virtual-campus';

interface DialoguePanelProps {
  npc: VirtualCampusNpcSummary;
  dialogue: VirtualCampusNpcDialoguePayload | null;
  onClose: () => void;
}

export default function DialoguePanel({ npc, dialogue, onClose }: DialoguePanelProps) {
  return (
    <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-in fade-in slide-in-from-bottom-8 duration-300">
      <div className="mx-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-[0_24px_50px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-2xl flex items-center justify-center font-black text-xs border-2 shadow-inner"
              style={{ backgroundColor: npc.paletteColor, color: npc.accentColor, borderColor: `${npc.accentColor}33` }}
            >
              NPC
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">{npc.name}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400/80">{npc.roleLabel}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[300px] overflow-y-auto p-6 space-y-4">
          {dialogue ? (
            dialogue.lines.map((line) => (
              <div 
                key={line.lineKey} 
                className={`flex flex-col ${line.speakerName === npc.name ? 'items-start' : 'items-end'}`}
              >
                <span className="mb-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-cyan-200/50">
                  {line.speakerName}
                </span>
                <div 
                  className={`rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                    line.speakerName === npc.name 
                      ? 'rounded-tl-none border border-white/10 bg-white/5 text-slate-100' 
                      : 'rounded-tr-none border border-cyan-500/20 bg-cyan-500/10 text-cyan-50'
                  }`}
                >
                  {line.textContent}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-8 w-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-semibold text-slate-400">대화 내용을 불러오는 중입니다...</p>
            </div>
          )}
        </div>

        {/* Action Bar (Optional, for quests etc) */}
        <div className="border-t border-white/5 bg-black/20 px-6 py-4">
          <button 
            onClick={onClose}
            className="w-full rounded-2xl bg-cyan-600 px-6 py-3.5 text-sm font-black text-white transition-all hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] active:scale-[0.98]"
          >
            대화 종료
          </button>
        </div>
      </div>
    </div>
  );
}
