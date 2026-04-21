import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { isNative } from "../utils/platform";

export const useCamera = () => {
  const takePhoto = async () => {
    if (!isNative) return null;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    return image.base64String ?? null;
  };

  const selectFromGallery = async () => {
    if (!isNative) return null;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    return image.base64String ?? null;
  };

  const scanQRCode = async () => {
    if (!isNative) return null;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    return image.webPath ?? null;
  };

  return { takePhoto, selectFromGallery, scanQRCode };
};
