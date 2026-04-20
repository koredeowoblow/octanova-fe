import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

interface SecurityContextType {
  isLocked: boolean;
  unlock: (password: string) => boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState('');
  const [errorTimer, setErrorTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Reset timer on activity
  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Don't restart timer if already locked or on public auth routes
    if (!isLocked && !location.pathname.startsWith('/signup') && !location.pathname.startsWith('/login')) {
      timeoutRef.current = setTimeout(() => {
        setIsLocked(true);
      }, INACTIVITY_TIMEOUT_MS);
    }
  };

  useEffect(() => {
    // Initial start
    resetTimer();

    // Event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [isLocked, location.pathname]);

  const unlock = (pass: string) => {
    // Basic mock logic. In a real app, this verifies a hash.
    if (pass === '1234') { // Mock password
      setIsLocked(false);
      setPassword('');
      setErrorMsg('');
      resetTimer();
      return true;
    } else {
      setErrorMsg('Incorrect Password. Hint: 1234');
      if (errorTimer) clearTimeout(errorTimer);
      setErrorTimer(setTimeout(() => setErrorMsg(''), 3000));
      return false;
    }
  };

  // If locked, render an overlay instead of standard content
  // We render the overlay ON TOP and hide children to ensure security, 
  // keeping the router state intact so user returns right where they were.
  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-brand-card rounded-full border border-brand-border flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-brand-primary" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Session Locked</h1>
        <p className="text-gray-400 mb-8 max-w-[280px]">For your security, your session was locked after 5 minutes of inactivity.</p>
        
        <div className="w-full max-w-sm mb-6 flex flex-col items-center">
          <input 
            type="password" 
            placeholder="Enter password to unlock" 
            className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary mb-2 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsg && <span className="text-brand-error text-xs font-medium">{errorMsg}</span>}
        </div>

        <button 
          className="w-full max-w-sm bg-brand-primary text-white font-semibold py-3 rounded-xl disabled:opacity-50"
          disabled={!password}
          onClick={() => unlock(password)}
        >
          Unlock Session
        </button>

        <button 
          className="mt-6 text-gray-500 font-medium text-sm"
          onClick={() => {
            setIsLocked(false);
            navigate('/login/password');
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <SecurityContext.Provider value={{ isLocked, unlock }}>
      {children}
    </SecurityContext.Provider>
  );
}

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity must be used within SecurityProvider');
  return context;
};
