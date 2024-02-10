import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/states/useAuth";
import ChatsSection from "@/components/ChatsSection";

const ChatsLayout: React.FC = () => {
  const user = useAuth((state) => state.user);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="flex h-screen">
      <ChatsSection />
      <Outlet />
    </div>
  );
};

export default ChatsLayout;
