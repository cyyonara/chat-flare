import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, storage } from "@/config/firebase-config";
import {
  uploadBytes,
  getDownloadURL,
  UploadResult,
  ref,
} from "firebase/storage";
import { IGoogleCredentialReturn, IUploadImage } from "@/lib/types";
import { v4 as uuid } from "uuid";
import { FirebaseError } from "firebase/app";

export const getGoogleCredential =
  async (): Promise<IGoogleCredentialReturn> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);

      return {
        success: true,
        email: userCredential.user.email as string,
        avatar: userCredential.user.photoURL as string,
      };
    } catch (error: any) {
      const { message }: FirebaseError = error;

      return {
        success: false,
        errorMessage: message,
      };
    }
  };

export const uploadImage = async (imageFile: File): Promise<IUploadImage> => {
  try {
    const storageRef = ref(storage, `chat-flare/${uuid() + imageFile.name}`);
    const result: UploadResult = await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(result.ref);

    return {
      success: true,
      imageUrl,
    };
  } catch (error: any) {
    const { message }: FirebaseError = error;

    return {
      success: false,
      errorMessage: message,
    };
  }
};
