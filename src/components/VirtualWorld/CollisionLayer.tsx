import type { VirtualCampusCollisionZoneSummary } from '../../types/virtual-campus';

interface CollisionLayerProps {
  zones: VirtualCampusCollisionZoneSummary[];
  widthTiles: number;
  heightTiles: number;
}

export default function CollisionLayer({ zones, widthTiles, heightTiles }: CollisionLayerProps) {
  return (
    <>
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute border border-rose-500/20 bg-rose-500/5 pointer-events-none"
          style={{
            left: `${(zone.originX / widthTiles) * 100}%`,
            top: `${(zone.originY / heightTiles) * 100}%`,
            width: `${(zone.widthTiles / widthTiles) * 100}%`,
            height: `${(zone.heightTiles / heightTiles) * 100}%`,
          }}
        />
      ))}
    </>
  );
}
