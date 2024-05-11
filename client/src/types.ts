import { z } from "zod";
import { loginSchema } from "./lib/schemas";
import { AxiosError } from "axios";

export interface IRequestError extends AxiosError<{ message: string }> {}

export interface IResponse<T> {
  success: boolean;
  data: T;
  message: null;
}

export interface ILoginFields extends z.infer<typeof loginSchema> {}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
}

// store types
export interface IAuthState {
  user: IUser | null;
  setCredentials: (credentials: IUser) => void;
  clearCredentials: () => void;
}
