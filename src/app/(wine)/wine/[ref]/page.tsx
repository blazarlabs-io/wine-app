"use client";

import { WinePage } from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { useAppState } from "@/context/appStateContext";
import { Suspense, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useWineClient } from "@/context/wineClientSdkContext";

export interface PageProps {
  params: {
    ref: string;
  };
}

export default function Page({ params }: PageProps) {
  const { updateAppLoading } = useAppState();
  const { wineClient } = useWineClient();

  const [ref, setRef] = useState<string | null>(params.ref);
  const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfo | null>(
    null
  );
  const [wine, setWine] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (ref && wineClient) {
      wineClient.winery
        .getWineByRefNumber(ref)
        .then((res: any) => {
          console.log("Wine Data", res);
          setWine(res.data);
        })
        .catch((error: any) => {
          console.error("Error getting document:", error);
        });
      wineClient.winery
        .getWineryByWineRefNumber(ref)
        .then((result: any) => {
          console.log("Winery Data", result);
          setGeneralInfo(result.data.generalInfo as WineryGeneralInfo);
        })
        .catch((error: any) => {
          console.error("Error getting document:", error);
        });
    }
  }, [ref, wineClient]);

  return (
    <>
      <Suspense>
        {wine && generalInfo && (
          <WinePage
            generalInfo={generalInfo as WineryGeneralInfo}
            wine={wine as Wine}
          />
        )}
      </Suspense>
    </>
  );
}
