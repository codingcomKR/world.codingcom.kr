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
      className={`absolute flex items-center justify-center border-2 border-dashed transition-all hover:scale-105 hover:bg-white/5 ${styleClass || 'border-cyan-300/45 bg-cyan-400/12 text-cyan-100'}`}
      style={{
        left: `${(portal.sourceX / widthTiles) * 100}%`,
        top: `${(portal.sourceY / heightTiles) * 100}%`,
        width: `${(portal.sourceWidthTiles / widthTiles) * 100}%`,
        height: `${(portal.sourceHeightTiles / heightTiles) * 100}%`,
      }}
    >
      <div className="flex flex-col items-center gap-1 p-1">
        <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">Portal</span>
        <span className="text-[11px] font-bold text-center leading-tight">{label || portal.label}</span>
      </div>
    </button>
  );
}
