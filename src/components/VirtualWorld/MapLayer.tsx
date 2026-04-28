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
  // Make the visual map MUCH larger than the playable area to act as the "Infinite Floor"
  const visualPadding = 20; 
  const visualWidth = (widthTiles + visualPadding * 2) * tileSize;
  const visualHeight = (heightTiles + visualPadding * 2) * tileSize;

  // 1. Calculate player's position relative to the visual center
  const px = (playerX + visualPadding + 0.5) * tileSize;
  const py = (playerY + visualPadding + 0.5) * tileSize;
  
  // 2. Camera Translation (Centered on player but CLAMPED)
  // We want to keep the player centered, but we MUST NOT show the edges of the visualWidth/Height.
  // Conservative clamping: allow only moving within the center area.
  const idealCX = (visualWidth / 2) - px;
  const idealCY = (visualHeight / 2) - py;
  
  // Hard clamp: ensures that even with rotation/scale, we stay within the visual map.
  const clampLimit = visualWidth * 0.25; 
  const cx = Math.max(-clampLimit, Math.min(clampLimit, idealCX));
  const cy = Math.max(-clampLimit, Math.min(clampLimit, idealCY));

  const mapClass = viewMode === '3d' ? 'view-1st-person-map' : 'view-rpg-map';

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#0f172a] overflow-hidden">
      {/* RPG Camera Rig */}
      <div
        className={`relative ${mapClass} transition-transform duration-700 ease-out`}
        id="rpg-camera-plane"
        data-cx={cx}
        data-cy={cy}
        style={{
          width: `${visualWidth}px`,
          height: `${visualHeight}px`,
          transformStyle: 'preserve-3d',
          // Zoomed scale to ensure full coverage
          transform: `${viewMode === '3d' ? 'rotateX(85deg) scale(3.5)' : 'rotateX(37deg) rotateZ(-45deg) scale(1.6)'} translate(${cx}px, ${cy}px)`
        }}
      >
        {/* The Playable Zone (The Room) */}
        <div 
          className="absolute shadow-[0_0_150px_rgba(0,0,0,1)]"
          style={{
            left: `${visualPadding * tileSize}px`,
            top: `${visualPadding * tileSize}px`,
            width: `${widthTiles * tileSize}px`,
            height: `${heightTiles * tileSize}px`,
            backgroundColor: '#0f172a',
            backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 20px, #1e293b 20px, #1e293b 21px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
               style={{
                 backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
                 backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
               }} />

          {/* Markers/Avatars */}
          <div className="absolute inset-0">
            {children}
          </div>

          {/* Structural Walls */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-slate-800 border-b-8 border-cyan-500/20" 
               style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 right-0 bottom-0 w-96 bg-slate-850 border-l-8 border-cyan-500/20" 
               style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right' }} />
        </div>

        {/* Extended Floor (The Outside Area) */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               backgroundColor: '#0f172a',
               backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 40px, #131c31 40px, #131c31 41px)',
               transform: 'translateZ(-10px)',
               opacity: 0.4
             }} />
      </div>

      {/* Atmospheric Fog Overlay */}
      <div className="absolute inset-0 map-overlay-shadow pointer-events-none" />
    </div>
  );
}
