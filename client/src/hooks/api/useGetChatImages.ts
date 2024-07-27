import { IResponse, IRequestError, IPaginatedMessages } from "@/types";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  QueryFunction,
  InfiniteData,
} from "@tanstack/react-query";
import { api } from "@/config/axios.config";
import { useParams } from "react-router-dom";

type TQueryResponse = IResponse<IPaginatedMessages>;

const getChatImages: QueryFunction<
  IPaginatedMessages,
  [string, string],
  number
> = async ({ queryKey, pageParam }) => {
  const chatId = queryKey[1];
  const response = await api.get<TQueryResponse>(
    import.meta.env.VITE_API +
      `/api/chats/${chatId}/images?page=${pageParam}&limit=10`,
  );
  return response.data.data;
};

export const useGetChatImages = (): UseInfiniteQueryResult<
  InfiniteData<IPaginatedMessages>,
  IRequestError
> => {
  const { chatId } = useParams();
  return useInfiniteQuery({
    queryKey: ["chat-images", chatId as string],
    queryFn: getChatImages,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
