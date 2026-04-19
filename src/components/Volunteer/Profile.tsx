
import { useState } from 'react';
import { MapPin, CheckCircle, Clock, Map, Save, Plus, Award, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const SKILLS = ['Medical Support', 'First Aid', 'Logistics', 'Driver', 'Translation', 'Food Prep', 'Shelter Build', 'Water Management'];

export function VolunteerProfile() {
  const [selectedSkills, setSelectedSkills] = useState(['Medical Support', 'Logistics']);
  const [availability, setAvailability] = useState<'Available' | 'Busy' | 'Offline'>('Available');
  const [isSaving, setIsSaving] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  return (
    <div className="bg-bento-bg min-h-full pb-20">
      <div className="relative h-48 bg-bento-card border-b border-bento-border overflow-hidden">
         <img src="https://picsum.photos/seed/relief/800/400" className="w-full h-full object-cover opacity-20 grayscale blur-sm" referrerPolicy="no-referrer" />
         <div className="absolute inset-0 bg-gradient-to-t from-bento-bg to-transparent" />
         <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between translate-y-1/2 z-10">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/sarah/200" 
                className="w-24 h-24 rounded-[32px] border-4 border-bento-bg shadow-2xl object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className={cn(
                "absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 border-bento-bg shadow-lg",
                availability === 'Available' ? "bg-bento-safe" : availability === 'Busy' ? "bg-bento-warning" : "bg-bento-text-dim"
              )} />
            </div>
            <button 
              onClick={() => {
                setIsSaving(true);
                setTimeout(() => setIsSaving(false), 800);
              }}
              className="bg-bento-accent text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 shadow-xl shadow-bento-accent/20 active:scale-95 transition-all"
            >
              <Save size={16} />
              {isSaving ? "Syncing..." : "Save Pulse"}
            </button>
         </div>
      </div>

      <div className="pt-16 p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Sarah Chen</h2>
          <div className="flex items-center gap-2 text-bento-text-dim text-sm mt-1">
             <MapPin size={14} className="text-bento-accent" />
             <span>Bangalore Central, Karnataka</span>
          </div>
        </div>

        <section>
          <h3 className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest mb-4 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-bento-accent" />
             Protocol Status
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {(['Available', 'Busy', 'Offline'] as const).map(s => (
              <button 
                key={s}
                onClick={() => setAvailability(s)}
                className={cn(
                  "py-4 rounded-[32px] flex flex-col items-center justify-center gap-2 border border-bento-border transition-all",
                  availability === s 
                    ? "bg-bento-card border-bento-accent text-white shadow-lg ring-1 ring-bento-accent/20" 
                    : "bg-bento-bg text-bento-text-dim hover:bg-bento-card"
                )}
              >
                {s === 'Available' && <CheckCircle size={20} className={availability === s ? "text-bento-safe" : ""} />}
                {s === 'Busy' && <Clock size={20} className={availability === s ? "text-bento-warning" : ""} />}
                {s === 'Offline' && <Map size={20} />}
                <span className="text-[10px] font-black uppercase tracking-tighter">{s}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bento-accent" />
                Verified Skills
             </h3>
             <span className="text-[10px] font-bold text-bento-accent underline cursor-pointer">Catalog</span>
           </div>
           <div className="flex flex-wrap gap-2">
             {SKILLS.map(s => (
               <button 
                key={s}
                onClick={() => toggleSkill(s)}
                className={cn(
                  "px-4 py-2.5 rounded-2xl text-[11px] font-bold tracking-tight transition-all flex items-center gap-2 border",
                  selectedSkills.includes(s) 
                    ? "bg-bento-card border-bento-accent text-white shadow-lg" 
                    : "bg-bento-bg border-bento-border text-bento-text-dim hover:border-bento-text-main"
                )}
               >
                 {s}
                 {selectedSkills.includes(s) ? <X size={12} className="text-bento-accent" /> : <Plus size={12} />}
               </button>
             ))}
           </div>
        </section>

        <section className="bg-bento-card rounded-[40px] p-6 border border-bento-border relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award size={80} />
           </div>
           <div className="flex items-center gap-4 mb-4 relative z-10">
             <div className="w-12 h-12 bg-bento-bg rounded-2xl flex items-center justify-center shadow-inner border border-bento-border">
                < Award size={24} className="text-bento-warning" />
             </div>
             <div>
                <h4 className="font-black text-white text-lg leading-tight uppercase tracking-tighter">Guardian Rank</h4>
                <p className="text-[10px] font-bold text-bento-text-dim uppercase tracking-widest">Sector Elite • 1,240 Pulse XP</p>
             </div>
           </div>
           <div className="w-full h-2 bg-bento-bg rounded-full overflow-hidden border border-bento-border p-[1px] relative z-10">
              <div className="w-3/4 h-full bg-gradient-to-r from-bento-accent to-red-400 rounded-full shadow-sm shadow-bento-accent/40" />
           </div>
           <p className="text-[10px] text-bento-text-dim mt-3 font-medium tracking-tight relative z-10">
              Assisted 400+ citizens this month. Only 200XP away from Diamond Badge.
           </p>
        </section>
      </div>
    </div>
  );
}

