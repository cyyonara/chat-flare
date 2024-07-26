import { z } from 'zod';
import { loginSchema, signupSchema } from './lib/schemas';
import { AxiosError } from 'axios';

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
  createdAt?: string;
}

export interface IPaginatedUsers {
  totalPages: number;
  users: IUser[];
  currentPage: number;
  nextPage: number | null;
  hasNextPage: boolean;
}

// message types
interface IReceiver {
  user: IUser;
  isMessageRead: boolean;
  _id: string;
}

export interface IMessageReactor {
  user: IUser;
  reaction: string;
}

export interface IMessage {
  _id: string;
  chatId: string;
  content: string;
  isImage: boolean;
  isLeaveMessage: boolean;
  isNewMemberMessage: boolean;
  sender: IUser;
  receivers: IReceiver[];
  reactors: IMessageReactor[];
  createdAt: string;
  updatedAt: string;
}

export interface INewMessage {
  chatId: string;
  content: string | File;
  isImage: boolean;
}

export interface IFetchedMessage extends IMessage {
  isSending: boolean;
  statusId: string;
}

export interface IPaginatedMessages {
  chatId: string;
  totalPages: number;
  totalMessages: number;
  messages: IMessage[];
  currentPage: number;
  nextPage: number | null;
  hasNextPage: boolean;
}

export interface IPaginatedFetchedMessages {
  chatId: string;
  totalPages: number;
  totalMessages: number;
  currentPage: number;
  nextPage: number | null;
  hasNextPage: boolean;
  messages: IFetchedMessage[];
}

// chat types
export interface IChatUser {
  user: IUser;
  hasLeft: boolean;
  _id: string;
}

export interface IChat {
  _id: string;
  chatPhoto: string;
  chatName: string;
  chatCreator: IUser;
  isGroupChat: boolean;
  users: IChatUser[];
  lastMessage: IMessage | null;
  createdAt: string;
  updatedAt: string;
}

export interface INewChat {
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
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

export interface IChangeGroupPhotoData {
  imageFile: File;
  chatId: string;
}

export interface INewGroupName {
  groupName: string;
  chatId: string;
}

export interface IRemoveMemberData {
  chatId: string;
  userId: string;
}

// store types
export interface IAuthState {
  user: IUser | null;
  setCredentials: (credentials: IUser) => void;
  clearCredentials: () => void;
}
