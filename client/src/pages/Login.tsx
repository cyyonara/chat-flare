import React from "react";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="flex max-w-[430px] flex-1 flex-col items-center gap-y-8"
    >
      <h3 className="font-bold">Login with Chat Flare</h3>
      <LoginForm />
    </motion.div>
  );
};

export default Login;
