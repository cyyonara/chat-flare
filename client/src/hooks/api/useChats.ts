import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  QueryFunction,
} from '@tanstack/react-query';
import { IResponse, IPaginatedChats, IRequestError } from '@/types';
import { api } from '@/config/axios.config';

type TQueryResponse = IResponse<IPaginatedChats>;

const getChats: QueryFunction<IPaginatedChats, [string], number> = async ({
  pageParam,
}) => {
  const response = await api.get<TQueryResponse>(`/api/chats?page=${pageParam}&limit=10`);
  return response.data.data;
};

export const useChats = (): UseInfiniteQueryResult<
  InfiniteData<IPaginatedChats>,
  IRequestError
> => {
  return useInfiniteQuery({
    queryKey: ['chats'],
    queryFn: getChats,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
