interface MapLayerProps {
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
  debugGrid?: boolean;
}

export default function MapLayer({ children, playerX = 0, playerY = 0, debugGrid = true }: MapLayerProps) {
  // --- CONFIGURATION ---
  // Tile size in pixels. Adjust to match the image's actual tile size.
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  const MAP_COLS = 28;
  const MAP_ROWS = 28;

  const MAP_IMAGE_URL = '/assets/map_bg.png';

  // Total image size
  const TOTAL_WIDTH = MAP_COLS * TILE_WIDTH; // 3584px
  const TOTAL_HEIGHT = MAP_ROWS * TILE_HEIGHT; // 1792px

  // Vertical offset for the image origin.
  // Increase this if the grid appears ABOVE the image tiles.
  // Decrease if the grid appears BELOW the image tiles.
  const IMAGE_SHIFT_Y = 0;

  // 1. Camera: keep player centered
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  // 2. Build debug grid tiles
  const debugTiles = [];
  if (debugGrid) {
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const sx = (col - row) * HALF_WIDTH;
        const sy = (col + row) * HALF_HEIGHT;
        const pts = [
          `${sx},${sy - HALF_HEIGHT}`,           // top
          `${sx + HALF_WIDTH},${sy}`,             // right
          `${sx},${sy + HALF_HEIGHT}`,            // bottom
          `${sx - HALF_WIDTH},${sy}`,             // left
        ].join(' ');
        debugTiles.push(
          <polygon
            key={`${row}-${col}`}
            points={pts}
            fill="none"
            stroke="rgba(0,255,200,0.3)"
            strokeWidth="1"
          />
        );
      }
    }
  }

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
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute"
          style={{
            width: `${TOTAL_WIDTH}px`,
            height: `${TOTAL_HEIGHT}px`,
            left: '0px',
            top: `${IMAGE_SHIFT_Y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <img
            src={MAP_IMAGE_URL}
            alt="Map Background"
            className="w-full h-full block"
          />
        </div>

        {/* DEBUG GRID OVERLAY */}
        {debugGrid && (
          <svg
            className="absolute pointer-events-none"
            style={{
              left: `${-(MAP_COLS + MAP_ROWS) * HALF_WIDTH}px`,
              top: `${IMAGE_SHIFT_Y}px`,
              width: `${(MAP_COLS + MAP_ROWS) * TILE_WIDTH}px`,
              height: `${(MAP_COLS + MAP_ROWS) * HALF_HEIGHT}px`,
              overflow: 'visible',
              zIndex: 5,
            }}
          >
            {debugTiles}
          </svg>
        )}

        {/* INTERACTIVE LAYER */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
