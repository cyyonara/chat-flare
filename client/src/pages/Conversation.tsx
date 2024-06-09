import ConversationHeader from "@/components/chats/ConversationHeader";
import MessageInput from "@/components/chats/MessageInput";
import MessagesContainer from "@/components/chats/MessagesContainer";
import { useChat } from "@/hooks/api/useChat";
import { useParams } from "react-router-dom";

interface IProps {}

export default function Conversation({}: IProps) {
  const { chatId } = useParams();
  const { data, isLoading, isSuccess } = useChat(chatId as string);

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col">
        <ConversationHeader
          chat={data}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <main className="flex flex-1 flex-col overflow-y-auto">
          <MessagesContainer isFetchingChatSuccess={isSuccess} />
          <MessageInput isSuccess={isSuccess} />
        </main>
      </div>
      <div className="w-[350px] border-l"></div>
    </div>
  );
}
