import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/custom/useAuth";

interface IProps {}

export default function AuthProvider({}: IProps) {
  const user = useAuth((state) => state.user);

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}
