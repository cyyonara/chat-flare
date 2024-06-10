import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { MdEmojiEmotions } from "react-icons/md";
import { HiPaperAirplane } from "react-icons/hi2";
import { CiImageOn } from "react-icons/ci";
import { v4 as uuid } from "uuid";
import { checkImage } from "@/lib/helpers";
import { ISelectedImage, IUser } from "@/types";
import { useSendMessage } from "@/hooks/api/useSendMessage";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { IPaginatedFetchedMessages } from "@/types";
import SelectedImage from "@/components/chats/SelectedImage";
import { useAuth } from "@/hooks/custom/useAuth";
import { socket } from "@/components/providers/SocketProvider";

interface IProps {
  isSuccess: boolean;
}

export default function MessageInput({ isSuccess }: IProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<ISelectedImage[]>([]);
  const { mutate } = useSendMessage();
  const { toast } = useToast();
  const { chatId } = useParams();
  const currentUser = useAuth((state) => state.user);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      if (checkImage(imageFile)) {
        setSelectedImages((prev) => [...prev, { imageId: uuid(), imageFile }]);
      } else {
        toast({
          title: "Invalid File",
          description: 'Only file of type "image" are allowed.',
        });
      }
    }
  };

  const removeImage = (imageId: string): void => {
    setSelectedImages((prev) =>
      prev.filter((imageFile) => imageFile.imageId !== imageId),
    );
  };

  const handleSendMessage = (e: FormEvent): void => {
    e.preventDefault();
    if (message) {
      const statusId = uuid();
      const _id = uuid();

      queryClient.setQueryData(
        ["messages", chatId],
        (
          queryData: InfiniteData<IPaginatedFetchedMessages>,
        ): InfiniteData<IPaginatedFetchedMessages> => {
          return {
            ...queryData,
            pages: queryData.pages.map((page, i) => {
              if (!i) {
                return {
                  ...page,
                  messages: [
                    {
                      _id,
                      chatId: chatId as string,
                      content: message,
                      isImage: false,
                      isLeaveMessage: false,
                      isNewMemberMessage: false,
                      sender: currentUser as IUser,
                      receivers: [],
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
          };
        },
      );
      mutate(
        { chatId: chatId as string, content: message, isImage: false },
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

            queryClient.invalidateQueries({
              queryKey: ["messages", data._id],
              exact: true,
            });

            socket.emit("new-message", data);
          },
        },
      );
      setMessage("");
    }

    if (selectedImages.length) {
      selectedImages.forEach((selectedImage) => {
        queryClient.setQueryData(
          ["messages", chatId],
          (
            queryData: InfiniteData<IPaginatedFetchedMessages>,
          ): InfiniteData<IPaginatedFetchedMessages> => {
            const statusId = uuid();
            const _id = uuid();

            return {
              ...queryData,
              pages: queryData.pages.map((page, i) => {
                if (!i) {
                  return {
                    ...page,
                    messages: [
                      {
                        _id,
                        chatId: chatId as string,
                        content: URL.createObjectURL(selectedImage.imageFile),
                        isImage: true,
                        isLeaveMessage: false,
                        isNewMemberMessage: false,
                        sender: currentUser as IUser,
                        receivers: [],
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
            };
          },
        );

        mutate(
          {
            chatId: chatId as string,
            content: selectedImage.imageFile,
            isImage: true,
          },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries({
                queryKey: ["messages", data._id],
                exact: true,
              });
              socket.emit("new-message", data);
            },
            onError: (error) => console.log(error.response?.data.message),
          },
        );
      });
      setSelectedImages([]);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (): void => {
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
      <div className="absolute inset-x-0 -top-14 flex items-center justify-end gap-x-3 px-5">
        {selectedImages.map((selectedImage) => (
          <SelectedImage
            key={selectedImage.imageId}
            imageId={selectedImage.imageId}
            imageFile={selectedImage.imageFile}
            removeImage={() => removeImage(selectedImage.imageId)}
          />
        ))}
      </div>
      <div className="flex items-center gap-x-2">
        <input
          type="file"
          hidden
          ref={imageInputRef}
          onChange={handleImageSelect}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              type="button"
              className="disabled:cursor-not-allowed"
              disabled={!isSuccess || !!selectedImages.length}
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
                onEmojiClick={(e) => {
                  setMessage(message + e.emoji);
                }}
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
      <button
        type="submit"
        disabled={!isSuccess && !message && !selectedImages.length}
      >
        <HiPaperAirplane size={20} className="text-primary" />
      </button>
    </form>
  );
}
