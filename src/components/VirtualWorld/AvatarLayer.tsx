import { useEffect, useRef, useState } from 'react';
import type { VirtualCampusAvatarSummary } from '../../types/virtual-campus';
import AvatarMarker from './AvatarMarker';

interface AvatarLayerProps {
  avatars: VirtualCampusAvatarSummary[];
  selectedMemberNo: string;
  widthTiles: number;
  heightTiles: number;
  viewMode?: '2.5d' | '3d';
}

export default function AvatarLayer({ avatars, selectedMemberNo, widthTiles, heightTiles, viewMode = '2.5d' }: AvatarLayerProps) {
  const prevPositions = useRef<Record<string, { x: number, y: number }>>({});
  const [movingAvatars, setMovingAvatars] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newMoving: Record<string, boolean> = {};
    avatars.forEach(avatar => {
      const prev = prevPositions.current[avatar.id];
      if (prev && (prev.x !== avatar.positionX || prev.y !== avatar.positionY)) {
        newMoving[avatar.id] = true;
      }
      prevPositions.current[avatar.id] = { x: avatar.positionX, y: avatar.positionY };
    });
    setMovingAvatars(newMoving);

    // Stop moving after a short delay if no new position
    const timer = setTimeout(() => setMovingAvatars({}), 300);
    return () => clearTimeout(timer);
  }, [avatars]);

  return (
    <>
      {avatars.map((avatar) => {
        const isMe = avatar.memberNo === selectedMemberNo;
        const isMoving = movingAvatars[avatar.id];
        const billboardClass = viewMode === '3d' ? 'billboard-1st' : 'billboard-2-5d';

        return (
          <div
            key={avatar.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300 ${billboardClass}`}
            style={{
              left: `${((avatar.positionX + 0.5) / widthTiles) * 100}%`,
              top: `${((avatar.positionY + 0.5) / heightTiles) * 100}%`,
              zIndex: Math.floor(avatar.positionY)
            }}
          >
            <AvatarMarker 
              avatar={avatar} 
              selected={isMe} 
              moving={isMoving}
              size={isMe ? 'lg' : 'md'} 
            />
            {!isMe && (
              <span className="mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-slate-200 backdrop-blur-sm whitespace-nowrap shadow-sm">
                {avatar.displayName}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}
