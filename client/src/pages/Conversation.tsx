import ConversationHeader from "@/components/chats/ConversationHeader";
import MessageInput from "@/components/chats/MessageInput";
import MessagesContainer from "@/components/chats/MessagesContainer";
import { useChat } from "@/hooks/api/useChat";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/states/useAuth";
import { useLogout } from "@/hooks/api/useLogout";
import { useEffect } from "react";

interface IProps {}

export default function Conversation({}: IProps) {
   const { chatId } = useParams();
   const { data, error, isLoading, isSuccess, isError } = useChat(
      chatId as string,
   );
   const logoutMutation = useLogout();
   const clearCredentials = useAuth((state) => state.clearCredentials);

   useEffect(() => {
      if (isError && error.response?.status === 401) {
         logoutMutation.mutate(null, { onSuccess: clearCredentials });
      }
   }, [isError]);

   return (
      <div className="flex flex-1">
         <main className="flex flex-1 flex-col">
            <ConversationHeader
               chat={data}
               isLoading={isLoading}
               isSuccess={isSuccess}
            />
            <section className="flex flex-1 flex-col overflow-y-auto">
               <MessagesContainer isFetchingChatSuccess={isSuccess} />
               <MessageInput isSuccess={isSuccess} />
            </section>
         </main>
         <div className="w-[350px] border-l"></div>
      </div>
   );
}
