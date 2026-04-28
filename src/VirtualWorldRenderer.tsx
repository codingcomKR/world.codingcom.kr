import React from 'react';

interface Avatar {
  memberNo: string;
  name: string;
  x: number;
  y: number;
}

interface CollisionZone {
  x: number;
  y: number;
}

interface Portal {
  x: number;
  y: number;
  name: string;
}

interface MapInfo {
  width: number;
  height: number;
  name: string;
}

interface VirtualWorldRendererProps {
  memberView: {
    selectedMemberNo: string;
  };
  roomView: {
    currentMap: MapInfo;
    collisionZones: CollisionZone[];
    portals: Portal[];
    avatars: Avatar[];
  };
}

const VirtualWorldRenderer: React.FC<VirtualWorldRendererProps> = ({ memberView, roomView }) => {
  const { currentMap, collisionZones, portals, avatars } = roomView;
  const { selectedMemberNo } = memberView;

  const handleMove = (direction: string) => {
    console.log(`이동 요청: [${direction}]`);
  };

  // Helper to check if a tile has a collision
  const isCollision = (x: number, y: number) => {
    return collisionZones.some(zone => zone.x === x && zone.y === y);
  };

  // Helper to check if a tile has a portal
  const getPortal = (x: number, y: number) => {
    return portals.find(portal => portal.x === x && portal.y === y);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white font-sans p-4">
      {/* Header Area */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black tracking-widest text-cyan-400 uppercase border-b-2 border-cyan-500 pb-2 mb-2">
          {currentMap.name} - System Access
        </h2>
        <p className="text-xs text-zinc-500 uppercase tracking-tighter">
          Resolution: {currentMap.width}x{currentMap.height} | Auth: {selectedMemberNo}
        </p>
      </div>

      {/* Main Renderer Area */}
      <div className="relative border-4 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.1)] rounded-lg overflow-hidden bg-[#111]">
        <div 
          className="grid gap-px bg-zinc-800/20" 
          style={{ 
            gridTemplateColumns: `repeat(${currentMap.width}, minmax(0, 1fr))`,
            width: `${currentMap.width * 32}px`,
            height: `${currentMap.height * 32}px`
          }}
        >
          {Array.from({ length: currentMap.width * currentMap.height }).map((_, index) => {
            const x = index % currentMap.width;
            const y = Math.floor(index / currentMap.width);
            const collision = isCollision(x, y);
            const portal = getPortal(x, y);
            const avatarInTile = avatars.find(a => a.x === x && a.y === y);

            return (
              <div 
                key={`${x}-${y}`} 
                className={`w-8 h-8 relative flex items-center justify-center text-[10px] transition-all duration-300
                  ${collision ? 'bg-red-500/20' : 'bg-transparent'}
                  ${portal ? 'bg-purple-500/30 shadow-[inset_0_0_10px_rgba(168,85,247,0.5)]' : ''}
                `}
              >
                {/* Collision Visual */}
                {collision && <div className="absolute inset-1 border border-red-500/40 rounded-sm"></div>}
                
                {/* Portal Visual */}
                {portal && (
                  <div className="absolute inset-0 animate-pulse bg-purple-500/20 flex items-center justify-center">
                    <span className="text-[8px] text-purple-300">P</span>
                  </div>
                )}

                {/* Avatar Rendering */}
                {avatarInTile && (
                  <div 
                    className={`z-10 w-6 h-6 rounded-full flex items-center justify-center font-bold text-black border-2 shadow-lg transform transition-transform hover:scale-110
                      ${avatarInTile.memberNo === selectedMemberNo 
                        ? 'bg-yellow-400 border-white animate-bounce shadow-yellow-400/50' 
                        : 'bg-cyan-400 border-cyan-200 shadow-cyan-400/30'}
                    `}
                    title={avatarInTile.name}
                  >
                    {avatarInTile.name.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-10 p-6 bg-[#111] border-2 border-zinc-800 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button 
            onClick={() => handleMove('UP')}
            className="w-16 h-16 bg-zinc-800 hover:bg-cyan-500 hover:text-black border-b-4 border-zinc-950 active:translate-y-1 active:border-b-0 rounded-xl transition-all flex items-center justify-center text-2xl"
          >
            ▲
          </button>
          <div></div>
          
          <button 
            onClick={() => handleMove('LEFT')}
            className="w-16 h-16 bg-zinc-800 hover:bg-cyan-500 hover:text-black border-b-4 border-zinc-950 active:translate-y-1 active:border-b-0 rounded-xl transition-all flex items-center justify-center text-2xl"
          >
            ◀
          </button>
          <button 
            onClick={() => handleMove('DOWN')}
            className="w-16 h-16 bg-zinc-800 hover:bg-cyan-500 hover:text-black border-b-4 border-zinc-950 active:translate-y-1 active:border-b-0 rounded-xl transition-all flex items-center justify-center text-2xl"
          >
            ▼
          </button>
          <button 
            onClick={() => handleMove('RIGHT')}
            className="w-16 h-16 bg-zinc-800 hover:bg-cyan-500 hover:text-black border-b-4 border-zinc-950 active:translate-y-1 active:border-b-0 rounded-xl transition-all flex items-center justify-center text-2xl"
          >
            ▶
          </button>
        </div>
        <p className="mt-4 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
          Manual Override Enabled
        </p>
      </div>
    </div>
  );
};

export default VirtualWorldRenderer;
