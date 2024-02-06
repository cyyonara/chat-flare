import { UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  ILoginData,
  IRequestError,
  IResponse,
  IUserCredential,
} from "@/lib/types";
import axios from "axios";

const login = async (
  loginData: ILoginData,
): Promise<IResponse<IUserCredential>> => {
  const response = await axios.post<IResponse<IUserCredential>>(
    import.meta.env.VITE_API + "/api/auth/login",
    loginData,
  );

  return response.data;
};

export const useLogin = (): UseMutationResult<
  IResponse<IUserCredential>,
  IRequestError,
  ILoginData
> => {
  return useMutation<IResponse<IUserCredential>, IRequestError, ILoginData>({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
