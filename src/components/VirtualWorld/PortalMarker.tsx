import type { VirtualCampusPortalSummary } from '../../types/virtual-campus';

interface PortalMarkerProps {
  portal: VirtualCampusPortalSummary;
  label?: string;
  styleClass?: string;
  onClick: (e: React.MouseEvent) => void;
  widthTiles: number;
  heightTiles: number;
}

export default function PortalMarker({
  portal,
  label,
  styleClass,
  onClick,
  widthTiles,
  heightTiles
}: PortalMarkerProps) {
  return (
    <div
      className={`absolute transition-all group flex items-center justify-center z-50 ${styleClass || ''}`}
      style={{
        left: `${(portal.sourceX / widthTiles) * 100}%`,
        top: `${(portal.sourceY / heightTiles) * 100}%`,
        width: `${(portal.sourceWidthTiles / widthTiles) * 100}%`,
        height: `${(portal.sourceHeightTiles / heightTiles) * 100}%`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* VISUALS (Flat on the floor) */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/40 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 animate-[spin_6s_linear_infinite_reverse]" />
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md animate-pulse" />
      </div>

      {/* HITBOX (Upright invisible button for easy clicking) */}
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-x-[-10px] inset-y-[-40px] z-[60] billboard-rpg cursor-pointer bg-transparent border-none outline-none focus:outline-none"
        title={label || portal.label}
      >
        {/* Floating Label */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap">
          <div className="bg-slate-900/90 border border-cyan-500/50 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-tighter">
              {label || portal.label || 'GATE'}
            </span>
          </div>
        </div>

        {/* Interact Key (Visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xl animate-bounce">
            CLICK
          </div>
        </div>
      </button>
    </div>
  );
}
