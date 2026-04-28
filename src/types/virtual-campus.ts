export type VirtualCampusPhaseStatus = 'active' | 'ready' | 'planned';
export type VirtualCampusMapKind = 'outdoor' | 'indoor' | 'special';
export type VirtualCampusAvatarDirection = 'down' | 'left' | 'right' | 'up';
export type VirtualCampusItemSlotKey = 'hat' | 'outfit' | 'tool' | 'badge';
export type VirtualCampusItemRarity = 'common' | 'uncommon' | 'rare' | 'epic';
export type VirtualCampusItemUnlockMode = 'starter' | 'quest' | 'shop' | 'hybrid';
export type VirtualCampusOxGateStatus = 'locked' | 'cleared';
export type VirtualCampusOxTrainingStatus = 'idle' | 'active' | 'cleared';
export type VirtualCampusOxCoopStatus = 'idle' | 'active' | 'cleared' | 'failed';

export interface VirtualCampusMapSummary {
  id: number;
  mapCode: string;
  title: string;
  description: string;
  mapKind: VirtualCampusMapKind;
  cameraMode: 'topdown' | 'isometric' | 'hybrid';
  widthTiles: number;
  heightTiles: number;
  backgroundTheme: string;
  sortOrder: number;
  isActive: boolean;
}

export interface VirtualCampusPortalSummary {
  id: number;
  sourceMapCode: string;
  targetMapCode: string;
  sourcePortalKey: string;
  targetPortalKey: string;
  label: string;
  transitionLabel: string;
  sourceX: number;
  sourceY: number;
  sourceWidthTiles: number;
  sourceHeightTiles: number;
  targetX: number;
  targetY: number;
  targetFacingDirection: VirtualCampusAvatarDirection;
  sortOrder: number;
  isActive: boolean;
}

export interface VirtualCampusCollisionZoneSummary {
  id: number;
  mapCode: string;
  zoneKey: string;
  label: string;
  zoneType: 'blocked';
  originX: number;
  originY: number;
  widthTiles: number;
  heightTiles: number;
  sortOrder: number;
  isActive: boolean;
}

export interface VirtualCampusAvatarSummary {
  id: number;
  memberNo: string;
  displayName: string;
  avatarCode: string;
  avatarName: string;
  archetype: string;
  level: number;
  expPoints: number;
  activeMapCode: string;
  positionX: number;
  positionY: number;
  facingDirection: VirtualCampusAvatarDirection;
  paletteColor: string;
  accentColor: string;
  sandboxPointBalance: number;
  equipment: {
    hat: VirtualCampusEquippedItemSummary | null;
    outfit: VirtualCampusEquippedItemSummary | null;
    tool: VirtualCampusEquippedItemSummary | null;
    badge: VirtualCampusEquippedItemSummary | null;
  };
  stats: {
    coding: number;
    creativity: number;
    focus: number;
    teamwork: number;
    mobility: number;
  };
}

export interface VirtualCampusEquippedItemSummary {
  itemCode: string;
  itemName: string;
  slotKey: VirtualCampusItemSlotKey;
  itemRarity: VirtualCampusItemRarity;
  description: string;
  paletteColor: string;
  accentColor: string;
  badgeLabel: string | null;
}

export interface VirtualCampusNpcSummary {
  id: number;
  npcCode: string;
  mapCode: string;
  name: string;
  roleLabel: string;
  description: string;
  dialogueTopic: string;
  positionX: number;
  positionY: number;
  facingDirection: VirtualCampusAvatarDirection;
  paletteColor: string;
  accentColor: string;
  isInteractive: boolean;
}

export interface VirtualCampusQuestSummary {
  id: number;
  questCode: string;
  giverNpcCode: string;
  title: string;
  summary: string;
  objectiveType: 'enter_map' | 'talk_npc';
  objectiveTarget: string;
  objectiveLabel: string;
  rewardPoints: number;
  rewardExp: number;
  rewardItemCode: string | null;
  rewardItemName: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface VirtualCampusAdminSnapshot {
  world: {
    id: number;
    worldCode: string;
    title: string;
    description: string;
    visibility: 'admin_private' | 'member_private' | 'public';
    rewardMode: 'sandbox' | 'live';
    defaultSpawnMapCode: string;
  };
  selectedMemberNo?: string;
  roomView: {
    currentMap: VirtualCampusMapSummary;
    avatars: VirtualCampusAvatarSummary[];
    portals: VirtualCampusPortalSummary[];
    collisionZones: VirtualCampusCollisionZoneSummary[];
    npcs: VirtualCampusNpcSummary[];
  };
  maps: VirtualCampusMapSummary[];
  portals: VirtualCampusPortalSummary[];
  collisionZones: VirtualCampusCollisionZoneSummary[];
  npcs: VirtualCampusNpcSummary[];
  avatars: VirtualCampusAvatarSummary[];
}
