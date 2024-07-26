import { api } from '@/config/axios.config';
import { IChat, IResponse, IRequestError, IRemoveMemberData } from '@/types';
import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';

type TMutationResponse = IResponse<IChat>;

const removeMember: MutationFunction<IChat, IRemoveMemberData> = async ({
  chatId,
  userId,
}) => {
  const response = await api.delete<TMutationResponse>(
    import.meta.env.VITE_API + `/api/chats/${chatId}/members/${userId}`
  );

  return response.data.data;
};

export const useRemoveMember = (): UseMutationResult<
  IChat,
  IRequestError,
  IRemoveMemberData
> => {
  return useMutation({ mutationFn: removeMember });
};
