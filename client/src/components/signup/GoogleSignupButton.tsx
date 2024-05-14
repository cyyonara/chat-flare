import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

interface IProps {}

const GoogleSignupButton: React.FC<IProps> = () => {
  return (
    <Button
      variant="secondary"
      className="flex items-center justify-center gap-x-2"
    >
      <FcGoogle size={22} />
      <span>Sign up with Google</span>
    </Button>
  );
};

export default React.memo(GoogleSignupButton);
