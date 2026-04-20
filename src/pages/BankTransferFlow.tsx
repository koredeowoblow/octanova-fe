import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Copy, RefreshCw, CheckCircle2, Building2 } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { Numpad } from '../components/Numpad';

export function BankTransferSelectBank() {
  const navigate = useNavigate();
  const banks = [
    { name: 'Guaranty Trust Bank', code: 'GTB' },
    { name: 'Kuda Bank', code: 'KUD' },
    { name: 'Access Bank', code: 'ACC' },
    { name: 'Moniepoint Microfinance Bank', code: 'MNP' }
  ];

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <Input placeholder="Search your bank" rightElement={<Search className="w-5 h-5" />} />
      <div className="flex flex-col mt-6">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Supported Banks</span>
        {banks.map((bank, i) => (
          <div key={i} onClick={() => navigate('/deposit/bank/amount')} className="flex items-center justify-between py-4 border-b border-brand-border cursor-pointer hover:bg-brand-card/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-input flex items-center justify-center border border-brand-border">
                <Building2 className="w-5 h-5 text-brand-primary" />
              </div>
              <span className="font-semibold text-white">{bank.name}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BankTransferAmount() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center justify-center py-8">
           <span className="text-gray-400 font-medium">You will deposit</span>
           <span className="text-5xl font-bold tracking-tight text-white mb-2">₦{amount || '0'}</span>
           <span className="text-xs text-gray-500">Min: ₦1,000 | Max: ₦5,000,000</span>
        </div>
      </div>

      <div className="mt-auto mb-[-24px] -mx-6">
        <Numpad hasDecimal={false} onPress={(d) => setAmount(prev => prev === '0' ? d : prev + d)} onDelete={() => setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')} />
        <div className="px-6 pb-6 pt-2">
          <Button disabled={amount === '0' || parseInt(amount) < 1000} onClick={() => navigate('/deposit/bank/details')}>Continue to Payment</Button>
        </div>
      </div>
    </div>
  );
}

export function BankTransferDetails() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 p-6 h-full relative">
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl p-4 text-sm mb-6 flex gap-3 items-start">
         <span className="font-bold shrink-0">⚠️</span>
         <span>Make sure to transfer from a bank account matching your KYC name <strong className="font-bold font-mono">KOREDE OWOLABI</strong></span>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <h3 className="font-bold text-lg">Transfer exactly</h3>
        <span className="text-4xl font-bold tracking-tight text-brand-primary">₦150,000</span>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-xl p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="text-gray-400 text-sm">Account Name</span>
          <span className="font-medium">OctaNova Technologies</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-brand-border">
          <span className="text-gray-400 text-sm">Bank Name</span>
          <span className="font-medium">Wema Bank</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-400 text-sm">Account Number</span>
          <div className="flex justify-between items-center">
            <span className="font-bold text-2xl tracking-widest text-white">0123456789</span>
            <div className="flex items-center gap-1 text-brand-primary cursor-pointer hover:opacity-80">
              <span className="text-sm font-semibold">Copy</span>
              <Copy className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Button onClick={() => navigate('/deposit/bank/processing')}>I've made the transfer</Button>
        <Button variant="ghost" onClick={() => navigate('/deposit')} className="text-gray-500">Cancel</Button>
      </div>
    </div>
  );
}

export function BankTransferProcessing() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const t = setTimeout(() => navigate('/deposit/bank/success'), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-center h-full">
      <div className="w-24 h-24 bg-brand-card rounded-full flex items-center justify-center mb-8 relative border-2 border-brand-primary shadow-[0_0_40px_rgba(124,58,237,0.3)]">
         <RefreshCw className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Finding your deposit</h2>
      <p className="text-gray-400 px-4">We are checking with the bank. This usually takes between 1-5 minutes depending on the network.</p>
    </div>
  );
}

export function BankTransferSuccess() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full items-center justify-center text-center">
      <div className="w-32 h-32 bg-brand-card rounded-full flex items-center justify-center mb-8 relative">
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-brand-success/20 flex items-center justify-center border-4 border-brand-bg">
          <CheckCircle2 className="w-6 h-6 text-brand-success" />
        </div>
        <Building2 className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-white">₦150,000 Deposited</h1>
      <p className="text-gray-400 text-sm mb-12">
        Your fiat deposit was successful and has been credited to your Main Wallet.
      </p>
      
      <Button className="mt-auto w-full" onClick={() => navigate('/home')}>
        Back to Home
      </Button>
    </div>
  );
}
