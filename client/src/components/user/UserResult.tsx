import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircleMoreIcon } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps extends IUser {}

export default function UserResult({
  _id,
  username,
  email,
  profilePicture,
}: IProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-md p-2 shadow-[0_0_3px_rgba(40,40,40,0.4)]">
      <Avatar>
        <AvatarImage src={profilePicture} />
        <AvatarFallback className="uppercase">
          {username.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <p className="line-clamp-1 font-semibold">{username}</p>
        <span className="line-clamp-1 text-xs">{email}</span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="p-3">
              <MessageCircleMoreIcon size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Message{" "}
            <span className="font-semibold text-primary">{username}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
