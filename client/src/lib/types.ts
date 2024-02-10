import { AxiosError } from "axios";
import { signupSchema } from "@/lib/validations";
import { z } from "zod";

export interface IResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface IRequestError extends AxiosError<IResponse<null>> {}

export interface IUserCredential {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData extends z.infer<typeof signupSchema> {}

export interface IGoogleCredentialReturn {
  success: boolean;
  email?: string;
  avatar?: string;
  errorMessage?: string;
}

export interface IUploadImage {
  imageUrl?: string;
  success: boolean;
  errorMessage?: string;
}

export interface IMessage {
  _id: string;
  sender: IUserCredential;
  isImage: boolean;
  content: string;
  receiver: IUserCredential[];
  createdAt: string;
  updatedAt: string;
}

export interface IChat {
  _id: string;
  chatCreator: IUserCredential;
  chatPhoto: string;
  people: IUserCredential[];
  isGroupChat: boolean;
  groupName: string | null;
  lastMessage: IMessage | null;
  createdAt: string;
  updatedAt: string;
}
