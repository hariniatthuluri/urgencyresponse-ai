
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[430px] h-[880px] bg-bento-bg rounded-[60px] shadow-2xl overflow-hidden border-[12px] border-bento-card relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-bento-card rounded-b-3xl z-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-bento-border mr-2" />
            <div className="w-12 h-1 bg-bento-border rounded-full" />
        </div>
        
        {/* Content */}
        <div className="h-full pt-8 flex flex-col overflow-y-auto no-scrollbar bg-bento-bg">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-bento-border rounded-full z-10" />
      </div>
    </div>
  );
}
