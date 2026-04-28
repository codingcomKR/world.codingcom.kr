import type { VirtualCampusAdminSnapshot } from '../../types/virtual-campus';

interface StatsPanelProps {
  data: VirtualCampusAdminSnapshot;
}

export default function StatsPanel({ data }: StatsPanelProps) {
  const avatar = data.memberView.avatar;
  if (!avatar) return null;

  const stats = [
    { label: 'Coding', value: avatar.stats.coding, icon: '💻', color: 'text-blue-400' },
    { label: 'Creativity', value: avatar.stats.creativity, icon: '🎨', color: 'text-purple-400' },
    { label: 'Focus', value: avatar.stats.focus, icon: '🧘', color: 'text-amber-400' },
    { label: 'Teamwork', value: avatar.stats.teamwork, icon: '🤝', color: 'text-emerald-400' },
    { label: 'Mobility', value: avatar.stats.mobility, icon: '🏃', color: 'text-rose-400' },
  ];

  return (
    <div className="flex flex-col gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 w-full shadow-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-black text-white tracking-tight">Status</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            LV.{avatar.level}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span>{stat.icon}</span>
                {stat.label}
              </span>
              <span className={`text-sm font-black ${stat.color}`}>{stat.value}</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${stat.color.replace('text-', 'bg-')}`}
                style={{ width: `${Math.min(100, (stat.value / 100) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
        <span className="text-[11px] font-black uppercase text-slate-500">Exp Points</span>
        <span className="text-xs font-bold text-slate-300">{avatar.expPoints.toLocaleString()} XP</span>
      </div>
    </div>
  );
}
