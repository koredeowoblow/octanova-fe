import React from 'react';
import { cn } from '../lib/utils';
import { Delete } from 'lucide-react';
import { haptic } from '../lib/haptics';

interface NumpadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
  className?: string;
  hasDecimal?: boolean;
}

export function Numpad({ onPress, onDelete, className, hasDecimal }: NumpadProps) {
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", hasDecimal ? "." : "", "0", "del"];

  return (
    <div className={cn("w-full grid grid-cols-3 gap-2 p-4", className)}>
      {digits.map((digit, i) => {
        if (!digit) return <div key={i} />
        if (digit === 'del') {
          return (
            <button key={i} onClick={() => { haptic.light(); onDelete(); }} className="flex items-center justify-center p-4 active:bg-brand-card rounded-2xl transition-colors text-white">
              <Delete className="w-6 h-6" />
            </button>
          )
        }
        return (
          <button key={i} onClick={() => { haptic.light(); onPress(digit); }} className="flex items-center justify-center p-4 active:bg-brand-card rounded-2xl transition-colors text-2xl font-medium text-white">
            {digit}
          </button>
        )
      })}
    </div>
  );
}
