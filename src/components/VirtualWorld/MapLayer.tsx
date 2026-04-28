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
  
  const tileSize = 80;
  const mapWidth = widthTiles * tileSize;
  const mapHeight = heightTiles * tileSize;

  // 1. Calculate the raw camera position to center the player
  const idealX = (mapWidth / 2) - (playerX + 0.5) * tileSize;
  const idealY = (mapHeight / 2) - (playerY + 0.5) * tileSize;

  // 2. Deadzone & Clamping Logic
  // We want the map to stay fixed as much as possible.
  // We clamp the translate values so the map's edges never enter the viewport.
  // Note: Due to 3D rotation, we use conservative bounds.
  const maxShiftX = mapWidth * 0.15; // Allow only 15% shift to stay safe
  const maxShiftY = mapHeight * 0.15;
  
  const clampedX = Math.max(-maxShiftX, Math.min(maxShiftX, idealX));
  const clampedY = Math.max(-maxShiftY, Math.min(maxShiftY, idealY));

  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* The RPG Camera Plane */}
      <div
        className={`relative ${mapClass} transition-transform duration-700 ease-out`}
        style={{
          width: `${mapWidth}px`,
          height: `${mapHeight}px`,
          transformStyle: 'preserve-3d',
          // Apply clamped translation. The scale(1.4) helps fill the screen to avoid showing edges.
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3)' : 'rotateX(37deg) rotateZ(-45deg) scale(1.4)'} translate(${clampedX}px, ${clampedY}px)`
        }}
      >
        {/* Boundary Walls */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-slate-800 border-b-8 border-cyan-500/20" 
             style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }} />
        <div className="absolute top-0 right-0 bottom-0 w-64 bg-slate-850 border-l-8 border-cyan-500/20" 
             style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right' }} />

        {/* The Playable Map Floor */}
        <div
          className="absolute inset-0 shadow-[0_0_200px_rgba(0,0,0,1)]"
          style={{
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 20px, #1e293b 20px, #1e293b 21px)',
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

      {/* Atmospheric Fog Overlay */}
      <div className="absolute inset-0 map-overlay-shadow pointer-events-none" />
    </div>
  );
}
