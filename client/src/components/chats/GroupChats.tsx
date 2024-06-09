import { useChats } from "@/hooks/api/useChats";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import UserSearchError from "@/components/error/UserSearchError";
import ChatsSkeleton from "@/components/skeletons/ChatsSkeleton";
import GroupChat from "@/components/chats/GroupChat";

interface IProps {}

export default function GroupChats({}: IProps) {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
    fetchNextPage,
  } = useChats();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="max-h custom-scroll max-h-[calc(100vh-170px)] flex-1 overflow-y-auto">
      {isError && (
        <div className="pt-8">
          <UserSearchError retry={refetch} />
        </div>
      )}
      {isSuccess && (
        <>
          {data.pages.map((page) =>
            page.chats
              .filter((chat) => chat.isGroupChat)
              .map((chat) => <GroupChat key={chat._id} {...chat} />),
          )}
          <div ref={ref}></div>
        </>
      )}
      {isLoading && <ChatsSkeleton count={2} />}
      {isFetching && <ChatsSkeleton count={2} />}
    </div>
  );
}
