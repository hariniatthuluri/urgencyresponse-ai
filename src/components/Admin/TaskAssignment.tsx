
import { useState } from 'react';
import { MOCK_VOLUNTEERS } from '@/src/constants';
import { UrgencyIssue, Volunteer } from '@/src/types';
import { calculateDistance, cn } from '@/src/lib/utils';
import { UserCheck, MapPin, Star, Send } from 'lucide-react';
import { motion } from 'motion/react';

export function TaskAssignment({ issue, onAssign }: { issue: UrgencyIssue, onAssign: (volunteerId: string) => void }) {
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const topVolunteers = MOCK_VOLUNTEERS
    .map(v => ({
      ...v,
      proximityDistance: calculateDistance(issue.location.lat, issue.location.lng, v.location.lat, v.location.lng)
    }))
    .sort((a, b) => a.proximityDistance - b.proximityDistance)
    .slice(0, 3); // Top 3

  return (
    <div className="bg-bento-card h-full flex flex-col">
      <div className="p-6 bg-bento-bg text-bento-text-main rounded-b-[40px] shadow-xl border-b border-bento-border">
        <h2 className="text-xl font-bold">Assign Volunteer</h2>
        <div className="mt-4 p-4 bg-bento-card rounded-2xl border border-bento-border shadow-inner">
          <p className="text-xs text-bento-text-dim uppercase font-bold tracking-widest">Selected Issue</p>
          <h3 className="text-lg font-bold mt-1">{issue.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-bento-urgent rounded text-[10px] font-bold text-white shadow-sm">CRITICAL</span>
            <span className="text-xs text-bento-text-dim">{issue.category} intervention</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 bg-bento-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-bento-text-main">Optimal Dispatch</h3>
          <span className="text-[10px] font-bold text-bento-text-dim border border-bento-border px-2 py-1 rounded bg-bento-bg uppercase tracking-wide">90%+ Skill Match</span>
        </div>

        <div className="space-y-3">
          {topVolunteers.map((vol, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={vol.id} 
              className="p-4 bg-bento-bg rounded-2xl border border-bento-border flex items-center gap-4 hover:border-bento-accent transition-colors"
            >
              <img src={vol.avatar} alt={vol.name} className="w-12 h-12 rounded-full object-cover border-2 border-bento-border shadow-sm" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-bento-text-main truncate">{vol.name}</h4>
                  <div className="flex items-center text-[10px] text-yellow-500 font-bold">
                    <Star size={10} className="fill-current mr-0.5" />
                    {vol.rating}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center text-[10px] text-bento-text-dim">
                    <MapPin size={10} className="mr-0.5 text-bento-accent" />
                    {vol.proximityDistance.toFixed(1)} km
                  </div>
                  <div className="text-[10px] text-bento-safe font-bold">
                    {vol.completedTasks} tasks done
                  </div>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {vol.skills.slice(0, 2).map(s => (
                    <span key={s} className="text-[9px] bg-bento-card border border-bento-border px-2 py-0.5 rounded-full text-bento-text-dim font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => {
                  setAssigningId(vol.id);
                  setTimeout(() => onAssign(vol.id), 1200);
                }}
                disabled={assigningId !== null}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg",
                  assigningId === vol.id ? "bg-bento-safe text-white" : "bg-bento-accent text-white active:scale-90 shadow-bento-accent/20"
                )}
              >
                {assigningId === vol.id ? <UserCheck size={20} /> : <Send size={18} />}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-bento-bg rounded-2xl border border-dashed border-bento-border flex flex-col items-center justify-center text-center">
            <p className="text-xs text-bento-text-dim font-medium">Need more specific skills?</p>
            <button className="mt-2 text-sm font-bold text-bento-text-main underline underline-offset-4 decoration-bento-accent">Browse All Volunteers</button>
        </div>
      </div>
    </div>
  );
}
