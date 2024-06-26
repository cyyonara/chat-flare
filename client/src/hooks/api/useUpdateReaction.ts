import {
   useMutation,
   MutationFunction,
   UseMutationResult,
} from "@tanstack/react-query";
import { IMessage, IRequestError, IResponse } from "@/types";
import { api } from "@/config/axios.config";

type TMutationResponse = IResponse<IMessage>;

const updateReaction: MutationFunction<IMessage, [string, string]> = async ([
   reaction,
   messageId,
]) => {
   const response = await api.patch<TMutationResponse>(
      `/api/messages/${messageId}/reaction`,
      { reaction },
   );
   return response.data.data;
};

export const useUpdateReaction = (): UseMutationResult<
   IMessage,
   IRequestError,
   [string, string]
> => {
   return useMutation({ mutationFn: updateReaction });
};
