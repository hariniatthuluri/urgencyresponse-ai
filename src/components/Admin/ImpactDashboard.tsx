
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_IMPACT_DATA } from '@/src/constants';
import { Users, CheckCircle2, TrendingUp, Award } from 'lucide-react';

export function ImpactDashboard() {
  const totalHelped = MOCK_IMPACT_DATA.reduce((acc, curr) => acc + curr.peopleHelped, 0);
  const totalTasks = MOCK_IMPACT_DATA.reduce((acc, curr) => acc + curr.tasksCompleted, 0);

  return (
    <div className="p-6 bg-bento-bg min-h-full">
      <h2 className="text-2xl font-bold text-bento-text-main">Operational Impact</h2>
      <p className="text-bento-text-dim text-sm mt-1">Real-time humanitarian metrics</p>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="p-4 bg-bento-card rounded-3xl border border-bento-border shadow-inner">
          <div className="w-8 h-8 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mb-3 border border-blue-900/50">
             <Users size={16} />
          </div>
          <div className="text-2xl font-black text-white">{totalHelped.toLocaleString()}</div>
          <div className="text-[10px] font-bold text-bento-text-dim uppercase tracking-wider">People Helped</div>
        </div>
        <div className="p-4 bg-bento-card rounded-3xl border border-bento-border shadow-inner">
          <div className="w-8 h-8 bg-green-900/30 text-bento-safe rounded-full flex items-center justify-center mb-3 border border-green-900/50">
             <CheckCircle2 size={16} />
          </div>
          <div className="text-2xl font-black text-white">{totalTasks}</div>
          <div className="text-[10px] font-bold text-bento-text-dim uppercase tracking-wider">Tasks Done</div>
        </div>
      </div>

      <div className="mt-8 space-y-6 pb-20">
        <div className="bg-bento-card p-4 rounded-3xl border border-bento-border">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-bento-text-main text-sm flex items-center gap-2">
               <TrendingUp size={16} className="text-bento-safe" />
               Weekly Performance
             </h3>
           </div>
           <div className="h-[180px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_IMPACT_DATA}>
                 <defs>
                   <linearGradient id="colorHelped" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363D" />
                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8B949E' }} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#161B22', borderRadius: '12px', border: '1px solid #30363D', color: '#E6EDF3' }}
                 />
                 <Area type="monotone" dataKey="peopleHelped" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHelped)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-bento-card p-4 rounded-3xl border border-bento-border">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-bento-text-main text-sm flex items-center gap-2">
               <Award size={16} className="text-bento-warning" />
               Interventions by Scale
             </h3>
           </div>
           <div className="h-[180px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MOCK_IMPACT_DATA}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363D" />
                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8B949E' }} />
                 <Tooltip cursor={{ fill: '#0C0E12', opacity: 0.5 }} contentStyle={{ backgroundColor: '#161B22', borderRadius: '12px', border: '1px solid #30363D', color: '#E6EDF3' }} />
                 <Bar dataKey="tasksCompleted" fill="#FF4B4B" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
