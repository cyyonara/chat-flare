import { io } from "socket.io-client";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useAuth } from "@/hooks/custom/useAuth";
import {
  IChat,
  IMessage,
  IPaginatedChats,
  IPaginatedFetchedMessages,
} from "@/types";
import { isInChat } from "@/lib/helpers";
import { v4 as uuid } from "uuid";

export const socket = io(import.meta.env.VITE_API);

interface IProps {}

export default function SocketProvider({}: IProps) {
  const currentUserId = useAuth((state) => state.user?._id) as string;
  const { toast } = useToast();
  const { chatId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("connection");
    socket.on("new-groupChat", (newGroupChat: IChat) => {
      if (isInChat(newGroupChat, currentUserId)) {
        toast({
          title: `${newGroupChat.chatCreator.username} started a group chat`,
        });
        queryClient.setQueryData(
          ["chats"],
          (
            queryData: InfiniteData<IPaginatedChats>,
          ): InfiniteData<IPaginatedChats> => ({
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
          }),
        );
        queryClient.invalidateQueries({ queryKey: ["chats"], exact: true });
      }
    });

    return () => {
      socket.removeListener("new-groupChat");
    };
  }, []);

  useEffect(() => {
    socket.on("new-message", (updatedChat: IChat) => {
      if (isInChat(updatedChat, currentUserId)) {
        if (chatId === updatedChat._id) {
          queryClient.setQueryData(
            ["messages", updatedChat._id],
            (
              queryData: InfiniteData<IPaginatedFetchedMessages>,
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
            }),
          );
        }
      }
    });

    return () => {
      socket.removeListener("new-message");
    };
  }, [chatId]);

  return <>{<Outlet />}</>;
}
