import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles, mapCode } = currentMap;
  
  // Robust detection for square/plaza
  const normCode = (mapCode || '').toLowerCase();
  const isOutdoor = normCode.includes('square') || normCode.includes('plaza') || normCode.includes('hub');

  // Standard 2:1 Isometric Constants
  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  // 1. Calculate Camera Position
  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

  // 2. Define Floor Vertices
  const topV = { x: 0, y: 0 };
  const rightV = { x: widthTiles * HALF_WIDTH, y: widthTiles * HALF_HEIGHT };
  const bottomV = { x: (widthTiles - heightTiles) * HALF_WIDTH, y: (widthTiles + heightTiles) * HALF_HEIGHT };
  const leftV = { x: -heightTiles * HALF_WIDTH, y: heightTiles * HALF_HEIGHT };

  const minX = Math.min(topV.x, rightV.x, bottomV.x, leftV.x);
  const maxX = Math.max(topV.x, rightV.x, bottomV.x, leftV.x);
  const minY = Math.min(topV.y, rightV.y, bottomV.y, leftV.y);
  const maxY = Math.max(topV.y, rightV.y, bottomV.y, leftV.y);
  const floorWidth = maxX - minX;
  const floorHeight = maxY - minY;

  return (
    <div className="view-3d-container fixed inset-0 flex items-center justify-center bg-[#020617] overflow-hidden">
      
      {/* 1. ATMOSPHERIC BACKGROUND (Always visible) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#020617_100%)]" />
        {isOutdoor && (
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-cyan-500/20 blur-[1px]" />
        )}
      </div>

      {/* Isometric Camera Plane */}
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
        {/* THE FLOOR (Diamond Shape) */}
        <div 
          className="absolute shadow-[0_50px_200px_rgba(0,0,0,0.8)]"
          style={{
            width: `${floorWidth}px`,
            height: `${floorHeight}px`,
            left: `${minX}px`,
            top: `${minY}px`,
            backgroundColor: isOutdoor ? '#0a0f1d' : '#111827',
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(34,211,238,0.05) 0, rgba(34,211,238,0.05) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(34,211,238,0.05) 0, rgba(34,211,238,0.05) 1px, transparent 1px, transparent 40px)
            `,
            clipPath: `polygon(
              ${((topV.x - minX) / floorWidth) * 100}% ${((topV.y - minY) / floorHeight) * 100}%,
              ${((rightV.x - minX) / floorWidth) * 100}% ${((rightV.y - minY) / floorHeight) * 100}%,
              ${((bottomV.x - minX) / floorWidth) * 100}% ${((bottomV.y - minY) / floorHeight) * 100}%,
              ${((leftV.x - minX) / floorWidth) * 100}% ${((leftV.y - minY) / floorHeight) * 100}%
            )`
          }}
        >
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
               style={{
                 backgroundImage: `
                   linear-gradient(116.5deg, transparent 49%, #94a3b8 50%, transparent 51%),
                   linear-gradient(63.5deg, transparent 49%, #94a3b8 50%, transparent 51%)
                 `,
                 backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
                 backgroundPosition: `${-minX}px ${-minY}px`
               }} />
        </div>

        {/* --- REAR WALLS (Building Interior Effect) --- */}
        {!isOutdoor && (
          <>
            <div className="absolute bg-[#1e293b] border-l-4 border-slate-700/50"
                 style={{
                   width: `${widthTiles * HALF_WIDTH}px`, height: '400px',
                   left: '0', top: '0', transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
              <div className="absolute top-1/2 left-20 -translate-y-1/2 text-cyan-500/10 font-black text-8xl tracking-tighter select-none rotate-[-26.5deg]">LOBBY</div>
            </div>
            <div className="absolute bg-[#1e293b] border-r-4 border-slate-700/50"
                 style={{
                   width: `${heightTiles * HALF_WIDTH}px`, height: '400px',
                   left: '0', top: '0', transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
            </div>
          </>
        )}

        {/* --- CENTRAL SYMBOL (SOL CORE) --- */}
        {isOutdoor && (
          <div className="absolute z-20 pointer-events-none"
               style={{ left: '0px', top: '0px', transform: 'translate(-50%, -70%)' }}>
            <div className="w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_80px_cyan] animate-pulse" />
                <div className="absolute w-48 h-48 border-4 border-cyan-400/40 rounded-full animate-[spin_4s_linear_infinite] scale-y-[0.3] rotate-[30deg]" />
                <div className="absolute w-56 h-56 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_6s_linear_infinite_reverse] scale-y-[0.3] -rotate-[30deg]" />
              </div>
            </div>
          </div>
        )}

        {/* SPRITES CONTENT */}
        <div className="relative z-10">
          {children}
        </div>

        {/* FRONT CURBS (Lobby only) */}
        {!isOutdoor && (
          <>
            <div className="absolute bg-[#0f172a] border-l border-slate-700/30"
                 style={{
                   width: `${heightTiles * HALF_WIDTH}px`, height: '16px', 
                   left: `${rightV.x}px`, top: `${rightV.y}px`,
                   transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                   zIndex: 100
                 }} />
            <div className="absolute bg-[#0f172a] border-r border-slate-700/30"
                 style={{
                   width: `${widthTiles * HALF_WIDTH}px`, height: '16px', 
                   left: `${leftV.x}px`, top: `${leftV.y}px`,
                   transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                   zIndex: 100
                 }} />
          </>
        )}

      </div>
    </div>
  );
}
