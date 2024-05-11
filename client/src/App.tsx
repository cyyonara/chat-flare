import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/Login";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
