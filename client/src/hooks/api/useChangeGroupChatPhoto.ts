import { api } from '@/config/axios.config';
import { IResponse, IRequestError, IChat, IChangeGroupPhotoData } from '@/types';
import { MutationFunction, useMutation, UseMutationResult } from '@tanstack/react-query';
import { uploadImage } from '@/services/firebase';

type TMutationResponse = IResponse<IChat>;

const changeGroupChatPhoto: MutationFunction<IChat, IChangeGroupPhotoData> = async ({
  imageFile,
  chatId,
}) => {
  const imageUrl = await uploadImage(imageFile);
  const response = await api.patch<TMutationResponse>(`/api/chats/${chatId}/chat-photo`, {
    newGroupChatPhoto: imageUrl,
  });

  return response.data.data;
};

export const useChangeGroupChatPhoto = (): UseMutationResult<
  IChat,
  IRequestError,
  IChangeGroupPhotoData
> => {
  return useMutation({ mutationFn: changeGroupChatPhoto });
};
