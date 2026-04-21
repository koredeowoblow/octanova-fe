import { useEffect, useState } from "react";
import { Keyboard } from "@capacitor/keyboard";
import { isNative } from "../utils/platform";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (!isNative) return;

    const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
      setKeyboardHeight(info.keyboardHeight);
      setIsKeyboardOpen(true);
    });

    const hideListener = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardHeight(0);
      setIsKeyboardOpen(false);
    });

    return () => {
      showListener.then((l) => l.remove());
      hideListener.then((l) => l.remove());
    };
  }, []);

  const dismissKeyboard = async () => {
    if (!isNative) return;
    await Keyboard.hide();
  };

  return { keyboardHeight, isKeyboardOpen, dismissKeyboard };
};
