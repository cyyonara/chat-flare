import { IUser } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface IProps extends IUser {
  selectedUsers: IUser[];
  handleSelectedUsers: (check: boolean, user: IUser) => void;
}

export default function SearchedGroupMember({
  _id,
  username,
  email,
  profilePicture,
  selectedUsers,
  handleSelectedUsers,
}: IProps) {
  const isAlreadySelected = (): boolean => {
    return !!selectedUsers.find((user) => user._id === _id);
  };

  return (
    <div className='flex items-center gap-x-2 rounded-md p-2 shadow-[0_0_3px_rgba(40,40,40,0.4)]'>
      <Avatar>
        <AvatarImage src={profilePicture} className='object-center object-cover' />
        <AvatarFallback className='uppercase'>{username.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col justify-center flex-1'>
        <div className='line-clamp-1'>{username}</div>
        <span className='text-xs text-muted-foreground line-clamp-1'>{email}</span>
      </div>
      <Checkbox
        checked={isAlreadySelected()}
        onCheckedChange={(check: boolean) =>
          handleSelectedUsers(check, {
            _id,
            username,
            email,
            profilePicture,
          })
        }
      />
    </div>
  );
}
