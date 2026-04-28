import type { VirtualCampusAvatarSummary } from '../../types/virtual-campus';

interface AvatarMarkerProps {
  avatar: VirtualCampusAvatarSummary;
  selected?: boolean;
  moving?: boolean;
  downed?: boolean;
  size?: 'md' | 'lg';
}

export default function AvatarMarker({
  avatar,
  selected,
  moving,
  downed,
  size = 'md',
}: AvatarMarkerProps) {
  const sizeClass = size === 'lg' ? 'h-20 w-20 rounded-[28px]' : 'h-14 w-14 rounded-[22px]';
  const shellStateClass = moving
    ? 'scale-[1.12] border-white shadow-[0_0_34px_rgba(125,211,252,0.24)]'
    : selected
      ? 'scale-110 border-white shadow-[0_0_30px_rgba(255,255,255,0.24)]'
      : 'border-black/20';

  const hatItem = avatar.equipment?.hat;
  const toolItem = avatar.equipment?.tool;
  const outfitItem = avatar.equipment?.outfit;
  const badgeItem = avatar.equipment?.badge;
  const hasHat = Boolean(hatItem);
  const hasTool = Boolean(toolItem);

  return (
    <div
      className={`relative flex ${sizeClass} items-end justify-center overflow-hidden border-2 transition ${shellStateClass} ${downed ? 'grayscale opacity-75' : ''}`}
      style={{ backgroundColor: avatar.paletteColor }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at top, ${avatar.accentColor}55 0%, ${avatar.paletteColor} 58%, rgba(15,23,42,0.82) 100%)`,
        }}
      />
      
      {/* Shadow */}
      <div className="absolute inset-x-2 bottom-1 h-3 rounded-full bg-slate-950/25 blur-sm" />
      
      {/* Head/Face Area */}
      <div
        className={`absolute rounded-full border border-white/50 bg-white/90 ${size === 'lg' ? 'top-3 h-6 w-6' : 'top-2.5 h-[18px] w-[18px]'}`}
        style={{ boxShadow: `0 0 16px ${avatar.accentColor}33` }}
      />
      
      {/* Hat */}
      {hasHat ? (
        <div
          className={`absolute rounded-full border ${size === 'lg' ? 'top-1.5 h-3 w-9' : 'top-1 h-2.5 w-7'}`}
          style={{
            backgroundColor: hatItem?.paletteColor || '#fcd34d',
            borderColor: `${hatItem?.accentColor || '#422006'}aa`,
          }}
        />
      ) : null}
      
      {/* Outfit */}
      <div
        className={`absolute rounded-t-[999px] rounded-b-[14px] border border-white/20 ${size === 'lg' ? 'bottom-3 h-9 w-10' : 'bottom-2.5 h-6 w-7'}`}
        style={{ backgroundColor: outfitItem?.paletteColor || '#0f172a' }}
      />
      
      {/* Eyes (Simple dots) */}
      <div className={`absolute rounded-full bg-slate-950/50 ${size === 'lg' ? 'bottom-1.5 left-[28%] h-2 w-2' : 'bottom-1 left-[28%] h-1.5 w-1.5'}`} />
      <div className={`absolute rounded-full bg-slate-950/50 ${size === 'lg' ? 'bottom-1.5 right-[28%] h-2 w-2' : 'bottom-1 right-[28%] h-1.5 w-1.5'}`} />
      
      {/* Tool Badge or Initial */}
      <div
        className={`absolute right-1.5 top-1.5 rounded-full border px-1.5 py-0.5 text-[9px] font-black ${
          hasTool
            ? 'text-slate-950'
            : 'border-white/20 bg-slate-950/40 text-white/80'
        }`}
        style={hasTool
          ? {
              backgroundColor: toolItem?.paletteColor || '#67e8f9',
              borderColor: `${toolItem?.accentColor || '#083344'}aa`,
            }
          : undefined}
      >
        {hasTool ? toolItem?.badgeLabel || 'TOOL' : avatar.displayName.slice(0, 1)}
      </div>
      
      {/* Badge Item */}
      {badgeItem?.badgeLabel ? (
        <div
          className={`absolute left-1.5 rounded-full border px-1.5 py-0.5 text-[8px] font-black ${size === 'lg' ? 'bottom-1.5' : 'bottom-1'}`}
          style={{
            backgroundColor: badgeItem.paletteColor,
            borderColor: `${badgeItem.accentColor}aa`,
            color: badgeItem.accentColor,
          }}
        >
          {badgeItem.badgeLabel}
        </div>
      ) : null}
      
      {/* Downed Overlay */}
      {downed ? (
        <div className={`absolute inset-x-2 rounded-full border border-rose-300/35 bg-rose-500/15 text-center font-black text-rose-100 ${size === 'lg' ? 'bottom-2 px-2 py-1 text-[10px]' : 'bottom-1.5 px-1.5 py-0.5 text-[8px]'}`}>
          DOWN
        </div>
      ) : null}
    </div>
  );
}
