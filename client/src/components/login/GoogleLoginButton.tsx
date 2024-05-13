import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@/hooks/api/useGoogleLogin";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  isLoginLoading: boolean;
}

const GoogleLoginButton: React.FC<IProps> = ({ isLoginLoading }) => {
  const { mutate } = useGoogleLogin();
  const { toast } = useToast();

  const handleGoogleLogin = (): void => {
    mutate(null, {
      onError: (error) => {
        toast({
          title: "Oops!",
          description: error.response?.data.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <Button
      variant="secondary"
      disabled={isLoginLoading}
      className="flex items-center justify-center gap-x-2"
      onClick={handleGoogleLogin}
    >
      <FcGoogle size={22} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default React.memo(GoogleLoginButton);
