import React from 'react';
import { cn } from '../lib/utils';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={onClose} />
      
      {/* Sheet */}
      <div className="absolute bottom-0 left-0 w-full min-h-[300px] bg-brand-elevated z-[70] rounded-t-3xl flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-brand-border">
        <div className="flex items-center justify-between p-4 border-b border-brand-border">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 bg-brand-card hover:bg-brand-border rounded-full text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
      </div>
    </>
  );
}
