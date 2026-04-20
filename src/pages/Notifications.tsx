import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldCheck, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

export function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'transfer',
      title: 'Deposit Successful',
      message: 'You have successfully deposited 0.05 BTC into your wallet.',
      time: 'Just now',
      read: false,
      icon: ArrowDownLeft,
      color: 'text-brand-success',
      bg: 'bg-brand-success/10'
    },
    {
      id: 2,
      type: 'security',
      title: 'New Device Login',
      message: 'We noticed a new login from Mac OS (Chrome). If this wasn\'t you, tap to secure your account.',
      time: '2 hours ago',
      read: false,
      icon: ShieldCheck,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/10'
    },
    {
      id: 3,
      type: 'promo',
      title: '0% Fees on P2P!',
      message: 'Exclusive weekend offer: Trade P2P with absolutely zero maker taker fees.',
      time: 'Yesterday',
      read: true,
      icon: Tag,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      id: 4,
      type: 'system',
      title: 'KYC Verification Approved',
      message: 'Your identity has been verified. You can now access higher trading limits.',
      time: 'Yesterday',
      read: true,
      icon: CheckCircle2,
      color: 'text-brand-success',
      bg: 'bg-brand-success/10'
    },
    {
      id: 5,
      type: 'transfer',
      title: 'Withdrawal Failed',
      message: 'Your withdrawal of 500 USDT could not be processed. Please check your balance.',
      time: 'Mar 15, 2026',
      read: true,
      icon: AlertTriangle,
      color: 'text-brand-error',
      bg: 'bg-brand-error/10'
    }
  ];

  return (
    <div className="flex flex-col flex-1 h-full bg-brand-bg">
      <div className="flex-1 overflow-y-auto w-full px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-gray-400">Recent</h2>
          <button className="text-brand-primary text-sm font-medium hover:text-brand-primary-active">Mark all as read</button>
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div 
                key={n.id} 
                className={cn(
                  "p-4 rounded-2xl border transition-colors cursor-pointer relative overflow-hidden",
                  n.read ? "bg-brand-card border-brand-border" : "bg-brand-card border-brand-primary/50"
                )}
              >
                {!n.read && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-primary"></div>
                )}
                <div className="flex gap-4 items-start">
                  <div className={cn("w-10 h-10 shrink-0 rounded-full flex items-center justify-center mt-1", n.bg)}>
                    <Icon className={cn("w-5 h-5", n.color)} />
                  </div>
                  <div className="flex flex-col gap-1 pr-4">
                    <h3 className={cn("font-medium text-[15px]", n.read ? "text-gray-300" : "text-white")}>{n.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] font-medium text-gray-500 mt-1">{n.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 pb-8">
          <p className="text-xs text-gray-500">You're all caught up!</p>
        </div>
      </div>
    </div>
  );
}
