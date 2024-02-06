import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserCredential } from "@/lib/types";

interface IAuthState {
  user: IUserCredential | null;
  setCredential: (userCredential: IUserCredential) => void;
  removeCredential: () => void;
}

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      setCredential: (userCredential) => set({ user: userCredential }),
      removeCredential: () => ({ user: null }),
    }),
    { name: "chatFlare-auth" },
  ),
);
