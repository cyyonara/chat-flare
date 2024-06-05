import { io } from "socket.io-client";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useAuth } from "@/hooks/custom/useAuth";
import { IChat, IPaginatedChats } from "@/types";

export const socket = io(import.meta.env.VITE_API);

interface IProps {}

export default function SocketProvider({}: IProps) {
  const currentUserId = useAuth((state) => state.user?._id);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("connection");

    socket.on("new-groupChat", (newGroupChat: IChat) => {
      const isInGroupChat = newGroupChat.users.find(
        (userObj) => userObj.user._id === currentUserId,
      );

      if (isInGroupChat) {
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
  }, []);

  return <>{<Outlet />}</>;
}
