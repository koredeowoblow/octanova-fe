import React from 'react';
import { Button, Input } from '../components/ui';
import { useKYCGate, KYCUpgradePrompt } from '../components/kyc';

export function DepositCrypto() {
  const { hasAccess } = useKYCGate(1);
  if (!hasAccess) {
    return <KYCUpgradePrompt requiredTier={1} />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Deposit crypto</h2>
      <p className="text-sm text-gray-400">Select coin and network to generate your deposit address.</p>
      <Input label="Coin" placeholder="USDT" />
      <Input label="Network" placeholder="TRON (TRC20)" />
      <Button>Generate address</Button>
    </div>
  );
}

export function CardPurchase() {
  const { hasAccess } = useKYCGate(2);
  if (!hasAccess) {
    return <KYCUpgradePrompt requiredTier={2} />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Buy with card</h2>
      <p className="text-sm text-gray-400">Visa, Mastercard, Google Pay, and Apple Pay are supported.</p>
      <Input label="Amount" placeholder="50000" />
      <Input label="Asset" placeholder="BTC" />
      <Button>Continue to checkout</Button>
    </div>
  );
}

export function OrdersHub() {
  return <div className="p-4 text-gray-300 text-center mt-20">Your P2P and CEX order history will appear here.</div>;
}

export function AdsHub() {
  return <div className="p-4 text-gray-300 text-center mt-20">Merchant ads and campaign tools coming soon.</div>;
}
