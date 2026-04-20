import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Scan, ArrowDownLeft, ArrowUpRight, ArrowRightLeft, History, Search } from 'lucide-react';
import { Button } from '../components/ui';
import { cn } from '../lib/utils';

export function Home() {
  const navigate = useNavigate();
  const [kycmissing] = useState(true);

  const tokens = [
    { symbol: 'BTC', name: 'Bitcoin', bg: 'bg-[#F7931A]', network: 'Bitcoin', balance: '0.00', value: '$0.00' },
    { symbol: 'ETH', name: 'Ethereum', bg: 'bg-[#627EEA]', network: 'Ethereum', balance: '0.00', value: '$0.00' },
    { symbol: 'BNB', name: 'BNB', bg: 'bg-[#F3BA2F]', network: 'BNB Smart Chain', balance: '0.00', value: '$0.00' },
    { symbol: 'USDT', name: 'Tether', bg: 'bg-[#26A17B]', network: 'Tron', balance: '0.00', value: '$0.00' },
  ];

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-brand-card rounded-full px-4 py-2 border border-brand-border cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-brand-primary"></div>
          <span className="text-sm font-medium">Main Wallet</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/notifications" className="p-2 bg-brand-card hover:bg-brand-border rounded-full"><Bell className="w-5 h-5 text-white" /></Link>
          <button className="p-2 bg-brand-card hover:bg-brand-border rounded-full"><Scan className="w-5 h-5 text-white" /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto w-full px-4 pb-8">
        {/* Balance Area */}
        <div className="flex flex-col items-center justify-center py-6">
          <span className="text-[40px] font-bold tracking-tight">$0.00</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <ActionBtn icon={<ArrowDownLeft className="text-brand-primary" />} label="Receive" onClick={() => navigate('/receive')} />
          <ActionBtn icon={<ArrowUpRight className="text-brand-primary" />} label="Send" onClick={() => navigate('/send')} />
          <ActionBtn icon={<ArrowRightLeft className="text-brand-primary" />} label="Swap" onClick={() => navigate('/swap')} />
          <ActionBtn icon={<History className="text-brand-primary" />} label="History" onClick={() => navigate('/history')} />
        </div>

        {/* KYC Banner */}
        {kycmissing && (
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4 mb-6 relative overflow-hidden flex flex-col gap-3 object-cover">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              <div className="w-2 h-2 rounded-full bg-brand-border-visible"></div>
              <div className="w-2 h-2 rounded-full bg-brand-border-visible"></div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Verify phone number and earn points.</h3>
              <p className="text-xs text-gray-400">Complete KYC to start trading securely</p>
            </div>
            <Button size="sm" className="w-max px-6 mt-2" onClick={() => navigate('/kyc')}>Verify Now</Button>
          </div>
        )}

        {/* Earn Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-900/10 border border-amber-500/30 rounded-2xl p-4 mb-6 flex justify-between items-center cursor-pointer relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full"></div>
           <div>
             <h3 className="text-amber-500 font-bold mb-1">Earn 30% yield on-chain</h3>
             <p className="text-xs text-gray-400">Stake your secure crypto assets today</p>
           </div>
        </div>

        {/* Tokens List */}
        <div className="flex flex-col gap-0 pb-4">
          <div className="flex items-center justify-between py-2 mb-2">
            <h3 className="font-semibold">Tokens</h3>
            <Link to="/settings/tokens" className="text-brand-primary text-sm">Manage</Link>
          </div>
          
          {tokens.map((token, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-brand-border cursor-pointer hover:bg-brand-card/50 transition-colors" onClick={() => navigate(`/market/onchain`)}>
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner", token.bg)}>{token.symbol[0]}</div>
                <div className="flex flex-col">
                  <span className="font-semibold">{token.symbol}</span>
                  <span className="text-xs text-gray-500">{token.network}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold">{token.balance}</span>
                <span className="text-xs text-gray-500">{token.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className="w-14 h-14 bg-brand-card border border-brand-border rounded-full flex items-center justify-center group-hover:bg-brand-border-visible transition-colors">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-gray-300">{label}</span>
    </button>
  );
}

export function Deposit() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-4">
      <h1 className="text-2xl font-bold mb-6">Deposit</h1>
      <div className="flex flex-col gap-4">
        <DepositOption 
          title="Deposit crypto" 
          desc="Add crypto funds to your OctaNova account setup" 
          onClick={() => navigate('/deposit/crypto')}
        />
        <DepositOption 
          title="Buy with credit/debit card" 
          desc="Enjoy 0 fees via Visa, Mastercard, Google Pay and Apple Pay every Friday" 
          onClick={() => navigate('/deposit/card')}
        />
        <DepositOption 
          title="P2P trading" 
          desc="Buy crypto from others and enjoy rewards on Octanova" 
          onClick={() => navigate('/p2p')}
        />
        <DepositOption 
          title="Bank transfer" 
          badge="New"
          desc="Buy crypto via bank transfer seamlessly from your bank app" 
        />
      </div>
    </div>
  );
}

function DepositOption({ title, desc, badge, onClick }: any) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-brand-border-visible transition-colors" onClick={onClick}>
      <div className="flex flex-col gap-1 pr-4">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-[15px]">{title}</span>
          {badge && <span className="text-[10px] bg-brand-primary text-white px-2 py-0.5 rounded-full">{badge}</span>}
        </div>
        <p className="text-[12px] text-gray-500 tracking-tight leading-4">{desc}</p>
      </div>
      <ArrowUpRight className="text-brand-primary w-5 h-5 shrink-0" />
    </div>
  )
}
