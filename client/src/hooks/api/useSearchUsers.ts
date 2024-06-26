import {
   useInfiniteQuery,
   QueryFunction,
   UseInfiniteQueryResult,
   InfiniteData,
} from "@tanstack/react-query";
import { IPaginatedUsers, IResponse, IRequestError } from "@/types";
import { api } from "@/config/axios.config";

type TQueryResponse = IResponse<IPaginatedUsers>;

const getUsers: QueryFunction<
   IPaginatedUsers,
   [string, string],
   number
> = async ({ queryKey, pageParam }) => {
   const keyword = queryKey[1];
   const response = await api.get<TQueryResponse>(
      `/api/user/search?keyword=${keyword}&page=${pageParam}&limit=5`,
   );
   return response.data.data;
};

export const useSearchUsers = (
   keyword: string,
): UseInfiniteQueryResult<InfiniteData<IPaginatedUsers>, IRequestError> => {
   return useInfiniteQuery({
      queryKey: ["search-users", keyword],
      queryFn: getUsers,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
      enabled: keyword ? true : false,
   });
};
