import { QueryFunction, useQuery, UseQueryResult } from "@tanstack/react-query";
import { IResponse, IRequestError, IChat } from "@/lib/types";
import axios from "axios";

type TQueryResponse = IResponse<IChat[]>;

const getChats: QueryFunction<TQueryResponse, [string]> = async () => {
  const response = await axios.get<TQueryResponse>(
    import.meta.env.VITE_API + "/api/chats",
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const useGetChats = (): UseQueryResult<
  TQueryResponse,
  IRequestError
> => {
  return useQuery<TQueryResponse, IRequestError>({
    queryKey: ["chats"],
    queryFn: getChats as QueryFunction<TQueryResponse>,
  });
};
