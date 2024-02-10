import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AvatarSetup from "@/pages/AvatarSetup";
import ChatsLayout from "@/components/layouts/ChatsLayout";
import StartAChat from "@/pages/StartAChat";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setup" element={<AvatarSetup />} />
      </Route>
      <Route path="/chats" element={<ChatsLayout />}>
        <Route index element={<StartAChat />} />
      </Route>
    </Routes>
  );
};

export default App;
