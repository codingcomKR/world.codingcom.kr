interface MapLayerProps {
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ children, playerX = 0, playerY = 0 }: MapLayerProps) {
  // --- 28x28 GRID CONFIGURATION ---
  // To perfectly match 3548x1774 image scaled to 28x28 tiles (3584x1792)
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  const MAP_IMAGE_URL = '/assets/map_bg.png';
  
  // Forced Dimensions for 28x28 tiles
  const TOTAL_WIDTH = 28 * TILE_WIDTH; // 3584px
  const TOTAL_HEIGHT = 28 * TILE_HEIGHT; // 1792px

  // 1. Camera calculation
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  return (
    <div className="view-3d-container fixed inset-0 flex items-center justify-center bg-[#020617] overflow-hidden">
      <div
        className="relative transition-transform duration-700 ease-out"
        id="rpg-camera-plane"
        data-cx={cx}
        data-cy={cy}
        style={{
          transform: `translate(${cx}px, ${cy}px)`,
          width: '0',
          height: '0',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 
            THE BACKGROUND IMAGE (Optimized for 28x28 tiles)
            Aligned so the top-center vertex is exactly (0,0).
        */}
        <div 
          className="absolute"
          style={{
            width: `${TOTAL_WIDTH}px`,
            height: `${TOTAL_HEIGHT}px`,
            transform: 'translateX(-50%)',
            top: '0px',
            left: '0px'
          }}
        >
           <img 
              src={MAP_IMAGE_URL} 
              alt="Map Background" 
              className="w-full h-full block shadow-[0_0_100px_rgba(0,0,0,1)]"
           />
        </div>

        {/* INTERACTIVE LAYER */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
