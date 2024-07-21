import { memo } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { useGoogleSignup } from '@/hooks/api/useGoogleSignup';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isSignupLoading: boolean;
  setGoogleSignupState: (state: boolean) => void;
}

export default memo(function GoogleSignupButton({
  isSignupLoading,
  setGoogleSignupState,
}: IProps) {
  const { mutate: googleSignup, isPending: isLoading } = useGoogleSignup();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    setGoogleSignupState(true);
    googleSignup(null, {
      onSuccess: (data) => {
        navigate('/account/set-up', {
          replace: true,
          state: data,
        });
      },
      onError: (error) => {
        toast({
          title: 'Oops!',
          description: error.response?.data.message || 'Something went wrong',
        });
      },
      onSettled: () => setGoogleSignupState(false),
    });
  };

  return (
    <Button
      variant='secondary'
      className='flex items-center justify-center gap-x-2'
      disabled={isSignupLoading || isLoading}
      onClick={handleGoogleSignup}
    >
      <FcGoogle size={22} />
      <span>Sign up with Google</span>
    </Button>
  );
});
