import { useQuery, QueryFunction, UseQueryResult } from '@tanstack/react-query';
import { IChat, IResponse, IRequestError } from '@/types';
import { api } from '@/config/axios.config';

type TQueryResponse = IResponse<IChat>;

const getChat: QueryFunction<IChat, [string, string]> = async ({ queryKey }) => {
  const chatId = queryKey[1];
  const response = await api.get<TQueryResponse>(`/api/chats/${chatId}`);
  return response.data.data;
};

export const useChat = (chatId: string): UseQueryResult<IChat, IRequestError> => {
  return useQuery({ queryKey: ['chats', chatId], queryFn: getChat });
};
