import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AvatarSetup from "@/pages/AvatarSetup";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setup" element={<AvatarSetup />} />
      </Route>
    </Routes>
  );
};

export default App;
