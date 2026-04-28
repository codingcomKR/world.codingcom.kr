import type { VirtualCampusCollisionZoneSummary } from '../../types/virtual-campus';

interface CollisionLayerProps {
  zones: VirtualCampusCollisionZoneSummary[];
  widthTiles: number;
  heightTiles: number;
}

export default function CollisionLayer({ zones }: CollisionLayerProps) {
  return (
    <>
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute border-2 border-rose-500/40 bg-rose-500/10 pointer-events-none flex items-center justify-center"
          style={{
            // 2:1 Isometric Projection for the bounding area
            left: `${(zone.originX - zone.originY) * 64}px`,
            top: `${(zone.originX + zone.originY) * 32}px`,
            // This is a simplified square-ish representation of the collision zone in iso
            width: `${(zone.widthTiles + zone.heightTiles) * 64}px`,
            height: `${(zone.widthTiles + zone.heightTiles) * 32}px`,
            transform: 'translate(-50%, 0)', // Center horizontally on origin
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        >
          <span className="text-rose-400 text-[8px] font-black opacity-40 uppercase">BLOCKED</span>
        </div>
      ))}
    </>
  );
}
