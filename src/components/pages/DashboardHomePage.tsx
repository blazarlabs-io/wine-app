"use client";

import { Container, WineryHeaderSection, WinesListSection } from "@/components";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { useForms } from "@/context/FormsContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useWineClient } from "@/context/wineClientSdkContext";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const { updateAppLoading } = useAppState();
  const router = useRouter();
  const { wineryGeneralInfo } = useRealtimeDb();
  const { updateWineryForm } = useForms();

  const { wineClient } = useWineClient();

  useEffect(() => {
    if (user && wineClient) {
      wineClient.winery
        .getWineryData(user?.uid)
        .then((res: any) => {
          console.log("WINE CLIENT API", res);
          if (
            res.data === null ||
            res.data.generalInfo === null ||
            res.data.generalInfo === undefined ||
            Object.keys(res.data.generalInfo).length === 0
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
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [wineClient, user]);

  return (
    <>
      <Container intent="flexColTop" className="min-w-full h-full">
        <WineryHeaderSection />
        <WinesListSection />
      </Container>
    </>
  );
};
