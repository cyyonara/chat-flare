import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { ILoginFields, IRequestError, IResponse, IUser } from "@/types";
import axios from "axios";

interface IMutationResponse extends IResponse<IUser> {}

const login: MutationFunction<IUser, ILoginFields> = async (data) => {
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "auth/login",
    data,
    { withCredentials: true },
  );
  return response.data.data;
};

export const useLogin = (): UseMutationResult<
  IUser,
  IRequestError,
  ILoginFields
> => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
