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
  const isLg = size === 'lg';
  const sizeClass = isLg ? 'scale-125' : 'scale-100';
  
  // Flip character horizontally based on direction
  const isFacingLeft = avatar.facingDirection === 'left';

  return (
    <div className={`relative flex flex-col items-center group marker-3d ${sizeClass} transition-transform duration-300`}>
      {/* Ground Shadow */}
      <div className="absolute -bottom-1 w-10 h-3 bg-black/30 rounded-[100%] blur-[2px]" />

      {/* Humanoid Skeleton */}
      <div className={`relative w-12 h-20 flex flex-col items-center ${moving ? 'animate-body-bob' : ''} ${isFacingLeft ? 'scale-x-[-1]' : ''}`}>
        
        {/* Head & Hair */}
        <div className="relative z-30 w-7 h-7 rounded-full bg-[#ffdbac] border border-black/10 shadow-sm flex items-center justify-center">
          {/* Hair (Styled based on palette) */}
          <div 
            className="absolute -top-1 -inset-x-0.5 h-4 rounded-t-full rounded-b-sm"
            style={{ backgroundColor: avatar.paletteColor }}
          />
          {/* Eyes */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-1 h-1 bg-black rounded-full" />
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>

        {/* Torso / Shirt */}
        <div 
          className="relative z-20 w-8 h-8 -mt-1 rounded-sm border border-white/10 shadow-md"
          style={{ 
            backgroundColor: avatar.accentColor,
            background: `linear-gradient(to bottom, ${avatar.accentColor}, ${avatar.paletteColor})`
          }}
        >
          {/* Arms */}
          <div 
            className={`absolute -left-2 top-0 w-2.5 h-7 bg-[#ffdbac] rounded-full origin-top ${moving ? 'animate-walk-arm-l' : 'rotate-[10deg]'}`}
            style={{ borderTop: `6px solid ${avatar.accentColor}` }}
          />
          <div 
            className={`absolute -right-2 top-0 w-2.5 h-7 bg-[#ffdbac] rounded-full origin-top ${moving ? 'animate-walk-arm-r' : 'rotate-[-10deg]'}`}
            style={{ borderTop: `6px solid ${avatar.accentColor}` }}
          />
        </div>

        {/* Legs / Pants */}
        <div className="relative z-10 flex gap-1.5 -mt-0.5">
          <div 
            className={`w-3 h-8 bg-slate-800 rounded-b-sm origin-top ${moving ? 'animate-walk-leg-l' : ''}`}
            style={{ borderTop: `4px solid ${avatar.paletteColor}` }}
          >
            {/* Shoe */}
            <div className="absolute bottom-0 w-4 h-2 bg-slate-900 rounded-full -left-0.5" />
          </div>
          <div 
            className={`w-3 h-8 bg-slate-800 rounded-b-sm origin-top ${moving ? 'animate-walk-leg-r' : ''}`}
            style={{ borderTop: `4px solid ${avatar.paletteColor}` }}
          >
            {/* Shoe */}
            <div className="absolute bottom-0 w-4 h-2 bg-slate-900 rounded-full -left-0.5" />
          </div>
        </div>

        {/* Glow (Selection) */}
        {selected && (
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse pointer-events-none"
            style={{ backgroundColor: avatar.paletteColor }}
          />
        )}
      </div>

      {/* Downed Marker */}
      {downed && (
        <div className="absolute top-1/2 -translate-y-1/2 z-50 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
          ELIMINATED
        </div>
      )}
    </div>
  );
}
