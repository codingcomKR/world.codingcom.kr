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

  // 2. Map Dimensions in Screen Space
  const mapScreenWidth = (widthTiles + heightTiles) * HALF_WIDTH;
  const mapScreenHeight = (widthTiles + heightTiles) * HALF_HEIGHT;

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* Deep Background Shadow */}
      <div className="absolute inset-0 bg-[#020617]" />

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
        }}
      >
        {/* MAP CONTENT CONTAINER */}
        <div className="relative">
          
          {/* 1. THE FLOOR (Diamond) */}
          <div 
            className="absolute shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            style={{
              width: `${mapScreenWidth}px`,
              height: `${mapScreenHeight}px`,
              left: '0',
              top: '0',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#0f172a',
              backgroundImage: `
                linear-gradient(45deg, #1e293b 0, #1e293b 1px, transparent 1px, transparent 100%),
                repeating-linear-gradient(45deg, #0f172a 0, #0f172a 20px, #131c31 20px, #131c31 21px)
              `,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          >
            {/* Inner Grid Lines */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: `
                     linear-gradient(116.5deg, transparent 49%, #64748b 50%, transparent 51%),
                     linear-gradient(63.5deg, transparent 49%, #64748b 50%, transparent 51%)
                   `,
                   backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
                   backgroundPosition: 'center'
                 }} />
          </div>

          {/* 2. THE WALLS (Isometric Planes) */}
          {/* North-West Wall (Along Y axis) */}
          <div 
            className="absolute bg-gradient-to-b from-slate-800 to-slate-900 border-r border-cyan-500/30"
            style={{
              width: `${heightTiles * HALF_WIDTH}px`,
              height: '200px',
              left: `-${(widthTiles * HALF_WIDTH)}px`,
              top: `-${(heightTiles * HALF_HEIGHT)}px`,
              transform: 'translate(0, -100%) skewY(26.5deg)',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Wall Top Lip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </div>

          {/* North-East Wall (Along X axis) */}
          <div 
            className="absolute bg-gradient-to-b from-slate-850 to-slate-950 border-l border-cyan-500/30"
            style={{
              width: `${widthTiles * HALF_WIDTH}px`,
              height: '200px',
              left: `${(widthTiles * HALF_WIDTH) - (widthTiles * HALF_WIDTH)}px`, 
              top: `-${(heightTiles * HALF_HEIGHT)}px`,
              transform: 'translate(0, -100%) skewY(-26.5deg)',
              transformOrigin: 'bottom left',
            }}
          >
            {/* Wall Top Lip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </div>

          {/* 3. SPRITES LAYER */}
          <div className="relative z-10">
            {children}
          </div>

        </div>
      </div>

      {/* Atmospheric Fog/Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.8)_100%)]" />
      
      {/* Map Boundary Fog */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />
    </div>
  );
}
