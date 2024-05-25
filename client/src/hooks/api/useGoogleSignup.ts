import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { IResponse, IUser, IRequestError } from "@/types";
import { getGoogleCredentials } from "@/services/firebase";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const googleSignup: MutationFunction<IUser, null> = async () => {
  const googleCredentials = await getGoogleCredentials();
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/google-signup",
    googleCredentials,
    { withCredentials: true },
  );
  return response.data.data;
};

export const useGoogleSignup = (): UseMutationResult<
  IUser,
  IRequestError,
  null
> => {
  return useMutation({
    mutationKey: ["google-signup"],
    mutationFn: googleSignup,
  });
};
