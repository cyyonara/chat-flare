import React, { useState, useEffect } from "react";
import GoogleSignupButton from "@/components/signup/GoogleSignupButton";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import InputIcon from "@/components/common/InputIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { IShowPasswordState } from "@/types";
import { ISignupFields } from "@/types";
import { signupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignup } from "@/hooks/api/useSignup";

interface IProps {}

const Signup: React.FC<IProps> = () => {
  const { mutate, isPending: isSignupLoading } = useSignup();
  const [passwordsState, setPasswordsState] = useState<IShowPasswordState>({
    isShowPassword: false,
    isShowConfirmPassword: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFields>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  const handleSignup: SubmitHandler<ISignupFields> = (formData): void => {
    mutate(formData, {
      onSuccess: (response): void => {
        navigate("/account/set-up", {
          state: response.data,
          replace: true,
        });
      },
      onError: (error): void => {},
    });
  };

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center px-5 sm:px-9">
      <div className="flex max-w-[400px] flex-1 flex-col gap-y-8">
        <h2 className="text-center font-bold">Create an account</h2>
        <div className="flex flex-col gap-y-4">
          <GoogleSignupButton />
          <div className="flex items-center justify-center gap-x-3">
            <Separator className="flex-1" />
            <p className="text-sm text-gray-500">or</p>
            <Separator className="flex-1" />
          </div>
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-col gap-y-5"
          >
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="email"
                className="after:ml-[2px] after:text-red-500 after:content-['*']"
              >
                Email
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="example@email.com"
                disabled={isSignupLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="username"
                className="after:ml-[2px] after:text-red-500 after:content-['*']"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                disabled={isSignupLoading}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="password"
                className="after:ml-[2px] after:text-red-500 after:content-['*']"
              >
                Password
              </Label>
              <InputIcon
                id="password"
                type={passwordsState.isShowPassword ? "text" : "password"}
                placeholder="8+ characters"
                icon={
                  passwordsState.isShowPassword ? (
                    <LiaEye size={18} className="text-primary" />
                  ) : (
                    <LiaEyeSlash size={18} color="grey" />
                  )
                }
                isIconClickable
                onIconClick={() => {
                  setPasswordsState((prev) => ({
                    ...prev,
                    isShowPassword: !prev.isShowPassword,
                  }));
                }}
                disabled={isSignupLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="confirmPassword"
                className="after:ml-[2px] after:text-red-500 after:content-['*']"
              >
                Confirm Password
              </Label>
              <InputIcon
                id="confirmPassword"
                type={
                  passwordsState.isShowConfirmPassword ? "text" : "password"
                }
                placeholder="Re-type your password"
                icon={
                  passwordsState.isShowConfirmPassword ? (
                    <LiaEye size={18} className="text-primary" />
                  ) : (
                    <LiaEyeSlash size={18} color="grey" />
                  )
                }
                isIconClickable
                onIconClick={() => {
                  setPasswordsState((prev) => ({
                    ...prev,
                    isShowConfirmPassword: !prev.isShowConfirmPassword,
                  }));
                }}
                disabled={isSignupLoading}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="flex items-center justify-center gap-x-2"
              disabled={isSignupLoading}
            >
              {isSignupLoading && <Loader2 className="animate-spin" />}
              <span>Sign up</span>
            </Button>
          </form>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
