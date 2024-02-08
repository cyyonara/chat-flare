import React from "react";
import hero from "@/assets/Messaging-pana.png";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/states/useAuth";
import { AnimatePresence } from "framer-motion";

const AuthLayout: React.FC = () => {
  const user = useAuth((state) => state.user);

  return (
    <div className="flex h-screen">
      <div className="hidden flex-[2] items-center justify-center border-r p-6 lg:flex">
        <div className="flex max-w-[1000px] flex-1 flex-col items-center gap-y-10">
          <h1 className="text-4xl font-bold">Chat Flare</h1>
          <div className="flex flex-col items-center">
            <img src={hero} alt="hero" className="max-w-[600px]" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              nobis numquam, odio dolorum minus voluptatibus nesciunt ducimus
              est quae soluta voluptates corporis voluptas tempore, quam tenetur
              odit exercitationem debitis placeat. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Optio at consequatur iure.
              Reprehenderit, architecto tempora laudantium iste ullam facere
              harum tenetur veritatis maxime natus maiores officia inventore quo
              exercitationem soluta!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-5">
        <AnimatePresence>
          {user ? <Navigate to="/chats" replace={true} /> : <Outlet />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthLayout;
