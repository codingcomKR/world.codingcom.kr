// Campus Square Map Data — 28x28 grid
// Derived from visual analysis of public/assets/map_bg.png
// (0,0) = top-left, (27,27) = bottom-right
// Image: 3548x1774 → tileW ≈ 126.7px, tileH ≈ 63.4px

export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

// ─── COLLISION ZONES (buildings, trees, fountain, fences) ───────────────────
// Format: { id, label, originX, originY, widthTiles, heightTiles }
export const campusSquareCollisionZones = [

  // ── CENTRAL FOUNTAIN (rows 10-17, cols 10-17) ──
  { id: 'fountain', label: '중앙 분수대', originX: 11, originY: 10, widthTiles: 6, heightTiles: 5 },

  // ── 코딩동 (top-center) ──
  { id: 'codingdong', label: '코딩동', originX: 9, originY: 0, widthTiles: 10, heightTiles: 6 },

  // ── 상점 (top-left) ──
  { id: 'shop', label: '상점', originX: 0, originY: 2, widthTiles: 8, heightTiles: 7 },

  // ── OX 퀴즈관 (top-right) ──
  { id: 'ox_quiz', label: 'OX 생존퀴즈관', originX: 20, originY: 2, widthTiles: 8, heightTiles: 7 },

  // ── 아바타관 (bottom-left) ──
  { id: 'avatar_hall', label: '아바타관', originX: 0, originY: 14, widthTiles: 8, heightTiles: 8 },

  // ── 미션센터 (bottom-right) ──
  { id: 'mission_center', label: '미션센터', originX: 20, originY: 14, widthTiles: 8, heightTiles: 8 },

  // ── 랭킹 타워 (far right) ──
  { id: 'ranking_tower', label: '랭킹 타워', originX: 24, originY: 8, widthTiles: 4, heightTiles: 6 },

  // ── 캠퍼스 정문 구조물 ──
  { id: 'gate_left_pillar',  label: '정문 기둥', originX: 10, originY: 25, widthTiles: 2, heightTiles: 3 },
  { id: 'gate_right_pillar', label: '정문 기둥', originX: 16, originY: 25, widthTiles: 2, heightTiles: 3 },

  // ── 나무/울타리 (corners) ──
  { id: 'trees_topleft',     label: '나무', originX: 0,  originY: 0,  widthTiles: 3, heightTiles: 3 },
  { id: 'trees_topright',    label: '나무', originX: 25, originY: 0,  widthTiles: 3, heightTiles: 3 },
  { id: 'trees_bottomleft',  label: '나무', originX: 0,  originY: 24, widthTiles: 3, heightTiles: 4 },
  { id: 'trees_bottomright', label: '나무', originX: 25, originY: 24, widthTiles: 3, heightTiles: 4 },
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
