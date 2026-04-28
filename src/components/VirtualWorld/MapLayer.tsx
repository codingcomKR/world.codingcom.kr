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
        {/* THE FLOOR (Lobby Foundation) */}
        <div 
          className="absolute shadow-[0_120px_250px_rgba(0,0,0,1)]"
          style={{
            width: `${floorWidth}px`,
            height: `${floorHeight}px`,
            left: `${minX}px`,
            top: `${minY}px`,
            backgroundColor: '#0f172a',
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%),
              repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 20px)
            `,
            clipPath: `polygon(
              ${((topV.x - minX) / floorWidth) * 100}% ${((topV.y - minY) / floorHeight) * 100}%,
              ${((rightV.x - minX) / floorWidth) * 100}% ${((rightV.y - minY) / floorHeight) * 100}%,
              ${((bottomV.x - minX) / floorWidth) * 100}% ${((bottomV.y - minY) / floorHeight) * 100}%,
              ${((leftV.x - minX) / floorWidth) * 100}% ${((leftV.y - minY) / floorHeight) * 100}%
            )`
          }}
        >
          {/* Tile Grid for orientation */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
               style={{
                 backgroundImage: `
                   linear-gradient(116.5deg, transparent 49%, #94a3b8 50%, transparent 51%),
                   linear-gradient(63.5deg, transparent 49%, #94a3b8 50%, transparent 51%)
                 `,
                 backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
                 backgroundPosition: `${-minX}px ${-minY}px`
               }} />
        </div>

        {/* --- REAR WALLS (Building Interior) --- */}
        {/* North-East Wall (High Interior Wall) */}
        <div className="absolute bg-[#1e293b] border-l-4 border-slate-700/50"
             style={{
               width: `${widthTiles * HALF_WIDTH}px`, height: '320px',
               left: '0', top: '0', transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
             }}>
          {/* Interior Wall Decoration (Grid/Lights) */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" /> {/* Baseboard */}
          <div className="absolute top-10 left-10 right-10 h-[1px] bg-cyan-500/30" /> {/* Tech line */}
        </div>
        
        {/* North-West Wall (High Interior Wall) */}
        <div className="absolute bg-[#1e293b] border-r-4 border-slate-700/50"
             style={{
               width: `${heightTiles * HALF_WIDTH}px`, height: '320px',
               left: '0', top: '0', transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
             }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
          <div className="absolute top-10 left-10 right-10 h-[1px] bg-orange-500/30" />
        </div>

        {/* CONTENT (The World Items) */}
        <div className="relative z-10">
          {children}
        </div>

        {/* --- FRONT "CURBS" (Very Low Boundaries for Lidless Effect) --- */}
        {/* South-East Curb */}
        <div className="absolute bg-[#0f172a] border-l border-slate-700/30"
             style={{
               width: `${heightTiles * HALF_WIDTH}px`, height: '12px', 
               left: `${rightV.x}px`, top: `${rightV.y}px`,
               transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
               zIndex: 100
             }} />
        {/* South-West Curb */}
        <div className="absolute bg-[#0f172a] border-r border-slate-700/30"
             style={{
               width: `${widthTiles * HALF_WIDTH}px`, height: '12px', 
               left: `${leftV.x}px`, top: `${leftV.y}px`,
               transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
               zIndex: 100
             }} />

      </div>

      {/* Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.5)_100%)]" />
      {/* Depth vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
