import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthState } from "@/types";

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      setCredentials: (credentials) => set({ user: credentials }),
      clearCredentials: () => {
        set({ user: null });
      },
    }),
    { name: "chat-flare" },
  ),
);
