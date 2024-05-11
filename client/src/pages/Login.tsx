import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import InputIcon from "@/components/custom/InputIcon";
import { LiaEyeSlash } from "react-icons/lia";

interface IProps {}

const Login: React.FC<IProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex max-w-[400px] flex-1 flex-col items-center gap-y-8">
        <h2 className=" font-bold">
          Login with Chat{" "}
          <span className="relative ml-3 text-white after:absolute after:inset-y-0  after:-left-[10px] after:-right-[10px] after:z-[-1] after:-skew-x-12 after:bg-primary after:content-['']">
            Flare
          </span>
        </h2>
        <div className="flex w-full flex-col gap-y-4">
          <form className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" placeholder="e.g user@email.com" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="password">Password</Label>
              <InputIcon
                type="password"
                id="password"
                placeholder="Enter your password"
                icon={<LiaEyeSlash size={18} />}
              />
            </div>
          </form>
          <div className="flex items-center justify-center gap-x-3">
            <Separator className="flex-1" />
            <p className="text-sm text-gray-500">or</p>
            <Separator className="flex-1" />
          </div>
          <Button className="flex items-center justify-center gap-x-2">
            <FcGoogle size={22} />
            <span>Login with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
