import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase-config";
import { IGoogleCredentialReturn } from "@/lib/types";

export const getGoogleCredential =
  async (): Promise<IGoogleCredentialReturn> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return { success: true, email: userCredential.user.email as string };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  };
