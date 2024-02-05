import React from "react";
import hero from "@/assets/Messaging-pana.png";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-[2] items-center justify-center p-6">
        <div className="flex max-w-[1000px] flex-1 flex-col items-center gap-y-10">
          <h1 className="text-4xl font-bold">Chat Flare</h1>
          <div className="flex flex-col items-center">
            <img src={hero} alt="hero" className="max-w-[600px]" />
            <p className="text-lg">
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
      <Outlet />
    </div>
  );
};

export default AuthLayout;
