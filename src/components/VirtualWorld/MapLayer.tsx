import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles, mapCode } = currentMap;
  
  // Is this an outdoor map? (e.g. Campus Square)
  const isOutdoor = mapCode.toLowerCase().includes('square') || mapCode.toLowerCase().includes('plaza');

  // Standard 2:1 Isometric Constants
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  // 1. Calculate Camera Position
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  // 2. Define Floor Vertices
  const topV = { x: 0, y: 0 };
  const rightV = { x: widthTiles * HALF_WIDTH, y: widthTiles * HALF_HEIGHT };
  const bottomV = { x: (widthTiles - heightTiles) * HALF_WIDTH, y: (widthTiles + heightTiles) * HALF_HEIGHT };
  const leftV = { x: -heightTiles * HALF_WIDTH, y: heightTiles * HALF_HEIGHT };

  const minX = Math.min(topV.x, rightV.x, bottomV.x, leftV.x);
  const maxX = Math.max(topV.x, rightV.x, bottomV.x, leftV.x);
  const minY = Math.min(topV.y, rightV.y, bottomV.y, leftV.y);
  const maxY = Math.max(topV.y, rightV.y, bottomV.y, leftV.y);
  const floorWidth = maxX - minX;
  const floorHeight = maxY - minY;

  return (
    <div className={`view-3d-container relative flex items-center justify-center overflow-hidden ${isOutdoor ? 'bg-[#020617]' : 'bg-[#020617]'}`}>
      
      {/* OUTDOOR HORIZON (Cyber Landscape) */}
      {isOutdoor && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-cyan-500/20 blur-[1px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />
        </div>
      )}

      {/* Isometric Camera Plane */}
      <div
        className="relative transition-transform duration-700 ease-out"
        id="rpg-camera-plane"
        data-cx={cx}
        data-cy={cy}
        style={{
          transform: `translate(${cx}px, ${cy}px)`,
          width: '0',
          height: '0',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* THE FLOOR */}
        <div 
          className={`absolute ${isOutdoor ? 'shadow-[0_0_150px_rgba(34,211,238,0.15)]' : 'shadow-[0_120px_250px_rgba(0,0,0,1)]'}`}
          style={{
            width: `${floorWidth}px`,
            height: `${floorHeight}px`,
            left: `${minX}px`,
            top: `${minY}px`,
            backgroundColor: isOutdoor ? '#0a0f1d' : '#0f172a',
            backgroundImage: isOutdoor 
              ? `radial-gradient(circle at 50% 50%, #111827 0%, #0a0f1d 100%),
                 repeating-linear-gradient(45deg, rgba(34,211,238,0.03) 0, rgba(34,211,238,0.03) 1px, transparent 1px, transparent 40px)`
              : `radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%),
                 repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 20px)`,
            clipPath: `polygon(
              ${((topV.x - minX) / floorWidth) * 100}% ${((topV.y - minY) / floorHeight) * 100}%,
              ${((rightV.x - minX) / floorWidth) * 100}% ${((rightV.y - minY) / floorHeight) * 100}%,
              ${((bottomV.x - minX) / floorWidth) * 100}% ${((bottomV.y - minY) / floorHeight) * 100}%,
              ${((leftV.x - minX) / floorWidth) * 100}% ${((leftV.y - minY) / floorHeight) * 100}%
            )`
          }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
               style={{
                 backgroundImage: `
                   linear-gradient(116.5deg, transparent 49%, #94a3b8 50%, transparent 51%),
                   linear-gradient(63.5deg, transparent 49%, #94a3b8 50%, transparent 51%)
                 `,
                 backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
                 backgroundPosition: `${-minX}px ${-minY}px`
               }} />
        </div>

        {/* --- INTERIOR WALLS (Only if not outdoor) --- */}
        {!isOutdoor && (
          <>
            <div className="absolute bg-[#1e293b] border-l-4 border-slate-700/50"
                 style={{
                   width: `${widthTiles * HALF_WIDTH}px`, height: '320px',
                   left: '0', top: '0', transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
            </div>
            <div className="absolute bg-[#1e293b] border-r-4 border-slate-700/50"
                 style={{
                   width: `${heightTiles * HALF_WIDTH}px`, height: '320px',
                   left: '0', top: '0', transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
            </div>
          </>
        )}

        {/* --- CENTRAL SOL CORE (For Squares) --- */}
        {isOutdoor && (
          <div className="absolute z-20 pointer-events-none"
               style={{ left: '0px', top: '0px', transform: 'translate(-50%, -50%)' }}>
            {/* Core Glow */}
            <div className="w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_50px_cyan] animate-bounce" />
              <div className="absolute w-32 h-32 border-4 border-cyan-400/30 rounded-full animate-[spin_4s_linear_infinite] scale-y-[0.5]" />
              <div className="absolute w-40 h-40 border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse] scale-y-[0.5]" />
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="relative z-10">
          {children}
        </div>

        {/* FRONT BOUNDARIES (Interior only) */}
        {!isOutdoor && (
          <>
            <div className="absolute bg-[#0f172a] border-l border-slate-700/30"
                 style={{
                   width: `${heightTiles * HALF_WIDTH}px`, height: '12px', 
                   left: `${rightV.x}px`, top: `${rightV.y}px`,
                   transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                   zIndex: 100
                 }} />
            <div className="absolute bg-[#0f172a] border-r border-slate-700/30"
                 style={{
                   width: `${widthTiles * HALF_WIDTH}px`, height: '12px', 
                   left: `${leftV.x}px`, top: `${leftV.y}px`,
                   transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                   zIndex: 100
                 }} />
          </>
        )}

      </div>

      {/* GLOBAL ATMOSPHERICS */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.5)_100%)]" />
    </div>
  );
}
