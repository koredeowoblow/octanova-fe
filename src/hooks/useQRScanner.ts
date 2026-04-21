import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { isNative } from "../utils/platform";

export const useQRScanner = () => {
  const startScan = async () => {
    if (!isNative) return null;

    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.body.classList.add("scanner-active");

    const result = await BarcodeScanner.startScan();

    document.body.classList.remove("scanner-active");
    BarcodeScanner.showBackground();

    if (result.hasContent) return result.content;
    return null;
  };

  const stopScan = () => {
    if (!isNative) return;
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
    document.body.classList.remove("scanner-active");
  };

  return { startScan, stopScan };
};
