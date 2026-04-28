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
  const paddingTiles = 10; // Extra buffer
  const mapWidth = (widthTiles + paddingTiles * 2) * tileSize;
  const mapHeight = (heightTiles + paddingTiles * 2) * tileSize;

  // 1. Ideal center position
  const px = (playerX + paddingTiles + 0.5) * tileSize;
  const py = (playerY + paddingTiles + 0.5) * tileSize;
  
  const idealX = (mapWidth / 2) - px;
  const idealY = (mapHeight / 2) - py;

  // 2. Strict Clamping to hide void
  // We allow the map to shift only within a safe margin of its total size
  const limitX = mapWidth * 0.2; 
  const limitY = mapHeight * 0.2;
  
  const cx = Math.max(-limitX, Math.min(limitX, idealX));
  const cy = Math.max(-limitY, Math.min(limitY, idealY));

  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* RPG World Container */}
      <div
        className={`relative ${mapClass} transition-transform duration-700 ease-out`}
        id="rpg-camera-plane"
        data-cx={cx}
        data-cy={cy}
        style={{
          width: `${mapWidth}px`,
          height: `${mapHeight}px`,
          transformStyle: 'preserve-3d',
          // Scale 1.5 to ensure coverage
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3)' : 'rotateX(37deg) rotateZ(-45deg) scale(1.5)'} translate(${cx}px, ${cy}px)`
        }}
      >
        {/* Playable Grid */}
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
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
               style={{
                 backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
                 backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
               }} />

          {children}

          {/* 3D Boundaries */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-slate-800 border-b-8 border-cyan-500/20" 
               style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 right-0 bottom-0 w-96 bg-slate-850 border-l-8 border-cyan-500/20" 
               style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right' }} />
        </div>

        {/* Outer Floor (Padding) */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               backgroundColor: '#0f172a',
               backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 40px, #020617 40px, #020617 41px)',
               transform: 'translateZ(-10px)',
               opacity: 0.5
             }} />
      </div>

      <div className="absolute inset-0 map-overlay-shadow pointer-events-none" />
    </div>
  );
}
