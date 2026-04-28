import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  viewMode?: '2.5d' | '3d';
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, viewMode = '2.5d', playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles, mapKind } = currentMap;
  
  // Calculate offset to keep player centered without nauseating shifts
  const centerX = ((playerX + 0.5) / widthTiles) * 100;
  const centerY = ((playerY + 0.5) / heightTiles) * 100;

  // Determine map class based on mode
  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container">
      {/* The RPG Camera Plane */}
      <div
        className={`relative ${mapClass}`}
        style={{
          width: '200vw',
          height: '200vw', 
          transformOrigin: `${centerX}% ${centerY}%`,
        }}
      >
        {/* Infinite Grid Background (Diablo/Starcraft feel) */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />

        {/* The Actual Map Content */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${widthTiles * 60}px`,
            aspectRatio: `${widthTiles} / ${heightTiles}`,
            backgroundColor: '#0f172a',
            boxShadow: '0 0 100px rgba(0,0,0,0.5)',
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

      {/* Atmospheric Fog Overlay (Prevents edge nausea) */}
      <div className="absolute inset-0 map-overlay-shadow" />
    </div>
  );
}
