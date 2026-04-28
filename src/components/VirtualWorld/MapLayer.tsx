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
  
  // Standard 2:1 Isometric Tile dimensions (128x64)
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  // 1. Calculate Player Screen Position (Isometric)
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;

  // 2. Camera Centering
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  return (
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* Dark background layer */}
      <div className="absolute inset-0 bg-[#0f172a]" />

      {/* Isometric Camera Rig (2D Only) */}
      <div
        className="relative transition-transform duration-700 ease-out"
        id="rpg-camera-plane"
        data-cx={cx}
        data-cy={cy}
        style={{
          transform: `translate(${cx}px, ${cy}px)`,
        }}
      >
        {/* Playable Floor (The Diamond) */}
        <div 
          className="absolute"
          style={{
            width: `${(widthTiles + heightTiles) * HALF_WIDTH}px`,
            height: `${(widthTiles + heightTiles) * HALF_HEIGHT}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="absolute inset-0 shadow-[0_0_150px_rgba(0,0,0,0.8)]"
            style={{
              backgroundColor: '#1e293b',
              backgroundImage: `repeating-linear-gradient(45deg, #0f172a 0, #0f172a 2px, transparent 2px, transparent 20px)`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
          
          {/* Tile Grid (Visual Only) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: `
                   linear-gradient(116.5deg, transparent 49%, #64748b 50%, transparent 51%),
                   linear-gradient(63.5deg, transparent 49%, #64748b 50%, transparent 51%)
                 `,
                 backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`
               }} />
        </div>

        {/* Content Layer (Avatars, NPCs, etc) */}
        <div className="relative">
          {children}
        </div>
      </div>

      {/* High-end Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.7)_100%)]" />
    </div>
  );
}
