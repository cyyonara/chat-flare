import { IUser } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircleMoreIcon, Loader2 } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCreateChat } from '@/hooks/api/useCreateChat';
import { useToast } from '@/components/ui/use-toast';
import { useLogout } from '@/hooks/api/useLogout';
import { useAuth } from '@/hooks/states/useAuth';

interface IProps extends IUser {
  disableMessageButton: boolean;
  setDisableMessageButton: (state: boolean) => void;
  closeModal: () => void;
}

export default function UserResult({
  _id,
  username,
  email,
  profilePicture,
  disableMessageButton,
  setDisableMessageButton,
  closeModal,
}: IProps) {
  const { mutate: createChat, isPending } = useCreateChat();
  const { toast } = useToast();
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleMessageUser = () => {
    setDisableMessageButton(true);
    createChat(
      {
        chatName: uuid(),
        isGroupChat: false,
        users: [{ _id, username, email, profilePicture }],
      },
      {
        onSuccess: (data) => {
          navigate(`/chats/${data._id}`);
          closeModal();
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            logout(null, { onSuccess: clearCredentials });
          } else {
            toast({
              title: 'Oops!',
              description: error.response?.data.message || 'Something went wrong.',
            });
          }
        },
        onSettled: () => setDisableMessageButton(false),
      }
    );
  };

  return (
    <div className='flex items-center gap-x-2 rounded-md p-2 shadow-[0_0_3px_rgba(40,40,40,0.4)]'>
      <Avatar>
        <AvatarImage src={profilePicture} />
        <AvatarFallback className='uppercase'>{username.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className='flex flex-1 flex-col'>
        <div className='line-clamp-1 font-semibold'>{username}</div>
        <span className='line-clamp-1 text-xs'>{email}</span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={disableMessageButton}
              className='p-3'
              onClick={handleMessageUser}
            >
              {isPending ? (
                <Loader2 size={20} className='animate-spin' />
              ) : (
                <MessageCircleMoreIcon size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Message <span className='font-semibold text-primary'>{username}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
