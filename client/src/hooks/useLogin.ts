import {
  UseMutationResult,
  useMutation,
  MutationFunction,
} from "@tanstack/react-query";
import {
  ILoginData,
  IRequestError,
  IResponse,
  IUserCredential,
} from "@/lib/types";
import axios from "axios";

type TMutationResponse = IResponse<IUserCredential>;

const login: MutationFunction<TMutationResponse, ILoginData> = async (
  loginData,
) => {
  const response = await axios.post<TMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/login",
    loginData,
    { withCredentials: true },
  );

  return response.data;
};

export const useLogin = (): UseMutationResult<
  TMutationResponse,
  IRequestError,
  ILoginData
> => {
  return useMutation<TMutationResponse, IRequestError, ILoginData>({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
