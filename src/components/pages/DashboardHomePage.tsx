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
import { getWineryDataDb, initWineryInDb } from "@/utils/firestore";
import { useRouter } from "next/navigation";
import { WineryDataInterface } from "@/typings/components";
import { useAppState } from "@/context/appStateContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const { updateAppLoading } = useAppState();
  const router = useRouter();
  const {
    showRegisterWinery,
    updateShowRegisterWinery,
    updateIsEditing,
    updateWinery,
  } = useWinery();

  const { wineryGeneralInfo, updateWineryGeneralInfo, tier, level } =
    useRealtimeDb();

  useEffect(() => {
    getWineryDataDb(user?.uid as string).then((data) => {
      if (data === null) {
        // initWineryInDb(user?.uid as string);
      }
      if (
        data?.generalInfo === null ||
        data?.generalInfo === undefined ||
        Object.keys(data?.generalInfo).length === 0
      ) {
        updateShowRegisterWinery(true);
        updateIsEditing(false);
        router.push("/register-winery");
      } else {
        // updateShowRegisterWinery(false);
        // updateIsEditing(false);
        // const wineryData: WineryDataInterface = {
        //   wineryGeneralInfo: data.generalInfo,
        //   tier: data.tier,
        //   level: data.level,
        //   wines: data.wines || [],
        //   euLabels: data.euLabels || [],
        //   exists: true,
        // };
        // // console.log("Winery exists", wineryData);
        // updateWineryGeneralInfo(data.generalInfo);
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
