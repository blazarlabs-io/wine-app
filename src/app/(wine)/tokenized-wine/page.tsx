"use client";

import { WinePage } from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { useAppState } from "@/context/appStateContext";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { useGetIpfsData } from "@/hooks/useGetIpfsData";
import { TokenizedWinePage } from "@/components/pages/Wine/TokenizedWinePage";
import { useWineClient } from "@/context/wineClientSdkContext";
import { useAuth } from "@/context/authContext";

export default function TokenizedWineDetail() {
  const { updateAppLoading } = useAppState();

  const {
    ipfsData,
    setIpfsUrl,
    sensorData,
    temperatureData,
    humidityData,
    vibrationData,
    lightingData,
  } = useGetIpfsData();

  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { wineClient } = useWineClient();

  const [ref, setRef] = useState<string | null>(searchParams.get("ref"));
  const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfo | null>(
    null
  );

  useEffect(() => {
    if (ref) {
      wineClient.winery
        .getWineByRefNumber({ ref })
        .then((res: any) => {
          console.log("Wine Data", res.data);
          // setIpfsUrl(data.data.tokenization.ipfsUrl as string);
        })
        .catch((error: any) => {
          console.error("Error getting document:", error);
        });
      // getWineryByWineRefNumber({ ref })
      //   .then((data: any) => {
      //     setGeneralInfo(data?.data.generalInfo as WineryGeneralInfo);
      //   })
      //   .catch((error) => {
      //     console.error("Error getting document:", error);
      //   });
    }
  }, [ref, user, wineClient]);

  useEffect(() => {
    if (ref) {
      wineClient.winery
        .getWineByRefNumber({ ref })
        .then((data: any) => {
          setIpfsUrl(data.data.tokenization.ipfsUrl as string);
        })
        .catch((error: any) => {
          console.error("Error getting document:", error);
        });
      wineClient.winery
        .getWineryByWineRefNumber({ ref })
        .then((data: any) => {
          setGeneralInfo(data?.data.generalInfo as WineryGeneralInfo);
        })
        .catch((error: any) => {
          console.error("Error getting document:", error);
        });
    }
  }, [ref]);

  useEffect(() => {
    updateAppLoading(false);
    setRef(searchParams.get("ref"));
  }, []);
  return (
    <>
      <Suspense>
        {ipfsData && generalInfo && (
          <TokenizedWinePage
            generalInfo={generalInfo as WineryGeneralInfo}
            wine={ipfsData as Wine}
            sensorData={{
              temperature: temperatureData,
              humidity: humidityData,
              vibration: vibrationData,
              lighting: lightingData,
            }}
          />
        )}
      </Suspense>
    </>
  );
}
