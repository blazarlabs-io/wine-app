"use client";

import { Container } from "../core/Container";
import { Login } from "../molecules/Login";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";

export const LoginPage = () => {
  const { authLoading } = useAuth();

  return (
    <>
      {!authLoading && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.25 }}
            exit={{ opacity: 0 }}
            className="fixed flex flex-col items-center justify-center -z-1 top-0 left-0 w-full h-full bg-surface-light"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.25,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Login
                title="Login"
                description="If you are a winery owner, please login using the email and password provided to you by the EE Hub team."
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};
