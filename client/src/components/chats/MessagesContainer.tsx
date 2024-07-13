import { useMessages } from '@/hooks/api/useMessages';
import Message from '@/components/chats/Message';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/states/useAuth';
import { useLogout } from '@/hooks/api/useLogout';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

interface IProps {
  isFetchingChatSuccess: boolean;
}

export default function MessagesContainer({ isFetchingChatSuccess }: IProps) {
  const { data, isLoading, isSuccess, isFetching, isError, error, fetchNextPage } =
    useMessages(isFetchingChatSuccess);
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const logoutMutation = useLogout();
  const { ref, inView } = useInView();

  let messagesContainerContent: ReactNode;

  if (isLoading || isFetching) {
    messagesContainerContent = (
      <div className='flex justify-center'>
        <Loader2 size={25} className='animate-spin text-secondary' />
      </div>
    );
  }

  if (isSuccess) {
    messagesContainerContent = (
      <>
        {data.pages.map((page, pageIndex) =>
          page.messages.map((message, messageIndex) => (
            <Message
              key={message.statusId}
              {...message}
              pageIndex={pageIndex}
              messageIndex={messageIndex}
              pages={data.pages}
              totalPages={page.totalPages}
            />
          ))
        )}
        <div ref={ref}></div>
      </>
    );
  }

  useEffect(() => {
    if (isError && error.response?.status === 401) {
      logoutMutation.mutate(null, { onSuccess: clearCredentials });
    }
  }, [isError]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, isSuccess, isFetching, isLoading]);

  return (
    <div className='custom-scroll flex flex-1 flex-col-reverse justify-start gap-y-3 overflow-y-auto p-6'>
      {messagesContainerContent}
    </div>
  );
}
