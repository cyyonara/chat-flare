import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  QueryFunction,
} from "@tanstack/react-query";
import { IResponse, IPaginatedChats, IRequestError } from "@/types";
import axios from "axios";

type TQueryResponse = IResponse<IPaginatedChats>;

const getChats: QueryFunction<IPaginatedChats, [string], number> = async ({
  pageParam,
}) => {
  const response = await axios.get<TQueryResponse>(
    import.meta.env.VITE_API + `/api/chats?page=${pageParam}&limit=10`,
    { withCredentials: true },
  );
  return response.data.data;
};

export const useChats = (): UseInfiniteQueryResult<
  InfiniteData<IPaginatedChats>,
  IRequestError
> => {
  return useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
