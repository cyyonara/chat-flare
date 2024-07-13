import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/states/useDebounce';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { useSearchUsers } from '@/hooks/api/useSearchUsers';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@/hooks/states/useAuth';
import { useLogout } from '@/hooks/api/useLogout';
import InputIcon from '@/components/common/InputIcon';
import UserResult from '@/components/user/UserResult';
import Overlay from '@/components/common/Overlay';
import UserResultSkeleton from '@/components/skeletons/UserResultSkeleton';
import UserSearchError from '@/components/error/UserSearchError';

interface IProps {
  closeModal: () => void;
}

export default function SearchUserModal({ closeModal }: IProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const debounceValue = useDebounce(searchKeyword);
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    fetchNextPage,
    refetch,
  } = useSearchUsers(debounceValue);
  const [disableMessageButton, setDisableMessageButton] = useState(false);
  const logoutMutation = useLogout();
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { inView, ref } = useInView();

  let searchResultContent: ReactNode;

  if (isLoading || isFetching) {
    searchResultContent = <UserResultSkeleton count={1} />;
  }

  if (isError && !isFetching) {
    searchResultContent = <UserSearchError retry={() => refetch()} />;
  }

  if (isSuccess) {
    searchResultContent = (
      <>
        {!data.pages[0].users.length ? (
          <p className='text-center'>No users found</p>
        ) : (
          data.pages.map((page) =>
            page.users.map((user) => (
              <UserResult
                key={user._id}
                _id={user._id}
                username={user.username}
                email={user.email}
                profilePicture={user.profilePicture}
                disableMessageButton={disableMessageButton}
                setDisableMessageButton={(state) => setDisableMessageButton(state)}
                closeModal={closeModal}
              />
            ))
          )
        )}
        <div ref={ref}></div>
      </>
    );
  }

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isError && error.response?.status === 401) {
      logoutMutation.mutate(null, { onSuccess: clearCredentials });
    }
  }, [isError]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
            <CardTitle>Search a user</CardTitle>
            <CardDescription>Start talking with your friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-y-4'>
              <InputIcon
                type='text'
                placeholder='Enter email or username...'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                icon={<Search color='grey' size={20} />}
                iconPos='left'
                ref={searchInputRef}
              />
              <div className='custom-scroll flex max-h-[300px] flex-col gap-y-2 overflow-y-auto p-2'>
                {searchResultContent}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='secondary' className='ml-auto' onClick={closeModal}>
              Close
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
}
