import type { VirtualCampusCollisionZoneSummary } from '../types/virtual-campus';

// Campus Square Map Data — 28x28 grid
// Derived from visual analysis of public/assets/map_bg.png
export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

export const campusSquareCollisionZones: VirtualCampusCollisionZoneSummary[] = [
  // ── CENTRAL FOUNTAIN (Cross shape to hug the circular boundary) ──
  { id: 1001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_v', label: '중앙 분수대 세로', zoneType: 'blocked', originX: 13, originY: 12, widthTiles: 2, heightTiles: 4, sortOrder: 1, isActive: true },
  { id: 1002, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_h', label: '중앙 분수대 가로', zoneType: 'blocked', originX: 12, originY: 13, widthTiles: 4, heightTiles: 2, sortOrder: 2, isActive: true },

  // ── CODINGDONG (Top Center - Stair-stepped) ──
  { id: 1010, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_main', label: '코딩동 중앙', zoneType: 'blocked', originX: 12, originY: 0, widthTiles: 4, heightTiles: 5, sortOrder: 10, isActive: true },
  { id: 1011, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_L1',   label: '코딩동 좌1',   zoneType: 'blocked', originX: 10, originY: 3, widthTiles: 2, heightTiles: 4, sortOrder: 11, isActive: true },
  { id: 1012, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_L2',   label: '코딩동 좌2',   zoneType: 'blocked', originX: 8,  originY: 5, widthTiles: 2, heightTiles: 4, sortOrder: 12, isActive: true },
  { id: 1013, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_R1',   label: '코딩동 우1',   zoneType: 'blocked', originX: 16, originY: 3, widthTiles: 2, heightTiles: 4, sortOrder: 13, isActive: true },
  { id: 1014, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_R2',   label: '코딩동 우2',   zoneType: 'blocked', originX: 18, originY: 5, widthTiles: 2, heightTiles: 4, sortOrder: 14, isActive: true },

  // ── SHOP (Top Left - Stair-stepped) ──
  { id: 1020, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_top',    label: '상점 상', zoneType: 'blocked', originX: 0, originY: 2, widthTiles: 4, heightTiles: 4, sortOrder: 20, isActive: true },
  { id: 1021, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_mid',    label: '상점 중', zoneType: 'blocked', originX: 2, originY: 4, widthTiles: 4, heightTiles: 4, sortOrder: 21, isActive: true },
  { id: 1022, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_bot',    label: '상점 하', zoneType: 'blocked', originX: 4, originY: 6, widthTiles: 4, heightTiles: 4, sortOrder: 22, isActive: true },
  { id: 1023, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_edge',   label: '상점 끝', zoneType: 'blocked', originX: 0, originY: 6, widthTiles: 3, heightTiles: 4, sortOrder: 23, isActive: true },

  // ── OX QUIZ (Top Right - Stair-stepped) ──
  { id: 1030, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_top',      label: 'OX 상', zoneType: 'blocked', originX: 24, originY: 2, widthTiles: 4, heightTiles: 4, sortOrder: 30, isActive: true },
  { id: 1031, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_mid',      label: 'OX 중', zoneType: 'blocked', originX: 22, originY: 4, widthTiles: 4, heightTiles: 4, sortOrder: 31, isActive: true },
  { id: 1032, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_bot',      label: 'OX 하', zoneType: 'blocked', originX: 20, originY: 6, widthTiles: 4, heightTiles: 4, sortOrder: 32, isActive: true },
  { id: 1033, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_edge',     label: 'OX 끝', zoneType: 'blocked', originX: 25, originY: 6, widthTiles: 3, heightTiles: 4, sortOrder: 33, isActive: true },

  // ── AVATAR HALL (Bottom Left - Stair-stepped) ──
  { id: 1040, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_top',  label: '아바타 상', zoneType: 'blocked', originX: 4, originY: 17, widthTiles: 4, heightTiles: 4, sortOrder: 40, isActive: true },
  { id: 1041, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_mid',  label: '아바타 중', zoneType: 'blocked', originX: 2, originY: 19, widthTiles: 4, heightTiles: 4, sortOrder: 41, isActive: true },
  { id: 1042, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_bot',  label: '아바타 하', zoneType: 'blocked', originX: 0, originY: 21, widthTiles: 4, heightTiles: 4, sortOrder: 42, isActive: true },
  { id: 1043, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_edge', label: '아바타 끝', zoneType: 'blocked', originX: 0, originY: 17, widthTiles: 3, heightTiles: 4, sortOrder: 43, isActive: true },

  // ── MISSION CENTER (Bottom Right - Stair-stepped) ──
  { id: 1050, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_top', label: '미션 상', zoneType: 'blocked', originX: 20, originY: 17, widthTiles: 4, heightTiles: 4, sortOrder: 50, isActive: true },
  { id: 1051, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_mid', label: '미션 중', zoneType: 'blocked', originX: 22, originY: 19, widthTiles: 4, heightTiles: 4, sortOrder: 51, isActive: true },
  { id: 1052, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_bot', label: '미션 하', zoneType: 'blocked', originX: 24, originY: 21, widthTiles: 4, heightTiles: 4, sortOrder: 52, isActive: true },
  { id: 1053, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_edge',label: '미션 끝', zoneType: 'blocked', originX: 25, originY: 17, widthTiles: 3, heightTiles: 4, sortOrder: 53, isActive: true },

  // ── RANKING TOWER (Far Right) ──
  { id: 1060, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ranking_tower', label: '랭킹 타워', zoneType: 'blocked', originX: 25, originY: 9, widthTiles: 3, heightTiles: 5, sortOrder: 60, isActive: true },

  // ── GATE (Bottom Center Pillars) ──
  { id: 1070, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_L', label: '정문 좌', zoneType: 'blocked', originX: 11, originY: 24, widthTiles: 2, heightTiles: 4, sortOrder: 70, isActive: true },
  { id: 1071, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_R', label: '정문 우', zoneType: 'blocked', originX: 15, originY: 24, widthTiles: 2, heightTiles: 4, sortOrder: 71, isActive: true },

  // ── TREES & CORNERS (Stair-stepped edges) ──
  { id: 1080, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TL1', label: '나무 좌상1', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 6, heightTiles: 2, sortOrder: 80, isActive: true },
  { id: 1081, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TL2', label: '나무 좌상2', zoneType: 'blocked', originX: 0, originY: 2, widthTiles: 3, heightTiles: 2, sortOrder: 81, isActive: true },
  { id: 1082, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TR1', label: '나무 우상1', zoneType: 'blocked', originX: 22, originY: 0, widthTiles: 6, heightTiles: 2, sortOrder: 82, isActive: true },
  { id: 1083, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_TR2', label: '나무 우상2', zoneType: 'blocked', originX: 25, originY: 2, widthTiles: 3, heightTiles: 2, sortOrder: 83, isActive: true },
  { id: 1084, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BL1', label: '나무 좌하1', zoneType: 'blocked', originX: 0, originY: 25, widthTiles: 6, heightTiles: 3, sortOrder: 84, isActive: true },
  { id: 1085, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BL2', label: '나무 좌하2', zoneType: 'blocked', originX: 0, originY: 23, widthTiles: 4, heightTiles: 2, sortOrder: 85, isActive: true },
  { id: 1086, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BR1', label: '나무 우하1', zoneType: 'blocked', originX: 22, originY: 25, widthTiles: 6, heightTiles: 3, sortOrder: 86, isActive: true },
  { id: 1087, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'tree_BR2', label: '나무 우하2', zoneType: 'blocked', originX: 24, originY: 23, widthTiles: 4, heightTiles: 2, sortOrder: 87, isActive: true },
];

// ─── PORTAL / DOOR POSITIONS ─────────────────────────────────────────────────
// Format: { id, label, x, y, targetMapCode }
export const campusSquarePortals = [
  // 코딩동 입구 (top-center)
  { id: 'door_codingdong', label: '코딩동', x: 14, y: 6, targetMapCode: 'CODINGDONG_LOBBY' },

  // 상점 입구 (left side)
  { id: 'door_shop', label: '상점', x: 7, y: 7, targetMapCode: 'SHOP' },

  // OX 퀴즈관 입구 (right side)
  { id: 'door_ox', label: 'OX 퀴즈관', x: 20, y: 7, targetMapCode: 'OX_QUIZ' },

  // 아바타관 입구 (left-bottom)
  { id: 'door_avatar', label: '아바타관', x: 7, y: 18, targetMapCode: 'AVATAR_HALL' },

  // 미션센터 입구 (right-bottom)
  { id: 'door_mission', label: '미션센터', x: 20, y: 18, targetMapCode: 'MISSION_CENTER' },

  // 랭킹 타워 입구
  { id: 'door_ranking', label: '랭킹 타워', x: 24, y: 13, targetMapCode: 'RANKING_TOWER' },

  // 캠퍼스 정문 (bottom exit)
  { id: 'door_gate', label: '캠퍼스 정문', x: 14, y: 25, targetMapCode: 'GATE_ENTRANCE' },
];

// ─── WALKABLE PATHS (for reference) ─────────────────────────────────────────
// Main paths:
//  - Top corridor: x=12~16, y=6~10
//  - Left corridor: x=8~11, y=8~20
//  - Right corridor: x=17~20, y=8~20
//  - Bottom corridor: x=12~16, y=18~25
//  - Circle around fountain: x=9~18, y=9~18 (minus fountain center)
