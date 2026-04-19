
import { useState } from 'react';
import { UrgencyHeatmap } from './Heatmap';
import { DataInput } from './DataInput';
import { ImpactDashboard } from './ImpactDashboard';
import { TaskAssignment } from './TaskAssignment';
import { MOCK_ISSUES } from '@/src/constants';
import { UrgencyIssue } from '@/src/types';
import { Map, BarChart3, PlusCircle, Brain, X, MessageSquare, ShieldAlert } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { getUrgencyPlan } from '@/src/lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

export function NGOAdminDashboard() {
  const [activeView, setActiveView] = useState<'map' | 'input' | 'impact'>('map');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isAiPlanning, setIsAiPlanning] = useState(false);
  const [aiPlan, setAiPlan] = useState<string | null>(null);

  const selectedIssue = MOCK_ISSUES.find(i => i.id === selectedIssueId);

  const handleAiPlan = async () => {
    if (!selectedIssue) return;
    setIsAiPlanning(true);
    const plan = await getUrgencyPlan(
      `Plan an intervention for: ${selectedIssue.title}. ${selectedIssue.description}`,
      `Category: ${selectedIssue.category}, Urgency: ${selectedIssue.urgencyLevel}`
    );
    setAiPlan(plan);
    setIsAiPlanning(false);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 gap-6 bg-bento-bg overflow-hidden">
      {/* Top Stats Rail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-bento-card border border-bento-border rounded-3xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest">Active Risks</p>
            <h3 className="text-2xl font-black text-white">14</h3>
          </div>
          <div className="w-10 h-10 bg-red-900/20 text-bento-urgent rounded-xl flex items-center justify-center border border-red-900/50">
            <ShieldAlert size={20} />
          </div>
        </div>
        <div className="p-4 bg-bento-card border border-bento-border rounded-3xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest">Staff Deployed</p>
            <h3 className="text-2xl font-black text-white">82</h3>
          </div>
          <div className="w-10 h-10 bg-blue-900/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-900/50">
            <Map size={20} />
          </div>
        </div>
        <div className="p-4 bg-bento-card border border-bento-border rounded-3xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest">Lives Impacted</p>
            <h3 className="text-2xl font-black text-white">2.4k</h3>
          </div>
          <div className="w-10 h-10 bg-green-900/20 text-bento-safe rounded-xl flex items-center justify-center border border-green-900/50">
            <BarChart3 size={20} />
          </div>
        </div>
        <div className="p-4 bg-bento-card border border-bento-border rounded-3xl flex items-center justify-between group cursor-pointer hover:border-bento-accent transition-colors" onClick={() => setActiveView('input')}>
          <div>
            <p className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest">Add Signal</p>
            <h3 className="text-2xl font-black text-bento-accent">Manual Input</h3>
          </div>
          <div className="w-10 h-10 bg-bento-accent/10 text-bento-accent rounded-xl flex items-center justify-center border border-bento-accent/20">
            <PlusCircle size={20} />
          </div>
        </div>
      </div>

      {/* Main Grid Floor */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Map Sector */}
        <div className="col-span-12 lg:col-span-8 bg-bento-card rounded-[40px] border border-bento-border overflow-hidden relative shadow-2xl">
          <UrgencyHeatmap onMarkerClick={(id) => setSelectedIssueId(id)} />
          
          <div className="absolute top-4 left-4 p-3 bg-bento-card/90 backdrop-blur-sm rounded-2xl shadow-lg border border-bento-border flex flex-col pointer-events-auto">
             <span className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest">Sector Scan</span>
             <span className="text-sm font-bold text-white leading-tight">Bangalore East</span>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setActiveView('impact')}
              className={cn(
                "w-10 h-10 bg-bento-card/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border border-bento-border transition-all",
                activeView === 'impact' ? "text-bento-accent border-bento-accent" : "text-bento-text-dim"
              )}
            >
              <BarChart3 size={20} />
            </button>
          </div>
        </div>

        {/* Ops Sector */}
        <div className="col-span-12 lg:col-span-4 bg-bento-card rounded-[40px] border border-bento-border overflow-hidden flex flex-col shadow-2xl relative">
          <AnimatePresence mode="wait">
            {!selectedIssueId && activeView === 'map' && (
              <motion.div 
                key="default-ops"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-white tracking-tight">Ops Center</h2>
                  <div className="px-2 py-1 bg-bento-accent/10 text-bento-accent text-[8px] font-black rounded uppercase tracking-widest border border-bento-accent/20">Live Sync</div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-6">
                   <div className="p-4 bg-bento-bg rounded-2xl border border-bento-border transition-all hover:bg-bento-border/20 cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-bento-urgent animate-pulse" />
                         <span className="text-[10px] font-black text-bento-text-dim uppercase tracking-[0.1em]">Signal Detected • 2m ago</span>
                      </div>
                      <h4 className="font-bold text-white mt-1">Water Scarcity reported in Sector 4</h4>
                      <p className="text-xs text-bento-text-dim mt-1">AI analysis suggests imminent intervention requirement.</p>
                   </div>
                   
                   <div className="p-4 bg-bento-bg rounded-2xl border border-bento-border transition-all hover:bg-bento-border/20 cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-bento-safe" />
                         <span className="text-[10px] font-black text-bento-text-dim uppercase tracking-[0.1em]">Task Accomplished • 15m ago</span>
                      </div>
                      <h4 className="font-bold text-white mt-1">Medical Supplies Delivered to HAL</h4>
                      <p className="text-xs text-bento-text-dim mt-1">Volunteer #124 completed the mission 10% ahead of schedule.</p>
                   </div>
                </div>

                <div className="mt-auto space-y-3 pt-6 border-t border-bento-border">
                   <p className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest text-center">Global Dispatch protocol</p>
                   <button 
                    onClick={() => setActiveView('input')}
                    className="w-full py-4 bg-bento-accent text-white rounded-3xl font-black text-sm shadow-xl shadow-bento-accent/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                   >
                     <PlusCircle size={20} />
                     INITIATE NEW SECTOR LOG
                   </button>
                </div>
              </motion.div>
            )}

            {selectedIssueId && (
              <motion.div 
                key="task-assignment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 pb-2">
                   <h2 className="text-xl font-black text-white tracking-tight">Mission Detail</h2>
                   <button onClick={() => setSelectedIssueId(null)} className="text-bento-text-dim hover:text-white transition-colors">
                      <X size={20} />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar shadow-inner">
                   <div className="p-6 pt-0">
                      {selectedIssue && (
                        <>
                          <TaskAssignment 
                            issue={selectedIssue} 
                            onAssign={() => setSelectedIssueId(null)} 
                          />
                          
                          <div className="mt-6 p-6 bg-bento-bg rounded-[32px] border border-bento-border">
                             <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                   <Brain size={20} className="text-purple-400" />
                                   Gemini Strategic Insight
                                </h3>
                                {!aiPlan && (
                                   <button 
                                    onClick={handleAiPlan} 
                                    disabled={isAiPlanning}
                                    className="text-[10px] font-black px-3 py-1 bg-purple-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                                   >
                                     {isAiPlanning ? "Synchronizing..." : "Generate Neural Plan"}
                                   </button>
                                )}
                             </div>
                             
                             {isAiPlanning && (
                                <div className="space-y-3 animate-pulse">
                                   <div className="h-4 bg-purple-900/40 rounded w-3/4" />
                                   <div className="h-4 bg-purple-900/40 rounded w-full" />
                                   <div className="h-4 bg-purple-900/40 rounded w-5/6" />
                                </div>
                             )}

                             {aiPlan && (
                                <div className="relative">
                                   <div className="text-xs text-bento-text-main/80 space-y-4 leading-relaxed bg-bento-card p-4 rounded-2xl border border-bento-border text-left">
                                      {aiPlan}
                                   </div>
                                   <button onClick={() => setAiPlan(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-bento-card border border-bento-border text-bento-text-dim rounded-full flex items-center justify-center shadow-lg"><X size={12} /></button>
                                </div>
                             )}

                             {!aiPlan && !isAiPlanning && (
                                <p className="text-[11px] text-bento-text-dim italic">
                                   Deploy Gemini 3.1 Reasoning to simulate the optimal deployment strategy based on real-time volunteer pulse.
                                </p>
                             )}
                          </div>
                        </>
                      )}
                   </div>
                </div>
              </motion.div>
            )}

            {activeView === 'input' && (
              <motion.div 
                key="data-input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-50 bg-bento-bg"
              >
                <div className="flex items-center justify-between p-6 pb-2">
                   <h2 className="text-xl font-black text-white tracking-tight">Signal Ingest</h2>
                   <button onClick={() => setActiveView('map')} className="text-bento-text-dim hover:text-white transition-colors">
                      <X size={20} />
                   </button>
                </div>
                <div className="h-full overflow-y-auto no-scrollbar">
                  <DataInput onComplete={() => setActiveView('map')} />
                </div>
              </motion.div>
            )}

            {activeView === 'impact' && (
              <motion.div 
                key="impact-dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-50 bg-bento-bg"
              >
                <div className="flex items-center justify-between p-6 pb-2">
                   <h2 className="text-xl font-black text-white tracking-tight">Analytics Fleet</h2>
                   <button onClick={() => setActiveView('map')} className="text-bento-text-dim hover:text-white transition-colors">
                      <X size={20} />
                   </button>
                </div>
                <div className="h-full overflow-y-auto no-scrollbar pb-10">
                  <ImpactDashboard />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
