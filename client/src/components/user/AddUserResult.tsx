import { IUser } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { memo } from "react";

interface IProps extends IUser {
  selectedUsers: IUser[];
  handleSelectedUsers: (checked: boolean, user: IUser) => void;
  isCreateChatLoading: boolean;
}

export default memo(function AddUserResult({
  _id,
  username,
  email,
  profilePicture,
  selectedUsers,
  handleSelectedUsers,
  isCreateChatLoading,
}: IProps) {
  const isInList = (): boolean => {
    const userExist = selectedUsers.find((user) => user._id === _id);
    return userExist ? true : false;
  };

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
      <Checkbox
        disabled={isCreateChatLoading}
        checked={isInList()}
        onCheckedChange={(checked) =>
          handleSelectedUsers(checked as boolean, {
            _id,
            username,
            email,
            profilePicture,
          })
        }
      />
    </div>
  );
});
