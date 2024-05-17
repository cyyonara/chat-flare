import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { IResponse, IUser, IRequestError } from "@/types";
import { getGoogleCredentials } from "@/services/firebase";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const googleSignup: MutationFunction<IMutationResponse, null> = async () => {
  const googleCredentials = await getGoogleCredentials();
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "auth/google-signup",
    googleCredentials,
    { withCredentials: true },
  );
  return response.data;
};

export const useGoogleSignup = (): UseMutationResult<
  IMutationResponse,
  IRequestError,
  null
> => {
  return useMutation<IMutationResponse, IRequestError, null>({
    mutationKey: ["google-signup"],
    mutationFn: googleSignup,
  });
};
