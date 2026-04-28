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
    <button
      type="button"
      onClick={onClick}
      className={`absolute transition-all hover:scale-110 group flex items-center justify-center ${styleClass || ''}`}
      style={{
        left: `${(portal.sourceX / widthTiles) * 100}%`,
        top: `${(portal.sourceY / heightTiles) * 100}%`,
        width: `${(portal.sourceWidthTiles / widthTiles) * 100}%`,
        height: `${(portal.sourceHeightTiles / heightTiles) * 100}%`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Layered Cyber-Gate Rings */}
      <div className="absolute inset-0 rounded-full border-4 border-cyan-500/40 animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 animate-[spin_6s_linear_infinite_reverse]" />
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md animate-pulse" />

      {/* Floating Label (Billboarded to stay upright) */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 billboard-rpg pointer-events-none whitespace-nowrap">
        <div className="bg-slate-900/90 border border-cyan-500/50 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          <span className="text-[10px] font-black text-cyan-300 uppercase tracking-tighter">
            {label || portal.label || 'GATE'}
          </span>
        </div>
        {/* Glow indicator below text */}
        <div className="w-1 h-4 bg-gradient-to-b from-cyan-500/50 to-transparent mx-auto mt-[-2px]" />
      </div>

      {/* Interact Key Indicator (Visible on hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xl animate-bounce">
          CLICK
        </div>
      </div>
    </button>
  );
}
