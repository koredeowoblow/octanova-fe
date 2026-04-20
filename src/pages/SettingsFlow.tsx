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
  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-gray-400 uppercase text-xs tracking-wider">General</h3>
        <button className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="font-medium">Local Currency</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>NGN (₦)</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
        <button className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="font-medium">App Language</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>English</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
        <button className="flex justify-between items-center pb-4 border-b border-brand-border">
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
