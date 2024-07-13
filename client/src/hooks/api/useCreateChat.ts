import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';
import { IResponse, IRequestError, INewChat, IChat } from '@/types';
import { api } from '@/config/axios.config';

type TMutationResponse = IResponse<IChat>;

const createChat: MutationFunction<IChat, INewChat> = async ({ users, ...rest }) => {
  const response = await api.post<TMutationResponse>('/api/chats', {
    ...rest,
    users: users.map((user) => user._id),
  });
  return response.data.data;
};

export const useCreateChat = (): UseMutationResult<IChat, IRequestError, INewChat> => {
  return useMutation({
    mutationFn: createChat,
  });
};
