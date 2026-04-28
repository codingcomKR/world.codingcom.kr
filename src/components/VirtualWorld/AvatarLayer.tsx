import { useEffect, useRef, useState } from 'react';
import type { VirtualCampusAvatarSummary } from '../../types/virtual-campus';
import AvatarMarker from './AvatarMarker';

interface AvatarLayerProps {
  avatars: VirtualCampusAvatarSummary[];
  selectedMemberNo: string;
  widthTiles: number;
  heightTiles: number;
}

export default function AvatarLayer({ avatars, selectedMemberNo }: AvatarLayerProps) {
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

    const timer = setTimeout(() => setMovingAvatars({}), 300);
    return () => clearTimeout(timer);
  }, [avatars]);

  return (
    <>
      {avatars.map((avatar) => {
        const isMe = avatar.memberNo === selectedMemberNo;
        const isMoving = movingAvatars[avatar.id];

        return (
          <AvatarMarker 
            key={avatar.id}
            avatar={avatar} 
            selected={isMe} 
            moving={isMoving}
            size={isMe ? 'lg' : 'md'} 
          />
        );
      })}
    </>
  );
}
