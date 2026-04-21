import { create } from "zustand";
import { mockApi } from "../api/mockApi";
import { storage } from "../lib/storage";

export type KYCTier = 0 | 1 | 2;

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  kycTier: KYCTier;
}

interface AuthState {
  user: AuthUser;
  isBootstrapping: boolean;
  setUserFromAPI: (user: AuthUser) => void;
  setKYCTierFromAPI: (tier: KYCTier) => void;
  refreshUserFromAPI: () => Promise<AuthUser>;
}

const defaultUser: AuthUser = {
  id: "",
  email: "",
  phone: "",
  kycTier: 0,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: defaultUser,
  isBootstrapping: false,

  setUserFromAPI: (user) => set({ user }),

  setKYCTierFromAPI: (tier) =>
    set((state) => {
      storage.set("kyc_tier", String(tier));
      return {
        user: {
          ...state.user,
          kycTier: tier,
        },
      };
    }),

  refreshUserFromAPI: async () => {
    set({ isBootstrapping: true });
    try {
      const user = await mockApi.getCurrentUser();
      await storage.set("kyc_tier", String(user.kycTier));
      set({ user });
      return user;
    } finally {
      set({ isBootstrapping: false });
    }
  },
}));
