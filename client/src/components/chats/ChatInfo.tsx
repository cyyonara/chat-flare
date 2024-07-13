import { IChat, IChatUser } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChangeEvent, ReactNode, useRef } from 'react';
import { checkImage, getChatMateInfo } from '@/lib/helpers';
import { Camera } from 'lucide-react';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface IProps {
  isChatLoading: boolean;
  isChatSuccess: boolean;
  isChatError: boolean;
  chat: IChat | undefined;
}

export default function ChatInfo({
  isChatLoading,
  isChatSuccess,
  isChatError,
  chat,
}: IProps) {
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  let chatInfoContent: ReactNode;

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      if (!checkImage(imageFile)) {
        toast({
          title: 'Invalid File',
          description: 'Only file of type "image" are allowed.',
        });
      } else {
      }
    }
  };

  if (isChatLoading) {
    chatInfoContent = <></>;
  }

  if (isChatError) {
    chatInfoContent = <></>;
  }

  if (isChatSuccess) {
    const { user } = getChatMateInfo(chat?.users as IChatUser[]) as IChatUser;

    chatInfoContent = (
      <div className='flex-1 overflow-y-auto max-h-[100vh-81px] custom-scroll flex flex-col p-5'>
        <div className='flex flex-col items-center gap-y-3 mt-6'>
          <div className='relative'>
            <Avatar className='size-[100px]'>
              <AvatarImage
                src={chat?.isGroupChat ? chat.chatPhoto : user.profilePicture}
              />
              <AvatarFallback className='uppercase text-2xl'>
                {chat?.isGroupChat
                  ? chat.chatName.substring(0, 2)
                  : user.username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            {chat?.isGroupChat && (
              <div className='absolute right-0 bottom-0'>
                <input
                  type='file'
                  hidden
                  ref={photoInputRef}
                  onChange={handleImageSelect}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className='rounded-full size-[33px] p-[9px]'
                        onClick={() => photoInputRef.current?.click()}
                      >
                        <Camera size={15} color='white' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Change group photo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          <p className='font-semibold text-lg'>
            {chat?.isGroupChat ? chat.chatName : user.username}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='xl:w-[350px] border-l flex flex-col'>
      <div className='h-[81px] border-b p-5 flex items-center'>
        <h4 className='font-semibold'>Chat Info</h4>
      </div>
      {chatInfoContent}
    </div>
  );
}
