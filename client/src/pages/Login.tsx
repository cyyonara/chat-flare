import React from "react";
import { MessageCircleMoreIcon } from "lucide-react";

const Login: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center border-l">
      <div className="flex max-w-[450px] flex-1 flex-col items-center gap-y-5">
        <div className="flex items-center gap-x-2">
          <h3 className="font-bold">Login with Chat Flare</h3>
          <span>
            <MessageCircleMoreIcon />
          </span>
        </div>
        <form className="flex flex-col"></form>
      </div>
    </div>
  );
};

export default Login;
