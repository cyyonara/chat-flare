import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

interface IProps {}

const GoogleLoginButton: React.FC<IProps> = () => {
  return (
    <Button
      variant="secondary"
      className="flex items-center justify-center gap-x-2"
    >
      <FcGoogle size={22} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default React.memo(GoogleLoginButton);
