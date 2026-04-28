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
  
  const tileSize = 80; // Larger tiles to fill the screen better
  const playerX_px = (playerX + 0.5) * tileSize;
  const playerY_px = (playerY + 0.5) * tileSize;

  // Determine map class based on mode
  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617]">
      {/* The RPG Camera Plane */}
      <div
        className={`relative ${mapClass} transition-transform duration-500 ease-out`}
        style={{
          width: `${widthTiles * tileSize}px`,
          height: `${heightTiles * tileSize}px`,
          transformStyle: 'preserve-3d',
          // Zoomed in scale (1.2x) to ensure map fills screen
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3)' : 'rotateX(37deg) rotateZ(-45deg) scale(1.2)'} translate(${(widthTiles * tileSize / 2) - playerX_px}px, ${(heightTiles * tileSize / 2) - playerY_px}px)`
        }}
      >
        {/* 3D Walls (Asymmetrical Height for 2.5D) */}
        {/* North Wall (Back-Right) - High wall */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-slate-800 border-b-8 border-cyan-500/30" 
             style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }} />
        {/* East Wall (Back-Left) - High wall */}
        <div className="absolute top-0 right-0 bottom-0 w-40 bg-slate-850 border-l-8 border-cyan-500/30" 
             style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right' }} />
        
        {/* South & West Boundaries (Near Edges) - Low curb to prevent leaving */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-slate-900" 
             style={{ transform: 'rotateX(90deg)', transformOrigin: 'bottom' }} />
        <div className="absolute top-0 left-0 bottom-0 w-4 bg-slate-900" 
             style={{ transform: 'rotateY(90deg)', transformOrigin: 'left' }} />

        {/* The Playable Map Floor */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 15px, #1e293b 15px, #1e293b 16px)',
            boxShadow: '0 0 100px rgba(0,0,0,0.9)',
          }}
        >
          {/* Tile Grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
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

      {/* Atmospheric Fog Overlay */}
      <div className="absolute inset-0 map-overlay-shadow pointer-events-none" />
    </div>
  );
}
