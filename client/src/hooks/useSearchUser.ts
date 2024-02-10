import { IResponse, IRequestError, IUserCredential } from "@/lib/types";
import { useQuery, UseQueryResult, QueryFunction } from "@tanstack/react-query";
import axios from "axios";

type TQueryResponse = IResponse<IUserCredential[]>;

const searchUser: QueryFunction<TQueryResponse, [string, string]> = async ({
  queryKey,
}): Promise<TQueryResponse> => {
  const keyword = queryKey[1];
  const response = await axios.get<TQueryResponse>(
    import.meta.env.VITE_API + `/api/user/search?keyword=${keyword}`,
    { withCredentials: true },
  );

  return response.data;
};

export const useSearchUser = (
  keyword: string,
): UseQueryResult<TQueryResponse, IRequestError> => {
  return useQuery<TQueryResponse, IRequestError>({
    queryKey: ["search-user", keyword],
    queryFn: searchUser as QueryFunction<TQueryResponse>,
  });
};
