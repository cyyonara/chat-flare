import { useEffect, ReactNode } from "react";
import GroupChat from "@/components/chats/GroupChat";
import Chat from "@/components/chats/Chat";
import ChatsSkeleton from "@/components/skeletons/ChatsSkeleton";
import UserSearchError from "@/components/error/UserSearchError";
import { useChats } from "@/hooks/api/useChats";
import { useInView } from "react-intersection-observer";
import { useLogout } from "@/hooks/api/useLogout";
import { useAuth } from "@/hooks/states/useAuth";

interface IProps {}

export default function Chats({}: IProps) {
   const {
      data,
      error,
      isLoading,
      isSuccess,
      isFetching,
      isError,
      refetch,
      fetchNextPage,
   } = useChats();
   const logoutMutation = useLogout();
   const clearCredentials = useAuth((state) => state.clearCredentials);
   const { ref, inView } = useInView();

   let chatsContent: ReactNode;

   if (isLoading || isFetching) {
      chatsContent = <ChatsSkeleton count={2} />;
   }

   if (isError && !isFetching) {
      chatsContent = (
         <div className="pt-8">
            <UserSearchError retry={refetch} />
         </div>
      );
   }

   if (isSuccess) {
      chatsContent = (
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
      );
   }

   useEffect(() => {
      if (isError && error.response?.status === 401) {
         logoutMutation.mutate(null, { onSuccess: clearCredentials });
      }
   }, [isError]);

   useEffect(() => {
      if (inView) {
         fetchNextPage();
      }
   }, [inView]);

   return (
      <div className="custom-scroll max-h-[calc(100vh-169px)] flex-1 overflow-y-auto overflow-x-hidden">
         {chatsContent}
      </div>
   );
}
