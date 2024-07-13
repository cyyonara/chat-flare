import { auth, googleProvider, storage } from '@/config/firebase.config';
import { IGoogleCredentials } from '@/types';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

export const getGoogleCredentials = async (): Promise<IGoogleCredentials> => {
  const { user }: UserCredential = await signInWithPopup(auth, googleProvider);
  return {
    email: user.email,
    username: user.displayName,
    profilePicture: user.photoURL,
  } as IGoogleCredentials;
};

export const uploadImage = async (imageFile: File): Promise<string> => {
  const storageRef = ref(storage, Date.now() + imageFile.name);
  const snapshot = await uploadBytes(storageRef, imageFile);
  return await getDownloadURL(snapshot.ref);
};
