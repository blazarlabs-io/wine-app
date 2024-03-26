"use client";

import { Container } from "../core/Container";
import { Login } from "../molecules/Login";
import { motion } from "framer-motion";

export const LoginPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          width: "100%",
          height: "100%",
          maxHeight: "100vh",
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: -1,
        }}
        className=""
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        exit={{ opacity: 0 }}
        className="fixed flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-surface/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            delay: 0.1,
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
  );
};
