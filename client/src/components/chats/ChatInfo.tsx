import { IChat, IChatUser, IPaginatedChats, IUser } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';
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
import { useChangeGroupChatPhoto } from '@/hooks/api/useChangeGroupChatPhoto';
import { useParams } from 'react-router-dom';
import { useLogout } from '@/hooks/api/useLogout';
import { useAuth } from '@/hooks/states/useAuth';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { MdEmail } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { socket } from '@/components/providers/SocketProvider';
import { IoMdPersonAdd } from 'react-icons/io';
import EditGroupNameModal from '@/components/chats/EditGroupNameModal';
import Members from '@/components/chats/Members';
import AddMemberModal from '@/components/chats/AddMemberModal';

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
  const [showEditGroupNameModal, setShowEditGroupNameModal] = useState<boolean>(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState<boolean>(false);
  const { mutate: changeGroupChatPhoto, isPending } = useChangeGroupChatPhoto();
  const { mutate: logout } = useLogout();
  const { chatId } = useParams();
  const { toast } = useToast();
  const { user: currentUser, clearCredentials } = useAuth((state) => state);
  const queryClient = useQueryClient();
  const photoInputRef = useRef<HTMLInputElement | null>(null);
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
        changeGroupChatPhoto(
          { chatId: chatId as string, imageFile },
          {
            onSuccess: (data) => {
              queryClient.setQueryData(
                ['chats'],
                (
                  queryData: InfiniteData<IPaginatedChats>
                ): InfiniteData<IPaginatedChats> => ({
                  ...queryData,
                  pages: queryData.pages.map((page) => ({
                    ...page,
                    chats: page.chats.map((chat) => {
                      if (chat._id === data._id) {
                        return data;
                      } else {
                        return chat;
                      }
                    }),
                  })),
                })
              );
              queryClient.setQueryData(['chats', chatId], (): IChat => data);
              socket.emit('update-chat', data);
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
          }
        );
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
    let user;

    if (!chat!.isGroupChat) {
      user = getChatMateInfo(chat?.users as IChatUser[], currentUser!._id)!.user as IUser;
    }

    chatInfoContent = (
      <>
        <AnimatePresence>
          {showEditGroupNameModal && (
            <EditGroupNameModal
              currentGroupName={chat!.chatName}
              closeEditGroupNameModal={() => setShowEditGroupNameModal(false)}
            />
          )}
          {showAddMemberModal && (
            <AddMemberModal closeAddMemberModal={() => setShowAddMemberModal(false)} />
          )}
        </AnimatePresence>
        <div className='flex-1 overflow-y-auto max-h-[100vh-81px] custom-scroll flex flex-col p-5 gap-y-8'>
          <div className='flex flex-col items-center gap-y-5 mt-6'>
            <div className='relative group'>
              <Avatar className='size-[100px]'>
                <AvatarImage
                  src={
                    chat?.isGroupChat ? chat.chatPhoto : (user as IUser).profilePicture
                  }
                  className='object-cover object-center'
                />
                <AvatarFallback className='uppercase text-2xl'>
                  {chat?.isGroupChat
                    ? chat.chatName.substring(0, 2)
                    : (user as IUser).username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {chat?.isGroupChat && (
                <div className='absolute hidden group-hover:block right-0 bottom-0'>
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
                          disabled={isPending}
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
            <div className='flex flex-col items-center gap-y-1 w-full group'>
              <div className='flex items-center relative'>
                {chat!.isGroupChat && (
                  <div className='absolute hidden group-hover:block left-[110%] top-[50%] -translate-y-[50%]'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger onClick={() => setShowEditGroupNameModal(true)}>
                          <FaEdit size={14} className='text-muted-foreground' />
                        </TooltipTrigger>
                        <TooltipContent>Edit group name</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                <p className='font-semibold leading-none text-lg'>
                  {chat!.isGroupChat ? chat!.chatName : (user as IUser).username}
                </p>
              </div>
              {!chat?.isGroupChat && (
                <div className='flex items-end gap-x-1 text-muted-foreground'>
                  <MdEmail />
                  <p className='text-xs'>{(user as IUser).email}</p>
                </div>
              )}
            </div>
            {chat?.isGroupChat && (
              <div className='flex gap-y-1 flex-col items-center'>
                <Button
                  variant='secondary'
                  className='size-[40px] rounded-full p-0'
                  onClick={() => setShowAddMemberModal(true)}
                >
                  <IoMdPersonAdd size={18} />
                </Button>
                <div className='text-muted-foreground text-sm'>Add</div>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-y-4'>
            {chat?.isGroupChat && (
              <Members members={chat!.users} groupAdminId={chat.chatCreator._id} />
            )}
          </div>
        </div>
      </>
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
