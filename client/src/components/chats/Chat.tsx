import { IChat, IMessage } from '@/types';
import { formatDistanceStrict } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getChatMateInfo, getLastMessageInfo } from '@/lib/helpers';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/states/useAuth';
import { cn } from '@/lib/utils';

interface IProps extends IChat {}

export default function Chat({ _id, users, lastMessage, updatedAt }: IProps) {
  const { chatId } = useParams();
  const currentUserId = useAuth((state) => state.user!._id);
  const { username, profilePicture } = getChatMateInfo(users, currentUserId)!.user;

  return (
    <Link to={`/chats/${_id}`}>
      <div
        className={cn('flex items-center gap-x-3 rounded-md p-2', {
          'bg-secondary': chatId === _id,
        })}
      >
        <Avatar>
          <AvatarImage src={profilePicture} className='object-cover object-center' />
          <AvatarFallback className='uppercase'>
            {username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-col'>
          <div className='font-semibold'>{username}</div>
          <div className='flex items-end gap-x-2'>
            <div className='line-clamp-1 text-sm'>
              {getLastMessageInfo(lastMessage as IMessage)}
            </div>
            <span className='ml-auto whitespace-nowrap text-xs leading-5 text-gray-500'>
              {formatDistanceStrict(new Date(updatedAt), new Date())} ago
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
