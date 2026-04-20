import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Wallet, BookOpen, AtSign, Globe, Settings2, ShieldCheck, 
  Bell, HelpCircle, MessageCircle, Info, ChevronRight, LogOut,
  Plus, Search, Copy, CheckCircle2 
} from 'lucide-react';
import { Button, Input, Checkbox } from '../components/ui';
import { cn } from '../lib/utils';

export function SettingsHub() {
  const navigate = useNavigate();
  
  const menu = [
    { label: 'Manage Wallets', icon: Wallet, path: '/settings/wallets' },
    { label: 'Address Book', icon: BookOpen, path: '/settings/address-book' },
    { label: 'OctaNova Handles', icon: AtSign, path: '/settings/handles' },
    { label: 'DApp Connection', icon: Globe, path: '/settings/dapps' },
    { divider: true },
    { label: 'Preferences', icon: Settings2, path: '/settings/preferences' },
    { label: 'Security', icon: ShieldCheck, path: '/settings/security' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
    { divider: true },
    { label: 'Help Center', icon: HelpCircle, path: '#' },
    { label: 'Support', icon: MessageCircle, path: '/support' },
    { label: 'About OctaNova', icon: Info, path: '#' },
  ];

  return (
    <div className="flex flex-col flex-1 pb-4">
      <header className="px-4 py-6 border-b border-brand-border flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-primary to-pink-500 p-0.5">
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border-2 border-black overflow-hidden">
            <span className="text-xl font-bold">K</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Korede Owolabi</h1>
          <span className="text-sm text-gray-400">@koredeowolabi</span>
        </div>
        <button onClick={() => navigate('/settings/profile')} className="ml-auto text-brand-primary text-sm font-medium bg-brand-primary/10 px-3 py-1.5 rounded-full">Edit</button>
      </header>

      <div className="flex flex-col px-4 py-4">
        {menu.map((item, i) => {
          if (item.divider) return <div key={i} className="my-2 border-b border-brand-border"></div>;
          const Icon = item.icon!;
          return (
            <Link key={i} to={item.path!} className="flex items-center justify-between py-4 hover:bg-brand-card/50 transition-colors rounded-xl px-2 -mx-2">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-[15px]">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
          );
        })}
        <button onClick={() => navigate('/signup/welcome')} className="flex items-center gap-3 py-4 text-brand-error hover:bg-brand-card/50 transition-colors rounded-xl px-2 -mx-2 mt-4">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-[15px]">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export function AddressBook() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const addresses = [
    { name: 'My Binance Vault', address: '0x71C...976F', coin: 'ETH' },
    { name: 'Satoshi Nakamoto', address: 'bc1qxy2kgdyg...x0wlh', coin: 'BTC' },
  ];

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <Input 
        placeholder="Search names or addresses" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightElement={<Search className="w-5 h-5" />}
      />

      <div className="flex flex-col gap-4 mt-6">
        {addresses.map((addr, i) => (
          <div key={i} className="bg-brand-card border border-brand-border rounded-2xl p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="bg-brand-input border border-brand-border px-2 py-0.5 rounded text-[10px] font-bold text-gray-400">{addr.coin}</span>
                <span className="font-medium">{addr.name}</span>
              </div>
              <span className="text-gray-500 font-mono text-sm">{addr.address}</span>
            </div>
            <button className="p-2 border border-brand-border rounded-full hover:bg-brand-border transition-colors">
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      <Button className="mt-auto" onClick={() => navigate('/settings/address-book/add')}>
        <Plus className="w-5 h-5 mr-2" /> Add New Address
      </Button>
    </div>
  );
}

export function AddressBookAdd() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6">
        <Input label="Name" placeholder="e.g. My Ledger Wallet" />
        <Input label="Coin" placeholder="Select Coin" rightElement={<ChevronRight className="w-5 h-5" />} />
        <Input label="Network" placeholder="Select Network" rightElement={<ChevronRight className="w-5 h-5" />} />
        <Input label="Address" placeholder="Enter or paste address" rightElement={<ScanIcon className="w-5 h-5 text-brand-primary cursor-pointer" />} />
      </div>
      <Button className="mt-auto" onClick={() => navigate(-1)}>Save Address</Button>
    </div>
  );
}

export function Preferences() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-gray-400 uppercase text-xs tracking-wider">General</h3>
        <button onClick={() => navigate('/settings/preferences/currency')} className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="font-medium">Local Currency</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>NGN (₦)</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
        <button onClick={() => navigate('/settings/preferences/language')} className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="font-medium">App Language</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>English</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
        <button onClick={() => navigate('/settings/preferences/theme')} className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="font-medium">Color Theme</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Dark</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
}

