import { IChatUser } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { SlOptionsVertical } from 'react-icons/sl';
import { LuUser } from 'react-icons/lu';
import { MessageCircleMoreIcon } from 'lucide-react';
import { useAuth } from '@/hooks/states/useAuth';
import { useLogout } from '@/hooks/api/useLogout';
import { useCreateChat } from '@/hooks/api/useCreateChat';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import MemberInfoModal from '@/components/chats/MemberInfoModal';

interface IProps extends IChatUser {}

export default function Member({ user }: IProps) {
  const { user: currentUser, clearCredentials } = useAuth((state) => state);
  const { mutate: createChat } = useCreateChat();
  const { mutate: logout } = useLogout();
  const [showMemberInfoModal, setShowMemberInfoModal] = useState<boolean>(false);
  const { toast } = useToast();
  const { _id, email, username, profilePicture, createdAt } = user;
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
              title: 'Oops!',
              description: error.response?.data.message || 'Something went wrong.',
            });
          }
        },
      }
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
            handleMessageUser={handleMessageUser}
            closeMemberInfoModal={() => setShowMemberInfoModal(false)}
          />
        )}
      </AnimatePresence>
      <div className='flex py-2 px-1 gap-x-3 items-center'>
        <Avatar>
          <AvatarImage src={profilePicture} />
          <AvatarFallback className='uppercase'>
            {username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col flex-1 justify-center overflow-hidden'>
          <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {username}
          </div>
          <div className='text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis'>
            {email}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SlOptionsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-6 mt-1'>
            <DropdownMenuItem
              className='cursor-pointer flex items-center gap-x-1'
              onClick={() => setShowMemberInfoModal(true)}
            >
              <LuUser />
              <span>Profile</span>
            </DropdownMenuItem>
            {currentUser?._id !== _id && (
              <DropdownMenuItem
                className='cursor-pointer flex items-center gap-x-1'
                onClick={handleMessageUser}
              >
                <MessageCircleMoreIcon size={15} />
                <span>Message</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
