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
