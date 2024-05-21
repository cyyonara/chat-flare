import { z } from "zod";
import { loginSchema, signupSchema } from "./lib/schemas";
import { AxiosError } from "axios";

export interface IRequestError extends AxiosError<{ message: string }> {}

export interface IResponse<T> {
  success: boolean;
  data: T;
  message: null;
}

export interface ILoginFields extends z.infer<typeof loginSchema> {}

export interface ISignupFields extends z.infer<typeof signupSchema> {}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
}

// message types

interface IReceiver {
  user: IUser;
  isMessageRead: boolean;
  _id: string;
}

interface IMessage {
  _id: string;
  chatId: string;
  content: string;
  isImage: boolean;
  isLeaveMessage: boolean;
  isNewMemberMessage: boolean;
  sender: IUser;
  receivers: IReceiver[];
  createdAt: string;
  updatedAt: string;
}

// chat types
interface IChatUser {
  user: IUser;
  hasLeft: boolean;
  _id: string;
}

export interface IChat {
  _id: string;
  chatName: string;
  chatCreator: IUser;
  isGroupChat: boolean;
  users: IChatUser[];
  lastMessage: IMessage;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedChats {
  totalPages: number;
  totalChats: number;
  chats: IChat[];
  currentPage: number;
  nextPage: number | null;
  hasNextPage: boolean;
}

export interface IGoogleCredentials {
  email: string;
  username: string;
  profilePicture: string;
}

export interface IShowPasswordState {
  isShowPassword: boolean;
  isShowConfirmPassword: boolean;
}

// store types
export interface IAuthState {
  user: IUser | null;
  setCredentials: (credentials: IUser) => void;
  clearCredentials: () => void;
}
