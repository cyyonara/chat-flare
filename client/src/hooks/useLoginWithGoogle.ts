import { IResponse, IRequestError, IUserCredential } from "@/lib/types";
import { getGoogleCredential } from "@/services/firebase-service";
import {
  MutationFunction,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type TMutationResponse = IResponse<IUserCredential>;

const loginWithGoogle: MutationFunction<TMutationResponse, null> = async () => {
  const { email, success, errorMessage } = await getGoogleCredential();
  if (!success) throw new AxiosError(errorMessage);

  const response = await axios.post<TMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/google/login",
    { email },
    { withCredentials: true },
  );
  return response.data;
};

export const useLoginWithGoogle = (): UseMutationResult<
  TMutationResponse,
  IRequestError,
  null
> => {
  return useMutation<TMutationResponse, IRequestError, null>({
    mutationKey: ["google-login"],
    mutationFn: loginWithGoogle,
  });
};
