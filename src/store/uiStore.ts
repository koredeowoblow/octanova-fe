import { create } from "zustand";
import type { KYCTier } from "./authStore";

interface UIState {
  kycUpgradeOpen: boolean;
  requiredTier: KYCTier;
  showKYCUpgrade: (requiredTier: KYCTier) => void;
  hideKYCUpgrade: () => void;
  appLocked: boolean;
  setAppLocked: (value: boolean) => void;
  notification: {
    title: string;
    body: string;
    data?: unknown;
  } | null;
  showNotification: (payload: {
    title: string;
    body: string;
    data?: unknown;
  }) => void;
  clearNotification: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  kycUpgradeOpen: false,
  requiredTier: 1,
  showKYCUpgrade: (requiredTier) => set({ kycUpgradeOpen: true, requiredTier }),
  hideKYCUpgrade: () => set({ kycUpgradeOpen: false }),
  appLocked: false,
  setAppLocked: (value) => set({ appLocked: value }),
  notification: null,
  showNotification: (payload) => set({ notification: payload }),
  clearNotification: () => set({ notification: null }),
}));
