import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";
import { X } from "lucide-react";

interface IProps extends IUser {
  handleSelectedUsers: (checked: boolean, user: IUser) => void;
  isCreateChatLoading: boolean;
}

export default memo(function SelectedUser({
  _id,
  username,
  email,
  profilePicture,
  handleSelectedUsers,
  isCreateChatLoading,
}: IProps) {
  return (
    <div className="relative">
      <button
        className="disabled:text- absolute -right-[1px] -top-[2px] z-[20] rounded-full bg-secondary p-[3px] hover:bg-secondary/80 disabled:cursor-not-allowed disabled:bg-foreground disabled:text-black"
        disabled={isCreateChatLoading}
        onClick={() =>
          handleSelectedUsers(false, { _id, username, email, profilePicture })
        }
      >
        <X size={12} />
      </button>
      <div className="flex flex-col items-center gap-y-1">
        <Avatar>
          <AvatarImage src={profilePicture} />
          <AvatarFallback className="uppercase">
            {username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <p className="line-clamp-1 w-[55px] text-ellipsis text-center text-xs">
          {username}
        </p>
      </div>
    </div>
  );
});
