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

interface IProps extends IFetchedMessage {
  pageIndex: number;
  messageIndex: number;
  pages: IPaginatedFetchedMessages[];
  totalPages: number;
}

export default function Message({
  content,
  isImage,
  isLeaveMessage,
  isNewMemberMessage,
  isSending,
  sender,
  receivers,
  messageIndex,
  pageIndex,
  pages,
  totalPages,
}: IProps) {
  const currentUserId = useAuth((state) => state.user?._id);

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
        }
      }
    } else {
      return false;
    }
  };

  if (isLeaveMessage) {
    return <div className="flex">someone leave the group</div>;
  }

  if (isNewMemberMessage) {
    return <div className="flex">joined the group</div>;
  }

  return (
    <div
      className={cn("flex", {
        "mb-auto": !pageIndex && !messageIndex,
      })}
    >
      {displayProfile() ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="mb-[2px] mr-3 mt-auto size-[30px]">
                <AvatarImage src={sender.profilePicture} className="" />
                <AvatarFallback className="text-base uppercase">
                  {sender.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{sender.username}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="mb-[2px] mr-3 mt-auto size-[30px]"></div>
      )}
      <div
        className={cn({
          "ml-auto flex items-end gap-x-1": sender._id === currentUserId,
        })}
      >
        {isImage ? (
          <img
            src={content}
            className="max-w-[250px] rounded-lg object-contain"
          />
        ) : (
          <div
            className={cn(
              "max-w-[400px] rounded-lg bg-primary px-4 py-3  text-xs",
              {
                "bg-secondary": sender._id !== currentUserId,
              },
            )}
          >
            {content}
          </div>
        )}
        {isSending && (
          <Loader2 size={10} className="mb-[2px] animate-spin text-white" />
        )}
      </div>
    </div>
  );
}
