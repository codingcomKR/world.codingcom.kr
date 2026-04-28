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
    <div className="view-3d-container relative flex items-center justify-center">
      {/* The RPG Camera Plane */}
      <div
        className={`relative ${mapClass} transition-transform duration-500 ease-out`}
        style={{
          width: `${widthTiles * tileSize}px`,
          height: `${heightTiles * tileSize}px`,
          transformStyle: 'preserve-3d',
          // Moving the map in the opposite direction of the player to keep player at screen center
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3)' : 'rotateX(37deg) rotateZ(-45deg)'} translate(${(widthTiles * tileSize / 2) - playerX_px}px, ${(heightTiles * tileSize / 2) - playerY_px}px)`
        }}
      >
        {/* The Actual Map Content */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#0f172a',
            boxShadow: '0 0 100px rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)',
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
      <div className="absolute inset-0 map-overlay-shadow" />
    </div>
  );
}
