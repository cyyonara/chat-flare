import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useAuth } from "@/states/useAuth";
import { Plus } from "lucide-react";
import { SlOptions } from "react-icons/sl";
import { AnimatePresence } from "framer-motion";
import AddChatModal from "@/components/AddChatModal";

const ChatsConfig: React.FC = () => {
  const [showAddChatModal, setShowAddChatModal] = useState<boolean>(false);
  const user = useAuth((state) => state.user);

  return (
    <>
      <AnimatePresence>
        {showAddChatModal && (
          <AddChatModal closeModal={() => setShowAddChatModal(false)} />
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between border-b p-5">
        <div className="flex flex-1 items-center gap-x-2">
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="uppercase">
              {user?.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.username}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setShowAddChatModal(true)}>
                  <Plus size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Start a Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>
            <SlOptions />
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatsConfig;
