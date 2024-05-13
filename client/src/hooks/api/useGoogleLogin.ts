import {
  useMutation,
  UseMutationResult,
  MutationFunction,
} from "@tanstack/react-query";
import { IUser, IResponse, IRequestError } from "@/types";
import { getGoogleCredentials } from "@/services/getGoogleCredentials";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const googleLogin: MutationFunction<IMutationResponse, null> = async () => {
  const email = await getGoogleCredentials();
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "auth/google-login",
    { email },
    { withCredentials: true },
  );
  return response.data;
};

export const useGoogleLogin = (): UseMutationResult<
  IMutationResponse,
  IRequestError,
  null
> => {
  return useMutation<IMutationResponse, IRequestError, null>({
    mutationKey: ["google-login"],
    mutationFn: googleLogin,
  });
};
