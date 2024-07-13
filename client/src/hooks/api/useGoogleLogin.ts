import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';
import { IUser, IResponse, IRequestError } from '@/types';
import { getGoogleCredentials } from '@/services/firebase';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<IUser>;

const googleLogin: MutationFunction<IUser, null> = async () => {
  const { email } = await getGoogleCredentials();
  const response = await api.post<TMutationResponse>('/api/auth/google-login', { email });
  return response.data.data;
};

export const useGoogleLogin = (): UseMutationResult<IUser, IRequestError, null> => {
  return useMutation({
    mutationFn: googleLogin,
  });
};
