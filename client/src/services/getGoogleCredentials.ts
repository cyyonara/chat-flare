import { auth, googleProvider } from "@/firebase.config";
import { signInWithPopup, UserCredential } from "firebase/auth";

export const getGoogleCredentials = async (): Promise<string> => {
  const { user }: UserCredential = await signInWithPopup(auth, googleProvider);
  return user.email as string;
};
