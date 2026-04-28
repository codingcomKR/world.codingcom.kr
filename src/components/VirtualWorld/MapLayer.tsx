import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles } = currentMap;
  
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
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
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
          className="absolute shadow-[0_100px_200px_rgba(0,0,0,1)]"
          style={{
            width: `${floorWidth}px`,
            height: `${floorHeight}px`,
            left: `${minX}px`,
            top: `${minY}px`,
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 20px, #131c31 20px, #131c31 22px)',
            clipPath: `polygon(
              ${((topV.x - minX) / floorWidth) * 100}% ${((topV.y - minY) / floorHeight) * 100}%,
              ${((rightV.x - minX) / floorWidth) * 100}% ${((rightV.y - minY) / floorHeight) * 100}%,
              ${((bottomV.x - minX) / floorWidth) * 100}% ${((bottomV.y - minY) / floorHeight) * 100}%,
              ${((leftV.x - minX) / floorWidth) * 100}% ${((leftV.y - minY) / floorHeight) * 100}%
            )`
          }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: `
                   linear-gradient(116.5deg, transparent 49%, #64748b 50%, transparent 51%),
                   linear-gradient(63.5deg, transparent 49%, #64748b 50%, transparent 51%)
                 `,
                 backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
                 backgroundPosition: `${-minX}px ${-minY}px`
               }} />
        </div>

        {/* --- REAR WALLS (OPAQUE) --- */}
        {/* North-East (Back-Right) */}
        <div className="absolute bg-gradient-to-b from-slate-800 to-slate-950 border-l border-cyan-500/20"
             style={{
               width: `${widthTiles * HALF_WIDTH}px`, height: '280px',
               left: '0', top: '0', transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
             }}>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-400 shadow-[0_0_15px_cyan]" />
        </div>
        {/* North-West (Back-Left) */}
        <div className="absolute bg-gradient-to-b from-slate-850 to-slate-950 border-r border-cyan-500/20"
             style={{
               width: `${heightTiles * HALF_WIDTH}px`, height: '280px',
               left: '0', top: '0', transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
             }}>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-400 shadow-[0_0_15px_cyan]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          {children}
        </div>

        {/* --- FRONT WALLS (TRANSPARENT GLASS) --- */}
        {/* South-East (Front-Right) */}
        <div className="absolute bg-white/5 border-l border-white/20 backdrop-blur-[2px]"
             style={{
               width: `${heightTiles * HALF_WIDTH}px`, height: '140px', // Shorter for visibility
               left: `${rightV.x}px`, top: `${rightV.y}px`,
               transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
               zIndex: 100
             }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
        </div>
        {/* South-West (Front-Left) */}
        <div className="absolute bg-white/5 border-r border-white/20 backdrop-blur-[2px]"
             style={{
               width: `${widthTiles * HALF_WIDTH}px`, height: '140px', // Shorter for visibility
               left: `${leftV.x}px`, top: `${leftV.y}px`,
               transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
               zIndex: 100
             }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
        </div>

      </div>

      {/* Atmospheric FX */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.6)_100%)]" />
    </div>
  );
}
