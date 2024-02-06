import { AxiosError } from "axios";

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

export interface IGoogleCredentialReturn {
  success: boolean;
  email?: string;
  message?: string;
}
