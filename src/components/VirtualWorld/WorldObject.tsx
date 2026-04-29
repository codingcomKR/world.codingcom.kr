interface WorldObjectProps {
  x: number;
  y: number;
  imageUrl?: string;
  width: number;
  height: number;
  label?: string;
  anchorY?: number;
}

export default function WorldObject({ x, y, imageUrl, width, height, label, anchorY = 1 }: WorldObjectProps) {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-700 ease-out z-10"
      style={{
        // 2:1 Isometric Projection
        left: `${(x - y) * 64}px`,
        top: `${(x + y) * 32}px`,
        transform: `translate(-50%, -${anchorY * 100}%)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {label && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-900/90 border border-cyan-500/50 px-4 py-1.5 rounded-lg backdrop-blur-xl shadow-2xl z-20">
          <span className="text-cyan-400 font-black text-xs uppercase tracking-widest whitespace-nowrap">{label}</span>
        </div>
      )}

      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={label || 'World Object'} 
          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        />
      ) : (
        /* HIGH-QUALITY CSS PLACEHOLDER BUILDING */
        <div className="w-full h-full relative group">
          {/* Building Main Body */}
          <div className="absolute inset-x-4 bottom-0 top-10 bg-gradient-to-b from-slate-800 to-slate-950 border-x border-t border-cyan-500/30 rounded-t-xl shadow-2xl overflow-hidden">
             {/* Tech Lines */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to bottom, #22d3ee 1px, transparent 1px)', backgroundSize: '100% 20px' }} />
             <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />
             {/* Glowing Windows */}
             <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400/20 blur-sm rounded-sm animate-pulse" />
             <div className="absolute top-20 right-12 w-6 h-2 bg-orange-400/20 blur-sm rounded-sm" />
          </div>
          {/* Building Top Detail */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-slate-700 border border-cyan-500/40 rounded-sm shadow-lg" />
          {/* Bottom Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-10 bg-cyan-500/10 blur-xl rounded-full" />
        </div>
      )}
    </div>
  );
}
