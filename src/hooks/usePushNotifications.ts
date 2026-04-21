import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PushNotifications } from "@capacitor/push-notifications";
import api from "../lib/api";
import { getPlatform, isNative } from "../utils/platform";
import { useUIStore } from "../store/uiStore";

export const usePushNotifications = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let registrationListener: Promise<{ remove: () => void }> | null = null;
    let receivedListener: Promise<{ remove: () => void }> | null = null;
    let actionListener: Promise<{ remove: () => void }> | null = null;

    const register = async () => {
      if (!isNative) return;

      const permission = await PushNotifications.requestPermissions();
      if (permission.receive !== "granted") return;

      await PushNotifications.register();

      registrationListener = PushNotifications.addListener(
        "registration",
        async (token) => {
          await api.post("/notifications/register", {
            token: token.value,
            platform: getPlatform(),
          });
        },
      );

      receivedListener = PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          useUIStore.getState().showNotification({
            title: notification.title ?? "OctaNova",
            body: notification.body ?? "",
            data: notification.data,
          });
        },
      );

      actionListener = PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (action) => {
          const type = action.notification.data?.type;
          const id = action.notification.data?.id;

          if (type === "p2p_order" && id) navigate(`/p2p/order/${id}`);
          if (type === "kyc_update") navigate("/kyc");
          if (type === "price_alert") navigate("/alerts");
          if (type === "transaction" && id) navigate(`/history/${id}`);
        },
      );
    };

    register();

    return () => {
      registrationListener?.then((l) => l.remove());
      receivedListener?.then((l) => l.remove());
      actionListener?.then((l) => l.remove());
    };
  }, [navigate]);
};
