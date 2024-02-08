import React, { useState } from "react";
import GoogleSignupButton from "@/components/GoogleSignupButton";
import InputWithIcon from "@/components/InputWithIcon";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignup } from "@/hooks/useSignup";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type SignupField = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupField>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });
  const signup = useSignup();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup: SubmitHandler<SignupField> = (formData): void => {
    signup.mutate(formData, {
      onSuccess: (data): void => {
        navigate("/setup", {
          state: data.data,
          replace: true,
        });
      },
      onError: (error): void => {
        toast({
          title: "Oops!",
          description: error.response?.data.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex w-full flex-col gap-y-4"
    >
      <GoogleSignupButton isSignupPending={signup.isPending} />
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
        <Input
          id="email"
          type="text"
          placeholder="Email"
          disabled={signup.isPending}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="username"
          className="after:ml-[2px] after:text-red-400 after:content-['*']"
        >
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          disabled={signup.isPending}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-400">{errors.username.message}</p>
        )}
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
          disabled={signup.isPending}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="confirmPassword"
          className="after:ml-[2px] after:text-red-400 after:content-['*']"
        >
          Confirm Password
        </Label>
        <InputWithIcon
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          icon={showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          iconPosition="right"
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={signup.isPending}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button disabled={signup.isPending} className="flex items-center gap-x-2">
        {signup.isPending && <Loader2 size={20} className="animate-spin" />}
        <span>Create Account</span>
      </Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/" className="font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
