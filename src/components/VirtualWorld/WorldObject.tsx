interface WorldObjectProps {
  x: number;
  y: number;
  imageUrl: string;
  width: number;
  height: number;
  label?: string;
  anchorY?: number; // 0 to 1, default 1 (bottom)
}

export default function WorldObject({ x, y, imageUrl, width, height, label, anchorY = 1 }: WorldObjectProps) {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-700 ease-out z-10"
      style={{
        // 2:1 Isometric Projection
        left: `${(x - y) * 64}px`,
        top: `${(x + y) * 32}px`,
        transform: `translate(-50%, -${anchorY * 100}%)`, // Default anchor to bottom-center
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {label && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/80 border border-cyan-500/50 px-4 py-1.5 rounded-lg backdrop-blur-xl shadow-2xl">
          <span className="text-cyan-400 font-black text-xs uppercase tracking-widest whitespace-nowrap">{label}</span>
        </div>
      )}
      <img 
        src={imageUrl} 
        alt={label || 'World Object'} 
        className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}
