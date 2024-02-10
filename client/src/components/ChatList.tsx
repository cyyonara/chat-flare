import React from "react";
import { useGetChats } from "@/hooks/useGetChats";
import ChatListSkeleton from "@/components/skeletons/ChatListSkeleton";

const ChatList: React.FC = () => {
  const { data: chats, isLoading, isError, isSuccess } = useGetChats();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {isLoading && <ChatListSkeleton />}
    </div>
  );
};

export default ChatList;
