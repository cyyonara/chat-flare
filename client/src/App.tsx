import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ChatLayout from "@/components/layouts/ChatLayout";
import AuthProvider from "@/components/providers/AuthProvider";
import AccountSetup from "@/pages/AccountSetup";
import { useEffect } from "react";

interface IProps {}

export default function App({}: IProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account/set-up" element={<AccountSetup />} />
      </Route>
      <Route element={<AuthProvider />}>
        <Route path="/chats/*" element={<ChatLayout />}></Route>
      </Route>
    </Routes>
  );
}
