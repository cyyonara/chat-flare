import { memo } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@/hooks/api/useGoogleLogin";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/states/useAuth";

interface IProps {
   isLoginLoading: boolean;
   setGoogleLoginState: (loginState: boolean) => void;
}

export default memo(function GoogleLoginButton({
   isLoginLoading,
   setGoogleLoginState,
}: IProps) {
   const { mutate, isPending: isGoogleLoginLoading } = useGoogleLogin();
   const { setCredentials } = useAuth((state) => state);
   const { toast } = useToast();

   const handleGoogleLogin = (): void => {
      setGoogleLoginState(true);
      mutate(null, {
         onSuccess: (data) => setCredentials(data),
         onError: (err) => {
            toast({
               title: "Oops!",
               description:
                  err.response?.data.message || "Something went wrong",
            });
         },
         onSettled: () => setGoogleLoginState(false),
      });
   };

   return (
      <Button
         variant="secondary"
         disabled={isLoginLoading || isGoogleLoginLoading}
         className="flex items-center justify-center gap-x-2"
         onClick={handleGoogleLogin}
      >
         <FcGoogle size={22} />
         <span>Continue with Google</span>
      </Button>
   );
});
