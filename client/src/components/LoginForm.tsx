import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useAuth } from "@/states/useAuth";
import { useLogin } from "@/hooks/useLogin";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type LoginFields = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const login = useLogin();
  const setCredential = useAuth((state) => state.setCredential);
  const { toast } = useToast();

  const handleLogin: SubmitHandler<LoginFields> = (formData): void => {
    login.mutate(formData, {
      onSuccess: (data): void => {
        setCredential(data.data);
      },
      onError: (data): void => {
        toast({
          title: "Oops",
          description: data.response?.data.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex w-full flex-col gap-y-4"
    >
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          placeholder="Email"
          disabled={login.isPending}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="Password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          disabled={login.isPending}
          {...register("password")}
        />
      </div>
      <Button
        type="submit"
        disabled={login.isPending}
        className="flex items-center gap-x-2"
      >
        {login.isPending && <Loader2 size={20} className="animate-spin" />}
        <span>Login</span>
      </Button>
      <div className="flex items-center gap-x-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>
      <GoogleLoginButton isLoginPending={login.isPending} />
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
