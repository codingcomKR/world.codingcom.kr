import type { VirtualCampusAvatarSummary } from '../../types/virtual-campus';

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
            <div
              className={`w-8 h-8 rounded-full border-2 ${isMe
                  ? 'bg-cyan-400 border-white shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10 scale-110'
                  : 'bg-slate-600 border-slate-400 shadow-lg'
                }`}
              style={!isMe ? { backgroundColor: avatar.paletteColor, borderColor: avatar.accentColor } : {}}
            />
            <span className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap ${isMe ? 'bg-cyan-900/80 text-cyan-50' : 'bg-black/70 text-slate-200'}`}>
              {avatar.displayName}
            </span>
          </div>
        );
      })}
    </>
  );
}
