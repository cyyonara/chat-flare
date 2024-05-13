import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/custom/useAuth";

interface IProps {}

const AuthProvider: React.FC<IProps> = () => {
  const user = useAuth((state) => state.user);

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AuthProvider;
