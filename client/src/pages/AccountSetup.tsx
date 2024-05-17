import React, { useEffect, useRef } from "react";
import { IUser } from "@/types";
import { useLocation, Navigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps {}

const AccountSetup: React.FC<IProps> = () => {
  const location = useLocation();
  const userCredentials: IUser = location.state;
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = "Set up account";
  }, []);

  if (!userCredentials) return <Navigate to="/" replace />;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {};

  return (
    <div className="flex flex-1 items-center justify-center px-5 sm:px-9">
      <div className="flex max-w-[400px] flex-1 flex-col items-center gap-y-8">
        <h2 className="text-center font-bold">Set up your account</h2>
        <div className="flex flex-col justify-center">
          <div className="bg relative h-[250px] w-[250px] rounded-full border-[2px] border-primary">
            <button
              className="absolute bottom-[20px] right-[20px] rounded-full bg-primary p-[9px]"
              onClick={() => fileRef.current?.click()}
            >
              <Camera size={20} color="white" />
            </button>
            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Button className="w-full max-w-[250px]">Continue</Button>
      </div>
    </div>
  );
};

export default AccountSetup;
