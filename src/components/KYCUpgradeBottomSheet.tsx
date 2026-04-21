import React from 'react';
import { BottomSheet } from './BottomSheet';
import { KYCUpgradePrompt } from './kyc';
import { useUIStore } from '../store/uiStore';

export function KYCUpgradeBottomSheet() {
  const isOpen = useUIStore((state) => state.kycUpgradeOpen);
  const requiredTier = useUIStore((state) => state.requiredTier);
  const hide = useUIStore((state) => state.hideKYCUpgrade);

  return (
    <BottomSheet isOpen={isOpen} onClose={hide} title="Upgrade required">
      <KYCUpgradePrompt requiredTier={requiredTier} onDismiss={hide} compact />
    </BottomSheet>
  );
}
