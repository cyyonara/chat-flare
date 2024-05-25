import {
  useMutation,
  UseMutationResult,
  MutationFunction,
} from "@tanstack/react-query";
import { IUser, IResponse, IRequestError } from "@/types";
import { getGoogleCredentials } from "@/services/firebase";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const googleLogin: MutationFunction<IUser, null> = async () => {
  const { email } = await getGoogleCredentials();
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/google-login",
    { email },
    { withCredentials: true },
  );
  return response.data.data;
};

export const useGoogleLogin = (): UseMutationResult<
  IUser,
  IRequestError,
  null
> => {
  return useMutation({
    mutationKey: ["google-login"],
    mutationFn: googleLogin,
  });
};
