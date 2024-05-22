import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/custom/useAuth";
import { Search, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SidebarContent from "@/components/chats/SidebarContent";
import SearchUserModal from "@/components/user/SearchUserModal";

interface IProps {}

export default function Sidebar({}: IProps) {
  const user = useAuth((state) => state.user);
  const [showSearchUserModal, setShowSearchUserModal] =
    useState<boolean>(false);

  return (
    <>
      <AnimatePresence>
        {showSearchUserModal && (
          <SearchUserModal closeModal={() => setShowSearchUserModal(false)} />
        )}
      </AnimatePresence>
      <div className="flex h-screen w-[350px] flex-col border-r">
        <div className="flex items-center gap-x-3 border-b p-5">
          <Avatar>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="uppercase">
              {user?.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <p className="line-clamp-1 font-semibold">{user?.username}</p>
            <span className="line-clamp-1 text-xs text-muted-foreground">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded-full p-2 text-muted-foreground duration-150 hover:bg-secondary"
                    onClick={() => setShowSearchUserModal(true)}
                  >
                    <Search size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Search people</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="rounded-full p-2 text-muted-foreground duration-150 hover:bg-secondary">
                    <Settings size={21} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Account Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <SidebarContent />
      </div>
    </>
  );
}
