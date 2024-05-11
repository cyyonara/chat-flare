import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginFields } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import InputIcon from "@/components/common/InputIcon";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";

interface IProps {}

const Login: React.FC<IProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const login: SubmitHandler<ILoginFields> = (data): void => {
    console.log(data);
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center px-5 sm:px-9">
      <div className="flex max-w-[400px] flex-1 flex-col items-center gap-y-8">
        <h2 className=" text-center font-bold">
          Login with Chat{" "}
          <span className="relative ml-3 text-white after:absolute after:inset-y-0  after:-left-[10px] after:-right-[10px] after:z-[-1] after:-skew-x-12 after:bg-primary after:content-['']">
            Flare
          </span>
        </h2>
        <div className="flex w-full flex-col gap-y-4">
          <form
            className="flex flex-col gap-y-5"
            onSubmit={handleSubmit(login)}
          >
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="e.g user@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="password">Password</Label>
              <InputIcon
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                icon={
                  showPassword ? (
                    <LiaEye size={18} />
                  ) : (
                    <LiaEyeSlash size={18} />
                  )
                }
                onIconClick={() => setShowPassword(!showPassword)}
                isIconClickable
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button>
              <span>Login</span>
            </Button>
          </form>
          <div className="flex items-center justify-center gap-x-3">
            <Separator className="flex-1" />
            <p className="text-sm text-gray-500">or</p>
            <Separator className="flex-1" />
          </div>
          <GoogleLoginButton />
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
