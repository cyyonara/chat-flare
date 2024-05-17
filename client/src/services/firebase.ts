import { auth, googleProvider } from "@/firebase.config";
import { IGoogleCredentials } from "@/types";
import { signInWithPopup, UserCredential } from "firebase/auth";

export const getGoogleCredentials = async (): Promise<IGoogleCredentials> => {
  const { user }: UserCredential = await signInWithPopup(auth, googleProvider);
  return {
    email: user.email,
    username: user.displayName,
    profilePicture: user.photoURL,
  } as IGoogleCredentials;
};
