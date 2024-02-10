import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSignupWithGoogle } from "@/hooks/useSignupWithGoogle";
import { useNavigate } from "react-router-dom";

interface IProps {
  isSignupPending: boolean;
}

const GoogleSignupButton: React.FC<IProps> = ({ isSignupPending }) => {
  const { mutate, isPending } = useSignupWithGoogle();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignupWithGoogle = (): void => {
    mutate(null, {
      onSuccess: (data) =>
        navigate("/setup", {
          replace: true,
          state: data.data,
        }),
      onError: (error) =>
        toast({
          title: "Oops!",
          description: error.response?.data.message || error.message,
        }),
    });
  };

  return (
    <Button
      variant="secondary"
      type="button"
      disabled={isSignupPending || isPending}
      onClick={handleSignupWithGoogle}
      className="flex items-center gap-x-2"
    >
      <FcGoogle />
      <span>Sign up with Google</span>
    </Button>
  );
};

export default React.memo(GoogleSignupButton);
