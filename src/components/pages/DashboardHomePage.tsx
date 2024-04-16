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
import { useAuth } from "@/context/authContext";
import { getWineryDataDb } from "@/utils/firestore";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const { updateAppLoading } = useAppState();
  const router = useRouter();
  const { showRegisterWinery, updateShowRegisterWinery, updateIsEditing } =
    useWinery();

  useEffect(() => {
    getWineryDataDb(user?.uid as string).then((data) => {
      if (
        data?.generalInfo === null ||
        data?.generalInfo === undefined ||
        Object.keys(data?.generalInfo).length === 0
      ) {
        updateShowRegisterWinery(true);
        updateIsEditing(false);
        updateAppLoading(false);
        router.push("/register-winery");
      } else {
        updateAppLoading(false);
      }
    });
  }, []);

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
      <Container intent="flexColTop" className="min-w-full h-full">
        <WineryHeaderSection />
        <WinesListSection />
      </Container>
    </>
  );
};
