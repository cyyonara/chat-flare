import { useChats } from '@/hooks/api/useChats';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@/hooks/states/useAuth';
import { useLogout } from '@/hooks/api/useLogout';
import UserSearchError from '@/components/error/UserSearchError';
import ChatsSkeleton from '@/components/skeletons/ChatsSkeleton';
import GroupChat from '@/components/chats/GroupChat';

interface IProps {}

export default function GroupChats({}: IProps) {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
    fetchNextPage,
  } = useChats();
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const { mutate: logout } = useLogout();
  const { ref, inView } = useInView();

  let groupChatsContent: ReactNode;

  if (isLoading || isFetching) {
    groupChatsContent = <ChatsSkeleton count={2} />;
  }

  if (isError && !isFetching) {
    groupChatsContent = (
      <div className='pt-8'>
        <UserSearchError retry={refetch} />
      </div>
    );
  }

  if (isSuccess) {
    groupChatsContent = (
      <>
        {data.pages.map((page) =>
          page.chats
            .filter((chat) => chat.isGroupChat)
            .map((chat) => <GroupChat key={chat._id} {...chat} />)
        )}
        <div ref={ref}></div>
      </>
    );
  }

  useEffect(() => {
    if (isError && error.response?.status === 401) {
      logout(null, { onSuccess: clearCredentials });
    }
  }, [isError]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className='max-h custom-scroll max-h-[calc(100vh-170px)] flex-1 overflow-y-auto overflow-x-hidden'>
      {groupChatsContent}
    </div>
  );
}
