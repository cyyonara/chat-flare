import {
  useMutation,
  MutationFunction,
  UseMutationResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ISignupFields, IRequestError, IResponse, IUser } from "@/types";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const signup: MutationFunction<IUser, ISignupFields> = async (data) => {
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "auth/signup",
    data,
  );
  return response.data.data;
};

export const useSignup = (): UseMutationResult<
  IUser,
  IRequestError,
  ISignupFields
> => {
  return useMutation<IUser, IRequestError, ISignupFields>({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
};
