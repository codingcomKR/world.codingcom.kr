import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles } = currentMap;
  
  // Standard 2:1 Isometric Constants for the logic
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  // USER'S MAP IMAGE
  const MAP_IMAGE_URL = '/assets/map_bg.png';

  // 1. Coordinate calculation for the camera
  // This keeps the player at the center of the screen
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  return (
    <div className="view-3d-container fixed inset-0 flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* 
          THE RPG PLANE
          Everything here moves relative to the player (camera).
      */}
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
            THE ORIGINAL BACKGROUND IMAGE
            Centered on (0,0). We use an <img> tag to preserve original size/ratio.
        */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
           <img 
              src={MAP_IMAGE_URL} 
              alt="Map Background" 
              className="max-w-none block shadow-[0_0_100px_rgba(0,0,0,1)]"
              onLoad={(e) => {
                // Potential debug: Log natural size
                const img = e.currentTarget;
                console.log(`[DEBUG] Map Image Loaded: ${img.naturalWidth}x${img.naturalHeight}`);
              }}
           />
        </div>

        {/* 
            INTERACTIVE LAYER (Avatars, NPCs, etc.)
            Positions are relative to the (0,0) center point.
        */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
