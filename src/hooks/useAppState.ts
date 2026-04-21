import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "@capacitor/app";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { storage } from "../lib/storage";
import { isNative } from "../utils/platform";
import { useUIStore } from "../store/uiStore";

export const useAppState = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNative) return;

    const stateListener = App.addListener("appStateChange", ({ isActive }) => {
      if (!isActive) {
        storage.set("last_active", Date.now().toString());
      } else {
        storage.get("last_active").then((lastActive) => {
          if (!lastActive) return;
          const elapsed = Date.now() - parseInt(lastActive, 10);
          const fiveMinutes = 5 * 60 * 1000;
          if (elapsed > fiveMinutes) {
            useUIStore.getState().setAppLocked(true);
          }
        });

        queryClient.invalidateQueries({ queryKey: queryKeys.market.coins() });
        queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all() });
      }
    });

    const backListener = App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });

    const urlListener = App.addListener("appUrlOpen", ({ url }) => {
      const path = url.replace("octanova://", "/");
      navigate(path);
    });

    return () => {
      stateListener.then((l) => l.remove());
      backListener.then((l) => l.remove());
      urlListener.then((l) => l.remove());
    };
  }, [navigate, queryClient]);
};
