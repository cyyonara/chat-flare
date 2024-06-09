import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { ILoginFields, IRequestError, IResponse, IUser } from "@/types";
import axios from "axios";

type TMutationResponse = IResponse<IUser>;

const login: MutationFunction<IUser, ILoginFields> = async (data) => {
  const response = await axios.post<TMutationResponse>(
    import.meta.env.VITE_API + "/api/auth/login",
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
    mutationFn: login,
  });
};
