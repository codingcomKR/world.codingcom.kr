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

  // Sync with initial data
  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/virtual-campus');
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error('Data refresh error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const performAction = useCallback(async (payload: VirtualCampusActionPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/virtual-campus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await res.json();
      
      if (!result.ok) {
        setError(result.error || 'Action failed');
      }
      return result;
    } catch (err: any) {
      console.error('Action error:', err);
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  const moveAvatar = useCallback(async (
    direction: VirtualCampusAvatarDirection,
    currentX: number,
    currentY: number,
    mapCode: string,
    memberNo: string
  ) => {
    // Close dialogue when moving
    setDialogue(null);

    let nextX = currentX;
    let nextY = currentY;

    switch (direction) {
      case 'up': nextY--; break;
      case 'down': nextY++; break;
      case 'left': nextX--; break;
      case 'right': nextX++; break;
    }

    // Optimistic update with proper immutability
    setData(prev => {
      if (!prev) return prev;
      const isMyAvatar = (a: any) => a.memberNo === memberNo;
      const updatedAvatars = prev.roomView.avatars.map(avatar => 
        isMyAvatar(avatar) 
          ? { ...avatar, positionX: nextX, positionY: nextY, facingDirection: direction }
          : avatar
      );

      // Safely update memberView only if avatar exists
      const updatedMemberView = prev.memberView.avatar ? {
        ...prev.memberView,
        avatar: {
          ...prev.memberView.avatar,
          positionX: nextX,
          positionY: nextY,
          facingDirection: direction
        }
      } : prev.memberView;

      return {
        ...prev,
        memberView: updatedMemberView,
        roomView: { ...prev.roomView, avatars: updatedAvatars }
      } as VirtualCampusAdminSnapshot;
    });

    const result = await performAction({
      action: 'move_avatar',
      memberNo,
      mapCode: targetMapCode,
      positionX: nextX,
      positionY: nextY,
      facingDirection: direction,
      scope: 'room'
    });

    // If map changed, we MUST refresh the full state
    if (result.ok && targetMapCode !== mapCode) {
      setData(result);
    }

    return result;
  }, [data, performAction]);

  const talkToNpc = useCallback(async (npcCode: string, memberNo: string) => {
    const result = await performAction({
      action: 'talk_npc',
      memberNo,
      npcCode,
      scope: 'room'
    });

    if (result.ok && result.dialogue) {
      setDialogue(result.dialogue);
      // Dialogue might change quest status or stats, so refresh data
      setData(result);
    } else if (result.ok && !result.dialogue) {
      setError('이 NPC는 현재 할 말이 없는 것 같습니다.');
      setDialogue(null);
    }
    
    return result;
  }, [performAction]);

  return {
    data,
    dialogue,
    loading,
    error,
    moveAvatar,
    talkToNpc,
    setDialogue,
    performAction,
    refreshData
  };
}
