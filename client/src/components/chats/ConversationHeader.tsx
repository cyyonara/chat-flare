import { IChat, IChatUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getChatMateInfo } from "@/lib/helpers";

interface IProps {
   chat: IChat | undefined;
   isLoading: boolean;
   isSuccess: boolean;
}

export default function ConversationHeader({
   chat,
   isLoading,
   isSuccess,
}: IProps) {
   let headerContent: React.ReactNode;
   const userInfo = getChatMateInfo(chat?.users as IChatUser[]);

   if (isLoading) {
      headerContent = (
         <div className="flex items-center gap-x-3">
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            <div className="flex flex-col gap-y-2">
               <Skeleton className="h-[16px] w-[100px]" />
               <Skeleton className="h-[10px] w-[50px]" />
            </div>
         </div>
      );
   }

   if (isSuccess) {
      headerContent = (
         <div className="flex items-center gap-x-3">
            <Avatar>
               <AvatarImage
                  src={
                     chat?.isGroupChat
                        ? chat.chatPhoto
                        : userInfo!.user.profilePicture
                  }
               />
               <AvatarFallback className="uppercase">
                  {chat?.isGroupChat
                     ? chat.chatName.substring(0, 2)
                     : userInfo!.user.username.substring(0, 2)}
               </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
               <p className="font-semibold">
                  {chat?.isGroupChat ? chat.chatName : userInfo!.user.username}
               </p>
               {chat?.isGroupChat && (
                  <p className="text-xs text-muted-foreground">
                     {chat.users.length} people
                  </p>
               )}
            </div>
         </div>
      );
   }

   return (
      <header className="flex h-[81px] items-center justify-between border-b p-5">
         {headerContent}
      </header>
   );
}
