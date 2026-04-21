import React from 'react';
import { FileCheck2, Phone, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui';
import { useAuthStore, type KYCTier } from '../store/authStore';

export function useKYCGate(requiredTier: KYCTier) {
  const tier = useAuthStore((state) => state.user.kycTier);
  const hasAccess = tier >= requiredTier;
  return { hasAccess, currentTier: tier };
}

export function KYCUpgradePrompt({
  requiredTier,
  onDismiss,
  compact = false,
}: {
  requiredTier: KYCTier;
  onDismiss?: () => void;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const currentTier = useAuthStore((state) => state.user.kycTier);

  const nextTier: 1 | 2 = requiredTier <= 1 ? 1 : 2;
  const isPhoneStep = nextTier === 1;

  const Icon = isPhoneStep ? Phone : FileCheck2;
  const title = isPhoneStep ? 'Verify your phone number' : 'Complete your verification';
  const subtitle = isPhoneStep
    ? 'Verify your phone to unlock P2P trading and crypto deposits.'
    : 'Verify your identity to unlock bank transfers, card purchases, and full P2P access.';
  const cta = isPhoneStep ? 'Verify Now' : 'Complete KYC';
  const ctaPath = isPhoneStep ? '/kyc/phone' : '/kyc/documents';

  return (
    <div className={compact ? 'p-4' : 'h-full p-6 flex items-center'}>
      <div className="w-full bg-brand-card border border-brand-border rounded-2xl p-5">
        <div className="w-14 h-14 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-brand-primary" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-1">{subtitle}</p>
        <p className="text-xs text-gray-500 mb-6">Current tier: {currentTier}. Required tier: {requiredTier}.</p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              onDismiss?.();
              navigate(ctaPath);
            }}
          >
            {cta}
          </Button>
          <button
            onClick={() => {
              if (onDismiss) {
                onDismiss();
                return;
              }
              navigate(-1);
            }}
            className="text-sm text-gray-400 hover:text-white"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

export function KYCGate({
  requiredTier,
  children,
  fallback,
}: {
  requiredTier: KYCTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasAccess } = useKYCGate(requiredTier);
  if (!hasAccess) {
    return fallback ?? <KYCUpgradePrompt requiredTier={requiredTier} />;
  }

  return <>{children}</>;
}

export function KYCStepPill({ active, done, label }: { active?: boolean; done?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
          done
            ? 'bg-brand-success/20 border-brand-success text-brand-success'
            : active
              ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
              : 'bg-brand-card border-brand-border text-gray-500'
        }`}
      >
        {done ? <ShieldCheck className="w-3.5 h-3.5" /> : <span className="text-[10px] font-semibold">•</span>}
      </div>
      <span className={`text-xs ${active || done ? 'text-white' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
}
