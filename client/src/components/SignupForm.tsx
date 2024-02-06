import React from "react";
import GoogleSignupButton from "@/components/GoogleSignupButton";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputWithIcon from "@/components/InputWithIcon";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPasword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <form className="flex w-full flex-col gap-y-4">
      <GoogleSignupButton />
      <div className="flex items-center gap-x-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="email"
          className="after:ml-[2px] after:text-red-400 after:content-['*']"
        >
          Email
        </Label>
        <Input id="email" type="text" placeholder="Email" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="username"
          className="after:ml-[2px] after:text-red-400 after:content-['*']"
        >
          Username
        </Label>
        <Input id="username" type="password" placeholder="Username" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="password"
          className="after:ml-[2px] after:text-red-400 after:content-['*']"
        >
          Password
        </Label>
        <InputWithIcon
          id="password"
          type={showPassword ? "text" : "password"}
          icon={showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          iconPosition="right"
          onIconClick={() => setShowPassword(!showPassword)}
        />
      </div>
    </form>
  );
};

export default SignupForm;
