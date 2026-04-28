import type { VirtualCampusPortalSummary } from '../../types/virtual-campus';

interface PortalMarkerProps {
  portal: VirtualCampusPortalSummary;
  label?: string;
  styleClass?: string;
  onClick: () => void;
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
      className={`absolute flex items-center justify-center border-2 border-dashed transition-all hover:scale-105 group overflow-hidden ${styleClass || 'border-cyan-400/40 bg-cyan-500/5 text-cyan-100'}`}
      style={{
        left: `${(portal.sourceX / widthTiles) * 100}%`,
        top: `${(portal.sourceY / heightTiles) * 100}%`,
        width: `${(portal.sourceWidthTiles / widthTiles) * 100}%`,
        height: `${(portal.sourceHeightTiles / heightTiles) * 100}%`,
      }}
    >
      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-cyan-400/10 animate-pulse group-hover:bg-cyan-400/20" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

      <div className="flex flex-col items-center gap-1 p-1 z-10">
        <span className="text-[11px] font-black text-center leading-tight drop-shadow-md">{label || portal.label}</span>
      </div>
    </button>
  );
}
