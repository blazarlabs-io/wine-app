"use client";

import { Container } from "../core/Container";
import { TopBar } from "../core/Navigation/TopBar";
import { Login } from "../molecules/Login";
import { useLogin } from "@/context/loginContext";
import { AnimatePresence, motion } from "framer-motion";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { showLogin } = useLogin();
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] h-screen w-full">
      <AnimatePresence>
        {showLogin && (
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
        )}
      </AnimatePresence>
      <TopBar />
      {children}
    </main>
  );
};
