"use client";

import { Container, WineryHeaderSection, WinesListSection } from "@/components";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { useForms } from "@/context/FormsContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useWineClient } from "@/context/wineClientSdkContext";
import { db } from "@/lib/firebase/services/db";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const { updateAppLoading } = useAppState();
  const router = useRouter();
  const { wineryGeneralInfo } = useRealtimeDb();
  const { updateWineryForm } = useForms();

  const { wineClient } = useWineClient();

  useEffect(() => {
    // * CHECK IF WINERY DETAILS ARE ALREADY REGISTERED
    // * IF NOT, REDIRECT TO WINERY FORM
    if (user && wineClient) {
      db.winery
        .getOne(user?.uid)
        .then((res: any) => {
          console.log(user?.uid, res);
          if (res.status == 404) {
            updateWineryForm({
              title: "Register Winery Details",
              description:
                "Please fill in the form to register your winery details. All fields marked with * are mandatory.",
              isEditing: false,
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
        <button
          className="text-primary-light py-6"
          onClick={() => {
            fetch("/api/send-email", {
              method: "POST",
              body: JSON.stringify({
                to: "fitosegrera@gmail.com",
                templateId: "d-e43ea96c084e472abf812e22f2412c8e",
                dynamic_template_data: {
                  qrCodeUrl: "https://google.com",
                },
              }),
              headers: {
                "content-type": "application/json",
              },
            })
              .then(async (res) => {
                console.log("Email sent");
                console.log(await res.json());
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Send test email
        </button>
        <WineryHeaderSection />
        <WinesListSection />
      </Container>
    </>
  );
};
