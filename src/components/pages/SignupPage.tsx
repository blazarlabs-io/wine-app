"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Signup } from "@/components";

export const SignupPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
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
        <Signup
          title="Create an Account"
          description="If you are a winery owner, fill out the form and our team will follow up with the credentials that you can use to access our platform. All fields marked with * are mandatory."
        />
      </motion.div>
    </motion.div>
  );
};
