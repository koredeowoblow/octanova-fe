import { BiometricAuth } from "@aparajita/capacitor-biometric-auth";
import { isNative } from "../utils/platform";

export const useBiometrics = () => {
  const checkAvailability = async () => {
    if (!isNative) return false;
    const result = await BiometricAuth.checkBiometry();
    return result.isAvailable;
  };

  const authenticate = async (reason: string) => {
    if (!isNative) return false;
    try {
      await BiometricAuth.authenticate({
        reason,
        cancelTitle: "Use Password",
        allowDeviceCredential: false,
        iosFallbackTitle: "Use Password",
      });
      return true;
    } catch {
      return false;
    }
  };

  const getBiometryType = async () => {
    if (!isNative) return null;
    const result = await BiometricAuth.checkBiometry();
    return result.biometryType;
  };

  return { checkAvailability, authenticate, getBiometryType };
};
