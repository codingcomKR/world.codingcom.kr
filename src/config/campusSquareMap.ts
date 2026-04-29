import type { VirtualCampusCollisionZoneSummary } from '../types/virtual-campus';

// Campus Square Map Data — 28x28 grid
// Derived from visual analysis of public/assets/map_bg.png
export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

export const campusSquareCollisionZones: VirtualCampusCollisionZoneSummary[] = [
  // ── CENTRAL FOUNTAIN (Cross shape to hug the circular boundary) ──
  { id: 1001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_core', label: '중앙 분수대', zoneType: 'blocked', originX: 12, originY: 12, widthTiles: 4, heightTiles: 4, sortOrder: 1, isActive: true },
  { id: 1002, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_wing', label: '중앙 분수대 날개', zoneType: 'blocked', originX: 11, originY: 13, widthTiles: 6, heightTiles: 2, sortOrder: 2, isActive: true },

  // ── CODINGDONG (Top Center) ──
  { id: 1010, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_main', label: '코딩동 중앙', zoneType: 'blocked', originX: 11, originY: 0, widthTiles: 6, heightTiles: 5, sortOrder: 10, isActive: true },
  { id: 1011, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_L',   label: '코딩동 좌',   zoneType: 'blocked', originX: 7, originY: 0, widthTiles: 4, heightTiles: 6, sortOrder: 11, isActive: true },
  { id: 1012, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_R',   label: '코딩동 우',   zoneType: 'blocked', originX: 17, originY: 0, widthTiles: 4, heightTiles: 6, sortOrder: 12, isActive: true },

  // ── SHOP (Top Left) ──
  { id: 1020, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_main', label: '상점 메인', zoneType: 'blocked', originX: 1, originY: 2, widthTiles: 7, heightTiles: 5, sortOrder: 20, isActive: true },
  { id: 1021, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_L',    label: '상점 좌', zoneType: 'blocked', originX: 0, originY: 2, widthTiles: 1, heightTiles: 8, sortOrder: 21, isActive: true },
  { id: 1022, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_R',    label: '상점 우', zoneType: 'blocked', originX: 6, originY: 7, widthTiles: 2, heightTiles: 2, sortOrder: 22, isActive: true },

  // ── OX QUIZ (Top Right) ──
  { id: 1030, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_main', label: 'OX 메인', zoneType: 'blocked', originX: 20, originY: 3, widthTiles: 7, heightTiles: 4, sortOrder: 30, isActive: true },
  { id: 1031, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_R',    label: 'OX 우', zoneType: 'blocked', originX: 23, originY: 7, widthTiles: 4, heightTiles: 3, sortOrder: 31, isActive: true },
  { id: 1032, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_L',    label: 'OX 좌', zoneType: 'blocked', originX: 19, originY: 3, widthTiles: 1, heightTiles: 5, sortOrder: 32, isActive: true },

  // ── AVATAR HALL (Bottom Left) ──
  { id: 1040, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_main', label: '아바타 메인', zoneType: 'blocked', originX: 1, originY: 14, widthTiles: 7, heightTiles: 5, sortOrder: 40, isActive: true },
  { id: 1041, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_L',    label: '아바타 좌', zoneType: 'blocked', originX: 0, originY: 14, widthTiles: 1, heightTiles: 8, sortOrder: 41, isActive: true },
  { id: 1042, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_R',    label: '아바타 우', zoneType: 'blocked', originX: 6, originY: 19, widthTiles: 2, heightTiles: 3, sortOrder: 42, isActive: true },

  // ── MISSION CENTER (Bottom Right) ──
  { id: 1050, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_main', label: '미션 메인', zoneType: 'blocked', originX: 20, originY: 15, widthTiles: 7, heightTiles: 4, sortOrder: 50, isActive: true },
  { id: 1051, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_R',    label: '미션 우', zoneType: 'blocked', originX: 22, originY: 19, widthTiles: 5, heightTiles: 3, sortOrder: 51, isActive: true },
  { id: 1052, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_L',    label: '미션 좌', zoneType: 'blocked', originX: 19, originY: 16, widthTiles: 2, heightTiles: 4, sortOrder: 52, isActive: true },

  // ── RANKING TOWER (Far Right) ──
  { id: 1060, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ranking_tower', label: '랭킹 타워', zoneType: 'blocked', originX: 25, originY: 9, widthTiles: 3, heightTiles: 5, sortOrder: 60, isActive: true },

  // ── GATE (Bottom Center Pillars) ──
  { id: 1070, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_L', label: '정문 좌', zoneType: 'blocked', originX: 10, originY: 21, widthTiles: 3, heightTiles: 4, sortOrder: 70, isActive: true },
  { id: 1071, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_R', label: '정문 우', zoneType: 'blocked', originX: 15, originY: 21, widthTiles: 3, heightTiles: 4, sortOrder: 71, isActive: true },

  // ── TREES & CORNERS ──
  { id: 1080, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TL1', label: '나무 좌상1', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 4, heightTiles: 2, sortOrder: 80, isActive: true },
  { id: 1081, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TL2', label: '나무 좌상2', zoneType: 'blocked', originX: 0, originY: 2, widthTiles: 2, heightTiles: 2, sortOrder: 81, isActive: true },
  { id: 1082, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TR1', label: '나무 우상1', zoneType: 'blocked', originX: 24, originY: 0, widthTiles: 4, heightTiles: 2, sortOrder: 82, isActive: true },
  { id: 1083, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TR2', label: '나무 우상2', zoneType: 'blocked', originX: 26, originY: 2, widthTiles: 2, heightTiles: 2, sortOrder: 83, isActive: true },
  { id: 1084, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BL1', label: '나무 좌하1', zoneType: 'blocked', originX: 0, originY: 25, widthTiles: 6, heightTiles: 3, sortOrder: 84, isActive: true },
  { id: 1085, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BL2', label: '나무 좌하2', zoneType: 'blocked', originX: 0, originY: 23, widthTiles: 3, heightTiles: 2, sortOrder: 85, isActive: true },
  { id: 1086, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BR1', label: '나무 우하1', zoneType: 'blocked', originX: 22, originY: 25, widthTiles: 6, heightTiles: 3, sortOrder: 86, isActive: true },
  { id: 1087, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BR2', label: '나무 우하2', zoneType: 'blocked', originX: 25, originY: 23, widthTiles: 3, heightTiles: 2, sortOrder: 87, isActive: true },
];

// ─── PORTAL / DOOR POSITIONS ─────────────────────────────────────────────────
// Format: { id, label, x, y, targetMapCode }
export const campusSquarePortals = [
  // 코딩동 입구 (계단 아래)
  { id: 'door_codingdong', label: '코딩동', x: 14, y: 8, targetMapCode: 'CODINGDONG_LOBBY' },

  // 상점 입구
  { id: 'door_shop', label: '상점', x: 5, y: 8, targetMapCode: 'SHOP' },

  // OX 퀴즈관 입구
  { id: 'door_ox', label: 'OX 퀴즈관', x: 21, y: 8, targetMapCode: 'OX_QUIZ' },

  // 아바타관 입구
  { id: 'door_avatar', label: '아바타관', x: 5, y: 20, targetMapCode: 'AVATAR_HALL' },

  // 미션센터 입구
  { id: 'door_mission', label: '미션센터', x: 21, y: 20, targetMapCode: 'MISSION_CENTER' },

  // 랭킹 타워 입구
  { id: 'door_ranking', label: '랭킹 타워', x: 25, y: 13, targetMapCode: 'RANKING_TOWER' },

  // 캠퍼스 정문 (입구 중앙)
  { id: 'door_gate', label: '캠퍼스 정문', x: 14, y: 23, targetMapCode: 'GATE_ENTRANCE' },
];

// ─── WALKABLE PATHS (for reference) ─────────────────────────────────────────
// Main paths:
//  - Top corridor: x=12~16, y=6~10
//  - Left corridor: x=8~11, y=8~20
//  - Right corridor: x=17~20, y=8~20
//  - Bottom corridor: x=12~16, y=18~25
//  - Circle around fountain: x=9~18, y=9~18 (minus fountain center)
