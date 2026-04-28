import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  playerX?: number;
  playerY?: number;
}

export default function MapLayer({ currentMap, children, playerX = 0, playerY = 0 }: MapLayerProps) {
  const { widthTiles, heightTiles, mapCode } = currentMap;
  
  const isOutdoor = mapCode.toLowerCase().includes('square') || mapCode.toLowerCase().includes('plaza');

  const TILE_WIDTH = 128;
  const TILE_HEIGHT = 64;
  const HALF_WIDTH = TILE_WIDTH / 2;
  const HALF_HEIGHT = TILE_HEIGHT / 2;

  const playerScreenX = (playerX - playerY) * HALF_WIDTH;
  const playerScreenY = (playerX + playerY) * HALF_HEIGHT;
  const cx = -playerScreenX;
  const cy = -playerScreenY;

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
    <div className="view-3d-container relative flex items-center justify-center bg-[#020617] overflow-hidden">
      
      {/* 1. CYBER DISTANT HORIZON */}
      {isOutdoor && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Distant Mountains/Grid Silhouettes */}
          <div className="absolute top-1/2 left-0 right-0 h-96 -translate-y-full opacity-20">
            <div className="absolute bottom-0 w-full h-[2px] bg-cyan-500/40 shadow-[0_0_20px_cyan]" />
            <div className="flex items-end justify-around w-[200%] -translate-x-1/4 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-40 bg-gradient-to-t from-slate-800 to-transparent" 
                     style={{ height: `${20 + Math.random() * 60}%`, clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
              ))}
            </div>
          </div>
          {/* Nebula/Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        </div>
      )}

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
        {/* --- MAP PERIMETER BUILDINGS (Placeholders) --- */}
        {isOutdoor && (
          <div className="absolute pointer-events-none" style={{ left: 0, top: 0 }}>
            {/* North Tower (Codingdong) */}
            <div className="absolute z-0" style={{ left: `${topV.x}px`, top: `${topV.y - 100}px`, transform: 'translate(-50%, -100%)' }}>
               <div className="w-80 h-[500px] bg-gradient-to-b from-slate-800/80 to-slate-900/90 border-x border-t border-cyan-500/20 backdrop-blur-sm rounded-t-3xl shadow-2xl relative">
                  <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-cyan-400/30" />
                  <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-cyan-400/30" />
                  <div className="absolute inset-x-10 top-10 bottom-10 bg-slate-950/40 rounded-xl flex items-center justify-center">
                    <div className="text-cyan-400/40 font-black text-6xl rotate-90 tracking-widest uppercase">CODINGDONG</div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* THE FLOOR (Plaza Design) */}
        <div 
          className={`absolute ${isOutdoor ? 'shadow-[0_0_150px_rgba(34,211,238,0.2)]' : 'shadow-[0_120px_250px_rgba(0,0,0,1)]'}`}
          style={{
            width: `${floorWidth}px`,
            height: `${floorHeight}px`,
            left: `${minX}px`,
            top: `${minY}px`,
            backgroundColor: '#0a0f1d',
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #111827 0%, #0a0f1d 80%),
              repeating-linear-gradient(45deg, rgba(34,211,238,0.03) 0, rgba(34,211,238,0.03) 1px, transparent 1px, transparent 40px)
            `,
            clipPath: `polygon(
              ${((topV.x - minX) / floorWidth) * 100}% ${((topV.y - minY) / floorHeight) * 100}%,
              ${((rightV.x - minX) / floorWidth) * 100}% ${((rightV.y - minY) / floorHeight) * 100}%,
              ${((bottomV.x - minX) / floorWidth) * 100}% ${((bottomV.y - minY) / floorHeight) * 100}%,
              ${((leftV.x - minX) / floorWidth) * 100}% ${((leftV.y - minY) / floorHeight) * 100}%
            )`
          }}
        >
          {/* CENTRAL CIRCLE DESIGN */}
          {isOutdoor && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-[400px] h-[400px] border border-cyan-500/20 rounded-full scale-y-[0.5]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[600px] h-[600px] border border-cyan-500/10 rounded-full scale-y-[0.5]" />
              </div>
              {/* Glowing Floor Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rotate-[26.5deg]" />
                <div className="w-[200%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -rotate-[26.5deg]" />
              </div>
            </div>
          )}

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
               style={{
                 backgroundImage: `
                   linear-gradient(116.5deg, transparent 49%, #94a3b8 50%, transparent 51%),
                   linear-gradient(63.5deg, transparent 49%, #94a3b8 50%, transparent 51%)
                 `,
                 backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
                 backgroundPosition: `${-minX}px ${-minY}px`
               }} />
        </div>

        {/* INTERIOR WALLS (Only if not outdoor) */}
        {!isOutdoor && (
          <>
            <div className="absolute bg-[#1e293b] border-l-4 border-slate-700/50"
                 style={{
                   width: `${widthTiles * HALF_WIDTH}px`, height: '320px',
                   left: '0', top: '0', transform: 'skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
            </div>
            <div className="absolute bg-[#1e293b] border-r-4 border-slate-700/50"
                 style={{
                   width: `${heightTiles * HALF_WIDTH}px`, height: '320px',
                   left: '0', top: '0', transform: 'scaleX(-1) skewY(26.5deg) translateY(-100%)', transformOrigin: 'bottom left',
                 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0f172a] shadow-inner" />
            </div>
          </>
        )}

        {/* --- CENTRAL SOL CORE (For Squares) --- */}
        {isOutdoor && (
          <div className="absolute z-20 pointer-events-none"
               style={{ left: '0px', top: '0px', transform: 'translate(-50%, -50%)' }}>
            {/* Core Glow */}
            <div className="w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* The Core Nucleus */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_60px_cyan] animate-pulse" />
                <div className="absolute inset-2 bg-cyan-400 rounded-full animate-ping opacity-50" />
                {/* Orbital Rings */}
                <div className="absolute w-40 h-40 border-4 border-cyan-400/40 rounded-full animate-[spin_4s_linear_infinite] scale-y-[0.3] rotate-[30deg]" />
                <div className="absolute w-48 h-48 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_6s_linear_infinite_reverse] scale-y-[0.3] -rotate-[30deg]" />
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.5)_100%)]" />
    </div>
  );
}
