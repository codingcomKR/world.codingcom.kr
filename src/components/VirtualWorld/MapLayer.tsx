import type { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
}

export default function MapLayer({ currentMap, children }: MapLayerProps) {
  const { widthTiles, heightTiles } = currentMap;

  return (
    <div
      className="relative bg-[#020617] border-2 border-cyan-700/50 rounded-[26px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      style={{
        width: '100%',
        aspectRatio: `${widthTiles} / ${heightTiles}`,
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
      }}
    >
      {/* Premium Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
        }}
      />

      {/* Decorative Floor Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
