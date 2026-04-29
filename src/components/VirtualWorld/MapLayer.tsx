interface MapLayerProps {
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ children, playerX = 0, playerY = 0 }: MapLayerProps) {
  // Standard 2:1 Isometric Constants
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  // USER'S MAP IMAGE
  const MAP_IMAGE_URL = '/assets/map_bg.png';

  // --- IMAGE OFFSET TUNING ---
  // If your character is not on the path, adjust these numbers!
  const IMAGE_OFFSET_X = 0; 
  const IMAGE_OFFSET_Y = 0; 
  // ---------------------------

  // 1. Camera calculation (Player is the center of the screen)
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
            THE MAP IMAGE
            We use -50% -50% to center it on (0,0).
            Use IMAGE_OFFSET to move it if the artwork's (0,0) isn't the image center.
        */}
        <div 
          className="absolute"
          style={{
            transform: `translate(calc(-50% + ${IMAGE_OFFSET_X}px), calc(${IMAGE_OFFSET_Y}px))`,
            top: '0px',
            left: '0px'
          }}
        >
           <img 
              src={MAP_IMAGE_URL} 
              alt="Map Background" 
              className="max-w-none block shadow-[0_0_100px_rgba(0,0,0,1)]"
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
