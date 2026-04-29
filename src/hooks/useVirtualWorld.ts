import { useState, useCallback, useEffect } from 'react';
import type { 
  VirtualCampusAdminSnapshot, 
  VirtualCampusActionPayload,
  VirtualCampusAvatarDirection,
  VirtualCampusNpcDialoguePayload
} from '../types/virtual-campus';

export function useVirtualWorld(initialData: VirtualCampusAdminSnapshot | null) {
  const [data, setData] = useState<VirtualCampusAdminSnapshot | null>(initialData);
  const [dialogue, setDialogue] = useState<VirtualCampusNpcDialoguePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/virtual-campus');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Refresh error:', err);
    }
  }, []);

  const performAction = useCallback(async (payload: VirtualCampusActionPayload) => {
    try {
      const res = await fetch('/api/virtual-campus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { ok: false, error: err.message };
    }
  }, []);

  const moveAvatar = useCallback(async (
    direction: VirtualCampusAvatarDirection,
    currentX: number,
    currentY: number,
    mapCode: string,
    memberNo: string,
    targetX?: number,
    targetY?: number
  ) => {
    setDialogue(null);

    let nextX = targetX !== undefined ? targetX : currentX;
    let nextY = targetY !== undefined ? targetY : currentY;

    if (targetX === undefined) {
      switch (direction) {
        case 'up': nextY--; break;
        case 'down': nextY++; break;
        case 'left': nextX--; break;
        case 'right': nextX++; break;
      }
    }

    const isMapTransition = data && mapCode !== data.roomView.mapCode;

    // 1. Optimistic Update (Immediate move)
    setData(prev => {
      if (!prev) return prev;
      const updatedAvatars = prev.roomView.avatars.map(avatar => 
        avatar.memberNo === memberNo 
          ? { ...avatar, positionX: nextX, positionY: nextY, facingDirection: direction }
          : avatar
      );
      return {
        ...prev,
        roomView: { ...prev.roomView, avatars: updatedAvatars },
        memberView: {
          ...prev.memberView,
          avatar: prev.memberView.avatar ? { ...prev.memberView.avatar, positionX: nextX, positionY: nextY, facingDirection: direction } : prev.memberView.avatar
        }
      };
    });

    // 2. Perform Action
    const result = await performAction({
      action: 'move_avatar',
      memberNo,
      mapCode,
      positionX: nextX,
      positionY: nextY,
      facingDirection: direction,
      scope: 'room'
    });

    // 3. Handle Result (Only update full state if map changed or error occurred)
    if (result.ok) {
      if (isMapTransition || (result.roomView && result.roomView.mapCode !== mapCode)) {
        setData(result);
      }
      // If same map, we ALREADY updated optimistically, so we DON'T update again to avoid jitter
    } else {
      // Revert if failed
      refreshData();
    }

    return result;
  }, [data, performAction, refreshData]);

  const talkToNpc = useCallback(async (npcCode: string, memberNo: string) => {
    const result = await performAction({
      action: 'talk_npc',
      memberNo,
      npcCode,
      scope: 'room'
    });
    if (result.ok && result.dialogue) {
      setDialogue(result.dialogue);
      setData(result);
    }
    return result;
  }, [performAction]);

  return {
    data, dialogue, loading, error, moveAvatar, talkToNpc, setDialogue, performAction, refreshData
  };
}
