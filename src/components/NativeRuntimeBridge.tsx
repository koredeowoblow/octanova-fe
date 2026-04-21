import React, { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';
import { useStatusBar } from '../hooks/useStatusBar';
import { useAppState } from '../hooks/useAppState';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { useNetwork } from '../hooks/useNetwork';
import { isNative } from '../utils/platform';
import { useUIStore } from '../store/uiStore';

export function NativeRuntimeBridge() {
  useStatusBar();
  useAppState();
  usePushNotifications();
  const { isOnline } = useNetwork();
  const notification = useUIStore((state) => state.notification);
  const clearNotification = useUIStore((state) => state.clearNotification);

  useEffect(() => {
    const hideSplash = async () => {
      if (!isNative) return;
      await SplashScreen.hide();
    };

    const timer = setTimeout(() => {
      hideSplash();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => clearNotification(), 3500);
    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  return (
    <>
      {!isOnline && (
        <div className="absolute top-0 left-0 right-0 z-[200] bg-brand-error text-white text-xs font-semibold py-2 px-4 text-center">
          No internet connection
        </div>
      )}

      {notification && (
        <div className="absolute top-10 left-4 right-4 z-[201] bg-brand-card border border-brand-border rounded-xl p-3 shadow-xl">
          <p className="text-sm font-semibold text-white">{notification.title}</p>
          <p className="text-xs text-gray-400 mt-1">{notification.body}</p>
        </div>
      )}
    </>
  );
}
