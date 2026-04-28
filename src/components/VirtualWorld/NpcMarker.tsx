import type { VirtualCampusNpcSummary } from '../../types/virtual-campus';

interface NpcMarkerProps {
  npc: VirtualCampusNpcSummary;
  isSelected?: boolean;
  canTalk?: boolean;
  previewText?: string;
  onClick: () => void;
}

export default function NpcMarker({
  npc,
  isSelected,
  canTalk,
  previewText,
  onClick
}: NpcMarkerProps) {
  const showSpeechBubble = isSelected || canTalk;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 text-left group"
      style={{
        left: `${(npc.positionX + 0.5)}px`, // 이 부분은 부모 컨테이너가 픽셀 기반일 때 기준, 퍼센트 기반이면 부모에서 계산
        top: `${(npc.positionY + 0.5)}px`,
      }}
    >
      {showSpeechBubble && (
        <div className="pointer-events-none absolute bottom-[calc(100%+1rem)] left-1/2 w-40 -translate-x-1/2 animate-bounce">
          <div className={`rounded-2xl border px-3 py-2 text-[11px] font-semibold leading-5 shadow-[0_14px_32px_rgba(15,23,42,0.35)] ${
            canTalk
              ? 'border-emerald-300/35 bg-emerald-50/95 text-emerald-950'
              : 'border-cyan-300/35 bg-slate-950/92 text-cyan-50'
          }`}>
            {previewText || npc.dialogueTopic}
          </div>
          <div className={`mx-auto h-3 w-3 rotate-45 border-b border-r -mt-1.5 ${
            canTalk
              ? 'border-emerald-300/35 bg-emerald-50/95'
              : 'border-cyan-300/35 bg-slate-950/92'
          }`} />
        </div>
      )}
      
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-[18px] border-2 text-[11px] font-black transition-all duration-300 ${
          isSelected
            ? 'scale-110 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
            : 'border-black/20 group-hover:border-white/50 group-hover:scale-105'
        }`}
        style={{ backgroundColor: npc.paletteColor, color: npc.accentColor }}
      >
        NPC
      </div>
      
      {canTalk && (
        <div className="mt-1 flex justify-center">
          <div className="rounded-full border border-emerald-300/35 bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-100 whitespace-nowrap">
            대화 가능
          </div>
        </div>
      )}
    </button>
  );
}
