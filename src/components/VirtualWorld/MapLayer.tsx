import { VirtualCampusMapSummary } from '../../types/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
}

export default function MapLayer({ currentMap, children }: MapLayerProps) {
  const { widthTiles, heightTiles } = currentMap;

  return (
    <div 
      className="relative bg-slate-900 border-2 border-cyan-700/50 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(15,23,42,0.8)]"
      style={{
        width: '100%',
        aspectRatio: `${widthTiles} / ${heightTiles}`,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
      }}
    >
      {children}
    </div>
  );
}
