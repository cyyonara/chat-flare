import React, { useEffect } from "react";
import SignupForm from "@/components/SignupForm";
import { motion } from "framer-motion";

const Signup: React.FC = () => {
  useEffect(() => {
    document.title = "Sign up";
  }, []);

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="flex max-w-[430px] flex-1 flex-col items-center gap-y-8"
    >
      <h3 className="font-bold">Create an account for free</h3>
      <SignupForm />
    </motion.div>
  );
};

export default Signup;
