import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  QueryFunction,
} from "@tanstack/react-query";
import { IResponse, IPaginatedChats, IRequestError } from "@/types";
import axios from "axios";

interface IQueryResponse extends IResponse<IPaginatedChats> {}

const getChats: QueryFunction<IPaginatedChats, [string], number> = async ({
  pageParam,
}) => {
  const response = await axios.get<IQueryResponse>(
    import.meta.env.VITE_API + `chats?page=${pageParam}&limit=10`,
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
