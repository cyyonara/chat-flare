import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ChatLayout from "@/components/layouts/ChatLayout";
import AuthProvider from "@/components/providers/AuthProvider";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<AuthProvider />}>
        <Route path="/chats/*" element={<ChatLayout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
