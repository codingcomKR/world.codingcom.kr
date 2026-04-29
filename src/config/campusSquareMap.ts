import type { VirtualCampusCollisionZoneSummary } from '../types/virtual-campus';

// Campus Square Map Data — 28x28 grid
// Derived from visual analysis of public/assets/map_bg.png
export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

export const campusSquareCollisionZones: VirtualCampusCollisionZoneSummary[] = [
  // ── CENTRAL FOUNTAIN (Shrunk to allow walking around it freely) ──
  { id: 1001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain',          label: '중앙 분수대',    zoneType: 'blocked', originX: 12, originY: 11, widthTiles: 4, heightTiles: 3, sortOrder: 1, isActive: true },
  
  // ── 건물의 블록 영역 축소 (길을 더 넓게 쓰도록 위로/옆으로 바짝 붙임) ──
  { id: 1002, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong',        label: '코딩동',        zoneType: 'blocked', originX: 10,  originY: 0,  widthTiles: 8, heightTiles: 5, sortOrder: 2, isActive: true },
  { id: 1003, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop',              label: '상점',          zoneType: 'blocked', originX: 0,  originY: 0,  widthTiles: 7,  heightTiles: 6, sortOrder: 3, isActive: true },
  { id: 1004, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_quiz',           label: 'OX 생존퀴즈관', zoneType: 'blocked', originX: 21, originY: 0,  widthTiles: 7,  heightTiles: 6, sortOrder: 4, isActive: true },
  { id: 1005, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_hall',       label: '아바타관',      zoneType: 'blocked', originX: 0,  originY: 15, widthTiles: 7,  heightTiles: 7, sortOrder: 5, isActive: true },
  { id: 1006, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_center',    label: '미션센터',      zoneType: 'blocked', originX: 21, originY: 15, widthTiles: 7,  heightTiles: 7, sortOrder: 6, isActive: true },
  { id: 1007, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ranking_tower',     label: '랭킹 타워',     zoneType: 'blocked', originX: 25, originY: 8,  widthTiles: 3,  heightTiles: 6, sortOrder: 7, isActive: true },
  
  // ── 정문 기둥 ──
  { id: 1008, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_left_pillar',  label: '정문 기둥',     zoneType: 'blocked', originX: 10, originY: 26, widthTiles: 2,  heightTiles: 2, sortOrder: 8, isActive: true },
  { id: 1009, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_right_pillar', label: '정문 기둥',     zoneType: 'blocked', originX: 16, originY: 26, widthTiles: 2,  heightTiles: 2, sortOrder: 9, isActive: true },
  
  // ── 나무 (코너) - 더 바깥쪽으로 밀어냄 ──
  { id: 1010, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'trees_topleft',     label: '나무',          zoneType: 'blocked', originX: 0,  originY: 0,  widthTiles: 2,  heightTiles: 2, sortOrder: 10, isActive: true },
  { id: 1011, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'trees_topright',    label: '나무',          zoneType: 'blocked', originX: 26, originY: 0,  widthTiles: 2,  heightTiles: 2, sortOrder: 11, isActive: true },
  { id: 1012, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'trees_bottomleft',  label: '나무',          zoneType: 'blocked', originX: 0,  originY: 25, widthTiles: 2,  heightTiles: 3, sortOrder: 12, isActive: true },
  { id: 1013, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'trees_bottomright', label: '나무',          zoneType: 'blocked', originX: 26, originY: 25, widthTiles: 2,  heightTiles: 3, sortOrder: 13, isActive: true },
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
