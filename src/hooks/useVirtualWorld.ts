import { useState, useCallback, useEffect } from 'react';
import type { 
  VirtualCampusAdminSnapshot, 
  VirtualCampusActionPayload,
  VirtualCampusAvatarDirection
} from '../types/virtual-campus';

export function useVirtualWorld(initialData: VirtualCampusAdminSnapshot | null) {
  const [data, setData] = useState<VirtualCampusAdminSnapshot | null>(initialData);
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
      
      if (result.ok) {
        // Refresh data after successful action to sync state
        await refreshData();
      } else {
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
    let nextX = currentX;
    let nextY = currentY;

    switch (direction) {
      case 'up': nextY--; break;
      case 'down': nextY++; break;
      case 'left': nextX--; break;
      case 'right': nextX++; break;
    }

    // Optimistic Update (Optional, but good for responsiveness)
    if (data) {
      const updatedAvatars = data.roomView.avatars.map(avatar => 
        avatar.memberNo === memberNo 
          ? { ...avatar, positionX: nextX, positionY: nextY, facingDirection: direction }
          : avatar
      );
      setData({
        ...data,
        roomView: { ...data.roomView, avatars: updatedAvatars }
      });
    }

    return performAction({
      action: 'move_avatar',
      memberNo,
      mapCode,
      positionX: nextX,
      positionY: nextY,
      facingDirection: direction,
      scope: 'room'
    });
  }, [data, performAction]);

  const talkToNpc = useCallback(async (npcCode: string, memberNo: string) => {
    return performAction({
      action: 'talk_npc',
      memberNo,
      npcCode,
      scope: 'room'
    });
  }, [performAction]);

  return {
    data,
    loading,
    error,
    moveAvatar,
    talkToNpc,
    performAction,
    refreshData
  };
}
