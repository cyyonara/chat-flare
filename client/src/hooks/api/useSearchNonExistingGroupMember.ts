import { api } from '@/config/axios.config';
import { IResponse, IPaginatedUsers, IRequestError } from '@/types';
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunction,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type TQueryResponse = IResponse<IPaginatedUsers>;

const searchNonExistingGroupMember: QueryFunction<
  IPaginatedUsers,
  [string, string, string],
  number
> = async ({ queryKey, pageParam }) => {
  const searchKeyword = queryKey[1];
  const chatId = queryKey[2];
  const response = await api.get<TQueryResponse>(
    import.meta.env.VITE_API +
      `/api/chats/${chatId}/members/search?keyword=${searchKeyword}&page=${pageParam}&limit=10`
  );

  return response.data.data;
};

export const useSearchNonExistingGroupMember = (
  searchKeyword: string
): UseInfiniteQueryResult<InfiniteData<IPaginatedUsers>, IRequestError> => {
  const { chatId } = useParams();

  return useInfiniteQuery({
    queryKey: ['search-non-existing-member', searchKeyword, chatId as string],
    queryFn: searchNonExistingGroupMember,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: searchKeyword !== '',
  });
};
