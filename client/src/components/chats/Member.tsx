import { IChat, IChatUser } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import { MessageCircleMoreIcon } from "lucide-react";
import { useAuth } from "@/hooks/states/useAuth";
import { useLogout } from "@/hooks/api/useLogout";
import { useCreateChat } from "@/hooks/api/useCreateChat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence } from "framer-motion";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import MemberInfoModal from "@/components/chats/MemberInfoModal";
import { useRemoveMember } from "@/hooks/api/useRemoveMember";
import { useParams } from "react-router-dom";
import { socket } from "@/components/providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";

interface IProps extends IChatUser {
  isAdmin: boolean;
}

export default function Member({ user, isAdmin }: IProps) {
  const { user: currentUser, clearCredentials } = useAuth((state) => state);
  const { mutate: createChat } = useCreateChat();
  const { mutate: removeMember } = useRemoveMember();
  const { mutate: logout } = useLogout();
  const [showMemberInfoModal, setShowMemberInfoModal] =
    useState<boolean>(false);
  const { toast } = useToast();
  const { _id, email, username, profilePicture, createdAt } = user;
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleMessageUser = () => {
    createChat(
      {
        chatName: uuid(),
        isGroupChat: false,
        users: [{ _id, username, email, profilePicture }],
      },
      {
        onSuccess: (data) => navigate(`/chats/${data._id}`),
        onError: (error) => {
          if (error.response?.status === 401) {
            logout(null, { onSuccess: clearCredentials });
          } else {
            toast({
              title: "Oops!",
              description:
                error.response?.data.message || "Something went wrong.",
            });
          }
        },
      },
    );
  };

  const handleRemoveMember = () => {
    removeMember(
      { chatId: chatId as string, userId: user._id },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["chats", chatId], (): IChat => data);
          socket.emit("update-chat", data);
          setShowMemberInfoModal(false);
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            logout(null, { onSuccess: clearCredentials });
          } else {
            toast({
              title: "Oops!",
              description:
                error.response?.data.message || "Something went wrong.",
            });
          }
        },
      },
    );
  };

  return (
    <>
      <AnimatePresence>
        {showMemberInfoModal && (
          <MemberInfoModal
            _id={_id}
            username={username}
            email={email}
            profilePicture={profilePicture}
            createdAt={createdAt}
            currentUserId={currentUser!._id}
            isAdmin={isAdmin}
            handleMessageUser={handleMessageUser}
            handleRemoveMember={handleRemoveMember}
            closeMemberInfoModal={() => setShowMemberInfoModal(false)}
          />
        )}
      </AnimatePresence>
      <div className="flex items-center gap-x-2 px-1 py-2">
        <Avatar>
          <AvatarImage src={profilePicture} />
          <AvatarFallback className="uppercase">
            {username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            {username}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
            {email}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SlOptionsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 mt-1">
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-x-1"
              onClick={() => setShowMemberInfoModal(true)}
            >
              <LuUser />
              <span>Profile</span>
            </DropdownMenuItem>
            {currentUser?._id !== _id && (
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-x-1"
                onClick={handleMessageUser}
              >
                <MessageCircleMoreIcon size={15} />
                <span>Message</span>
              </DropdownMenuItem>
            )}
            {isAdmin && user._id !== currentUser!._id && (
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-x-1"
                onClick={handleRemoveMember}
              >
                <IoPersonRemoveOutline />
                <span>Remove</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
