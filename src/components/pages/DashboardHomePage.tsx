"use client";

import {
  Container,
  RegisterWinery,
  WineryHeaderSection,
  WinesListSection,
} from "@/components";
import { motion } from "framer-motion";
import { useWinery } from "@/context/wineryContext";
import { useEffect } from "react";

export const DashboardHomePage = () => {
  const { showRegisterWinery, generalInfo, updateShowRegisterWinery } =
    useWinery();

  useEffect(() => {
    console.log("showRegisterWinery", showRegisterWinery);
    if (generalInfo) {
      updateShowRegisterWinery(false);
    } else {
      updateShowRegisterWinery(true);
    }
  }, [generalInfo]);
  return (
    <>
      {showRegisterWinery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-surface/90 backdrop-blur-sm"
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
            <RegisterWinery />
          </motion.div>
        </motion.div>
      )}
      <Container intent="flexColTop" className="w-full h-full">
        <WineryHeaderSection />
        <WinesListSection />
      </Container>
    </>
  );
};
