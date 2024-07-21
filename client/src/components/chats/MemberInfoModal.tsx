import { IChat, IUser } from '@/types';
import Overlay from '@/components/common/Overlay';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { IoCloseOutline } from 'react-icons/io5';
import { MessageCircleMoreIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface IProps extends IUser {
  currentUserId: string;
  handleMessageUser: () => void;
  closeMemberInfoModal: () => void;
}

export default function MemberInfoModal({
  _id,
  username,
  email,
  profilePicture,
  currentUserId,
  handleMessageUser,
  closeMemberInfoModal,
}: IProps) {
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const { chatCreator } = queryClient.getQueryData(['chats', chatId]) as IChat;

  return (
    <Overlay onClick={closeMemberInfoModal}>
      <motion.div
        className='max-w-[450px] flex-1'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className='overflow-hidden p-6 relative'>
          <Button
            variant='outline'
            className='size-[30px] p-0 absolute right-[24px] top-[24px]'
            onClick={closeMemberInfoModal}
          >
            <IoCloseOutline />
          </Button>
          <div className='flex flex-col mt-9 gap-y-5 items-center'>
            <Avatar className='size-[130px]'>
              <AvatarImage src={profilePicture} className='object-cover object-center' />
              <AvatarFallback className='uppercase'>
                {username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-semibold text-xl text-center'>{username}</div>
              <div className='text-muted-foreground text-center text-sm flex items-center gap-x-1'>
                <MdEmail />
                <span>{email}</span>
              </div>
            </div>
            <div className='flex items-center gap-x-6 mt-2 mb-12'>
              {currentUserId !== _id && (
                <>
                  <div className='flex gap-y-1 flex-col items-center'>
                    <Button
                      variant='secondary'
                      className='size-[45px] rounded-full p-0'
                      onClick={handleMessageUser}
                    >
                      <MessageCircleMoreIcon size={20} />
                    </Button>
                    <div className='text-muted-foreground text-sm'>Message</div>
                  </div>
                  {chatCreator._id === currentUserId && (
                    <div className='flex gap-y-1 flex-col items-center'>
                      <Button
                        variant='destructive'
                        className='size-[45px] rounded-full p-0'
                      >
                        <IoCloseOutline size={20} />
                      </Button>
                      <div className='text-muted-foreground text-sm'>Remove</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </Overlay>
  );
}
