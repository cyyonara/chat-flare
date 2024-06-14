import {
   useMutation,
   MutationFunction,
   UseMutationResult,
} from "@tanstack/react-query";
import { IMessage, IRequestError, IResponse } from "@/types";
import axios from "axios";

type TMutationResponse = IResponse<IMessage>;

const updateReaction: MutationFunction<IMessage, [string, string]> = async ([
   reaction,
   messageId,
]) => {
   const response = await axios.patch<TMutationResponse>(
      import.meta.env.VITE_API + `/api/messages/${messageId}/reaction`,
      { reaction },
      { withCredentials: true },
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
