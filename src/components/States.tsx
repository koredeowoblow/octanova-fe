import React from 'react';
import { RefreshCw, AlertCircle, Inbox } from 'lucide-react';
import { Button } from './ui';
import { cn } from '../lib/utils';

export function SkeletonLoader({ className, type = 'card' }: { className?: string, type?: 'card' | 'list' | 'text' }) {
  if (type === 'list') {
    return (
      <div className={cn("flex flex-col gap-4 w-full", className)}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-4 bg-brand-card/30 p-4 rounded-xl animate-pulse border border-brand-border/30">
            <div className="w-10 h-10 rounded-full bg-brand-border/40 shrink-0"></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 w-1/3 bg-brand-border/40 rounded-full"></div>
              <div className="h-2 w-1/4 bg-brand-border/30 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (type === 'text') {
    return (
      <div className={cn("flex flex-col gap-2 w-full animate-pulse", className)}>
        <div className="h-3 w-3/4 bg-brand-border/40 rounded-full"></div>
        <div className="h-3 w-1/2 bg-brand-border/40 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-brand-card/30 rounded-2xl p-6 flex flex-col gap-4 animate-pulse border border-brand-border/30", className)}>
      <div className="h-4 w-1/2 bg-brand-border/40 rounded-full"></div>
      <div className="h-8 w-3/4 bg-brand-border/40 rounded-full mt-2"></div>
      <div className="h-3 w-1/3 bg-brand-border/30 rounded-full mt-4"></div>
    </div>
  );
}

export function ErrorState({ message, onRetry, className }: { message: string, onRetry?: () => void, className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-6 w-full py-12", className)}>
      <div className="w-16 h-16 bg-brand-error/10 text-brand-error rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Something went wrong</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-[280px]">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="w-auto px-6">
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ message, className, icon: Icon = Inbox }: { message: string, className?: string, icon?: any }) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-6 w-full py-12", className)}>
      <div className="w-16 h-16 bg-brand-input text-gray-500 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">No Results Found</h3>
      <p className="text-gray-400 text-sm max-w-[280px]">{message}</p>
    </div>
  );
}
