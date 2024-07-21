import { useState, useRef, useEffect, FormEvent } from 'react';
import Overlay from '@/components/common/Overlay';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditGroupName } from '@/hooks/api/useEditGroupName';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/states/useAuth';
import { useLogout } from '@/hooks/api/useLogout';
import { useToast } from '@/components/ui/use-toast';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { IChat, IPaginatedChats } from '@/types';
import { socket } from '@/components/providers/SocketProvider';

interface IProps {
  currentGroupName: string;
  closeEditGroupNameModal: () => void;
}

export default function EditGroupNameModal({
  currentGroupName,
  closeEditGroupNameModal,
}: IProps) {
  const [newGroupName, setNewGroupName] = useState<string>(currentGroupName);
  const [isInputTouched, setIsInputTouched] = useState<boolean>(false);
  const { mutate: editGroupName, isPending } = useEditGroupName();
  const { mutate: logout } = useLogout();
  const { toast } = useToast();
  const { chatId } = useParams();
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const handleEditGroupName = (e: FormEvent) => {
    e.preventDefault();
    editGroupName(
      { groupName: newGroupName, chatId: chatId as string },
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
          closeEditGroupNameModal();
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
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Overlay>
      <motion.div
        className='max-w-[450px] flex-1'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Edit group name</CardTitle>
            <CardDescription>
              Changing the name of a group chat changes it for everyone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id='edit-groupName-form' onSubmit={handleEditGroupName}>
              <Input
                type='text'
                value={newGroupName}
                placeholder='Enter new group name'
                ref={inputRef}
                onChange={(e) => {
                  setNewGroupName(e.target.value);
                  setIsInputTouched(true);
                }}
              />
            </form>
          </CardContent>
          <CardFooter className='flex items-center justify-end gap-x-2'>
            <Button variant='secondary' onClick={closeEditGroupNameModal}>
              Cancel
            </Button>
            <Button
              form='edit-groupName-form'
              disabled={!isInputTouched || newGroupName === '' || isPending}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
}
