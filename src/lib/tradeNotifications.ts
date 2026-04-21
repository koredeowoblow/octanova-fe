import { LocalNotifications } from "@capacitor/local-notifications";
import { isNative } from "../utils/platform";

export const scheduleTradeReminder = async (
  orderId: string,
  expiresAt: Date,
) => {
  if (!isNative) return;

  const fiveMinBefore = new Date(expiresAt.getTime() - 5 * 60000);

  await LocalNotifications.schedule({
    notifications: [
      {
        id: parseInt(orderId, 10),
        title: "OctaNova P2P",
        body: "You have 5 minutes left to complete your payment.",
        schedule: { at: fiveMinBefore },
        extra: { type: "p2p_order", id: orderId },
      },
    ],
  });
};

export const cancelTradeReminder = async (orderId: string) => {
  if (!isNative) return;

  await LocalNotifications.cancel({
    notifications: [{ id: parseInt(orderId, 10) }],
  });
};
