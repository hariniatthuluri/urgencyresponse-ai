
import { useState } from 'react';
import { VolunteerDashboard } from './VolunteerDashboard';
import { VolunteerProfile } from './Profile';
import { Layout, User, Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function VolunteerHome() {
  const [activeTab, setActiveTab] = useState<'missions' | 'profile'>('missions');

  return (
    <div className="h-full flex flex-col p-4 md:p-6 gap-6 bg-bento-bg overflow-hidden md:flex-row">
      {/* Volunteer Sub-Sidebar */}
      <div className="w-full md:w-56 flex flex-row md:flex-col gap-3 py-2 md:py-0">
        <button 
          onClick={() => setActiveTab('missions')}
          className={cn(
            "flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'missions' 
              ? "bg-bento-card border border-bento-accent text-bento-accent shadow-lg shadow-bento-accent/10" 
              : "bg-bento-card border border-bento-border text-bento-text-dim hover:text-white"
          )}
        >
          <Layout size={18} />
          Missions
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'profile' 
              ? "bg-bento-card border border-bento-accent text-bento-accent shadow-lg shadow-bento-accent/10" 
              : "bg-bento-card border border-bento-border text-bento-text-dim hover:text-white"
          )}
        >
          <User size={18} />
          Pulse Profile
        </button>

        <div className="hidden md:flex flex-col mt-auto p-4 bg-bento-card border border-bento-border rounded-3xl gap-3">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-bento-text-dim uppercase">Signals</span>
              <Bell size={14} className="text-bento-accent" />
           </div>
           <div className="space-y-2">
              <div className="w-full h-1 bg-bento-bg rounded-full overflow-hidden">
                 <div className="w-2/3 h-full bg-bento-accent" />
              </div>
              <p className="text-[9px] font-bold text-bento-text-dim">3/4 Tasks today</p>
           </div>
        </div>
      </div>

      {/* Primary Content View */}
      <div className="flex-1 bg-bento-card rounded-[40px] border border-bento-border overflow-hidden shadow-2xl flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'missions' ? (
              <motion.div
                key="missions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <VolunteerDashboard />
              </motion.div>
            ) : (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <VolunteerProfile />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
