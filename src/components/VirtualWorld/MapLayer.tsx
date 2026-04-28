import type { VirtualCampusMapSummary } from '../../types/virtual-campus';
import { MAP_ACCENT } from '../../constants/virtual-campus';

interface MapLayerProps {
  currentMap: VirtualCampusMapSummary;
  children: React.ReactNode;
  viewMode?: '2.5d' | '3d';
}

export default function MapLayer({ currentMap, children, viewMode = '2.5d' }: MapLayerProps) {
  const { widthTiles, heightTiles, mapKind } = currentMap;
  const accentColor = MAP_ACCENT[mapKind] || 'border-cyan-700/50';

  return (
    <div className={viewMode === '3d' ? 'view-3d-container' : ''}>
      <div
        className={`relative bg-[#020617] border-2 ${accentColor} rounded-[28px] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] transition-all duration-1000 ${
          viewMode === '3d' ? 'view-3d-map' : ''
        }`}
      style={{
        width: '100%',
        aspectRatio: `${widthTiles} / ${heightTiles}`,
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
      }}
    >
      {/* Dynamic Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)',
          backgroundSize: `${100 / widthTiles}% ${100 / heightTiles}%`
        }}
      />

      {/* Atmospheric Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(34,211,238,0.25)_0%,transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,23,42,0.5)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Ground Scanline (Optional, for that tech feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />

      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
