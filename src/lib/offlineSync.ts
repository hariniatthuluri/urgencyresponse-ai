
import { useState, useEffect } from 'react';

export interface OfflineRecord {
  id: string;
  data: any;
  timestamp: number;
}

const STORAGE_KEY = 'urgency_response_offline_sync';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingRecords, setPendingRecords] = useState<OfflineRecord[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial load from storage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPendingRecords(JSON.parse(stored));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingRecords));
  }, [pendingRecords]);

  const saveOffline = (data: any) => {
    const newRecord: OfflineRecord = {
      id: crypto.randomUUID(),
      data,
      timestamp: Date.now(),
    };
    setPendingRecords(prev => [...prev, newRecord]);
    return newRecord;
  };

  const clearRecords = () => {
    setPendingRecords([]);
  };

  const removeRecord = (id: string) => {
    setPendingRecords(prev => prev.filter(r => r.id !== id));
  };

  return {
    isOnline,
    pendingRecords,
    saveOffline,
    clearRecords,
    removeRecord
  };
}
