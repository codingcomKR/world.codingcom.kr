import type { VirtualCampusPortalSummary } from '../../types/virtual-campus';

interface PortalMarkerProps {
  portal: VirtualCampusPortalSummary;
  onClick: (e: React.MouseEvent) => void;
  widthTiles: number;
  heightTiles: number;
  label?: string;
  styleClass?: string;
}

export default function PortalMarker({
  portal,
  onClick,
  label,
  styleClass
}: PortalMarkerProps) {
  return (
    <div
      className={`absolute group flex items-center justify-center z-10 ${styleClass || ''}`}
      style={{
        // 2:1 Isometric Projection
        left: `${(portal.sourceX - portal.sourceY) * 64}px`,
        top: `${(portal.sourceX + portal.sourceY) * 32}px`,
        width: '128px',
        height: '64px',
        transform: 'translate(-50%, -50%)', // Center on tile
      }}
    >
      {/* VISUALS (Isometric Diamond Shape) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/40 animate-[spin_10s_linear_infinite] scale-y-[0.5]" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 animate-[spin_6s_linear_infinite_reverse] scale-y-[0.5]" />
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md animate-pulse scale-y-[0.5]" />
      </div>

      {/* HITBOX */}
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none focus:outline-none"
      >
        {/* Floating Label */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none whitespace-nowrap">
          <div className="bg-slate-900/95 border border-cyan-500/50 px-3 py-1 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-md">
            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-tighter">
              {label || portal.label || 'GATE'}
            </span>
          </div>
        </div>

        {/* CLICK Indicator */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white text-slate-950 text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-bounce">
            CLICK
          </div>
        </div>
      </button>
    </div>
  );
}
