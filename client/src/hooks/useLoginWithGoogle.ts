import { IResponse, IRequestError, IUserCredential } from "@/lib/types";
import { getGoogleCredential } from "@/services/firebase-service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const loginWithGoogle = async (): Promise<IResponse<IUserCredential>> => {
  const { email, success, message } = await getGoogleCredential();
  if (!success) throw new AxiosError(message);

  const response = await axios.post<IResponse<IUserCredential>>(
    import.meta.env.VITE_API + "/api/auth/google/login",
    { email },
  );
  return response.data;
};

export const useLoginWithGoogle = (): UseMutationResult<
  IResponse<IUserCredential>,
  IRequestError,
  null
> => {
  return useMutation<IResponse<IUserCredential>, IRequestError, null>({
    mutationKey: ["google-login"],
    mutationFn: loginWithGoogle,
  });
};
