import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { ISignupFields, IRequestError, IResponse, IUser } from "@/types";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const signup: MutationFunction<IMutationResponse, ISignupFields> = async (
  data,
) => {
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "auth/signup",
    data,
  );
  return response.data;
};

export const useSignup = (): UseMutationResult<
  IMutationResponse,
  IRequestError,
  ISignupFields
> => {
  return useMutation<IMutationResponse, IRequestError, ISignupFields>({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
};
