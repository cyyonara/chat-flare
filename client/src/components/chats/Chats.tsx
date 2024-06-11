import { useEffect } from "react";
import GroupChat from "@/components/chats/GroupChat";
import Chat from "@/components/chats/Chat";
import ChatsSkeleton from "@/components/skeletons/ChatsSkeleton";
import UserSearchError from "@/components/error/UserSearchError";
import { useChats } from "@/hooks/api/useChats";
import { useInView } from "react-intersection-observer";

interface IProps {}

export default function Chats({}: IProps) {
   const {
      data,
      isLoading,
      isSuccess,
      isFetching,
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
      <div className="max-h custom-scroll max-h-[calc(100vh-169px)] flex-1 overflow-y-auto overflow-x-hidden">
         {isError && (
            <div className="pt-8">
               <UserSearchError retry={refetch} />
            </div>
         )}
         {isSuccess && (
            <>
               {data.pages.map((page) =>
                  page.chats.map((chat) =>
                     chat.isGroupChat ? (
                        <GroupChat key={chat._id} {...chat} />
                     ) : (
                        <Chat key={chat._id} {...chat} />
                     ),
                  ),
               )}
               <div ref={ref}></div>
            </>
         )}
         {isLoading && <ChatsSkeleton count={2} />}
         {isFetching && <ChatsSkeleton count={2} />}
      </div>
   );
}
