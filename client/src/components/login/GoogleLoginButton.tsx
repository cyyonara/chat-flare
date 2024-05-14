import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@/hooks/api/useGoogleLogin";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/custom/useAuth";

interface IProps {
  isLoginLoading: boolean;
  setGoogleLoginState: (loginState: boolean) => void;
}

const GoogleLoginButton: React.FC<IProps> = ({
  isLoginLoading,
  setGoogleLoginState,
}) => {
  const { mutate, isPending: isGoogleLoginLoading } = useGoogleLogin();
  const setCredentials = useAuth((state) => state.setCredentials);
  const { toast } = useToast();

  const handleGoogleLogin = (): void => {
    setGoogleLoginState(true);
    mutate(null, {
      onSuccess: (response) => setCredentials(response.data),
      onError: (error) => {
        toast({
          title: "Oops!",
          description: error.response?.data.message || "Something went wrong",
        });
      },
      onSettled: () => setGoogleLoginState(false),
    });
  };

  return (
    <Button
      variant="secondary"
      disabled={isLoginLoading || isGoogleLoginLoading}
      className="flex items-center justify-center gap-x-2"
      onClick={handleGoogleLogin}
    >
      <FcGoogle size={22} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default React.memo(GoogleLoginButton);
