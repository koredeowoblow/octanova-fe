import { useEffect } from "react";
import { Style, StatusBar } from "@capacitor/status-bar";
import { useLocation } from "react-router-dom";
import { isNative } from "../utils/platform";

export const useStatusBar = () => {
  const location = useLocation();

  useEffect(() => {
    const setStatusBar = async () => {
      if (!isNative) return;
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: "#0A0A0A" });
    };

    setStatusBar();
  }, [location.pathname]);
};
