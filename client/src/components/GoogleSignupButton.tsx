import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

interface IProps {
  isSignupPending: boolean;
}

const GoogleSignupButton: React.FC<IProps> = ({ isSignupPending }) => {
  return (
    <Button
      variant="secondary"
      type="button"
      disabled={isSignupPending}
      className="flex items-center gap-x-2"
    >
      <FcGoogle />
      <span>Sign up with Google</span>
    </Button>
  );
};

export default React.memo(GoogleSignupButton);
