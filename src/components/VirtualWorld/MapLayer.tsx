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
    <div className="view-3d-container relative flex items-center justify-center bg-[#0f172a]">
      {/* 1. Seamless Infinite Floor (Covers everything beyond the map) */}
      <div 
        className="absolute inset-[-500vw] opacity-100 pointer-events-none" 
        style={{ 
          backgroundColor: '#0f172a',
          backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 20px, #131c31 20px, #131c31 22px)',
          transform: 'translateZ(-1px)' // Ensure it's under everything
        }} 
      />

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
        {/* 2. 3D Structural Walls (The Boundary) */}
        {/* North Wall */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-slate-800 border-b-4 border-cyan-500/20" 
             style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }} />
        {/* South Wall */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900 border-t-4 border-cyan-500/20" 
             style={{ transform: 'rotateX(90deg)', transformOrigin: 'bottom' }} />
        {/* West Wall */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-slate-850 border-r-4 border-cyan-500/20" 
             style={{ transform: 'rotateY(90deg)', transformOrigin: 'left' }} />
        {/* East Wall */}
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-slate-850 border-l-4 border-cyan-500/20" 
             style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right' }} />

        {/* 3. The Playable Map Floor */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 10px, #1e293b 10px, #1e293b 11px)',
          }}
        >
          {/* Tile Grid (Subtle) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
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

      {/* Atmospheric Lighting (Vignette) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.4)_100%)]" />
    </div>
  );
}
