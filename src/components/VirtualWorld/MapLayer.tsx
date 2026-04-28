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
  const paddingTiles = 8; // Extra floor space around the map
  const totalWidth = (widthTiles + paddingTiles * 2) * tileSize;
  const totalHeight = (heightTiles + paddingTiles * 2) * tileSize;

  // 1. Calculate ideal camera position (centered on player)
  // We offset player position by paddingTiles
  const playerX_px = (playerX + paddingTiles + 0.5) * tileSize;
  const playerY_px = (playerY + paddingTiles + 0.5) * tileSize;
  
  const idealX = (totalWidth / 2) - playerX_px;
  const idealY = (totalHeight / 2) - playerY_px;

  // 2. Camera Clamping (Ensure edges never show)
  const maxShiftX = totalWidth * 0.15;
  const maxShiftY = totalHeight * 0.15;
  const clampedX = Math.max(-maxShiftX, Math.min(maxShiftX, idealX));
  const clampedY = Math.max(-maxShiftY, Math.min(maxShiftY, idealY));

  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* The RPG Camera Plane */}
      <div
        className={`relative ${mapClass} transition-transform duration-700 ease-out`}
        style={{
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
          transformStyle: 'preserve-3d',
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3)' : 'rotateX(37deg) rotateZ(-45deg) scale(1.4)'} translate(${clampedX}px, ${clampedY}px)`
        }}
      >
        {/* Playable Area Content (Centered within padding) */}
        <div 
          className="absolute shadow-[0_0_200px_rgba(0,0,0,1)]"
          style={{
            left: `${paddingTiles * tileSize}px`,
            top: `${paddingTiles * tileSize}px`,
            width: `${widthTiles * tileSize}px`,
            height: `${heightTiles * tileSize}px`,
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 20px, #1e293b 20px, #1e293b 21px)',
            transformStyle: 'preserve-3d'
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

          {/* Children (Avatars, NPCs, etc) */}
          <div className="absolute inset-0">
            {children}
          </div>

          {/* 3D Structural Walls (At the edges of playable area) */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-slate-800 border-b-8 border-cyan-500/20" 
               style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 right-0 bottom-0 w-64 bg-slate-850 border-l-8 border-cyan-500/30" 
               style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right' }} />
        </div>

        {/* Large External Floor (The Padding) */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 40px, #020617 40px, #020617 41px)',
            transform: 'translateZ(-2px)',
            opacity: 0.3
          }} 
        />
      </div>

      {/* Atmospheric Fog Overlay */}
      <div className="absolute inset-0 map-overlay-shadow pointer-events-none" />
    </div>
  );
}
