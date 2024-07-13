import { useMutation, MutationFunction, UseMutationResult } from '@tanstack/react-query';
import { IResponse, IUser, IRequestError } from '@/types';
import { getGoogleCredentials } from '@/services/firebase';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<IUser>;

const googleSignup: MutationFunction<IUser, null> = async () => {
  const googleCredentials = await getGoogleCredentials();
  const response = await api.post<TMutationResponse>(
    '/api/auth/google-signup',
    googleCredentials
  );
  return response.data.data;
};

export const useGoogleSignup = (): UseMutationResult<IUser, IRequestError, null> => {
  return useMutation({
    mutationFn: googleSignup,
  });
};
