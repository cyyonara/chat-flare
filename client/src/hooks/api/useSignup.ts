import { useMutation, MutationFunction, UseMutationResult } from '@tanstack/react-query';
import { ISignupFields, IRequestError, IResponse, IUser } from '@/types';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<IUser>;

const signup: MutationFunction<IUser, ISignupFields> = async (data) => {
  const response = await api.post<TMutationResponse>(
    import.meta.env.VITE_API + '/api/auth/signup',
    data
  );
  return response.data.data;
};

export const useSignup = (): UseMutationResult<IUser, IRequestError, ISignupFields> => {
  return useMutation({
    mutationFn: signup,
  });
};
