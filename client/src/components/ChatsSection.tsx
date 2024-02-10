import React from "react";
import ChatsConfig from "@/components/ChatsConfig";
import ChatList from "@/components/ChatList";

const ChatsSection: React.FC = () => {
  return (
    <div className="flex w-[360px] flex-col border-r">
      <ChatsConfig />
      <ChatList />
    </div>
  );
};

export default ChatsSection;
