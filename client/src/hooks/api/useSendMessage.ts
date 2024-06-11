import {
   useMutation,
   UseMutationResult,
   MutationFunction,
} from "@tanstack/react-query";
import { INewMessage, IRequestError, IResponse, IChat } from "@/types";
import { uploadImage } from "@/services/firebase";
import axios from "axios";

type TMutationResponse = IResponse<IChat>;

const sendMessage: MutationFunction<IChat, INewMessage> = async ({
   chatId,
   content,
   isImage,
}) => {
   let actualContent = isImage ? await uploadImage(content as File) : content;

   const response = await axios.post<TMutationResponse>(
      import.meta.env.VITE_API + `/api/messages/${chatId}`,
      {
         content: actualContent,
         isImage,
      },
      {
         withCredentials: true,
      },
   );
   return response.data.data;
};

export const useSendMessage = (): UseMutationResult<
   IChat,
   IRequestError,
   INewMessage
> => {
   return useMutation({
      mutationFn: sendMessage,
   });
};
