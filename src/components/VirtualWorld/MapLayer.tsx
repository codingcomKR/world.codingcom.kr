import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles } = currentMap;
  
  // Standard 2:1 Isometric Constants for the coordinate system
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  // USER'S FULL MAP IMAGE
  const MAP_IMAGE_URL = '/assets/map_bg.png';

  // 1. Calculate Camera Position (Centers on player)
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  // 2. Full Image Dimensions (Estimated or Fixed)
  // To prevent clipping, we use a large enough area or ideally the actual image size.
  // For 30x30 tiles, the bounding box is (30+30)*64 = 3840 wide.
  const totalMapWidth = (widthTiles + heightTiles) * HALF_WIDTH;
  const totalMapHeight = (widthTiles + heightTiles) * HALF_HEIGHT;

  return (
    <div className="view-3d-container fixed inset-0 flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* 
          RPG CAMERA PLANE
          The coordinate (0,0) is at the center of this plane conceptually.
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
            THE BACKGROUND IMAGE
            We place it relative to the (0,0) point. 
            In 2:1 iso, (0,0) is the top vertex of the diamond.
        */}
        <div 
          className="absolute"
          style={{
            width: `${totalMapWidth}px`,
            height: `${totalMapHeight}px`,
            left: `${-heightTiles * HALF_WIDTH}px`, // Offset to align top-center of diamond to (0,0)
            top: '0px',
            backgroundImage: `url("${MAP_IMAGE_URL}")`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            // NO CLIP-PATH: Let the full image shine
          }}
        />

        {/* 
            TRANSPARENT GRID LAYER
            This is where avatars and NPCs live.
        */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
