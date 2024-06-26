import EmojiPicker, { Theme } from "emoji-picker-react";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent,
   TooltipProvider,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { MdEmojiEmotions } from "react-icons/md";
import { HiPaperAirplane } from "react-icons/hi2";
import { CiImageOn } from "react-icons/ci";
import { v4 as uuid } from "uuid";
import { checkImage } from "@/lib/helpers";
import { useSendMessage } from "@/hooks/api/useSendMessage";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { IPaginatedChats, IPaginatedFetchedMessages, IUser } from "@/types";
import { useAuth } from "@/hooks/states/useAuth";
import { socket } from "@/components/providers/SocketProvider";

interface IProps {
   isSuccess: boolean;
}

export default function MessageInput({ isSuccess }: IProps) {
   const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
   const [message, setMessage] = useState<string>("");
   const { mutate } = useSendMessage();
   const { toast } = useToast();
   const { chatId } = useParams();
   const currentUser = useAuth((state) => state.user);
   const imageInputRef = useRef<HTMLInputElement | null>(null);
   const queryClient = useQueryClient();

   const setCachedMessagesAndUpdate = (
      message: string | File,
      callback?: Function,
   ) => {
      const statusId = uuid();
      const _id = uuid();
      const isImage = !!(message as File)?.name;

      queryClient.setQueryData(
         ["messages", chatId],
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
                           _id,
                           chatId: chatId as string,
                           content: isImage
                              ? URL.createObjectURL(message as File)
                              : (message as string),
                           isImage,
                           isLeaveMessage: false,
                           isNewMemberMessage: false,
                           sender: currentUser as IUser,
                           receivers: [],
                           reactors: [],
                           createdAt: new Date().toString(),
                           updatedAt: new Date().toString(),
                           statusId,
                           isSending: true,
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
      mutate(
         { chatId: chatId as string, content: message, isImage },
         {
            onSuccess: (data) => {
               queryClient.setQueryData(
                  ["messages", data._id],
                  (
                     queryData: InfiniteData<IPaginatedFetchedMessages>,
                  ): InfiniteData<IPaginatedFetchedMessages> => ({
                     ...queryData,
                     pages: queryData.pages.map((page) => ({
                        ...page,
                        messages: page.messages.map((message) => {
                           if (message.statusId === statusId) {
                              return { ...message, isSending: false };
                           } else {
                              return message;
                           }
                        }),
                     })),
                  }),
               );

               queryClient.setQueryData(
                  ["chats"],
                  (
                     queryData: InfiniteData<IPaginatedChats>,
                  ): InfiniteData<IPaginatedChats> => {
                     const filteredPages = queryData.pages.map((page) => ({
                        ...page,
                        chats: page.chats.filter(
                           (chat) => chat._id !== data._id,
                        ),
                     }));

                     return {
                        ...queryData,
                        pages: filteredPages.map((page, i) => {
                           if (!i) {
                              return { ...page, chats: [data, ...page.chats] };
                           } else {
                              return page;
                           }
                        }),
                     };
                  },
               );
               queryClient.invalidateQueries({
                  queryKey: ["messages", chatId],
                  exact: true,
               });
               socket.emit("new-message", data);
            },
         },
      );

      if (callback) {
         callback();
      }
   };

   const handleSendMessage = (e: FormEvent) => {
      e.preventDefault();
      if (message) {
         setCachedMessagesAndUpdate(message, () => {
            setMessage("");
         });
      }
   };

   const handleSendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const imageFile = e.target.files[0];

         if (checkImage(imageFile)) {
            setCachedMessagesAndUpdate(imageFile);
         } else {
            toast({
               title: "Invalid File",
               description: "Only files of type image are allowed.",
            });
         }
      }
   };

   useEffect(() => {
      const handleDocumentClick = () => {
         setShowEmojiPicker(false);
      };
      document.documentElement.addEventListener("click", handleDocumentClick);

      return () => {
         document.documentElement.removeEventListener(
            "click",
            handleDocumentClick,
         );
      };
   }, []);

   return (
      <form
         className="relative flex items-center gap-x-5 border-t p-5"
         onSubmit={handleSendMessage}
      >
         <div className="flex items-center gap-x-2">
            <input
               type="file"
               hidden
               ref={imageInputRef}
               onChange={handleSendImage}
            />
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger
                     type="button"
                     className="disabled:cursor-not-allowed"
                     disabled={!isSuccess}
                     onClick={() => imageInputRef.current?.click()}
                  >
                     <CiImageOn size={20} />
                  </TooltipTrigger>
                  <TooltipContent>Choose image</TooltipContent>
               </Tooltip>
            </TooltipProvider>
            <div
               className="relative flex items-center"
               onClick={(e) => e.stopPropagation()}
            >
               {showEmojiPicker && (
                  <div className="absolute -top-[460px]">
                     <EmojiPicker
                        theme={"dark" as Theme}
                        onEmojiClick={(e) => setMessage(message + e.emoji)}
                     />
                  </div>
               )}
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger
                        type="button"
                        disabled={!isSuccess}
                        onClick={(e) => {
                           e.stopPropagation();
                           setShowEmojiPicker(!showEmojiPicker);
                        }}
                     >
                        <MdEmojiEmotions size={20} />
                     </TooltipTrigger>
                     <TooltipContent>Send an Emoji</TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
         </div>
         <Input
            type="text"
            placeholder="Type a message..."
            disabled={!isSuccess}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
         />
         <button type="submit" disabled={!isSuccess && !message}>
            <HiPaperAirplane size={20} className="text-primary" />
         </button>
      </form>
   );
}
