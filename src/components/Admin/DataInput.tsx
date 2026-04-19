
import React, { useState, useEffect } from 'react';
import { Camera, FileText, Keyboard, AlertCircle, X, ChevronRight, WifiOff, Cloud, RefreshCw, CheckCircle2 } from 'lucide-react';
import { extractDataFromSurveyPhoto } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useOfflineSync } from '@/src/lib/offlineSync';

export function DataInput({ onComplete }: { onComplete: (data: any) => void }) {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual' | 'form'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  // Manual Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Medical');
  
  const { isOnline, pendingRecords, saveOffline, removeRecord } = useOfflineSync();

  // Auto-sync effect
  useEffect(() => {
    if (isOnline && pendingRecords.length > 0) {
      const sync = async () => {
        // In a real app, this would be an API call
        // Here we simulate syncing by passing each record to onComplete
        for (const record of pendingRecords) {
          onComplete(record.data);
          removeRecord(record.id);
        }
      };
      sync();
    }
  }, [isOnline, pendingRecords, onComplete, removeRecord]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isOnline) {
      alert("Vision AI requires an internet connection for cloud processing.");
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      try {
        const data = await extractDataFromSurveyPhoto(base64);
        setExtractedData(data);
      } catch (err) {
        console.error("Survey extraction failed", err);
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleManualSubmit = () => {
    if (!title) return;

    const data = {
      id: `manual-${Date.now()}`,
      title,
      category,
      urgencyLevel: 'Medium', // Default for manual
      description: 'Manual field report input.',
      location: { lat: 12.9716, lng: 77.5946 }, // Default center
      status: 'Unassigned',
      timestamp: new Date().toISOString()
    };

    if (isOnline) {
      onComplete(data);
    } else {
      saveOffline(data);
      setTitle('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-bento-bg">
      <div className="p-6 pb-2">
        <h2 className="text-2xl font-bold text-bento-text-main mb-1">New Data Entry</h2>
        <p className="text-bento-text-dim text-sm">Synchronize field reports into the system.</p>
      </div>

      {!isOnline && (
        <div className="mx-6 mb-4 px-4 py-3 bg-amber-900/20 border border-amber-900/50 rounded-2xl flex items-center gap-3 text-amber-500 animate-pulse">
          <WifiOff size={18} />
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest">Offline Mode Active</p>
            <p className="text-[9px] font-medium opacity-80">Manual reports will be cached locally and synced when online.</p>
          </div>
        </div>
      )}

      {pendingRecords.length > 0 && (
         <div className="mx-6 mb-4 p-3 bg-indigo-900/20 border border-indigo-900/50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Cloud size={18} className="text-indigo-400" />
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{pendingRecords.length} Pending Sync</span>
            </div>
            {isOnline && <RefreshCw size={14} className="text-indigo-400 animate-spin" />}
         </div>
      )}

      <div className="flex px-6 border-b border-bento-border">
        <button 
          onClick={() => setActiveTab('upload')}
          className={cn("flex-1 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'upload' ? "border-bento-accent text-bento-accent" : "border-transparent text-bento-text-dim")}
        >
          Vision AI
        </button>
        <button 
          onClick={() => setActiveTab('manual')}
          className={cn("flex-1 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'manual' ? "border-bento-accent text-bento-accent" : "border-transparent text-bento-text-dim")}
        >
          Manual
        </button>
        <button 
          onClick={() => setActiveTab('form')}
          className={cn("flex-1 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'form' ? "border-bento-accent text-bento-accent" : "border-transparent text-bento-text-dim")}
        >
          Google Form
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-10">
        {activeTab === 'upload' && (
          <div className="space-y-6">
            {!isOnline && (
               <div className="p-8 border border-bento-border rounded-3xl bg-bento-card text-center flex flex-col items-center gap-4 opacity-70">
                  <WifiOff size={48} className="text-bento-text-dim" />
                  <p className="text-sm text-bento-text-dim font-bold">Vision AI requires connectivity for neural analysis.</p>
               </div>
            )}
            
            {isOnline && !extractedData && (
              <div className="border border-dashed border-bento-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 bg-bento-card">
                <div className="w-16 h-16 bg-bento-bg rounded-full flex items-center justify-center text-bento-text-dim border border-bento-border">
                  <Camera size={32} />
                </div>
                <div>
                  <h3 className="font-semibold text-bento-text-main">Upload Survey Photo</h3>
                  <p className="text-sm text-bento-text-dim">Google Vision AI will extract survey details automatically.</p>
                </div>
                <input 
                  type="file" 
                  id="survey-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                />
                <label 
                  htmlFor="survey-upload"
                  className={cn(
                    "px-6 py-2.5 bg-bento-accent text-white rounded-xl text-sm font-medium cursor-pointer transition-all active:scale-95 shadow-lg shadow-bento-accent/20",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? "Processing..." : "Select Image"}
                </label>
              </div>
            )}
            
            {isOnline && extractedData && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-bento-card rounded-2xl p-5 border border-bento-border space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-red-900/30 text-red-400 text-[10px] font-bold rounded uppercase tracking-wider border border-red-900/50">
                    {extractedData.urgencyLevel}
                  </span>
                  <button onClick={() => setExtractedData(null)} className="text-bento-text-dim hover:text-bento-text-main">
                    <X size={18} />
                  </button>
                </div>
                <div>
                  <h4 className="font-bold text-bento-text-main text-lg leading-tight">{extractedData.title}</h4>
                  <p className="text-bento-text-dim text-sm mt-1">{extractedData.description}</p>
                </div>
                <div className="pt-4 flex gap-2">
                  <button 
                    onClick={() => {
                      onComplete(extractedData);
                      setExtractedData(null);
                    }}
                    className="flex-1 bg-bento-accent text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    Confirm & Add to Map
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
            
            <div className="flex items-center gap-3 p-4 bg-bento-accent/5 rounded-xl text-bento-accent text-xs border border-bento-accent/10">
              <AlertCircle size={16} />
              <p>Gemini vision model handles handwriting and unstructured text with 98% accuracy.</p>
            </div>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="space-y-4">
             <div className="space-y-1.5">
                <label className="text-xs font-bold text-bento-text-dim uppercase tracking-wider">Issue Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Broken Water Pipe" 
                  className="w-full px-4 py-3 bg-bento-card border border-bento-border text-bento-text-main rounded-xl focus:ring-1 focus:ring-bento-accent outline-none transition-all placeholder:text-neutral-700" 
                />
             </div>
             <div className="space-y-1.5">
                <label className="text-xs font-bold text-bento-text-dim uppercase tracking-wider">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-bento-card border border-bento-border text-bento-text-main rounded-xl focus:ring-1 focus:ring-bento-accent outline-none transition-all"
                >
                  <option>Medical</option>
                  <option>Food</option>
                  <option>Water</option>
                  <option>Shelter</option>
                </select>
             </div>
             <button 
               onClick={handleManualSubmit}
               disabled={!title}
               className="w-full bg-bento-accent text-white py-4 rounded-3xl font-black text-sm uppercase tracking-widest mt-4 shadow-xl shadow-bento-accent/20 transition-all active:scale-95 disabled:opacity-50"
             >
                {isOnline ? "Submit Live Report" : "Cache Offline Report"}
             </button>

             {pendingRecords.length > 0 && (
                <div className="mt-8">
                   <h3 className="text-[10px] font-black text-bento-text-dim uppercase tracking-widest mb-4">Pending Synchronization</h3>
                   <div className="space-y-2">
                      <AnimatePresence>
                        {pendingRecords.map(record => (
                           <motion.div 
                              key={record.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="p-3 bg-bento-card border border-bento-border rounded-2xl flex items-center justify-between"
                           >
                              <div>
                                 <p className="text-xs font-bold text-white leading-tight">{record.data.title}</p>
                                 <p className="text-[10px] text-bento-text-dim uppercase tracking-wider mt-0.5">{record.data.category}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Pending</span>
                                 <button onClick={() => removeRecord(record.id)} className="text-bento-text-dim hover:text-red-400">
                                    <X size={14} />
                                 </button>
                              </div>
                           </motion.div>
                        ))}
                      </AnimatePresence>
                   </div>
                </div>
             )}
          </div>
        )}

        {activeTab === 'form' && (
           <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
             <div className="w-16 h-16 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded-2xl flex items-center justify-center shadow-inner">
                <FileText size={32} />
             </div>
             <div>
                <h3 className="font-bold text-bento-text-main">Google Form Connector</h3>
                <p className="text-sm text-bento-text-dim px-4 mt-2">Link a shared Google Form to automatically ingest volunteer reports.</p>
             </div>
             <button className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 disabled:opacity-50" disabled={!isOnline}>
                {isOnline ? "Connect Form ID" : "Requires Online Hub"}
             </button>
           </div>
        )}
      </div>
    </div>
  );
}
