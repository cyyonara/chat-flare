import { IResponse, IRequestError } from '@/types';
import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<null>;

const logout: MutationFunction<null, null> = async () => {
  const response = await api.delete<TMutationResponse>('/api/auth/logout');
  return response.data.data;
};

export const useLogout = (): UseMutationResult<null, IRequestError, null> => {
  return useMutation({ mutationFn: logout });
};
