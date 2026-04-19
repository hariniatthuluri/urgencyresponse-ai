
import { useState } from 'react';
import { MOCK_TASKS } from '@/src/constants';
import { Task } from '@/src/types';
import { MapPin, Navigation, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function VolunteerDashboard() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const handleAction = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const pendingTasks = tasks.filter(t => t.status === 'Pending' || t.status === 'Assigned');
  const activeTasks = tasks.filter(t => t.status === 'Accepted');

  return (
    <div className="bg-bento-bg min-h-full">
      <div className="p-6 bg-bento-card border-b border-bento-border">
         <h2 className="text-2xl font-bold text-bento-text-main">Your Missions</h2>
         <p className="text-bento-text-dim text-sm mt-1">Ready for intervention?</p>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {pendingTasks.length > 0 && (
          <section>
            <h3 className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest mb-3 ml-2 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-bento-warning animate-pulse" />
               New Assignments
            </h3>
            <div className="space-y-3">
              <AnimatePresence>
                {pendingTasks.map((task) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={task.id} 
                    className="p-5 bg-bento-card rounded-[32px] border border-bento-border shadow-lg flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                           <span className={cn(
                             "px-2 py-0.5 rounded text-[8px] font-black tracking-wider uppercase",
                             task.urgencyLevel === 'Critical' ? "bg-red-900/40 text-red-400 border border-red-900/50" : "bg-orange-900/40 text-orange-400 border border-orange-900/50"
                           )}>
                             {task.urgencyLevel}
                           </span>
                           <span className="text-[10px] font-bold text-bento-text-dim">#Intervention</span>
                        </div>
                        <h4 className="text-lg font-bold text-bento-text-main leading-tight mt-1">{task.issueTitle}</h4>
                      </div>
                      <div className="text-bento-text-dim bg-bento-bg p-2 rounded-2xl border border-bento-border">
                         <MapPin size={20} />
                      </div>
                    </div>

                    <p className="text-sm text-bento-text-dim line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-bold text-bento-text-dim bg-bento-bg p-2.5 rounded-2xl w-fit border border-bento-border">
                       <Navigation size={12} className="text-blue-500" />
                       850m away from your location
                    </div>

                    <div className="flex gap-2 pt-2">
                       <button 
                        onClick={() => handleAction(task.id, 'Declined')}
                        className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-bento-text-dim border border-bento-border hover:bg-bento-border transition-colors"
                       >
                         Decline
                       </button>
                       <button 
                        onClick={() => handleAction(task.id, 'Accepted')}
                        className="flex-2 py-3.5 rounded-2xl text-sm font-bold bg-bento-accent text-white shadow-xl shadow-bento-accent/20 active:scale-95 transition-all"
                       >
                         Accept Mission
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {activeTasks.length > 0 && (
          <section>
            <h3 className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest mb-3 ml-2 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-bento-safe" />
               Active Duty
            </h3>
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <div key={task.id} className="p-4 bg-bento-safe rounded-[32px] text-white flex flex-col gap-4 shadow-xl shadow-bento-safe/20 border border-white/10">
                   <div className="flex justify-between items-center">
                      <div>
                         <h4 className="font-bold">{task.issueTitle}</h4>
                         <p className="text-xs text-white/80">Arrive by 3:45 PM</p>
                      </div>
                      <button className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center border border-white/20">
                         <MessageCircle size={18} />
                      </button>
                   </div>
                   <button 
                    onClick={() => handleAction(task.id, 'Completed')}
                    className="w-full py-4 bg-white text-bento-safe rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-inner"
                   >
                     <CheckCircle2 size={18} />
                     Complete Task
                   </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {pendingTasks.length === 0 && activeTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
             <div className="w-20 h-20 bg-bento-card rounded-[32px] flex items-center justify-center text-bento-border mb-4 animate-pulse">
                <Navigation size={40} />
             </div>
             <h3 className="font-bold text-bento-text-main">Quiet Zone</h3>
             <p className="text-sm text-bento-text-dim mt-2">There are currently no missions assigned to your sector. Stay ready!</p>
          </div>
        )}
      </div>

      <div className="p-6">
         <div className="p-4 bg-bento-card rounded-3xl border border-bento-border shadow-sm flex items-center justify-between group cursor-pointer hover:border-bento-accent transition-colors">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded-xl flex items-center justify-center shadow-inner">
                  <Navigation size={20} />
               </div>
               <div>
                  <h4 className="text-xs font-bold text-bento-text-main tracking-tight">Zone Monitoring</h4>
                  <p className="text-[10px] text-bento-text-dim">Central Hub Linked</p>
               </div>
            </div>
            <ChevronRight size={16} className="text-bento-border group-hover:text-bento-accent transition-colors" />
         </div>
      </div>
    </div>
  );
}
