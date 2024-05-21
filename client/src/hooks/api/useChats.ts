import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { IResponse, IRequestError, IPaginatedChats } from "@/types";
import axios from "axios";

interface IQueryResponse extends IResponse<IPaginatedChats> {}

const getChats = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<IPaginatedChats> => {
  const response = await axios.get<IQueryResponse>(
    import.meta.env + `chats?page=${pageParam}&limit=10`,
    { withCredentials: true },
  );
  return response.data.data;
};

export const useChats = (): UseInfiniteQueryResult<
  IPaginatedChats,
  IRequestError
> => {
  return useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: ({ pageParam }) => getChats({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
