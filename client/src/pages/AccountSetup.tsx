import React, { useEffect, useRef, useState } from 'react';
import { IUser } from '@/types';
import { useLocation, Navigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkImage } from '@/lib/helpers';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useSetup } from '@/hooks/api/useSetup';
import { useAuth } from '@/hooks/states/useAuth';

interface IProps {}

const AccountSetup: React.FC<IProps> = () => {
  const location = useLocation();
  const userCredentials: IUser = location.state;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { mutate: setAccount, isPending: isSetupLoading } = useSetup();
  const setCredentials = useAuth((state) => state.setCredentials);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Set up account';
  }, []);

  if (!userCredentials) return <Navigate to='/' replace />;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile: File = e.target.files[0];

      if (!checkImage(imageFile)) {
        toast({
          title: 'Invalid File',
          description: 'Only file of type "image" are allowed.',
        });
      } else {
        setImageFile(imageFile);
        setImageUrl(URL.createObjectURL(imageFile));
      }
    }
  };

  const setupAccount = () => {
    if (imageFile) {
      setAccount(imageFile, {
        onSuccess: (data) => {
          setCredentials({
            ...userCredentials,
            profilePicture: data.newProfilePicture,
          });
          toast({
            title: 'Sign up success',
            description: 'Your account has been set up',
          });
        },
        onError: (error) => {
          toast({
            title: 'Oops!',
            description: error.response?.data.message || 'Something went wrong',
          });
        },
      });
    } else {
      setCredentials(userCredentials);
    }
  };

  return (
    <motion.div
      key='setup'
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className='flex flex-1 items-center justify-center px-5 sm:px-9'
    >
      <div className='flex max-w-[400px] flex-1 flex-col items-center gap-y-8'>
        <div className='flex items-center justify-center gap-x-2'>
          <Settings size={30} className='animate-spin' />
          <h2 className='text-center font-bold'>Set up your account</h2>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='bg relative h-[250px] w-[250px] rounded-full border-[2px] border-primary'>
            <img
              src={imageFile ? imageUrl : userCredentials.profilePicture}
              alt={userCredentials.username}
              className='aspect-square h-full w-full rounded-full object-cover object-center'
            />
            <button
              disabled={isSetupLoading}
              className='absolute bottom-[20px] right-[20px] rounded-full bg-primary p-[9px] disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => fileRef.current?.click()}
            >
              <Camera size={20} color='white' />
            </button>
            <input type='file' hidden ref={fileRef} onChange={handleFileChange} />
          </div>
        </div>
        <Button
          disabled={isSetupLoading}
          className='w-full max-w-[250px]'
          onClick={setupAccount}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default AccountSetup;
