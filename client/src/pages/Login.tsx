import React from "react";
import LoginForm from "@/components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center border-l p-5">
      <div className="flex max-w-[430px] flex-1 flex-col items-center gap-y-8">
        <h3 className="font-bold">Login with Chat Flare</h3>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
