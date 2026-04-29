import type { VirtualCampusCollisionZoneSummary } from '../types/virtual-campus';

// Campus Square Map Data — 28x28 grid
// 이미지 시각 분석을 통해 2.5D 원근감을 타일 맵 충돌 좌표로 정밀 매핑
export const CAMPUS_SQUARE_MAP_CODE = 'CAMPUS_SQUARE';

export const campusSquareCollisionZones: VirtualCampusCollisionZoneSummary[] = [
  // ── MAP BOUNDARIES (맵 외곽 이탈 방지) ──
  { id: 9001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_top', label: '상단 외곽선', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 28, heightTiles: 1, sortOrder: 90, isActive: true },
  { id: 9002, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_bottom', label: '하단 외곽선', zoneType: 'blocked', originX: 0, originY: 27, widthTiles: 28, heightTiles: 1, sortOrder: 90, isActive: true },
  { id: 9003, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_left', label: '좌측 외곽선', zoneType: 'blocked', originX: 0, originY: 0, widthTiles: 1, heightTiles: 28, sortOrder: 90, isActive: true },
  { id: 9004, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'edge_right', label: '우측 외곽선', zoneType: 'blocked', originX: 27, originY: 0, widthTiles: 1, heightTiles: 28, sortOrder: 90, isActive: true },

  // ── CORNER TREES & WATER (모서리 숲/물 영역) ──
  { id: 1080, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_TL', label: '좌상단 숲', zoneType: 'blocked', originX: 1, originY: 1, widthTiles: 8, heightTiles: 2, sortOrder: 80, isActive: true },
  { id: 1081, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_TR', label: '우상단 숲', zoneType: 'blocked', originX: 19, originY: 1, widthTiles: 8, heightTiles: 2, sortOrder: 81, isActive: true },
  { id: 1082, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_BL', label: '좌하단 물가', zoneType: 'blocked', originX: 1, originY: 24, widthTiles: 8, heightTiles: 3, sortOrder: 82, isActive: true },
  { id: 1083, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'corner_BR', label: '우하단 물가', zoneType: 'blocked', originX: 19, originY: 24, widthTiles: 8, heightTiles: 3, sortOrder: 83, isActive: true },

  // ── CENTRAL FOUNTAIN (28x28의 정중앙 4x4 타일) ──
  { id: 1001, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'fountain_core', label: '중앙 분수대', zoneType: 'blocked', originX: 12, originY: 12, widthTiles: 4, heightTiles: 4, sortOrder: 1, isActive: true },

  // ── CODINGDONG (Top Center: X 9~18, Y 1~6 계단 위 블록) ──
  { id: 1010, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'codingdong_main', label: '코딩동 건물', zoneType: 'blocked', originX: 9, originY: 1, widthTiles: 10, heightTiles: 6, sortOrder: 10, isActive: true },

  // ── SHOP (Top Left: X 1~8, Y 3~8 계단 위 블록) ──
  { id: 1020, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'shop_main', label: '상점 건물', zoneType: 'blocked', originX: 1, originY: 3, widthTiles: 8, heightTiles: 6, sortOrder: 20, isActive: true },

  // ── OX QUIZ (Top Right: X 19~26, Y 3~8 계단 위 블록) ──
  { id: 1030, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ox_main', label: 'OX 퀴즈관 건물', zoneType: 'blocked', originX: 19, originY: 3, widthTiles: 8, heightTiles: 6, sortOrder: 30, isActive: true },

  // ── AVATAR HALL (Bottom Left: X 1~8, Y 15~21 계단 위 블록) ──
  { id: 1040, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'avatar_main', label: '아바타관 건물', zoneType: 'blocked', originX: 1, originY: 15, widthTiles: 8, heightTiles: 7, sortOrder: 40, isActive: true },

  // ── MISSION CENTER (Bottom Right: X 19~26, Y 15~21 계단 위 블록) ──
  { id: 1050, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'mission_main', label: '미션센터 건물', zoneType: 'blocked', originX: 19, originY: 15, widthTiles: 8, heightTiles: 7, sortOrder: 50, isActive: true },

  // ── RANKING TOWER (Far Right Middle: X 25~26, Y 9~14) ──
  { id: 1060, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'ranking_tower', label: '랭킹 타워', zoneType: 'blocked', originX: 25, originY: 9, widthTiles: 2, heightTiles: 6, sortOrder: 60, isActive: true },

  // ── GATE PILLARS (Bottom Center 양옆 기둥: X 8~11 & 16~19, Y 24~26) ──
  { id: 1070, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_L', label: '정문 좌측 구조물', zoneType: 'blocked', originX: 8, originY: 24, widthTiles: 4, heightTiles: 3, sortOrder: 70, isActive: true },
  { id: 1071, mapCode: CAMPUS_SQUARE_MAP_CODE, zoneKey: 'gate_R', label: '정문 우측 구조물', zoneType: 'blocked', originX: 16, originY: 24, widthTiles: 4, heightTiles: 3, sortOrder: 71, isActive: true },
];

// ─── PORTAL / DOOR POSITIONS ─────────────────────────────────────────────────
// 건물의 충돌 영역(Zone) 바로 한 칸 아래(계단 끝자락 앞) 걸어갈 수 있는 빈 타일로 좌표 재조정
export const campusSquarePortals = [
  // 코딩동 입구 (Y: 6까지 막혀있으므로 Y: 7에 위치, 중앙은 X: 13, 14)
  { id: 'door_codingdong', label: '코딩동', x: 13, y: 7, targetMapCode: 'CODINGDONG_LOBBY' },
  { id: 'door_codingdong_r', label: '코딩동', x: 14, y: 7, targetMapCode: 'CODINGDONG_LOBBY' }, // 넓은 문 처리용 보조 포털

  // 상점 입구 (Y: 8까지 막혀있으므로 Y: 9에 위치)
  { id: 'door_shop', label: '상점', x: 4, y: 9, targetMapCode: 'SHOP' },

  // OX 퀴즈관 입구
  { id: 'door_ox', label: 'OX 퀴즈관', x: 23, y: 9, targetMapCode: 'OX_QUIZ' },

  // 아바타관 입구 (Y: 21까지 막혀있으므로 Y: 22에 위치)
  { id: 'door_avatar', label: '아바타관', x: 4, y: 22, targetMapCode: 'AVATAR_HALL' },

  // 미션센터 입구
  { id: 'door_mission', label: '미션센터', x: 23, y: 22, targetMapCode: 'MISSION_CENTER' },

  // 랭킹 타워 입구 (타워 바로 앞 타일)
  { id: 'door_ranking', label: '랭킹 타워', x: 24, y: 14, targetMapCode: 'RANKING_TOWER' },

  // 캠퍼스 정문 (기둥 사이 중앙 통로)
  { id: 'door_gate', label: '캠퍼스 정문', x: 13, y: 23, targetMapCode: 'GATE_ENTRANCE' },
  { id: 'door_gate_r', label: '캠퍼스 정문', x: 14, y: 23, targetMapCode: 'GATE_ENTRANCE' },
];