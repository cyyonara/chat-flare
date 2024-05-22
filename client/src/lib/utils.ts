import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/hooks/custom/useAuth";
import { IUser } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserInfo = (anotherUser: IUser): string => {
  const currentUserId = useAuth().user!._id;
  return currentUserId === anotherUser._id ? "You" : anotherUser.username;
};
