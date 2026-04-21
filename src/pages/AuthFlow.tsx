import React, { useState } from 'react';
import { Link, useNavigate, useParams, Outlet } from 'react-router-dom';
                                                                                                                                                                  import { Mail, Phone, Eye, EyeOff, Lock, CheckCircle2, Fingerprint, ScanFace } from 'lucide-react';
import { Button, Input, Checkbox, OTPInput } from '../components/ui';
import { Numpad } from '../components/Numpad';
import { cn } from '../lib/utils';
import { useBiometrics } from '../hooks/useBiometrics';
import { storage } from '../lib/storage';

/**
 * Layout to handle isolated screens without navbar.
 */
export function SigninSignupWelcome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full justify-center text-center">
      <div className="w-16 h-16 bg-brand-card rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
      </div>
      <h1 className="text-3xl font-bold mb-2">Welcome to OctaNova</h1>
      <p className="text-gray-400 text-sm mb-8">Access world class trading anywhere.</p>
      
      <div className="flex flex-col gap-4 w-full">
        <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button onClick={() => navigate('/login')} variant="secondary">Log In</Button>
      </div>
    </div>
  );
}

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <h1 className="text-2xl font-bold mb-2">Welcome to OctaNova</h1>
      <p className="text-gray-400 text-sm mb-8">Create an account to start trading securely.</p>
      
      <div className="flex flex-col gap-6 flex-1">
        <Input 
          placeholder="Email address or Phone number" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rightElement={<Mail className="w-5 h-5" />}
        />
        <Checkbox 
          checked={agreed} 
          onChange={setAgreed}
          label={<span>I agree to OctaNova's <Link to="#" className="text-brand-primary">Terms & Conditions</Link></span>}
        />
        
        <Button 
          disabled={!email || !agreed}
          onClick={() => navigate('/signup/confirm-email')}
        >
          Next
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-brand-border"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">or continue with</span>
          <div className="flex-grow border-t border-brand-border"></div>
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1 text-sm bg-brand-card border-none">Google</Button>
          <Button variant="secondary" className="flex-1 text-sm bg-brand-card border-none">Apple</Button>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-400 mt-auto">
        Already have an account? <Link to="/login" className="text-brand-primary font-medium">Login</Link>
      </p>
    </div>
  );
}

export function ConfirmEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  return (
    <div className="flex flex-col flex-1 p-6 h-full relative">
      <div className="flex-1 flex flex-col">
        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Verify your Email</h1>
        <p className="text-gray-400 text-sm mb-8">We've sent a code to <span className="text-white">k***@gmail.com</span></p>
        
        <OTPInput value={otp} onChange={setOtp} length={6} />
        
        <p className="text-center text-sm text-gray-400 mt-8 mb-auto">
          Didn't receive a code? <button className="text-brand-primary">Resend (59s)</button>
        </p>

        <Button disabled={otp.length !== 6} onClick={() => navigate('/signup/email-verified')}>Confirm Email</Button>
      </div>

      <div className="mt-8 -mx-6 mb-[-24px]">
        <Numpad 
          onPress={(d) => otp.length < 6 && setOtp(otp + d)}
          onDelete={() => setOtp(otp.slice(0, -1))}
        />
      </div>
    </div>
  );
}

export function EmailVerified() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full items-center justify-center text-center">
      <div className="w-32 h-32 bg-brand-card rounded-full flex items-center justify-center mb-8 relative">
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-brand-success/20 flex items-center justify-center border-4 border-brand-bg">
          <CheckCircle2 className="w-6 h-6 text-brand-success" />
        </div>
        <Mail className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Email verified successfully!</h1>
      <p className="text-gray-400 text-sm mb-12">You're one step closer to trading!</p>
      
      <Button className="mt-auto w-full" onClick={() => navigate('/signup/create-password')}>Continue</Button>
    </div>
  );
}

export function CreatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const reqs = [
    { label: "8-16 characters", met: password.length >= 8 && password.length <= 16 },
    { label: "At least 1 number", met: /\d/.test(password) },
    { label: "Upper and lowercase", met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
  ];
  const allMet = reqs.every(r => r.met);

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-6">
        <Lock className="w-6 h-6 text-pink-500" />
      </div>
      <h1 className="text-2xl font-bold mb-8">Create a Password</h1>
      
      <Input 
        type={show ? "text" : "password"}
        placeholder="Enter password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightElement={
          <button onClick={() => setShow(!show)}>
            {show ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        }
      />

      <div className="mt-8 flex flex-col gap-3">
        {reqs.map((req, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle2 className={cn("w-4 h-4", req.met ? "text-brand-success" : "text-gray-600")} />
            <span className={cn("text-sm", req.met ? "text-white" : "text-gray-500")}>{req.label}</span>
          </div>
        ))}
      </div>

      <Button disabled={!allMet} className="mt-auto" onClick={() => navigate('/signup/biometrics')}>Next</Button>
    </div>
  );
}

