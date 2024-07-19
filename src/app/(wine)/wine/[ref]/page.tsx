"use client";

import { WinePage } from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { useAppState } from "@/context/appStateContext";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import {
  getWineByRefNumber,
  getWineryByWineRefNumber,
} from "@/utils/firestore";

export interface PageProps {
  params: {
    ref: string;
  };
}

export default function Page({ params }: PageProps) {
  const { updateAppLoading } = useAppState();

  const searchParams = useSearchParams();

  const [ref, setRef] = useState<string | null>(params.ref);
  const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfo | null>(
    null
  );
  const [wine, setWine] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (ref) {
      getWineByRefNumber({ ref })
        .then((data: any) => {
          setWine(data.data);
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
      getWineryByWineRefNumber({ ref })
        .then((data: any) => {
          setGeneralInfo(data?.data.generalInfo as WineryGeneralInfo);
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [ref]);

  useEffect(() => {
    updateAppLoading(false);
    setRef(params.ref);
  }, [params]);

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
