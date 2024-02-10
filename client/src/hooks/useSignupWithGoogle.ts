import {
  MutationFunction,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { IResponse, IUserCredential, IRequestError } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { getGoogleCredential } from "@/services/firebase-service";
import { v4 as uuid } from "uuid";

type TMutationResponse = IResponse<IUserCredential>;

const signupWithGoogle: MutationFunction<
  TMutationResponse,
  null
> = async () => {
  const { email, avatar, success, errorMessage } = await getGoogleCredential();
  if (!success) throw new AxiosError(errorMessage);

  const username = uuid().substring(0, 10);
  const password = uuid();

  const response = await axios.post<TMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/google/signup",
    { email, username, avatar, password },
    { withCredentials: true },
  );

  return response.data;
};

export const useSignupWithGoogle = (): UseMutationResult<
  TMutationResponse,
  IRequestError,
  null
> => {
  return useMutation<TMutationResponse, IRequestError, null>({
    mutationKey: ["google-signup"],
    mutationFn: signupWithGoogle,
  });
};
