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
    <div 
      className="absolute transition-all duration-300 ease-out z-20"
      style={{
        // 2:1 Isometric Projection
        // screenX = (x - y) * 64
        // screenY = (x + y) * 32
        left: `${(avatar.positionX - avatar.positionY) * 64}px`,
        top: `${(avatar.positionX + avatar.positionY) * 32}px`,
        transform: 'translate(-50%, -100%)', // Anchor to feet
      }}
    >
      <div className={`relative flex flex-col items-center group ${sizeClass}`}>
        {/* Ground Shadow */}
        <div className="absolute -bottom-1 w-10 h-3 bg-black/60 rounded-[100%] blur-[3px]" />

        {/* Humanoid Skeleton */}
        <div className={`relative w-12 h-20 flex flex-col items-center ${moving ? 'animate-body-bob' : ''} ${isFacingLeft ? 'scale-x-[-1]' : ''}`}>
          
          {/* Head & Hair */}
          <div className="relative z-30 w-7 h-7 rounded-full bg-[#c4aead] border border-black/30 shadow-sm flex items-center justify-center">
            <div 
              className="absolute -top-1 -inset-x-0.5 h-4 rounded-t-full rounded-b-sm shadow-inner"
              style={{ backgroundColor: avatar.paletteColor, filter: 'brightness(0.6)' }}
            />
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan] animate-pulse" />
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan] animate-pulse" />
            </div>
          </div>

          {/* Torso */}
          <div 
            className="relative z-20 w-9 h-10 -mt-1 rounded-sm border border-black/40 shadow-2xl"
            style={{ 
              backgroundColor: avatar.accentColor,
              background: `linear-gradient(135deg, ${avatar.accentColor}, #020617)`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
            }}
          >
            <div className="absolute -left-1 -top-1 w-4 h-4 bg-slate-700 rounded-full border border-white/10" />
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-slate-700 rounded-full border border-white/10" />

            <div 
              className={`absolute -left-2 top-0 w-3 h-8 bg-[#c4aead] rounded-full origin-top ${moving ? 'animate-walk-arm-l' : 'rotate-[15deg]'}`}
              style={{ borderTop: `8px solid ${avatar.accentColor}`, boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
            />
            <div 
              className={`absolute -right-2 top-0 w-3 h-8 bg-[#c4aead] rounded-full origin-top ${moving ? 'animate-walk-arm-r' : 'rotate-[-15deg]'}`}
              style={{ borderTop: `8px solid ${avatar.accentColor}`, boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
            />
          </div>

          {/* Legs */}
          <div className="relative z-10 flex gap-1 -mt-0.5">
            <div 
              className={`w-3.5 h-9 bg-slate-900 rounded-b-sm origin-top ${moving ? 'animate-walk-leg-l' : ''}`}
              style={{ borderTop: `5px solid ${avatar.paletteColor}` }}
            >
              <div className="absolute bottom-0 w-5 h-2.5 bg-black rounded-sm -left-0.5 shadow-xl" />
            </div>
            <div 
              className={`w-3.5 h-9 bg-slate-900 rounded-b-sm origin-top ${moving ? 'animate-walk-leg-r' : ''}`}
              style={{ borderTop: `5px solid ${avatar.paletteColor}` }}
            >
              <div className="absolute bottom-0 w-5 h-2.5 bg-black rounded-sm -left-0.5 shadow-xl" />
            </div>
          </div>

          {/* Glow */}
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
    </div>
  );
}
