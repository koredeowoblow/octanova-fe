import { Clipboard } from "@capacitor/clipboard";
import { isNative } from "../utils/platform";

let webClipboard = "";

export const useClipboard = () => {
  const copy = async (value: string) => {
    if (isNative) {
      await Clipboard.write({ string: value });
      return;
    }
    webClipboard = value;
  };

  const copyWithAutoClear = async (value: string, seconds = 60) => {
    await copy(value);
    setTimeout(async () => {
      await copy("");
    }, seconds * 1000);
  };

  const paste = async () => {
    if (isNative) {
      const { value } = await Clipboard.read();
      return value;
    }
    return webClipboard;
  };

  return { copy, copyWithAutoClear, paste };
};
