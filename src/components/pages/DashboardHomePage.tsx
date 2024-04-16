"use client";

import { Container, WineryHeaderSection, WinesListSection } from "@/components";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { getWineryDataDb } from "@/utils/firestore";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { useForms } from "@/context/FormsContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const { updateAppLoading } = useAppState();
  const router = useRouter();
  const { wineryGeneralInfo } = useRealtimeDb();
  const { updateWineryForm } = useForms();

  useEffect(() => {
    getWineryDataDb(user?.uid as string).then((data) => {
      if (
        data?.generalInfo === null ||
        data?.generalInfo === undefined ||
        Object.keys(data?.generalInfo).length === 0
      ) {
        updateWineryForm({
          title: "Register Winery Details",
          description:
            "Please fill in the form to register your winery details. All fields marked with * are mandatory.",
          isEditing: true,
          formData: wineryGeneralInfo,
        });
        router.push("/winery-form");
        updateAppLoading(false);
      } else {
        updateAppLoading(false);
      }
    });
  }, []);

  return (
    <>
      <Container intent="flexColTop" className="min-w-full h-full">
        <WineryHeaderSection />
        <WinesListSection />
      </Container>
    </>
  );
};
