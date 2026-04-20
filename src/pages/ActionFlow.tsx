import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownLeft, ArrowUpRight, Copy, CheckCircle2, QrCode, Search, Scan, XCircle, RefreshCw } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { Numpad } from '../components/Numpad';
import { cn } from '../lib/utils';

export function Receive() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full items-center">
      <div className="w-full bg-brand-card border border-brand-border rounded-3xl p-8 flex flex-col items-center gap-6 mt-8">
        <div className="bg-white p-4 rounded-2xl">
          {/* Placeholder for QR Code */}
          <QrCode className="w-48 h-48 text-black" />
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Your Ethereum Address</p>
          <p className="font-mono text-sm text-white break-all">0x71C...976F</p>
        </div>

        <Button className="w-full mt-4 bg-brand-input border border-brand-border text-white hover:bg-brand-border" variant="secondary">
          <Copy className="w-4 h-4 mr-2" /> Copy Address
        </Button>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl p-4 text-xs mt-6 text-center">
        Send only Ethereum (ERC-20) to this address. Sending any other coins may result in permanent loss.
      </div>
    </div>
  );
}

export function SendSelectCoin() {
  const navigate = useNavigate();
  const tokens = [
    { symbol: 'BTC', name: 'Bitcoin', bg: 'bg-[#F7931A]', network: 'Bitcoin', balance: '0.045', value: '$2,450.00' },
    { symbol: 'ETH', name: 'Ethereum', bg: 'bg-[#627EEA]', network: 'Ethereum', balance: '1.45', value: '$4,132.50' },
    { symbol: 'USDT', name: 'Tether', bg: 'bg-[#26A17B]', network: 'Tron', balance: '150.00', value: '$150.00' },
  ];

  return (
    <div className="flex flex-col flex-1 pb-4">
      <div className="px-4 py-2 mt-2">
        <Input placeholder="Search coin" rightElement={<Search className="w-5 h-5" />} />
      </div>
      <div className="mt-4 flex flex-col">
        {tokens.map((token, i) => (
          <div key={i} onClick={() => navigate('/send/address')} className="flex items-center justify-between py-4 px-4 border-b border-brand-border cursor-pointer hover:bg-brand-card/50 transition-colors">
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
  );
}

export function SendAddress() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [showQR, setShowQR] = useState(false);

  if (showQR) {
    return (
      <div className="flex flex-col flex-1 p-6 h-full bg-black relative">
        <div className="absolute top-4 left-4 z-10">
          <button onClick={() => setShowQR(false)} className="p-2 bg-brand-card rounded-full text-white">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-64 h-64 border-2 border-brand-primary rounded-3xl relative flex items-center justify-center mb-8">
            {/* Scan animation line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary shadow-[0_0_10px_#7C3AED] animate-[scan_2s_ease-in-out_infinite]"></div>
            <p className="text-brand-primary font-medium animate-pulse">Camera active...</p>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Scan QR Code</h2>
          <p className="text-gray-400 text-sm text-center">Align the QR code within the frame to scan the recipient address.</p>
        </div>
        <Button onClick={() => { setAddress('0x4F9...A1B2'); setShowQR(false); }} className="mt-8">Simulate Successful Scan</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400 font-medium">Recipient Address</label>
          <Input 
            placeholder="Address or OctaNova Handle" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rightElement={
              <div className="flex gap-2">
                <ScanIcon onClick={() => setShowQR(true)} className="button w-5 h-5 text-brand-primary cursor-pointer hover:opacity-80" />
              </div>
            }
          />
          <p className="text-xs text-gray-500 mt-1">Make sure you select the correct network.</p>
        </div>
      </div>
      <div className="mt-auto">
        <Button disabled={!address} onClick={() => navigate('/send/amount')}>Next</Button>
      </div>
    </div>
  );
}

export function SendAmount() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center bg-brand-card px-4 py-3 rounded-xl border border-brand-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#627EEA] rounded-full flex items-center justify-center text-[10px] font-bold">E</div>
            <span className="font-semibold">ETH</span>
          </div>
          <span className="text-sm text-gray-400">Available: 1.45 ETH</span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center py-8">
          <span className="text-5xl font-bold tracking-tight text-white">${amount || '0'}</span>
          <button onClick={() => setAmount('1240.50')} className="text-brand-primary text-sm font-medium mt-2 bg-brand-primary/10 px-3 py-1 rounded-full cursor-pointer hover:bg-brand-primary/20 transition-colors">Max</button>
        </div>
      </div>

      <div className="mt-auto mb-[-24px] -mx-6">
        <Numpad hasDecimal onPress={(d) => setAmount(prev => prev === '0' ? d : prev + d)} onDelete={() => setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')} />
        <div className="px-6 pb-6 pt-2">
          <Button disabled={amount === '0'} onClick={() => navigate('/send/confirm')}>Preview Send</Button>
        </div>
      </div>
    </div>
  );
}

export function SendConfirm() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col items-center py-6 mb-2">
        <span className="text-4xl font-bold tracking-tight text-white">-1.20 ETH</span>
        <span className="text-gray-400 mt-1">≈ $3,415.50</span>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col gap-4 text-sm mb-auto">
        <div className="flex justify-between">
          <span className="text-gray-400">To</span>
          <span className="font-medium text-white break-all text-right w-48">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between">
          <span className="text-gray-400">Network</span>
          <span className="font-medium">Ethereum (ERC-20)</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between">
          <span className="text-gray-400">Network Fee</span>
          <span className="font-medium">0.00035 ETH ($1.02)</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Total</span>
          <span className="font-bold text-white">1.20035 ETH</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button onClick={() => navigate('/send/loading')}>Confirm Send</Button>
        <Button variant="ghost" onClick={() => navigate('/send/failed')} className="text-gray-500 hover:text-brand-error">Simulate Failure</Button>
      </div>
    </div>
  );
}

export function SendLoading() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const t = setTimeout(() => navigate('/send/success'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-center h-full">
      <div className="w-24 h-24 bg-brand-card rounded-full flex items-center justify-center mb-8 relative border-2 border-brand-primary shadow-[0_0_40px_rgba(124,58,237,0.3)]">
         <RefreshCw className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Sending Transfer...</h2>
      <p className="text-gray-400">This usually takes less than 1 minute.</p>
    </div>
  );
}

export function SendStatus({ status }: { status: 'success'|'failed' }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full items-center justify-center text-center">
      <div className="w-32 h-32 bg-brand-card rounded-full flex items-center justify-center mb-8 relative">
        <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full ${status === 'success' ? 'bg-brand-success/20' : 'bg-brand-error/20'} flex items-center justify-center border-4 border-brand-bg`}>
          {status === 'success' 
            ? <CheckCircle2 className="w-6 h-6 text-brand-success" /> 
            : <XCircle className="w-6 h-6 text-brand-error" />}
        </div>
        <ArrowUpRight className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-2">
        {status === 'success' ? 'Transfer Successful!' : 'Transfer Failed'}
      </h1>
      <p className="text-gray-400 text-sm mb-12">
        {status === 'success' ? 'Your crypto is on its way.' : 'There was an issue processing your transfer.'}
      </p>
      
      <Button className="mt-auto w-full" onClick={() => navigate('/home')}>
        {status === 'success' ? 'Back to Home' : 'Try Again'}
      </Button>
    </div>
  );
}

export function Swap() {
  const navigate = useNavigate();
  const [fromToken, setFromToken] = useState({ symbol: 'ETH', name: 'Ethereum', bg: 'bg-[#627EEA]', balance: '1.45', rate: 2845.50 });
  const [toToken, setToToken] = useState({ symbol: 'USDT', name: 'Tether', bg: 'bg-[#26A17B]', balance: '150.00', rate: 1.0 });
  const [fromAmount, setFromAmount] = useState('');
  const [showSelector, setShowSelector] = useState<'from' | 'to' | null>(null);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', bg: 'bg-[#627EEA]', balance: '1.45', rate: 2845.50 },
    { symbol: 'USDT', name: 'Tether', bg: 'bg-[#26A17B]', balance: '150.00', rate: 1.0 },
    { symbol: 'BTC', name: 'Bitcoin', bg: 'bg-[#F7931A]', balance: '0.045', rate: 64000.00 },
    { symbol: 'BNB', name: 'BNB', bg: 'bg-[#F3BA2F]', balance: '2.5', rate: 320.00 }
  ];

  const handleTokenSelect = (token: any) => {
    if (showSelector === 'from') {
      if (token.symbol === toToken.symbol) {
        setToToken(fromToken);
      }
      setFromToken(token);
    }
    if (showSelector === 'to') {
      if (token.symbol === fromToken.symbol) {
        setFromToken(toToken);
      }
      setToToken(token);
    }
    setShowSelector(null);
  };

  const handleSwapSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
  };

  const toAmount = fromAmount ? (parseFloat(fromAmount) * fromToken.rate / toToken.rate).toFixed(6).replace(/\.?0+$/, '') : '';

  if (showSelector) {
    return (
      <div className="absolute inset-0 z-50 bg-brand-bg flex flex-col">
        {/* Header */}
        <div className="flex items-center px-4 py-4 border-b border-brand-border shrink-0 bg-brand-bg relative z-10">
          <button onClick={() => setShowSelector(null)} className="p-2 -ml-2 rounded-full hover:bg-brand-card">
             <XCircle className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">Select Token</h1>
        </div>
        {/* Token List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pt-4 relative">
           <Input placeholder="Search tokens..." rightElement={<Search className="w-5 h-5 text-gray-500" />} />
           <div className="flex flex-col mt-4 pb-12">
             {tokens.map((token, i) => (
               <div key={i} onClick={() => handleTokenSelect(token)} className="flex items-center justify-between py-4 border-b border-brand-border cursor-pointer hover:bg-brand-card/50">
                 <div className="flex items-center gap-3">
                   <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner", token.bg)}>{token.symbol[0]}</div>
                   <div className="flex flex-col">
                     <span className="font-semibold text-white">{token.symbol}</span>
                     <span className="text-xs text-gray-500">{token.name}</span>
                   </div>
                 </div>
                 <span className="font-semibold">{token.balance}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 h-full relative">
      <div className="flex flex-col gap-2 relative">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4 transition-colors focus-within:border-brand-primary">
          <p className="text-gray-400 text-sm mb-2">You pay</p>
          <div className="flex justify-between items-center">
            <input 
              type="number" 
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0" 
              className="bg-transparent text-3xl font-bold w-[60%] focus:outline-none text-white overflow-hidden text-ellipsis" 
            />
            <button onClick={() => setShowSelector('from')} className="flex items-center justify-between w-[110px] bg-brand-input hover:bg-brand-border px-2 py-1.5 rounded-full border border-brand-border shrink-0 transition-colors">
              <div className="flex items-center gap-2">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner", fromToken.bg)}>{fromToken.symbol[0]}</div>
                <span className="font-semibold">{fromToken.symbol}</span>
              </div>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 text-xs text-brand-primary mt-1 font-medium cursor-pointer" onClick={() => setFromAmount(fromToken.balance)}>Use Max</p>
            <p className="text-gray-500 text-xs">Balance: {fromToken.balance} {fromToken.symbol}</p>
          </div>
        </div>

        <button onClick={handleSwapSwitch} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-input hover:bg-brand-bg transition-colors rounded-full border-2 border-brand-border flex items-center justify-center z-10 text-brand-primary hover:rotate-180 transform duration-300">
          <ArrowDownLeft className="w-5 h-5 -rotate-90" />
        </button>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <p className="text-gray-400 text-sm mb-2">You receive</p>
          <div className="flex justify-between items-center">
            <input type="text" value={toAmount} readOnly placeholder="0" className="bg-transparent text-3xl font-bold w-[60%] focus:outline-none text-gray-300 overflow-hidden text-ellipsis" />
            <button onClick={() => setShowSelector('to')} className="flex items-center justify-between w-[110px] bg-brand-input hover:bg-brand-border px-2 py-1.5 rounded-full border border-brand-border shrink-0 transition-colors">
              <div className="flex items-center gap-2">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner", toToken.bg)}>{toToken.symbol[0]}</div>
                <span className="font-semibold">{toToken.symbol}</span>
              </div>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 text-xs"></p>
            <p className="text-gray-500 text-xs">Balance: {toToken.balance} {toToken.symbol}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 text-sm bg-brand-input px-4 py-3 rounded-xl border border-brand-border">
        <span className="text-gray-400 font-medium">Exchange Rate</span>
        <span className="font-semibold text-white tracking-wide">1 {fromToken.symbol} = {(fromToken.rate / toToken.rate).toFixed(2)} {toToken.symbol}</span>
      </div>

      <div className="mt-auto">
        <Button disabled={!fromAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > parseFloat(fromToken.balance)} onClick={() => navigate('/swap/review', { state: { fromToken, toToken, fromAmount, toAmount } })} className="w-full">
          {parseFloat(fromAmount) > parseFloat(fromToken.balance) ? 'Insufficient Balance' : 'Review Swap'}
        </Button>
      </div>
    </div>
  );
}

export function SwapReview() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col items-center py-6 mb-2">
        <span className="text-gray-400 text-sm mb-2 text-center">You are swapping</span>
        <span className="text-4xl font-bold tracking-tight text-white mb-3 text-center">1.25 ETH</span>
        <span className="text-brand-primary w-10 h-10 flex items-center justify-center bg-brand-input rounded-full border-2 border-brand-border mb-3"><ArrowDownLeft className="rotate-[135deg] w-5 h-5"/></span>
        <span className="text-4xl font-bold tracking-tight text-brand-success text-center">3,556.88 USDT</span>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col gap-4 text-sm mb-auto">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Provider</span>
          <span className="font-medium text-white flex items-center gap-1">OctaSwap <span className="text-brand-primary">⚡</span></span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Exchange Rate</span>
          <span className="font-medium text-white tracking-wide">1 ETH = 2845.50 USDT</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Network Fee</span>
          <span className="font-medium">0.001 ETH ($2.85)</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Max Slippage</span>
          <span className="font-medium text-brand-warning">0.5%</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button onClick={() => navigate('/swap/processing')}>Confirm Swap</Button>
        <Button variant="ghost" onClick={() => navigate('/swap/failed')} className="text-gray-500 hover:text-brand-error">Simulate Swap Failure</Button>
      </div>
    </div>
  );
}

export function SwapProcessing() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const t = setTimeout(() => navigate('/swap/success'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-center h-full">
      <div className="w-24 h-24 bg-brand-card rounded-full flex items-center justify-center mb-8 relative border-2 border-brand-primary shadow-[0_0_40px_rgba(124,58,237,0.3)]">
         <RefreshCw className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Executing Swap...</h2>
      <p className="text-gray-400">Routing trade through the best decentralized protocols. This takes a few seconds.</p>
    </div>
  );
}

export function SwapStatus({ status }: { status: 'success'|'failed' }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-6 h-full items-center justify-center text-center">
      <div className="w-32 h-32 bg-brand-card rounded-full flex items-center justify-center mb-8 relative">
        <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full ${status === 'success' ? 'bg-brand-success/20' : 'bg-brand-error/20'} flex items-center justify-center border-4 border-brand-bg`}>
          {status === 'success' 
            ? <CheckCircle2 className="w-6 h-6 text-brand-success" /> 
            : <XCircle className="w-6 h-6 text-brand-error" />}
        </div>
        <RefreshCw className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-2">
        {status === 'success' ? 'Swap Successful!' : 'Swap Failed'}
      </h1>
      <p className="text-gray-400 text-sm mb-12">
        {status === 'success' ? 'Your new tokens have been successfully exchanged and deposited to your Main Wallet.' : 'Slippage tolerance was exceeded before execution. Your assets were safely refunded.'}
      </p>
      
      <Button className="mt-auto w-full" onClick={() => navigate('/home')}>
        Done
      </Button>
    </div>
  );
}

export function History() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Receive', 'Send', 'Swap'];

  const txs = [
    { id: 'tx-1', type: 'Receive', asset: 'BTC', amount: '+0.05 BTC', fiat: '+$3,450.00', date: 'Today, 14:30', status: 'Completed', incoming: true },
    { id: 'tx-2', type: 'Send', asset: 'USDT', amount: '-150.00 USDT', fiat: '-$150.00', date: 'Yesterday, 09:12', status: 'Pending', incoming: false },
    { id: 'tx-3', type: 'Swap', asset: 'ETH → USDT', amount: '1.2 ETH', fiat: '', date: 'Mar 12, 18:45', status: 'Completed', incoming: false },
    { id: 'tx-4', type: 'Receive', asset: 'ETH', amount: '+0.45 ETH', fiat: '+$1,280.00', date: 'Mar 10, 11:20', status: 'Failed', incoming: true },
  ];

  const filteredTxs = filter === 'All' ? txs : txs.filter(t => t.type === filter);

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Filters */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-b border-brand-border">
        {filters.map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            className={cn("px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors", 
              filter === f ? "bg-brand-primary border-brand-primary text-white" : "bg-brand-card border-brand-border text-gray-400 hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pt-4 flex flex-col gap-4">
        {filteredTxs.map((tx) => (
          <div key={tx.id} onClick={() => navigate(`/history/${tx.id}`)} className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col gap-3 cursor-pointer hover:bg-brand-border-visible transition-colors">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-input flex items-center justify-center text-white shrink-0">
                  {tx.type === 'Swap' ? <RefreshCw className="w-5 h-5 text-brand-primary" /> : tx.incoming ? <ArrowDownLeft className="text-brand-success w-5 h-5" /> : <ArrowUpRight className="text-gray-400 w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{tx.type} {tx.asset}</span>
                  <span className="text-[11px] text-gray-500">{tx.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`font-bold text-sm ${tx.incoming ? 'text-brand-success' : 'text-white'}`}>{tx.amount}</span>
                {tx.fiat && <span className="text-[11px] text-gray-500">{tx.fiat}</span>}
              </div>
            </div>
            {/* Status indicator injected inside row */}
            <div className="flex items-center justify-end">
               <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", 
                 tx.status === 'Completed' ? "bg-brand-success/10 text-brand-success border-brand-success/20" :
                 tx.status === 'Pending' ? "bg-brand-warning/10 text-brand-warning border-brand-warning/20" :
                 "bg-brand-error/10 text-brand-error border-brand-error/20"
               )}>
                 {tx.status}
               </span>
            </div>
          </div>
        ))}

        {filteredTxs.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No transactions found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}

export function TransactionDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 p-6 h-full">
      <div className="flex flex-col items-center justify-center py-6 mb-4">
        <div className="w-12 h-12 bg-brand-success/20 rounded-full flex items-center justify-center mb-4">
          <ArrowDownLeft className="w-6 h-6 text-brand-success" />
        </div>
        <span className="text-gray-400 text-sm mb-1">Received BTC</span>
        <span className="text-3xl font-bold tracking-tight text-brand-success">+0.05 BTC</span>
        <span className="text-gray-400 text-sm mt-1">≈ $3,450.00</span>
        
        <div className="mt-4 px-3 py-1 bg-brand-success/10 border border-brand-success/20 rounded-full text-brand-success font-medium text-xs flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
        </div>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col gap-4 text-sm mb-auto">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Date</span>
          <span className="font-medium text-right">Today, 14:30</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between items-start">
          <span className="text-gray-400">From</span>
          <span className="font-medium text-white break-all text-right w-48 text-xs">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between items-start">
          <span className="text-gray-400">To</span>
          <span className="font-medium text-white break-all text-right w-48 text-xs">bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Network Fee</span>
          <span className="font-medium">0.0001 BTC</span>
        </div>
        <div className="w-full h-px bg-brand-border"></div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Transaction ID</span>
            <div className="flex items-center gap-2 text-brand-primary">
              <span className="text-xs">b7f...c49a</span>
              <Copy className="w-3 h-3 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button variant="secondary" className="w-full">View on Explorer</Button>
        <Button className="w-full">Share Receipt</Button>
      </div>
    </div>
  );
}

function ScanIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}
