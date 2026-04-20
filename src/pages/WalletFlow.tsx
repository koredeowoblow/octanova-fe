import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui';

export function CreateWalletPassword() {
  const navigate = useNavigate();
  // Simplified for demo, shares UI with signup password
  return (
    <div className="flex flex-col flex-1 p-6 h-full justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Set up Biometrics</h1>
      <p className="text-gray-400 mb-8">OctaNova wants to use your Face ID to secure your wallet.</p>
      <Button onClick={() => navigate('/wallet/create/seed')}>Set Up Now</Button>
      <Button variant="ghost" onClick={() => navigate('/wallet/create/seed')} className="mt-4">Skip for now</Button>
    </div>
  );
}

export function CreateWalletSeed() {
  const navigate = useNavigate();
  const seed = ["apple", "burger", "coffee", "dragon", "eagle", "falcon", "ghost", "hammer", "island", "jungle", "kangaroo", "lemon"];
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(seed.join(' ')).then(() => {
      setCopied(true);
      // Security Requirement: Clear clipboard automatically after 60 seconds
      setTimeout(() => {
        navigator.clipboard.writeText('');
        setCopied(false);
      }, 60000);
    });
  };

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <h1 className="text-2xl font-bold mb-2">Set Your Seed Phrase</h1>
      <p className="text-gray-400 text-sm mb-6">Write down these 12 words in order. Tap and hold to reveal.</p>

      <div 
        className="grid grid-cols-2 gap-3 mb-6 relative select-none"
        onPointerDown={() => setIsRevealed(true)}
        onPointerUp={() => setIsRevealed(false)}
        onPointerLeave={() => setIsRevealed(false)}
      >
        {seed.map((word, i) => (
          <div key={i} className="flex items-center gap-2 bg-brand-input border border-brand-border rounded-xl px-4 py-3 overflow-hidden">
            <span className="text-gray-500 text-sm w-4 shrink-0">{i + 1}.</span>
            <span className={cn("font-medium text-white transition-all duration-200", !isRevealed && "blur-md select-none")}>{word}</span>
          </div>
        ))}
        
        {!isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-brand-bg/80 px-4 py-2 rounded-full border border-brand-border text-sm font-medium flex items-center gap-2 shadow-xl backdrop-blur-sm">
              Tap & Hold to Reveal
            </div>
          </div>
        )}
      </div>

      <button onClick={handleCopy} className={cn("flex items-center gap-2 justify-center w-full mb-8 font-medium transition-colors", copied ? "text-brand-success" : "text-brand-primary")}>
        {copied ? (
          <><CheckCircle2 className="w-4 h-4" /> Copied (Clears in 60s)</>
        ) : (
          <><Copy className="w-4 h-4" /> Copy Seed Phrase</>
        )}
      </button>

      <div className="flex flex-col gap-3 text-sm text-gray-400">
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-error mt-1.5 shrink-0" />
          <p className="text-brand-error">Never share these words with anyone.</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
          <p>Please handwrite your seed phrase and keep it somewhere safe.</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
          <p>Don't store it on unsecured digital devices.</p>
        </div>
      </div>

      <Button className="mt-auto" onClick={() => navigate('/wallet/create/loading')}>Continue</Button>
    </div>
  );
}

export function WalletLoading() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const t = setTimeout(() => navigate('/home'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-center h-full">
      <div className="w-24 h-24 bg-brand-card rounded-full flex items-center justify-center mb-8 relative border-2 border-brand-primary shadow-[0_0_40px_rgba(124,58,237,0.3)]">
         <RefreshCw className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Creating your wallet...</h2>
      <p className="text-gray-400">This may take up to 5 mins.</p>
    </div>
  );
}
