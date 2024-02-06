import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleSignupButton: React.FC = () => {
  return (
    <Button
      variant="secondary"
      type="button"
      className="flex items-center gap-x-2"
    >
      <FcGoogle />
      <span>Sign up with Google</span>
    </Button>
  );
};

export default React.memo(GoogleSignupButton);
