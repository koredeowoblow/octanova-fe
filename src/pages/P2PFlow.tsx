import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Filter, ChevronDown, CheckCircle2, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button, Input, OTPInput } from '../components/ui';
import { BottomSheet } from '../components/BottomSheet';

export function P2P() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'buy'|'sell'>('buy');
  const [filterOpen, setFilterOpen] = useState(false);

  const sellers = [
    { name: "Slickbee", trades: 310, completion: "98.5%", price: "139,247,858", qty: "0.0001 - 0.05", bank: "Bank Transfer" },
    { name: "OctaTrader", trades: 1450, completion: "100%", price: "139,500,000", qty: "0.01 - 2.5", bank: "Bank Transfer" }
  ];

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between border-b border-brand-border sticky top-0 bg-brand-bg z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
          <div className="flex bg-brand-card rounded-full p-1 border border-brand-border">
            <button className={`px-4 py-1.5 rounded-full text-sm font-medium ${tab === 'buy' ? 'bg-brand-primary text-white' : 'text-gray-400'}`} onClick={() => setTab('buy')}>Buy</button>
            <button className={`px-4 py-1.5 rounded-full text-sm font-medium ${tab === 'sell' ? 'bg-red-500 text-white' : 'text-gray-400'}`} onClick={() => setTab('sell')}>Sell</button>
          </div>
        </div>
        <button><Filter className="w-5 h-5" /></button>
      </header>

      {/* Filters Row */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-b border-brand-border">
        <FilterPill label="BTC" />
        <FilterPill label="Amount" onClick={() => setFilterOpen(true)} />
        <FilterPill label="Payment Method" />
      </div>

      {/* Seller List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {sellers.map((s, i) => (
          <div key={i} className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-pink-500 flex items-center justify-center font-bold text-xs">{s.name[0]}</div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{s.name} <CheckCircle2 className="w-3 h-3 inline text-brand-success" /></span>
                  <span className="text-[10px] text-gray-500">{s.trades} trades | {s.completion} completion</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>{s.bank}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-2">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Price</span>
                <span className="font-bold text-xl text-white">₦{s.price}</span>
                <span className="text-gray-500 text-[11px] mt-1">Limit: {s.qty} BTC</span>
              </div>
              <Button size="sm" className="w-[100px]" onClick={() => navigate('/p2p/buy')}>Buy</Button>
            </div>
          </div>
        ))}
      </div>

      <BottomSheet isOpen={filterOpen} onClose={() => setFilterOpen(false)} title="Select Limit">
        <div className="p-4 flex flex-col gap-4">
          <Input placeholder="Enter Amount (NGN)" type="number" />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {['1,000', '5,000', '10,000', '50,000', '100,000', '200,000'].map((amt) => (
              <button key={amt} className="py-3 bg-brand-card hover:bg-brand-border rounded-xl text-sm font-medium border border-brand-border">₦{amt}</button>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="secondary" onClick={() => setFilterOpen(false)}>Reset</Button>
            <Button onClick={() => setFilterOpen(false)}>Confirm</Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

function FilterPill({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-card border border-brand-border rounded-full text-xs font-medium whitespace-nowrap">
      {label}
      <ChevronDown className="w-3 h-3" />
    </button>
  );
}

export function P2PBuy() {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleVerifyOTP = () => {
    // SECURITY: Simulated OTP validation API call for trade action
    if(otp.length === 6) {
      setShowOtp(false);
      navigate('/p2p/transaction');
    }
  };

  if (showOtp) {
    return (
      <div className="flex flex-col flex-1 p-6 h-full items-center justify-center relative">
        <h2 className="text-xl font-bold mb-2">Security Verification</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Enter the 6-digit code sent to your phone to authorize this trade.</p>
        
        <OTPInput length={6} value={otp} onChange={setOtp} />
        
        <div className="mt-8 flex flex-col gap-3 w-full">
          <Button disabled={otp.length !== 6} onClick={handleVerifyOTP}>Verify & Buy</Button>
          <Button variant="ghost" onClick={() => setShowOtp(false)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 h-full relative">
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl p-3 text-sm mb-6 flex gap-2">
        <span>Kindly make payment within 15 minutes</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400 text-sm">Rate</span>
        <span className="font-bold text-white tracking-wide">139,247,858 NGN</span>
      </div>

      <div className="flex flex-col gap-4">
        <Input label="You pay" placeholder="10,000" rightElement={<span className="text-brand-primary font-bold text-sm">NGN</span>} />
        <Input label="You receive" placeholder="0.000071" rightElement={<span className="text-white font-bold text-sm">BTC</span>} />
        
        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-sm font-medium text-gray-300">Payment method</label>
          <div className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-4 flex justify-between items-center">
            <span>Bank Transfer</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mt-8 mb-auto">
        <Link to="/p2p/seller" className="text-sm text-brand-primary flex items-center gap-1">Get more details about seller <ChevronDown className="w-4 h-4 -rotate-90" /></Link>
      </div>

      <Button className="mt-auto" onClick={() => setShowOtp(true)}>Buy BTC with 0 fees</Button>
    </div>
  );
}

export function P2PSell() {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleVerifyOTP = () => {
    // SECURITY: Simulated OTP validation API call for trade action
    if(otp.length === 6) {
      setShowOtp(false);
      navigate('/p2p/transaction');
    }
  };

  if (showOtp) {
    return (
      <div className="flex flex-col flex-1 p-6 h-full items-center justify-center relative">
        <h2 className="text-xl font-bold mb-2">Security Verification</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Enter the 6-digit code sent to your phone to authorize this trade.</p>
        
        <OTPInput length={6} value={otp} onChange={setOtp} />
        
        <div className="mt-8 flex flex-col gap-3 w-full">
          <Button disabled={otp.length !== 6} onClick={handleVerifyOTP}>Verify & Sell</Button>
          <Button variant="ghost" onClick={() => setShowOtp(false)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 h-full relative">
      <div className="bg-brand-error/10 border border-brand-error/30 text-brand-error rounded-xl p-3 text-sm mb-6 flex gap-2">
        <span>Carefully verify payment before releasing assets</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400 text-sm">Rate</span>
        <span className="font-bold text-white tracking-wide">139,247,858 NGN</span>
      </div>

      <div className="flex flex-col gap-4">
        <Input label="You sell" placeholder="0.000071" rightElement={<span className="text-white font-bold text-sm">BTC</span>} />
        <Input label="You receive" placeholder="10,000" rightElement={<span className="text-brand-success font-bold text-sm">NGN</span>} />
        
        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-sm font-medium text-gray-300">Select receiving account</label>
          <div className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-4 flex justify-between items-center">
            <span>Guaranty Trust Bank - **449</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mt-8 mb-auto">
        <Link to="/p2p/seller" className="text-sm text-brand-primary flex items-center gap-1">Get more details about buyer <ChevronDown className="w-4 h-4 -rotate-90" /></Link>
      </div>

      <Button className="mt-auto bg-brand-error hover:bg-brand-error border-brand-error" onClick={() => setShowOtp(true)}>Sell BTC with 0 fees</Button>
    </div>
  );
}
