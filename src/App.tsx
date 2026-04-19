/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { UserRole } from './types';
import { NGOAdminDashboard } from './components/Admin/NGOAdminDashboard';
import { VolunteerHome } from './components/Volunteer/VolunteerHome';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, ShieldCheck, ChevronRight } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [role, setRole] = useState<UserRole>('NGO_ADMIN');

  return (
    <div className="min-h-screen bg-bento-bg flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-bento-card border-b md:border-b-0 md:border-r border-bento-border flex flex-col z-50">
        <div className="p-6 flex items-baseline gap-1">
          <span className="text-2xl font-black text-white tracking-tighter">URGENCY</span>
          <span className="text-[10px] font-black text-bento-accent bg-bento-accent/10 px-1.5 py-0.5 rounded border border-bento-accent/20">RESPONSE</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <button
            onClick={() => setRole('NGO_ADMIN')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
              role === 'NGO_ADMIN' 
                ? "bg-bento-accent text-white shadow-lg shadow-bento-accent/20" 
                : "text-bento-text-dim hover:text-white hover:bg-bento-card/50"
            )}
          >
            <LayoutDashboard size={20} />
            Command Center
          </button>
          <button
            onClick={() => setRole('VOLUNTEER')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
              role === 'VOLUNTEER' 
                ? "bg-bento-accent text-white shadow-lg shadow-bento-accent/20" 
                : "text-bento-text-dim hover:text-white hover:bg-bento-card/50"
            )}
          >
            <ShieldCheck size={20} />
            Volunteer Ops
          </button>
        </nav>

        <div className="p-6 border-t border-bento-border">
          <div className="flex items-center gap-3 p-3 bg-bento-bg rounded-2xl border border-bento-border">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black">AD</div>
             <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black text-white truncate">Administrator</p>
                <p className="text-[9px] font-bold text-bento-text-dim uppercase tracking-widest">Global Sec</p>
             </div>
             <ChevronRight size={14} className="text-bento-text-dim" />
          </div>
        </div>
      </aside>
      
      <main className="flex-1 relative overflow-auto bg-bento-bg no-scrollbar">
        <AnimatePresence mode="wait">
          {role === 'NGO_ADMIN' ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full w-full"
            >
              <NGOAdminDashboard />
            </motion.div>
          ) : (
            <motion.div
              key="volunteer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full w-full"
            >
              <VolunteerHome />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
