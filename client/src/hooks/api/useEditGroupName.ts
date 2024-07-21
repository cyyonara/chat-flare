import { api } from '@/config/axios.config';
import { IResponse, IChat, IRequestError, INewGroupName } from '@/types';
import { useMutation, MutationFunction, UseMutationResult } from '@tanstack/react-query';

type TMutationResponse = IResponse<IChat>;

const editGroupName: MutationFunction<IChat, INewGroupName> = async ({
  groupName,
  chatId,
}) => {
  const response = await api.patch<TMutationResponse>(
    import.meta.env.VITE_API + `/api/chats/${chatId}/group-name`,
    { groupName: groupName }
  );

  return response.data.data;
};

export const useEditGroupName = (): UseMutationResult<
  IChat,
  IRequestError,
  INewGroupName
> => {
  return useMutation({ mutationFn: editGroupName });
};
