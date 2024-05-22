import {
  useInfiniteQuery,
  QueryFunction,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import { IPaginatedUsers, IResponse, IRequestError } from "@/types";
import axios from "axios";

interface IQueryResponse extends IResponse<IPaginatedUsers> {}

const getUsers: QueryFunction<
  IPaginatedUsers,
  [string, string],
  number
> = async ({ queryKey, pageParam }) => {
  const searchKeyword = queryKey[1];
  const response = await axios.get<IQueryResponse>(
    import.meta.env.VITE_API +
      `user/search?keyword=${searchKeyword}&page=${pageParam}&limit=5`,
    { withCredentials: true },
  );
  return response.data.data;
};

export const useSearchUsers = (
  searchKeyword: string,
): UseInfiniteQueryResult<InfiniteData<IPaginatedUsers>, IRequestError> => {
  return useInfiniteQuery({
    queryKey: ["search-users", searchKeyword],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: searchKeyword ? true : false,
  });
};
