import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useLoginWithGoogle } from "@/hooks/useLoginWithGoogle";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/states/useAuth";

interface IProps {
  isLoginPending: boolean;
}

const GoogleLoginButton: React.FC<IProps> = ({ isLoginPending }) => {
  const { mutate, isPending } = useLoginWithGoogle();
  const { toast } = useToast();
  const setCredential = useAuth((state) => state.setCredential);

  const handleLoginWithGoogle = (): void => {
    mutate(null, {
      onSuccess: (data) => setCredential(data.data),
      onError: (error) =>
        toast({
          title: "Oops",
          description: error.response?.data.message || error.message,
        }),
    });
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoginPending || isPending}
      onClick={handleLoginWithGoogle}
      className="flex items-center gap-x-2"
    >
      <FcGoogle />
      <span>Continue with Google</span>
    </Button>
  );
};

export default React.memo(GoogleLoginButton);
