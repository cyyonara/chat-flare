import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunction,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import {
  IPaginatedFetchedMessages,
  IPaginatedMessages,
  IResponse,
  IRequestError,
} from '@/types';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { api } from '@/config/axios.config';

type TQueryResponse = IResponse<IPaginatedMessages>;

const getMessages: QueryFunction<
  IPaginatedFetchedMessages,
  [string, string],
  number
> = async ({ pageParam, queryKey }) => {
  const chatId = queryKey[1];

  const response = await api.get<TQueryResponse>(
    `/api/messages/${chatId}?page=${pageParam}&limit=15`
  );

  return {
    ...response.data.data,
    messages: response.data.data.messages.map((message) => ({
      ...message,
      statusId: uuid(),
      isSending: false,
    })),
  };
};

export const useMessages = (
  isFetchingChatSuccess: boolean
): UseInfiniteQueryResult<InfiniteData<IPaginatedFetchedMessages>, IRequestError> => {
  const { chatId } = useParams();
  return useInfiniteQuery({
    queryKey: ['messages', chatId as string],
    queryFn: getMessages,
    enabled: isFetchingChatSuccess,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
