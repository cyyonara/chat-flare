import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface IProps {
  children: React.ReactNode;
}

const Overlay: React.FC<IProps> = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[50] flex items-center justify-center bg-black/55 p-6"
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
