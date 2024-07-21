import ConversationHeader from '@/components/chats/ConversationHeader';
import MessageInput from '@/components/chats/MessageInput';
import MessagesContainer from '@/components/chats/MessagesContainer';
import ChatInfo from '@/components/chats/ChatInfo';
import { useChat } from '@/hooks/api/useChat';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/states/useAuth';
import { useLogout } from '@/hooks/api/useLogout';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IProps {}

export default function Conversation({}: IProps) {
  const { chatId } = useParams();
  const { data, error, isLoading, isSuccess, isError } = useChat(chatId as string);
  const { mutate: logout } = useLogout();
  const clearCredentials = useAuth((state) => state.clearCredentials);

  useEffect(() => {
    if (isError && error.response?.status === 401) {
      logout(null, { onSuccess: clearCredentials });
    }
  }, [isError]);

  return (
    <div
      className={cn('lg:flex flex-1 h-full', {
        hidden: !chatId,
      })}
    >
      <main className='flex flex-1 flex-col h-full'>
        <ConversationHeader chat={data} isLoading={isLoading} isSuccess={isSuccess} />
        <section className='flex flex-1 flex-col overflow-y-auto'>
          <MessagesContainer isFetchingChatSuccess={isSuccess} />
          <MessageInput isSuccess={isSuccess} />
        </section>
      </main>
      <ChatInfo
        isChatLoading={isLoading}
        isChatSuccess={isSuccess}
        isChatError={isError}
        chat={data}
      />
    </div>
  );
}
