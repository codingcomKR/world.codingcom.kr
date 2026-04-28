import type { VirtualCampusAdminSnapshot } from '../../types/virtual-campus';
import { ITEM_RARITY_STYLE } from '../../constants/virtual-campus';

interface InventoryPanelProps {
  data: VirtualCampusAdminSnapshot;
}

export default function InventoryPanel({ data }: InventoryPanelProps) {
  const inventory = data.memberView.inventory || [];
  const equipment = data.memberView.avatar?.equipment;

  return (
    <div className="flex flex-col gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 w-full h-full shadow-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-black text-white tracking-tight">Inventory</h3>
        <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-700">
          {inventory.length} Items
        </span>
      </div>

      {/* Equipped Section */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        {['hat', 'outfit', 'tool', 'badge'].map((slot) => {
          const item = (equipment as any)?.[slot];
          return (
            <div key={slot} className="relative group">
              <div className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                item 
                  ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                  : 'bg-slate-950/50 border-white/5 border-dashed'
              }`}>
                {item ? (
                  <>
                    <span className="text-[9px] font-black uppercase text-cyan-400/80 mb-0.5">{slot}</span>
                    <span className="text-[11px] font-bold text-white px-2 truncate w-full text-center">{item.itemName}</span>
                  </>
                ) : (
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{slot}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
        {inventory.length > 0 ? (
          inventory.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
            >
              <div 
                className="h-10 w-10 rounded-xl flex items-center justify-center text-[10px] font-black border shadow-inner"
                style={{ backgroundColor: item.paletteColor, color: item.accentColor, borderColor: `${item.accentColor}33` }}
              >
                {item.itemName.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{item.itemName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${ITEM_RARITY_STYLE[item.itemRarity as keyof typeof ITEM_RARITY_STYLE] || 'bg-slate-800 text-slate-400'}`}>
                    {item.itemRarity}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{item.slotKey}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center opacity-40">
            <div className="text-3xl mb-2">🎒</div>
            <p className="text-xs font-bold text-slate-400">Your bag is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
