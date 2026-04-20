import React from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Buttons */
export function Button({ variant = 'primary', size = 'default', isLoading, className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'ghost', size?: 'default'|'sm', isLoading?: boolean }) {
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-primary-active text-white border-transparent",
    secondary: "bg-transparent border-brand-border-visible border hover:bg-brand-card text-white",
    ghost: "bg-transparent text-white hover:bg-brand-card border-transparent"
  };
  const sizes = {
    default: "h-[52px]",
    sm: "h-10 text-sm"
  };
  return (
    <button disabled={isLoading || props.disabled} className={cn("inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none w-full", variants[variant], sizes[size], className)} {...props}>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
}

/* Inputs */
export function Input({ className, label, error, rightElement, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string, rightElement?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <div className="relative">
        <input 
          className={cn("w-full bg-brand-input border border-brand-border rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-primary transition-colors text-base", error && "border-brand-error focus:border-brand-error", rightElement && "pr-12", className)} 
          {...props} 
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-brand-error mt-0.5">{error}</span>}
    </div>
  );
}

/* Checkbox */
export function Checkbox({ checked, onChange, label, className }: { checked: boolean, onChange: (val: boolean) => void, label: React.ReactNode, className?: string }) {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer", className)}>
      <div className={cn("w-6 h-6 rounded-md border shrink-0 flex items-center justify-center mt-0.5 transition-colors", checked ? "bg-brand-primary border-brand-primary" : "border-brand-border-visible bg-brand-input")}>
        {checked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className="text-sm text-gray-300 leading-tight select-none">{label}</span>
    </label>
  );
}

/* OTP Input */
export function OTPInput({ length = 6, value, onChange, isError }: { length?: number, value: string, onChange: (v: string) => void, isError?: boolean }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    const newVal = value.split('');
    newVal[index] = val.slice(-1);
    const result = newVal.join('');
    onChange(result);
    if (val && index < length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="flex justify-between w-full gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="tel"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={cn(
            "w-[50px] h-[56px] text-center text-xl font-bold rounded-xl bg-brand-input border focus:outline-none focus:border-brand-primary transition-colors",
            isError ? "border-brand-error text-brand-error" : value[i] ? "border-brand-primary text-white" : "border-brand-border text-white"
          )}
        />
      ))}
    </div>
  );
}

/* Status Badge */
export function StatusBadge({ status, label }: { status: 'pending'|'cancelled'|'active'|'verifying'|'inactive', label: string }) {
  const styles = {
    pending: "bg-brand-warning/10 text-brand-warning border-brand-warning/20",
    cancelled: "bg-brand-error/10 text-brand-error border-brand-error/20",
    active: "bg-brand-success/10 text-brand-success border-brand-success/20",
    verifying: "bg-brand-warning/10 text-brand-warning border-brand-warning/20",
    inactive: "bg-brand-border/10 text-gray-400 border-brand-border/20",
  };
  return (
    <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border", styles[status])}>
      {label}
    </span>
  );
}

/* Base Loader Screen (Reused anywhere that needs a full-page processing overlay) */
export function LoadingScreen({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-center h-full">
      <div className="w-20 h-20 bg-brand-card rounded-full flex items-center justify-center mb-6 relative">
         {/* Feather logo placeholder icon */}
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
         <span className="absolute bottom-1 right-1 w-3 h-3 bg-brand-primary rounded-full animate-ping"></span>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
}
