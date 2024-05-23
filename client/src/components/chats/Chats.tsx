import { useChats } from "@/hooks/api/useChats";
import GroupChat from "@/components/chats/GroupChat";
import Chat from "@/components/chats/Chat";

interface IProps {}

export default function Chats({}: IProps) {
  const { data, isLoading, isSuccess, isError, fetchNextPage } = useChats();

  return (
    <div className="max-h custom-scroll max-h-[calc(100vh-160px)] flex-1 overflow-y-auto">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {isSuccess &&
        data.pages.map((page) =>
          page.chats.map((chat) =>
            chat.isGroupChat ? (
              <GroupChat key={chat._id} {...chat} />
            ) : (
              <Chat key={chat._id} {...chat} />
            ),
          ),
        )}
    </div>
  );
}
