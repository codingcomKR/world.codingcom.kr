import type { VirtualCampusAvatarSummary } from '../../types/virtual-campus';
import AvatarMarker from './AvatarMarker';

interface AvatarLayerProps {
  avatars: VirtualCampusAvatarSummary[];
  selectedMemberNo: string;
  widthTiles: number;
  heightTiles: number;
}

export default function AvatarLayer({ avatars, selectedMemberNo, widthTiles, heightTiles }: AvatarLayerProps) {
  return (
    <>
      {avatars.map((avatar) => {
        const isMe = avatar.memberNo === selectedMemberNo;
        return (
          <div
            key={avatar.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300"
            style={{
              left: `${((avatar.positionX + 0.5) / widthTiles) * 100}%`,
              top: `${((avatar.positionY + 0.5) / heightTiles) * 100}%`,
            }}
          >
            <AvatarMarker 
              avatar={avatar} 
              selected={isMe} 
              size={isMe ? 'lg' : 'md'} 
            />
            <span className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap shadow-sm ${isMe ? 'bg-cyan-900/80 text-cyan-50' : 'bg-black/70 text-slate-200'}`}>
              {avatar.displayName}
            </span>
          </div>
        );
      })}
    </>
  );
}
