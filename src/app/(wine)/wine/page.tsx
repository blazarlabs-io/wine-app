"use client";

import { SpinnerLoader, WinePage } from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { useAppState } from "@/context/appStateContext";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { useWineClient } from "@/context/wineClientSdkContext";

export default function WineDetail() {
  const { updateAppLoading } = useAppState();
  const { wineClient } = useWineClient();

  const searchParams = useSearchParams();

  const [ref, setRef] = useState<string | null>(searchParams.get("ref"));
  // const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfo | null>(
  //   null
  // );
  // const [wine, setWine] = useState<DocumentData | null>(null);

  // useEffect(() => {
  //   if (ref && wineClient) {
  //     console.log("REF QUERY /wine?ref=", ref);
  //   }
  // }, [ref, wineClient]);

  useEffect(() => {
    updateAppLoading(false);
    setRef(searchParams.get("ref"));
    if (typeof window !== "undefined")
      window.location.href = `${process.env.NEXT_PUBLIC_TRACECORK_REDIRECT}${ref}`;
  }, []);

  return (
    <>
      <Suspense>
        <div className="flex items-center justify-center w-full h-screen">
          <SpinnerLoader width="48px" height="48px" />
        </div>
        {/* {wine && generalInfo && (
          <WinePage
            generalInfo={generalInfo as WineryGeneralInfo}
            wine={wine as Wine}
          />
        )} */}
      </Suspense>
    </>
  );
}
