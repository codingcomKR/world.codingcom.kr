import { MAP_IMAGE_URL, MAP_IMAGE_W, MAP_IMAGE_H } from '../../config/mapConfig';

interface MapLayerProps {
  widthTiles: number;
  heightTiles: number;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
  debugGrid?: boolean;
}

export default function MapLayer({
  widthTiles,
  heightTiles,
  children,
  playerX = 0,
  playerY = 0,
  debugGrid = false,
}: MapLayerProps) {
  // 2D Tile size derived from image dimensions
  const tileW = MAP_IMAGE_W / widthTiles;
  const tileH = MAP_IMAGE_H / heightTiles;

  // Camera: keep player centered on screen
  // Player sprite center = (playerX * tileW + tileW/2, playerY * tileH + tileH/2)
  const cx = -(playerX * tileW + tileW / 2);
  const cy = -(playerY * tileH + tileH / 2);

  return (
    <div className="view-3d-container fixed inset-0 flex items-center justify-center bg-[#020617] overflow-hidden">
      <div
        className="relative transition-transform duration-700 ease-out"
        id="rpg-camera-plane"
        data-cx={cx}
        data-cy={cy}
        data-tile-w={tileW}
        data-tile-h={tileH}
        style={{
          transform: `translate(${cx}px, ${cy}px)`,
          width: '0',
          height: '0',
        }}
      >
        {/* BACKGROUND IMAGE — top-left is (0,0) origin */}
        <div
          className="absolute"
          style={{
            width: `${MAP_IMAGE_W}px`,
            height: `${MAP_IMAGE_H}px`,
            left: '0px',
            top: '0px',
          }}
        >
          <img
            src={MAP_IMAGE_URL}
            alt="Map Background"
            className="w-full h-full block shadow-[0_0_60px_rgba(0,0,0,1)]"
            draggable={false}
          />
        </div>

        {/* DEBUG GRID — shows tile boundaries */}
        {debugGrid && (
          <svg
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: `${MAP_IMAGE_W}px`,
              height: `${MAP_IMAGE_H}px`,
              zIndex: 5,
            }}
          >
            {Array.from({ length: heightTiles }).map((_, row) =>
              Array.from({ length: widthTiles }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * tileW}
                  y={row * tileH}
                  width={tileW}
                  height={tileH}
                  fill="none"
                  stroke="rgba(0,255,200,0.25)"
                  strokeWidth="1"
                />
              ))
            )}
          </svg>
        )}

        {/* INTERACTIVE LAYER (Avatars, NPCs, Portals) */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
