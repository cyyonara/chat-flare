import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';
import { IResponse, IRequestError } from '@/types';
import { uploadImage } from '@/services/firebase';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<{ newProfilePicture: string }>;

const setupAccount: MutationFunction<{ newProfilePicture: string }, File> = async (
  imageFile: File
) => {
  const imageURL = await uploadImage(imageFile);
  const response = await api.patch<TMutationResponse>('/api/user/profile-picture', {
    profilePicture: imageURL,
  });
  return response.data.data;
};

export const useSetup = (): UseMutationResult<
  { newProfilePicture: string },
  IRequestError,
  File
> => {
  return useMutation({
    mutationFn: setupAccount,
  });
};
