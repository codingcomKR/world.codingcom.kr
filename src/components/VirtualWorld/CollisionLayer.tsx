import type { VirtualCampusCollisionZoneSummary } from '../../types/virtual-campus';
import { MAP_IMAGE_W, MAP_IMAGE_H } from '../../config/mapConfig';

interface CollisionLayerProps {
  zones: VirtualCampusCollisionZoneSummary[];
  widthTiles: number;
  heightTiles: number;
}

export default function CollisionLayer({ zones, widthTiles, heightTiles }: CollisionLayerProps) {
  const tileW = MAP_IMAGE_W / widthTiles;
  const tileH = MAP_IMAGE_H / heightTiles;

  return (
    <>
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute border-2 border-rose-500/40 bg-rose-500/10 pointer-events-none flex items-center justify-center"
          style={{
            // 2D flat grid: rectangle based on origin and size
            left: `${zone.originX * tileW}px`,
            top: `${zone.originY * tileH}px`,
            width: `${zone.widthTiles * tileW}px`,
            height: `${zone.heightTiles * tileH}px`,
          }}
        >
          <span className="text-rose-400 text-[8px] font-black opacity-40 uppercase">BLOCKED</span>
        </div>
      ))}
    </>
  );
}
