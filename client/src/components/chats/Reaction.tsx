import { useUpdateReaction } from '@/hooks/api/useUpdateReaction';
import { useAuth } from '@/hooks/states/useAuth';
import { cn } from '@/lib/utils';
import { IPaginatedFetchedMessages, IUser } from '@/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLogout } from '@/hooks/api/useLogout';
import { socket } from '@/components/providers/SocketProvider';

interface IProps {
  messageId: string;
  reaction: string;
  isAlreadyReacted: boolean;
  currentUserReaction: string | undefined;
  closeReactionPicker: () => void;
}

export default function Reaction({
  messageId,
  reaction,
  isAlreadyReacted,
  currentUserReaction,
  closeReactionPicker,
}: IProps) {
  const { mutate } = useUpdateReaction();
  const { user: currentUser, clearCredentials } = useAuth((state) => state);
  const { chatId } = useParams();
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();

  const handleReact = () => {
    const queryKey = ['messages', chatId];

    if (isAlreadyReacted) {
      queryClient.setQueryData(
        queryKey,
        (
          queryData: InfiniteData<IPaginatedFetchedMessages>
        ): InfiniteData<IPaginatedFetchedMessages> => ({
          ...queryData,
          pages: queryData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((message) => {
              if (message._id === messageId) {
                if (reaction === currentUserReaction) {
                  return {
                    ...message,
                    reactors: message.reactors.filter((reactor) => {
                      return reactor.user._id !== currentUser?._id;
                    }),
                  };
                } else {
                  return {
                    ...message,
                    reactors: message.reactors.map((reactor) => {
                      if (reactor.user._id === currentUser!._id) {
                        return { ...reactor, reaction };
                      } else {
                        return reactor;
                      }
                    }),
                  };
                }
              } else {
                return message;
              }
            }),
          })),
        })
      );
    } else {
      queryClient.setQueryData(
        queryKey,
        (
          queryData: InfiniteData<IPaginatedFetchedMessages>
        ): InfiniteData<IPaginatedFetchedMessages> => ({
          ...queryData,
          pages: queryData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((message) => {
              if (message._id === messageId) {
                return {
                  ...message,
                  reactors: [
                    ...message.reactors,
                    { user: currentUser as IUser, reaction },
                  ],
                };
              } else {
                return message;
              }
            }),
          })),
        })
      );
    }
    mutate([reaction, messageId], {
      onSuccess: (data) => {
        socket.emit('update-message-reaction', data);
      },
      onError: (err) => {
        if (err.response?.status === 401) {
          logoutMutation.mutate(null, { onSuccess: clearCredentials });
        }
      },
      onSettled: closeReactionPicker,
    });
  };

  return (
    <button
      className={cn('rounded-lg', {
        'bg-primary': isAlreadyReacted && currentUserReaction === reaction,
      })}
      onClick={handleReact}
    >
      {reaction}
    </button>
  );
}
