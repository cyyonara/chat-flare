import { IChat } from '@/types';
import { formatDistanceStrict } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getLastMessageInfo, getUserInfo } from '@/lib/helpers';
import { Link, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface IProps extends IChat {}

export default function GroupChat({
  _id,
  chatPhoto,
  chatName,
  chatCreator,
  lastMessage,
  updatedAt,
}: IProps) {
  const { chatId } = useParams();

  return (
    <Link to={`/chats/${_id}`}>
      <div
        className={cn('flex items-center gap-x-3 rounded-md p-2', {
          'bg-secondary': chatId === _id,
        })}
      >
        <Avatar>
          <AvatarImage src={chatPhoto} className='object-cover object-center' />
          <AvatarFallback className='uppercase'>
            {chatName.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-col'>
          <div className='font-semibold'>{chatName}</div>
          <div className='flex items-end gap-x-2'>
            <div className='line-clamp-1 text-sm'>
              {lastMessage
                ? getLastMessageInfo(lastMessage)
                : getUserInfo(chatCreator) + ' started a group chat.'}
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
