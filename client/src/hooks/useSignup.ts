import {
  IUserCredential,
  IResponse,
  IRequestError,
  ISignupData,
} from "@/lib/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

type TMutationResult = IResponse<IUserCredential>;

const signup = async (signupData: ISignupData): Promise<TMutationResult> => {
  const response = await axios.post<TMutationResult>(
    import.meta.env.VITE_API + "/api/auth/signup",
    signupData,
    { withCredentials: true },
  );
  return response.data;
};

export const useSignup = (): UseMutationResult<
  TMutationResult,
  IRequestError,
  ISignupData
> => {
  return useMutation<TMutationResult, IRequestError, ISignupData>({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
};
