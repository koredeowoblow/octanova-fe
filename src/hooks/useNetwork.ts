import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";
import { useQueryClient } from "@tanstack/react-query";
import { isNative } from "../utils/platform";

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isNative) {
      setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);

      const onOnline = () => {
        setIsOnline(true);
        queryClient.invalidateQueries();
      };
      const onOffline = () => setIsOnline(false);

      window.addEventListener("online", onOnline);
      window.addEventListener("offline", onOffline);

      return () => {
        window.removeEventListener("online", onOnline);
        window.removeEventListener("offline", onOffline);
      };
    }

    Network.getStatus().then((status) => {
      setIsOnline(status.connected);
    });

    const listener = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
      if (status.connected) {
        queryClient.invalidateQueries();
      }
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, [queryClient]);

  return { isOnline };
};
