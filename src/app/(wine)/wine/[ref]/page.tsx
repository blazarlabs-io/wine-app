"use client";

import { SpinnerLoader, WinePage } from "@/components";
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

  // useEffect(() => {
  //   if (ref && wineClient) {
  //     console.log("REF dynamic /wine/[ref]", ref);
  //   }
  // }, [ref, wineClient]);

  useEffect(() => {
    if (params.ref) {
      if (typeof window !== "undefined")
        window.location.href = `${process.env.NEXT_PUBLIC_TRACECORK_REDIRECT}${params.ref}`;
    }
  }, [params.ref]);

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
