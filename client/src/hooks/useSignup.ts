import {
  IUserCredential,
  IResponse,
  IRequestError,
  ISignupData,
} from "@/lib/types";
import {
  MutationFunction,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

type TMutationResult = IResponse<IUserCredential>;

const signup: MutationFunction<TMutationResult, ISignupData> = async (
  signupData,
) => {
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
