import type { VirtualCampusCollisionZoneSummary } from '../types/virtual-campus';

// Campus Square Map Data — 40x32 grid (가로 40칸, 세로 32칸)
export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

// ─── COLLISION ZONES (40x32 그리드 정밀 타일 매핑) ───
export const campusSquareCollisionZones: VirtualCampusCollisionZoneSummary[] = [
  // ── MAP BOUNDARIES (맵 외곽 이탈 방지) ──
  { id: 9001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_top', label: '상단 외곽', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 40, heightTiles: 1, sortOrder: 90, isActive: true },
  { id: 9002, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_bottom', label: '하단 외곽', zoneType: 'blocked', originX: 0, originY: 31, widthTiles: 40, heightTiles: 1, sortOrder: 90, isActive: true },
  { id: 9003, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_left', label: '좌측 외곽', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 1, heightTiles: 32, sortOrder: 90, isActive: true },
  { id: 9004, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_right', label: '우측 외곽', zoneType: 'blocked', originX: 39, originY: 0, widthTiles: 1, heightTiles: 32, sortOrder: 90, isActive: true },

  // ── CORNER BLOCKS (4개의 모서리 물가/숲 영역 타일) ──
  { id: 1080, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_TL', label: '좌상단 숲', zoneType: 'blocked', originX: 1, originY: 1, widthTiles: 6, heightTiles: 5, sortOrder: 80, isActive: true },
  { id: 1081, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_TR', label: '우상단 숲', zoneType: 'blocked', originX: 33, originY: 1, widthTiles: 6, heightTiles: 5, sortOrder: 81, isActive: true },
  { id: 1082, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_BL', label: '좌하단 물가', zoneType: 'blocked', originX: 1, originY: 27, widthTiles: 6, heightTiles: 4, sortOrder: 82, isActive: true },
  { id: 1083, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_BR', label: '우하단 물가', zoneType: 'blocked', originX: 33, originY: 27, widthTiles: 6, heightTiles: 4, sortOrder: 83, isActive: true },

  // ── CENTRAL FOUNTAIN (정중앙 4x4 대칭 블록: X 18~21, Y 14~17) ──
  { id: 1001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_core', label: '중앙 분수대', zoneType: 'blocked', originX: 18, originY: 14, widthTiles: 4, heightTiles: 4, sortOrder: 1, isActive: true },

  // ── CODINGDONG (Top Center: X: 15~24, Y: 1~9) ──
  { id: 1010, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_main', label: '코딩동 건물', zoneType: 'blocked', originX: 15, originY: 1, widthTiles: 10, heightTiles: 9, sortOrder: 10, isActive: true },

  // ── SHOP (Top Left: X: 2~10, Y: 4~11) ──
  { id: 1020, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_main', label: '상점 건물', zoneType: 'blocked', originX: 2, originY: 4, widthTiles: 9, heightTiles: 8, sortOrder: 20, isActive: true },

  // ── OX QUIZ (Top Right: X: 29~37, Y: 4~11) ──
  { id: 1030, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_main', label: 'OX 퀴즈관 건물', zoneType: 'blocked', originX: 29, originY: 4, widthTiles: 9, heightTiles: 8, sortOrder: 30, isActive: true },

  // ── AVATAR HALL (Bottom Left: X: 2~10, Y: 20~27) ──
  { id: 1040, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_main', label: '아바타관 건물', zoneType: 'blocked', originX: 2, originY: 20, widthTiles: 9, heightTiles: 8, sortOrder: 40, isActive: true },

  // ── MISSION CENTER (Bottom Right: X: 29~37, Y: 20~27) ──
  { id: 1050, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_main', label: '미션센터 건물', zoneType: 'blocked', originX: 29, originY: 20, widthTiles: 9, heightTiles: 8, sortOrder: 50, isActive: true },

  // ── RANKING TOWER (Far Right Middle: X: 36~38, Y: 14~19) ──
  { id: 1060, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ranking_tower', label: '랭킹 타워', zoneType: 'blocked', originX: 36, originY: 14, widthTiles: 3, heightTiles: 6, sortOrder: 60, isActive: true },

  // ── GATE PILLARS (Bottom Center 양옆 기둥: X: 12~16, 23~27) ──
  { id: 1070, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_L', label: '정문 좌측 기둥', zoneType: 'blocked', originX: 12, originY: 28, widthTiles: 5, heightTiles: 4, sortOrder: 70, isActive: true },
  { id: 1071, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_R', label: '정문 우측 기둥', zoneType: 'blocked', originX: 23, originY: 28, widthTiles: 5, heightTiles: 4, sortOrder: 71, isActive: true },
];

// ─── PORTAL / DOOR POSITIONS ─────────────────────────────────────────────────
// 건물의 충돌 영역(Zone) 바로 앞(계단 끝)에 배치
export const campusSquarePortals = [
  // 코딩동 입구 (건물 하단 Y:9의 바로 아래 Y:10 타일 중앙)
  { id: 'door_codingdong', label: '코딩동', x: 19, y: 10, targetMapCode: 'CODINGDONG_LOBBY' },
  { id: 'door_codingdong_r', label: '코딩동', x: 20, y: 10, targetMapCode: 'CODINGDONG_LOBBY' },

  // 상점 입구
  { id: 'door_shop', label: '상점', x: 6, y: 12, targetMapCode: 'SHOP' },

  // OX 퀴즈관 입구
  { id: 'door_ox', label: 'OX 퀴즈관', x: 33, y: 12, targetMapCode: 'OX_QUIZ' },

  // 아바타관 입구
  { id: 'door_avatar', label: '아바타관', x: 6, y: 19, targetMapCode: 'AVATAR_HALL' },

  // 미션센터 입구
  { id: 'door_mission', label: '미션센터', x: 33, y: 19, targetMapCode: 'MISSION_CENTER' },

  // 랭킹 타워 입구
  { id: 'door_ranking', label: '랭킹 타워', x: 35, y: 17, targetMapCode: 'RANKING_TOWER' },

  // 캠퍼스 정문 (좌/우 기둥 사이의 중앙 통로)
  { id: 'door_gate', label: '캠퍼스 정문', x: 19, y: 31, targetMapCode: 'GATE_ENTRANCE' },
  { id: 'door_gate_r', label: '캠퍼스 정문', x: 20, y: 31, targetMapCode: 'GATE_ENTRANCE' },
];