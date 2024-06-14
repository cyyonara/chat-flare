import { useAuth } from "@/hooks/custom/useAuth";
import { cn } from "@/lib/utils";
import { IFetchedMessage, IPaginatedFetchedMessages } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   TooltipProvider,
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { MdEmojiEmotions } from "react-icons/md";
import { useMemo, useState } from "react";
import ReactionPicker from "@/components/chats/ReactionPicker";
import { AnimatePresence } from "framer-motion";
import MessageReactions from "@/components/chats/MessageReactions";
import ReactorsList from "./ReactorsList";

interface IProps extends IFetchedMessage {
   pageIndex: number;
   messageIndex: number;
   pages: IPaginatedFetchedMessages[];
   totalPages: number;
}

export default function Message({
   _id,
   content,
   isImage,
   isLeaveMessage,
   isNewMemberMessage,
   isSending,
   sender,
   messageIndex,
   pageIndex,
   pages,
   totalPages,
   reactors,
}: IProps) {
   const [showReactionPicker, setShowReactionPicker] = useState<boolean>(false);
   const [showReactorsList, setShowReactorsList] = useState<boolean>(false);
   const currentUserId = useAuth((state) => state.user!._id);

   const displayProfile = (): boolean => {
      if (currentUserId !== sender._id) {
         const nextPage: IPaginatedFetchedMessages | undefined =
            pages[pageIndex + 1];
         const previousPage: IPaginatedFetchedMessages | undefined =
            pages[pageIndex - 1];
         const lastMessageIndexPerPage = pages[pageIndex].messages.length - 1;

         const currentPageMessages = pages[pageIndex].messages;

         if (!pageIndex) {
            if (nextPage) {
               if (messageIndex === lastMessageIndexPerPage) {
                  const nextPageFirstMessage = nextPage.messages[0];
                  const previousMessage = currentPageMessages[messageIndex - 1];

                  if (
                     (previousMessage.sender._id !== sender._id &&
                        nextPageFirstMessage.sender._id !== sender._id) ||
                     (previousMessage.sender._id !== sender._id &&
                        nextPageFirstMessage.sender._id === sender._id)
                  ) {
                     return true;
                  } else {
                     return false;
                  }
               } else {
                  if (!messageIndex) {
                     return true;
                  } else {
                     const nextMessage = currentPageMessages[messageIndex + 1];
                     const previousMessage =
                        currentPageMessages[messageIndex - 1];

                     if (
                        (nextMessage.sender._id !== sender._id &&
                           previousMessage.sender._id !== sender._id) ||
                        (previousMessage.sender._id !== sender._id &&
                           nextMessage.sender._id === sender._id)
                     ) {
                        return true;
                     } else {
                        return false;
                     }
                  }
               }
            } else {
               if (messageIndex === lastMessageIndexPerPage) {
                  const previousMessage = currentPageMessages[messageIndex - 1];

                  if (!lastMessageIndexPerPage) {
                     return true;
                  } else {
                     if (previousMessage.sender._id !== sender._id) {
                        return true;
                     } else {
                        return false;
                     }
                  }
               } else {
                  if (!messageIndex) {
                     return true;
                  } else {
                     const nextMessage = currentPageMessages[messageIndex + 1];
                     const previousMessage =
                        currentPageMessages[messageIndex - 1];

                     if (
                        (nextMessage.sender._id !== sender._id &&
                           previousMessage.sender._id !== sender._id) ||
                        (previousMessage.sender._id !== sender._id &&
                           nextMessage.sender._id === sender._id)
                     ) {
                        return true;
                     } else {
                        return false;
                     }
                  }
               }
            }
         } else if (pageIndex + 1 === totalPages) {
            if (messageIndex === lastMessageIndexPerPage) {
               if (!messageIndex) {
                  const previousPageLastMessage =
                     previousPage.messages[lastMessageIndexPerPage];
                  const nextMessage = currentPageMessages[messageIndex + 1];

                  if (
                     (previousPageLastMessage.sender._id !== sender._id &&
                        nextMessage?.sender._id !== sender._id) ||
                     (previousPageLastMessage.sender._id !== sender._id &&
                        nextMessage?.sender._id)
                  ) {
                     return true;
                  } else {
                     return false;
                  }
               } else {
                  const previousMessage = currentPageMessages[messageIndex - 1];
                  if (previousMessage.sender._id !== sender._id) {
                     return true;
                  } else {
                     return false;
                  }
               }
            } else {
               if (!messageIndex) {
                  const previousPageLastMessage =
                     previousPage.messages[lastMessageIndexPerPage];
                  const nextMessage = currentPageMessages[messageIndex + 1];

                  if (
                     (previousPageLastMessage.sender._id !== sender._id &&
                        nextMessage.sender._id !== sender._id) ||
                     (previousPageLastMessage.sender._id !== sender._id &&
                        nextMessage.sender._id)
                  ) {
                     return true;
                  } else {
                     return false;
                  }
               } else {
                  const nextMessage = currentPageMessages[messageIndex + 1];
                  const previousMessage = currentPageMessages[messageIndex - 1];

                  if (
                     (nextMessage.sender._id !== sender._id &&
                        previousMessage.sender._id !== sender._id) ||
                     (previousMessage.sender._id !== sender._id &&
                        nextMessage.sender._id === sender._id)
                  ) {
                     return true;
                  } else {
                     return false;
                  }
               }
            }
         } else {
            if (nextPage) {
               if (messageIndex === lastMessageIndexPerPage) {
                  const nextPageFirstMessage = nextPage.messages[0];
                  const previousMessage = currentPageMessages[messageIndex - 1];

                  if (
                     (previousMessage.sender._id !== sender._id &&
                        nextPageFirstMessage.sender._id !== sender._id) ||
                     (previousMessage.sender._id !== sender._id &&
                        nextPageFirstMessage.sender._id === sender._id)
                  ) {
                     return true;
                  } else {
                     return false;
                  }
               } else {
                  if (!messageIndex) {
                     const previousPageLastMessage =
                        previousPage.messages[lastMessageIndexPerPage];
                     const nextMessage = currentPageMessages[messageIndex + 1];

                     if (
                        (previousPageLastMessage.sender._id !== sender._id &&
                           nextMessage.sender._id !== sender._id) ||
                        (previousPageLastMessage.sender._id !== sender._id &&
                           nextMessage.sender._id)
                     ) {
                        return true;
                     } else {
                        return false;
                     }
                  } else {
                     const nextMessage = currentPageMessages[messageIndex + 1];
                     const previousMessage =
                        currentPageMessages[messageIndex - 1];

                     if (
                        (nextMessage.sender._id !== sender._id &&
                           previousMessage.sender._id !== sender._id) ||
                        (previousMessage.sender._id !== sender._id &&
                           nextMessage.sender._id === sender._id)
                     ) {
                        return true;
                     } else {
                        return false;
                     }
                  }
               }
            } else {
               if (messageIndex === lastMessageIndexPerPage) {
                  const previousMessage = currentPageMessages[messageIndex - 1];

                  if (previousMessage.sender._id !== sender._id) {
                     return true;
                  } else {
                     return false;
                  }
               } else {
                  if (!messageIndex) {
                     const previousPageLastMessage =
                        previousPage.messages[lastMessageIndexPerPage];
                     const nextMessage = currentPageMessages[messageIndex + 1];

                     if (
                        (previousPageLastMessage.sender._id !== sender._id &&
                           nextMessage.sender._id !== sender._id) ||
                        (previousPageLastMessage.sender._id !== sender._id &&
                           nextMessage.sender._id)
                     ) {
                        return true;
                     } else {
                        return false;
                     }
                  } else {
                     const nextMessage = currentPageMessages[messageIndex + 1];
                     const previousMessage =
                        currentPageMessages[messageIndex - 1];

                     if (
                        (nextMessage.sender._id !== sender._id &&
                           previousMessage.sender._id !== sender._id) ||
                        (previousMessage.sender._id !== sender._id &&
                           nextMessage.sender._id === sender._id)
                     ) {
                        return true;
                     } else {
                        return false;
                     }
                  }
               }
            }
         }
      } else {
         return false;
      }
   };

   const renderProfile = useMemo(() => displayProfile(), []);

   if (isLeaveMessage) {
      return <div className="flex">someone leave the group</div>;
   }

   if (isNewMemberMessage) {
      return <div className="flex">joined the group</div>;
   }

   return (
      <>
         <AnimatePresence>
            {showReactorsList && (
               <ReactorsList
                  reactors={reactors}
                  close={() => setShowReactorsList(false)}
               />
            )}
         </AnimatePresence>
         <div
            className={cn("w-full flex items-center", {
               "mb-auto": !pageIndex && !messageIndex,
               "pb-3": reactors.length > 0,
            })}
         >
            <div
               className={cn("flex gap-x-2 items-end", {
                  "ml-auto": sender._id === currentUserId,
               })}
            >
               {renderProfile ? (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger>
                           <Avatar className="size-[30px]">
                              <AvatarImage src={sender.profilePicture} />
                              <AvatarFallback className="uppercase">
                                 {sender.username.substring(0, 2)}
                              </AvatarFallback>
                           </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>{sender.username}</TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               ) : (
                  <div className="size-[30px]"></div>
               )}
               <div
                  className={cn("flex items-center gap-x-2 group", {
                     "flex-row-reverse": sender._id === currentUserId,
                  })}
               >
                  <div className="relative">
                     {isImage ? (
                        <img
                           src={content}
                           alt={_id}
                           className="object-center object-contain max-w-[300px] rounded-lg"
                        />
                     ) : (
                        <div
                           className={cn(
                              "bg-secondary rounded-lg py-2 px-3 text-sm text-primary font-semibold",
                              {
                                 "bg-primary text-secondary":
                                    sender._id === currentUserId,
                              },
                           )}
                        >
                           {content}
                        </div>
                     )}
                     {reactors.length > 0 && (
                        <MessageReactions
                           reactors={reactors}
                           variant={
                              currentUserId === sender._id
                                 ? "secondary"
                                 : "primary"
                           }
                           position={
                              currentUserId === sender._id ? "left" : "right"
                           }
                           showReactorsList={() => setShowReactorsList(true)}
                        />
                     )}
                  </div>
                  <AnimatePresence>
                     {showReactionPicker && (
                        <ReactionPicker
                           messageId={_id}
                           currentUserId={currentUserId}
                           reactors={reactors}
                           closeReactionPicker={() =>
                              setShowReactionPicker(false)
                           }
                        />
                     )}
                  </AnimatePresence>
                  <div
                     className={cn("hidden", {
                        "group-hover:flex": !showReactionPicker && !isSending,
                     })}
                  >
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger
                              className="bg-secondary p-1 rounded-full"
                              onClick={() => setShowReactionPicker(true)}
                           >
                              <MdEmojiEmotions size={12} />
                           </TooltipTrigger>
                           <TooltipContent className="text-xs">
                              Add Reaction
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </div>
               </div>
               {isSending && <Loader2 size={12} className="animate-spin" />}
            </div>
         </div>
      </>
   );
}
