import { useQuery, QueryFunction, UseQueryResult } from "@tanstack/react-query";
import { IChat, IResponse, IRequestError } from "@/types";
import axios from "axios";

type TQueryResponse = IResponse<IChat>;

const getChat: QueryFunction<IChat, [string, string]> = async ({
  queryKey,
}) => {
  const chatId = queryKey[1];
  const response = await axios.get<TQueryResponse>(
    import.meta.env.VITE_API + `/api/chats/${chatId}`,
    { withCredentials: true },
  );
  return response.data.data;
};

export const useChat = (
  chatId: string,
): UseQueryResult<IChat, IRequestError> => {
  return useQuery({ queryKey: ["chats", chatId], queryFn: getChat });
};
