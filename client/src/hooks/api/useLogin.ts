import { useMutation, MutationFunction, UseMutationResult } from '@tanstack/react-query';
import { ILoginFields, IRequestError, IResponse, IUser } from '@/types';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<IUser>;

const login: MutationFunction<IUser, ILoginFields> = async (data) => {
  const response = await api.post<TMutationResponse>('/api/auth/login', data);
  return response.data.data;
};

export const useLogin = (): UseMutationResult<IUser, IRequestError, ILoginFields> => {
  return useMutation({
    mutationFn: login,
  });
};
