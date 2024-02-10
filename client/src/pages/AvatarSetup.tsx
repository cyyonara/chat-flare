import React, { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { isImage } from "@/lib/helpers";
import { IUserCredential } from "@/lib/types";
import { CameraIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSetAvatar } from "@/hooks/useSetAvatar";
import { useAuth } from "@/states/useAuth";

const AvatarSetup: React.FC = () => {
  const location = useLocation();
  const userCredential: IUserCredential = location.state;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate, isPending } = useSetAvatar();
  const setCredential = useAuth((state) => state.setCredential);
  const { toast } = useToast();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (isImage(file)) {
        setImageFile(file);
      } else {
        toast({
          title: "Invalid File",
          description: 'Only files of the type "image" are allowed',
        });
      }
    }
  };

  const handleSetAvatar = (): void => {
    if (imageFile) {
      mutate(imageFile, {
        onSuccess: (data) => setCredential(data.data),
        onError: (error) =>
          toast({
            title: "Oops!",
            description: error.response?.data.message || error.message,
          }),
      });
    } else {
      setCredential(userCredential);
    }
  };

  useEffect(() => {
    document.title = "Account Setup";
  }, []);

  if (!userCredential) return <Navigate to="/signup" replace />;

  return (
    <motion.div
      key="setup"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="flex max-w-[430px] flex-1 flex-col items-center gap-y-8"
    >
      <h3 className="font-bold">Pick an avatar to use</h3>
      <div className="flex flex-col items-center gap-y-3">
        <div
          onClick={() => {
            if (!isPending) {
              inputFileRef.current?.click();
            }
          }}
          className="relative h-[200px] w-[200px] cursor-pointer gap-y-4 rounded-full"
        >
          <button
            disabled={isPending}
            className="absolute right-7 top-1 rounded-full bg-foreground p-[6px] text-primary-foreground duration-150 hover:bg-muted-foreground"
          >
            <CameraIcon size={20} />
          </button>
          <input
            ref={inputFileRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />
          <img
            src={
              imageFile ? URL.createObjectURL(imageFile) : userCredential.avatar
            }
            alt={userCredential.username}
            className="h-[200px] w-[200px] rounded-full object-cover object-center"
          />
        </div>
        <Button disabled={isPending} onClick={handleSetAvatar}>
          {isPending && <Loader2 size={20} />}
          <span>Finish</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default AvatarSetup;
