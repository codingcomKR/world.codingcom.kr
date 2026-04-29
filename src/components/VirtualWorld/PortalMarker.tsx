import type { VirtualCampusPortalSummary } from '../../types/virtual-campus';
import { MAP_IMAGE_W, MAP_IMAGE_H } from '../../config/mapConfig';

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
  widthTiles,
  heightTiles,
  label,
  styleClass,
}: PortalMarkerProps) {
  const tileW = MAP_IMAGE_W / widthTiles;
  const tileH = MAP_IMAGE_H / heightTiles;

  return (
    <div
      className={`absolute group flex items-center justify-center z-10 ${styleClass || ''}`}
      style={{
        // 2D flat grid: center of tile
        left: `${portal.sourceX * tileW + tileW / 2}px`,
        top: `${portal.sourceY * tileH + tileH / 2}px`,
        width: `${tileW}px`,
        height: `${tileH}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* VISUALS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/40 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 animate-[spin_6s_linear_infinite_reverse]" />
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md animate-pulse" />
      </div>

      {/* HITBOX */}
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none focus:outline-none"
      >
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none whitespace-nowrap">
          <div className="bg-slate-900/95 border border-cyan-500/50 px-3 py-1 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-md">
            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-tighter">
              {label || portal.label || 'GATE'}
            </span>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white text-slate-950 text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-bounce">
            CLICK
          </div>
        </div>
      </button>
    </div>
  );
}
