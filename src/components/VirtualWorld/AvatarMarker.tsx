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
  const sizeClass = isLg ? 'h-24 w-16' : 'h-16 w-12';
  
  // Direction offset mapping for eyes and details
  const dirOffset = {
    up: { x: 0, y: -4 },
    down: { x: 0, y: 4 },
    left: { x: -6, y: 0 },
    right: { x: 6, y: 0 }
  }[avatar.facingDirection || 'down'];

  return (
    <div className={`relative flex flex-col items-center group marker-3d ${moving ? 'animate-bounce' : ''}`}>
      {/* Ground Shadow - Essential for 2.5D depth */}
      <div className="absolute -bottom-1 w-full h-3 bg-black/40 rounded-[100%] blur-[4px] scale-x-110" />

      {/* Main Body Container */}
      <div className={`relative ${sizeClass} flex flex-col items-center transition-all duration-300`}>
        {/* Glow Aura */}
        <div 
          className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-700 ${selected ? 'opacity-40 animate-pulse' : 'opacity-0 group-hover:opacity-20'}`}
          style={{ backgroundColor: avatar.paletteColor }}
        />

        {/* Head */}
        <div 
          className={`relative z-20 rounded-full border-2 border-white/30 shadow-xl transition-transform duration-300 ${isLg ? 'w-10 h-10 mb-[-4px]' : 'w-8 h-8 mb-[-3px]'}`}
          style={{ 
            backgroundColor: avatar.paletteColor,
            transform: `translate(${dirOffset.x}px, ${dirOffset.y}px)`
          }}
        >
          {/* Eyes based on direction */}
          <div className="absolute inset-0 flex items-center justify-center gap-1.5">
            <div className={`w-1.5 h-1.5 bg-slate-900 rounded-full ${avatar.facingDirection === 'up' ? 'opacity-0' : 'opacity-80'}`} />
            <div className={`w-1.5 h-1.5 bg-slate-900 rounded-full ${avatar.facingDirection === 'up' ? 'opacity-0' : 'opacity-80'}`} />
          </div>
          
          {/* Hat (Optional Equipment) */}
          {avatar.equipment?.hat && (
            <div 
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: avatar.equipment.hat.paletteColor }}
            />
          )}
        </div>

        {/* Body (Torso) */}
        <div 
          className={`relative z-10 w-full rounded-t-2xl rounded-b-lg border-2 border-white/20 shadow-lg ${isLg ? 'h-14' : 'h-10'}`}
          style={{ 
            backgroundColor: avatar.accentColor,
            background: `linear-gradient(to bottom, ${avatar.accentColor}, ${avatar.paletteColor})`
          }}
        >
          {/* Inner details for a "tech suit" feel */}
          <div className="absolute inset-x-2 top-2 bottom-4 bg-white/10 rounded-lg" />
          
          {/* Badge */}
          {avatar.equipment?.badge && (
            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-yellow-400 border border-white/40 shadow-sm animate-pulse" />
          )}
        </div>

        {/* Downed Overlay */}
        {downed && (
          <div className="absolute inset-0 z-30 bg-rose-950/40 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-black text-rose-200 rotate-[-15deg] border border-rose-400/50 px-1 bg-rose-900/80">DOWNED</span>
          </div>
        )}
      </div>
    </div>
  );
}
}
