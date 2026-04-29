import type { VirtualCampusCollisionZoneSummary } from '../types/virtual-campus';
// 필요한 경우 아래 주석을 풀고 mapConfig에서 값을 가져와 사용할 수 있습니다.
// import { MAP_IMAGE_W, MAP_IMAGE_H, getTileSize } from './mapConfig';

export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

// ─── COLLISION ZONES (28x28 그리드 정밀 타일 매핑) ───
// 3548x1774 비율을 28x28로 나누었을 때의 시각적 위치에 맞춤
export const campusSquareCollisionZones: VirtualCampusCollisionZoneSummary[] = [
  // ── MAP BOUNDARIES (맵 외곽 이탈 방지) ──
  { id: 9001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_top', label: '상단 외곽', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 28, heightTiles: 1, sortOrder: 90, isActive: true },
  { id: 9002, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_bottom', label: '하단 외곽', zoneType: 'blocked', originX: 0, originY: 27, widthTiles: 28, heightTiles: 1, sortOrder: 90, isActive: true },
  { id: 9003, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_left', label: '좌측 외곽', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 1, heightTiles: 28, sortOrder: 90, isActive: true },
  { id: 9004, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_right', label: '우측 외곽', zoneType: 'blocked', originX: 27, originY: 0, widthTiles: 1, heightTiles: 28, sortOrder: 90, isActive: true },

  // ── CORNER BLOCKS (4개의 모서리 물가/숲 영역 타일) ──
  { id: 1080, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_TL', label: '좌상단 숲', zoneType: 'blocked', originX: 1, originY: 1, widthTiles: 4, heightTiles: 4, sortOrder: 80, isActive: true },
  { id: 1081, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_TR', label: '우상단 숲', zoneType: 'blocked', originX: 24, originY: 1, widthTiles: 3, heightTiles: 4, sortOrder: 81, isActive: true },
  { id: 1082, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_BL', label: '좌하단 물가', zoneType: 'blocked', originX: 1, originY: 24, widthTiles: 4, heightTiles: 3, sortOrder: 82, isActive: true },
  { id: 1083, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_BR', label: '우하단 물가', zoneType: 'blocked', originX: 24, originY: 24, widthTiles: 3, heightTiles: 3, sortOrder: 83, isActive: true },

  // ── CENTRAL FOUNTAIN (정중앙 4x4 대칭 블록) ──
  { id: 1001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_core', label: '중앙 분수대', zoneType: 'blocked', originX: 12, originY: 12, widthTiles: 4, heightTiles: 4, sortOrder: 1, isActive: true },

  // ── CODINGDONG (Top Center: X: 10~17, Y: 1~7) ──
  { id: 1010, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_main', label: '코딩동 건물', zoneType: 'blocked', originX: 10, originY: 1, widthTiles: 8, heightTiles: 7, sortOrder: 10, isActive: true },

  // ── SHOP (Top Left: X: 1~7, Y: 3~8) ──
  { id: 1020, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_main', label: '상점 건물', zoneType: 'blocked', originX: 1, originY: 3, widthTiles: 7, heightTiles: 6, sortOrder: 20, isActive: true },

  // ── OX QUIZ (Top Right: X: 20~26, Y: 3~8) ──
  { id: 1030, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_main', label: 'OX 퀴즈관 건물', zoneType: 'blocked', originX: 20, originY: 3, widthTiles: 7, heightTiles: 6, sortOrder: 30, isActive: true },

  // ── AVATAR HALL (Bottom Left: X: 1~7, Y: 18~23) ──
  { id: 1040, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_main', label: '아바타관 건물', zoneType: 'blocked', originX: 1, originY: 18, widthTiles: 7, heightTiles: 6, sortOrder: 40, isActive: true },

  // ── MISSION CENTER (Bottom Right: X: 20~26, Y: 18~23) ──
  { id: 1050, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_main', label: '미션센터 건물', zoneType: 'blocked', originX: 20, originY: 18, widthTiles: 7, heightTiles: 6, sortOrder: 50, isActive: true },

  // ── RANKING TOWER (Far Right Middle: X: 26~27, Y: 11~15) ──
  { id: 1060, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ranking_tower', label: '랭킹 타워', zoneType: 'blocked', originX: 26, originY: 11, widthTiles: 2, heightTiles: 5, sortOrder: 60, isActive: true },

  // ── GATE PILLARS (Bottom Center 양옆 구조물: X: 9~11, 16~18) ──
  { id: 1070, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_L', label: '정문 좌측 기둥', zoneType: 'blocked', originX: 9, originY: 25, widthTiles: 3, heightTiles: 2, sortOrder: 70, isActive: true },
  { id: 1071, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_R', label: '정문 우측 기둥', zoneType: 'blocked', originX: 16, originY: 25, widthTiles: 3, heightTiles: 2, sortOrder: 71, isActive: true },
];

// ─── PORTAL / DOOR POSITIONS ─────────────────────────────────────────────────
export const campusSquarePortals = [
  // 코딩동 입구 (건물 바로 아래 빈 공간)
  { id: 'door_codingdong', label: '코딩동', x: 13, y: 8, targetMapCode: 'CODINGDONG_LOBBY' },
  { id: 'door_codingdong_r', label: '코딩동', x: 14, y: 8, targetMapCode: 'CODINGDONG_LOBBY' },

  // 상점 입구
  { id: 'door_shop', label: '상점', x: 4, y: 9, targetMapCode: 'SHOP' },

  // OX 퀴즈관 입구
  { id: 'door_ox', label: 'OX 퀴즈관', x: 23, y: 9, targetMapCode: 'OX_QUIZ' },

  // 아바타관 입구
  { id: 'door_avatar', label: '아바타관', x: 4, y: 17, targetMapCode: 'AVATAR_HALL' },

  // 미션센터 입구
  { id: 'door_mission', label: '미션센터', x: 23, y: 17, targetMapCode: 'MISSION_CENTER' },

  // 랭킹 타워 입구
  { id: 'door_ranking', label: '랭킹 타워', x: 25, y: 13, targetMapCode: 'RANKING_TOWER' },

  // 캠퍼스 정문 (기둥 사이 중앙)
  { id: 'door_gate', label: '캠퍼스 정문', x: 13, y: 25, targetMapCode: 'GATE_ENTRANCE' },
  { id: 'door_gate_r', label: '캠퍼스 정문', x: 14, y: 25, targetMapCode: 'GATE_ENTRANCE' },
];