export function SignupBiometrics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<string | null>(null);
  const { checkAvailability, getBiometryType, authenticate } = useBiometrics();

  React.useEffect(() => {
    const init = async () => {
      const canUse = await checkAvailability();
      if (!canUse) {
        navigate('/signup/welcome');
        return;
      }

      const type = await getBiometryType();
      setAvailable(true);
      setBiometryType(String(type));
      setLoading(false);
    };

    init();
  }, [checkAvailability, getBiometryType, navigate]);

  const setupBiometrics = async () => {
    const ok = await authenticate('Enable biometric login for OctaNova');
    if (ok) {
      await storage.set('biometrics_enabled', 'true');
    }
    navigate('/signup/welcome');
  };

  if (loading) {
    return <div className="flex flex-1 items-center justify-center">Preparing biometrics...</div>;
  }

  if (!available) {
    return null;
  }

  const isFace = (biometryType ?? '').toLowerCase().includes('face');

  return (
    <div className="flex flex-col flex-1 p-6 h-full justify-center text-center">
      <div className="w-20 h-20 bg-brand-card rounded-full mx-auto mb-6 flex items-center justify-center border border-brand-border">
        {isFace ? <ScanFace className="w-10 h-10 text-brand-primary" /> : <Fingerprint className="w-10 h-10 text-brand-primary" />}
      </div>
      <h1 className="text-2xl font-bold mb-2">{isFace ? 'Set Up Face ID' : 'Set Up Touch ID'}</h1>
      <p className="text-gray-400 mb-8">Use biometrics for quicker and safer access to your wallet.</p>
      <Button onClick={setupBiometrics}>{isFace ? 'Set Up Face ID' : 'Set Up Touch ID'}</Button>
      <Button variant="ghost" className="mt-3" onClick={() => navigate('/signup/welcome')}>Skip for now</Button>
    </div>
  );
}

export function WelcomeAboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full justify-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mb-8">
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome aboard!</h1>
        <p className="text-gray-400">Your trading success begins now.</p>
      </div>
      <Button onClick={() => navigate('/home')}>Continue</Button>
    </div>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('koredeowolabi@gmail.com');

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
      <p className="text-gray-400 text-sm mb-8">Log in to start trading securely.</p>
      
      <div className="flex flex-col gap-6 flex-1">
        <Input 
          placeholder="Email address or Phone number" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rightElement={<Mail className="w-5 h-5" />}
        />
        
        <Button onClick={() => navigate('/login/password')}>Next</Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-brand-border"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">or continue with</span>
          <div className="flex-grow border-t border-brand-border"></div>
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1 text-sm bg-brand-card border-none">Google</Button>
          <Button variant="secondary" className="flex-1 text-sm bg-brand-card border-none">Apple</Button>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-400 mt-auto">
        Don't have an account? <Link to="/signup" className="text-brand-primary font-medium">Sign Up</Link>
      </p>
    </div>
  );
}

export function LoginPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    // SECURITY: Mock strict failed auth counting
    if (pw === 'password123') { 
      // success mock
      navigate('/home');
    } else {
      const currentAttempts = attempts + 1;
      setAttempts(currentAttempts);
      
      if (currentAttempts >= 5) {
        setIsLocked(true);
        setErrorMsg('');
      } else {
        setErrorMsg(`Incorrect password. ${5 - currentAttempts} attempts remaining.`);
      }
      setPw('');
    }
  };

  if (isLocked) {
    return (
      <div className="flex flex-col flex-1 p-6 h-full items-center justify-center text-center">
        <div className="w-20 h-20 bg-brand-error/20 rounded-full flex items-center justify-center mb-6 border border-brand-error/50">
          <Lock className="w-10 h-10 text-brand-error" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Account Locked</h1>
        <p className="text-gray-400 text-sm mb-6 max-w-[280px]">Too many failed login attempts. Your account has been temporarily locked to protect your security.</p>
        <p className="text-brand-error font-medium text-sm">Please try again in 15 minutes.</p>
        <Button className="mt-8 w-full" variant="secondary" onClick={() => navigate('/login/reset-password')}>Reset Password</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <h1 className="text-2xl font-bold mb-2">Enter your password</h1>
      <div className="px-4 py-3 bg-brand-card rounded-xl border border-brand-border text-gray-400 text-sm mb-8 flex justify-between items-center">
        <span>ko*********i@gmail.com</span>
        <button onClick={() => navigate(-1)} className="text-brand-primary">Edit</button>
      </div>
      
      <div className="flex flex-col gap-2">
        <Input 
          type="password" 
          placeholder="Password" 
          value={pw} 
          onChange={e => {
            setPw(e.target.value);
            setErrorMsg('');
          }}
          className={errorMsg ? 'border-brand-error focus:border-brand-error' : ''}
        />
        {errorMsg && <span className="text-brand-error text-xs font-medium">{errorMsg}</span>}
      </div>
      
      <Link to="/login/reset-password" className="text-brand-primary text-sm font-medium mt-4 select-none">Forgot Password?</Link>
      
      <Button className="mt-8" disabled={!pw} onClick={handleLogin}>Log In</Button>
      <p className="text-center text-xs text-gray-500 mt-4 px-4">Hint for demo: Correct password is <span className="text-white">password123</span>.</p>
    </div>
  );
}