export function PreferencesCurrency() {
  const [selected, setSelected] = useState('NGN');
  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <Input placeholder="Search currency" rightElement={<Search className="w-5 h-5" />} />
      <div className="flex flex-col mt-6 gap-2">
        {currencies.map(c => (
          <button 
            key={c.code}
            onClick={() => setSelected(c.code)}
            className="flex items-center justify-between p-4 bg-brand-card border border-brand-border rounded-xl hover:bg-brand-border-visible transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-input flex items-center justify-center font-medium text-gray-300 border border-brand-border">{c.symbol}</div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-white">{c.code}</span>
                <span className="text-xs text-gray-400">{c.name}</span>
              </div>
            </div>
            <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", selected === c.code ? "border-brand-primary" : "border-brand-border-visible")}>
              {selected === c.code && <div className="w-3 h-3 bg-brand-primary rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PreferencesLanguage() {
  const [selected, setSelected] = useState('English');
  const languages = ['English', 'French', 'Spanish', 'Portuguese'];

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <div className="flex flex-col gap-2">
        {languages.map(lang => (
          <button 
            key={lang}
            onClick={() => setSelected(lang)}
            className="flex items-center justify-between p-4 bg-brand-card border border-brand-border rounded-xl hover:bg-brand-border-visible transition-colors"
          >
            <span className="font-semibold text-white">{lang}</span>
            <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", selected === lang ? "border-brand-primary" : "border-brand-border-visible")}>
              {selected === lang && <div className="w-3 h-3 bg-brand-primary rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PreferencesTheme() {
  const [selected, setSelected] = useState('Dark');
  const themes = [
    { id: 'Dark', desc: 'Darker interface for low light.' },
    { id: 'Light', desc: 'Bright and clean.' },
    { id: 'System Match', desc: 'Automatically matches your device.' }
  ];

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <div className="flex flex-col gap-2">
        {themes.map(theme => (
          <button 
            key={theme.id}
            onClick={() => setSelected(theme.id)}
            className="flex items-center justify-between p-4 bg-brand-card border border-brand-border rounded-xl hover:bg-brand-border-visible transition-colors text-left"
          >
            <div className="flex flex-col gap-1">
               <span className="font-semibold text-white">{theme.id}</span>
               <span className="text-xs text-gray-400">{theme.desc}</span>
            </div>
            <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", selected === theme.id ? "border-brand-primary" : "border-brand-border-visible")}>
              {selected === theme.id && <div className="w-3 h-3 bg-brand-primary rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Security() {
  const [biometrics, setBiometrics] = useState(true);
  const [hideBal, setHideBal] = useState(false);

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-gray-400 uppercase text-xs tracking-wider">Authentication</h3>
        <button className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="font-medium">Change Password</span>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex justify-between items-center pb-4 border-b border-brand-border">
          <div className="flex flex-col">
            <span className="font-medium">Face ID / Biometrics</span>
            <span className="text-xs text-gray-500">Fast and secure login</span>
          </div>
          <ToggleSwitch checked={biometrics} onChange={() => setBiometrics(!biometrics)} />
        </div>
        
        <h3 className="font-semibold text-gray-400 uppercase text-xs tracking-wider mt-4">Privacy</h3>
        <div className="flex justify-between items-center pb-4 border-b border-brand-border">
          <div className="flex flex-col">
            <span className="font-medium">Hide Balances on App Open</span>
          </div>
          <ToggleSwitch checked={hideBal} onChange={() => setHideBal(!hideBal)} />
        </div>
      </div>
    </div>
  );
}

export function DAppConnection() {
  return (
    <div className="flex flex-col flex-1 p-6 h-full items-center justify-center text-center">
      <div className="w-24 h-24 bg-brand-card rounded-full flex items-center justify-center mb-6">
        <Globe className="w-10 h-10 text-brand-primary" />
      </div>
      <h2 className="text-xl font-bold mb-2">No Connected DApps</h2>
      <p className="text-gray-400 text-sm mb-8">You haven't connected your OctaNova wallet to any decentralized applications yet.</p>
      <Button className="w-full">Connect via WalletConnect</Button>
    </div>
  );
}

export function OctaNovaHandles() {
  return (
    <div className="flex flex-col flex-1 p-6 h-full text-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-xs mx-auto">
        <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mb-6 border-2 border-brand-primary/50">
          <AtSign className="w-10 h-10 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Claim your identity</h2>
        <p className="text-gray-400 text-sm mb-8">Send and receive crypto instantly using a readable handle instead of long complex addresses.</p>
        
        <div className="w-full bg-brand-card border border-brand-border rounded-xl p-4 flex items-center gap-2 mb-8">
          <AtSign className="w-5 h-5 text-brand-primary" />
          <span className="text-lg font-medium text-white">koredeowolabi</span>
          <CheckCircle2 className="w-5 h-5 text-brand-success ml-auto" />
        </div>
      </div>
      <Button className="w-full mt-auto" variant="secondary">Share My Handle</Button>
    </div>
  );
}

export function ManageTokens() {
  const [tokens, setTokens] = useState([
    { symbol: 'BTC', name: 'Bitcoin', bg: 'bg-[#F7931A]', network: 'Bitcoin', enabled: true },
    { symbol: 'ETH', name: 'Ethereum', bg: 'bg-[#627EEA]', network: 'Ethereum', enabled: true },
    { symbol: 'BNB', name: 'BNB', bg: 'bg-[#F3BA2F]', network: 'BNB Smart Chain', enabled: true },
    { symbol: 'USDT', name: 'Tether', bg: 'bg-[#26A17B]', network: 'Tron', enabled: true },
    { symbol: 'SOL', name: 'Solana', bg: 'bg-black', network: 'Solana', enabled: false },
    { symbol: 'MATIC', name: 'Polygon', bg: 'bg-[#8247E5]', network: 'Polygon', enabled: false }
  ]);

  const toggleToken = (index: number) => {
    const newTokens = [...tokens];
    newTokens[index].enabled = !newTokens[index].enabled;
    setTokens(newTokens);
  };

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <Input placeholder="Search tokens..." rightElement={<Search className="w-5 h-5 text-gray-500" />} />
      <div className="flex flex-col gap-0 mt-4 pb-4">
        {tokens.map((token, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner", token.bg)}>{token.symbol[0]}</div>
              <div className="flex flex-col border-none">
                <span className="font-semibold text-white">{token.symbol}</span>
                <span className="text-xs text-gray-500">{token.network}</span>
              </div>
            </div>
            <ToggleSwitch checked={token.enabled} onChange={() => toggleToken(i)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Helpers
function ScanIcon(props: any) {
  return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
}

function ToggleSwitch({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={cn("w-12 h-6 rounded-full transition-colors relative", checked ? "bg-brand-primary" : "bg-brand-border-visible")}
    >
      <div className={cn("w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow", checked ? "left-[26px]" : "left-0.5")}></div>
    </button>
  );
}

export function ManageWallets() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="bg-brand-card border-brand-primary border-2 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden cursor-pointer">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/10 rounded-bl-full blur-xl"></div>
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-white">Main Wallet</span>
              <span className="text-[11px] text-gray-400">Multi-coin • 12 seed words</span>
            </div>
          </div>
          <div className="flex gap-2 items-center z-10">
            <span className="bg-brand-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">Active</span>
            <button className="p-1 hover:bg-brand-border rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
          </div>
        </div>

        <div className="bg-brand-bg border border-brand-border rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-brand-card transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-input flex items-center justify-center border border-brand-border">
              <Wallet className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-gray-300">Trading Wallet</span>
              <span className="text-[11px] text-gray-500">Imported • Private Key</span>
            </div>
          </div>
          <button className="p-1 hover:bg-brand-border rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
        </div>
      </div>
      
      <div className="mt-auto flex flex-col gap-3">
         <Button variant="secondary"><Plus className="w-5 h-5 mr-2" /> Create New Wallet</Button>
         <Button variant="ghost" className="border border-brand-border">Import Existing Wallet</Button>
      </div>
    </div>
  );
}

export function EditProfile() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col items-center justify-center mb-8 pt-4">
        <div className="relative w-24 h-24 mb-3">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-primary to-pink-500 p-1">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center border-2 border-black overflow-hidden relative group">
              <span className="text-3xl font-bold text-white">K</span>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors">
                <svg className="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
            </div>
          </div>
        </div>
        <span className="text-brand-primary text-sm font-medium hover:text-brand-primary-active cursor-pointer transition-colors">Change Avatar</span>
      </div>

      <div className="flex flex-col gap-5">
        <Input label="Full Name" defaultValue="Korede Owolabi" />
        <Input label="Username / Handle" defaultValue="koredeowolabi" rightElement={<span className="text-brand-primary font-bold">@</span>} />
        <Input label="Email Address" type="email" defaultValue="koredeowolabi62@gmail.com" />
        <Input label="Phone Number" type="tel" defaultValue="+234 812 345 6789" />
      </div>

      <Button className="mt-8 mb-4 w-full" onClick={() => navigate(-1)}>Save Changes</Button>
    </div>
  );
}
