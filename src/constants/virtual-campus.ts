import type {
  VirtualCampusMapKind,
  VirtualCampusPhaseStatus,
  VirtualCampusItemSlotKey,
  VirtualCampusItemRarity
} from '../types/virtual-campus';

export const MAP_ACCENT: Record<VirtualCampusMapKind, string> = {
  outdoor: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100',
  indoor: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100',
  special: 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-100',
};

export const MAP_BADGE: Record<VirtualCampusMapKind, string> = {
  outdoor: '야외',
  indoor: '실내',
  special: '특수',
};

export const PHASE_STYLE: Record<VirtualCampusPhaseStatus, string> = {
  active: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100',
  ready: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100',
  planned: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
};

export const ITEM_SLOT_LABEL: Record<VirtualCampusItemSlotKey, string> = {
  hat: '머리',
  outfit: '상의',
  tool: '도구',
  badge: '표시',
};

export const ITEM_RARITY_STYLE: Record<VirtualCampusItemRarity, string> = {
  common: 'border-slate-500/30 bg-slate-500/10 text-slate-200',
  uncommon: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100',
  rare: 'border-amber-400/30 bg-amber-500/10 text-amber-100',
  epic: 'border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100',
};
