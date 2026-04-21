import { Preferences } from "@capacitor/preferences";
import { isNative } from "../utils/platform";

const webFallback = new Map<string, string>();

export const storage = {
  set: async (key: string, value: string) => {
    if (isNative) {
      await Preferences.set({ key, value });
      return;
    }
    webFallback.set(key, value);
  },

  get: async (key: string) => {
    if (isNative) {
      const { value } = await Preferences.get({ key });
      return value;
    }
    return webFallback.get(key) ?? null;
  },

  remove: async (key: string) => {
    if (isNative) {
      await Preferences.remove({ key });
      return;
    }
    webFallback.delete(key);
  },

  clear: async () => {
    if (isNative) {
      await Preferences.clear();
      return;
    }
    webFallback.clear();
  },
};
