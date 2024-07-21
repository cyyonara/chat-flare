import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useAuth } from '@/hooks/states/useAuth';
import { IChat, IMessage, IPaginatedChats, IPaginatedFetchedMessages } from '@/types';
import { isInChat } from '@/lib/helpers';
import { v4 as uuid } from 'uuid';
import { ToastAction } from '@/components/ui/toast';

export const socket = io(import.meta.env.VITE_API);

interface IProps {}

export default function SocketProvider({}: IProps) {
  const currentUserId = useAuth((state) => state.user!._id);
  const { toast } = useToast();
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('connection');
    socket.on('new-groupChat', (newGroupChat: IChat) => {
      if (isInChat(newGroupChat, currentUserId)) {
        toast({
          title: `${newGroupChat.chatCreator.username} started a group chat`,
        });
        queryClient.setQueryData(
          ['chats'],
          (queryData: InfiniteData<IPaginatedChats>): InfiniteData<IPaginatedChats> => ({
            ...queryData,
            pages: queryData.pages.map((page, i) => {
              if (!i) {
                return {
                  ...page,
                  chats: [newGroupChat, ...page.chats],
                };
              } else {
                return page;
              }
            }),
          })
        );
        queryClient.invalidateQueries({ queryKey: ['chats'], exact: true });
      }
    });

    socket.on('update-message-reaction', (updatedMessage: IMessage) => {
      const isMessagesInCache = queryClient.getQueryData([
        'messages',
        updatedMessage.chatId,
      ]);

      if (isMessagesInCache) {
        queryClient.setQueryData(
          ['messages', updatedMessage.chatId],
          (
            queryData: InfiniteData<IPaginatedFetchedMessages>
          ): InfiniteData<IPaginatedFetchedMessages> => ({
            ...queryData,
            pages: queryData.pages.map((page) => ({
              ...page,
              messages: page.messages.map((message) => {
                if (message._id === updatedMessage._id) {
                  return {
                    ...updatedMessage,
                    statusId: uuid(),
                    isSending: false,
                  };
                } else {
                  return message;
                }
              }),
            })),
          })
        );
      }
    });

    // Update group chat info - [chat name, group photo]
    socket.on('update-chat', (updatedChat: IChat) => {
      queryClient.setQueryData(
        ['chats'],
        (queryData: InfiniteData<IPaginatedChats>): InfiniteData<IPaginatedChats> => ({
          ...queryData,
          pages: queryData.pages.map((page) => ({
            ...page,
            chats: page.chats.map((chat) => {
              if (chat._id === updatedChat._id) {
                return updatedChat;
              } else {
                return chat;
              }
            }),
          })),
        })
      );

      const isChatInCache = queryClient.getQueryData(['chats', updatedChat._id]);

      if (isChatInCache) {
        queryClient.setQueryData(['chats', updatedChat._id], (): IChat => updatedChat);
      }
    });

    return () => {
      socket.removeListener('new-groupChat');
      socket.removeListener('update-message-reaction');
      socket.removeListener('update-chat');
    };
  }, []);

  useEffect(() => {
    socket.on('new-message', (updatedChat: IChat) => {
      if (isInChat(updatedChat, currentUserId)) {
        queryClient.setQueryData(
          ['chats'],
          (queryData: InfiniteData<IPaginatedChats>): InfiniteData<IPaginatedChats> => {
            const filteredPages = queryData.pages.map((page) => ({
              ...page,
              chats: page.chats.filter((chat) => chat._id !== updatedChat._id),
            }));

            return {
              ...queryData,
              pages: filteredPages.map((page, i) => {
                if (!i) {
                  return {
                    ...page,
                    chats: [updatedChat, ...page.chats],
                  };
                } else {
                  return page;
                }
              }),
            };
          }
        );

        if (chatId === updatedChat._id) {
          queryClient.setQueryData(
            ['messages', updatedChat._id],
            (
              queryData: InfiniteData<IPaginatedFetchedMessages>
            ): InfiniteData<IPaginatedFetchedMessages> => ({
              ...queryData,
              pages: queryData.pages.map((page, i) => {
                if (!i) {
                  return {
                    ...page,
                    messages: [
                      {
                        ...(updatedChat.lastMessage as IMessage),
                        isSending: false,
                        statusId: uuid(),
                      },
                      ...page.messages,
                    ],
                  };
                } else {
                  return page;
                }
              }),
            })
          );
        } else {
          const cachedMessages = queryClient.getQueryData(['messages', updatedChat._id]);

          if (cachedMessages) {
            queryClient.setQueryData(
              ['messages', updatedChat._id],
              (
                queryData: InfiniteData<IPaginatedFetchedMessages>
              ): InfiniteData<IPaginatedFetchedMessages> => ({
                ...queryData,
                pages: queryData.pages.map((page, i) => {
                  if (!i) {
                    return {
                      ...page,
                      messages: [
                        {
                          ...(updatedChat.lastMessage as IMessage),
                          statusId: uuid(),
                          isSending: false,
                        },
                        ...page.messages,
                      ],
                    };
                  } else {
                    return page;
                  }
                }),
              })
            );
          }

          if (updatedChat.isGroupChat) {
            toast({
              title: updatedChat.chatName,
              description: updatedChat.lastMessage?.isImage
                ? `${updatedChat.lastMessage?.sender.username} sent a photo.`
                : `${updatedChat.lastMessage?.sender.username}: ${updatedChat.lastMessage?.content}`,
              action: (
                <ToastAction
                  altText='View message'
                  onClick={() => navigate(`/chats/${updatedChat._id}`)}
                >
                  View message
                </ToastAction>
              ),
            });
          }
        }
      }
    });

    return () => {
      socket.removeListener('new-message');
    };
  }, [chatId]);

  return <Outlet />;
}
