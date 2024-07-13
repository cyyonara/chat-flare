import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';
import { INewMessage, IRequestError, IResponse, IChat } from '@/types';
import { uploadImage } from '@/services/firebase';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<IChat>;

const sendMessage: MutationFunction<IChat, INewMessage> = async ({
  chatId,
  content,
  isImage,
}) => {
  let actualContent = isImage ? await uploadImage(content as File) : content;

  const response = await api.post<TMutationResponse>(`/api/messages/${chatId}`, {
    content: actualContent,
    isImage,
  });
  return response.data.data;
};

export const useSendMessage = (): UseMutationResult<
  IChat,
  IRequestError,
  INewMessage
> => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
