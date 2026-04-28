import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  viewMode?: '2.5d' | '3d';
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, viewMode = '2.5d', playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles } = currentMap;
  
  const tileSize = 60; // 60px per tile
  const playerX_px = (playerX + 0.5) * tileSize;
  const playerY_px = (playerY + 0.5) * tileSize;

  // Determine map class based on mode
  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617]">
      {/* Infinite Polished Floor Base */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)' }} />

      {/* The RPG Camera Plane */}
      <div
        className={`relative ${mapClass} transition-transform duration-500 ease-out`}
        style={{
          width: `${widthTiles * tileSize}px`,
          height: `${heightTiles * tileSize}px`,
          transformStyle: 'preserve-3d',
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3)' : 'rotateX(37deg) rotateZ(-45deg)'} translate(${(widthTiles * tileSize / 2) - playerX_px}px, ${(heightTiles * tileSize / 2) - playerY_px}px)`
        }}
      >
        {/* Building Walls (3D Effect) */}
        <div className="absolute -inset-8 border-[32px] border-slate-900/80 rounded-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]" 
             style={{ transform: 'translateZ(20px)' }} />
        
        {/* The Actual Map Content */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 10px, #1e293b 10px, #1e293b 11px)',
            boxShadow: '0 0 100px rgba(0,0,0,1)',
          }}
        >
          {/* Tile Grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
              backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
            }}
          />

          {/* Map Content */}
          <div className="absolute inset-0">
            {children}
          </div>
        </div>
      </div>

      {/* High-end Vignette & Fog */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.9)_100%)]" />
    </div>
  );
}
