import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { ISignupFields, IRequestError, IResponse, IUser } from "@/types";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const signup: MutationFunction<IUser, ISignupFields> = async (data) => {
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/signup",
    data,
  );
  return response.data.data;
};

export const useSignup = (): UseMutationResult<
  IUser,
  IRequestError,
  ISignupFields
> => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
};
