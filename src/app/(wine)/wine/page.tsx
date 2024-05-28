"use client";

import { WinePage } from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { useAppState } from "@/context/appStateContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import {
  getWineByRefNumber,
  getWineryByWineRefNumber,
} from "@/utils/firestore";

export default function WineExplorer() {
  const { updateAppLoading } = useAppState();

  const searchParams = useSearchParams();

  const [ref, setRef] = useState<string | null>(searchParams.get("ref"));
  const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfo | null>(
    null
  );
  const [wine, setWine] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (ref) {
      getWineByRefNumber({ ref })
        .then((data: any) => {
          console.log("getWineByRefNumber", ref, data.data);
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
    setRef(searchParams.get("ref"));
  }, []);
  return (
    <>
      {wine && generalInfo && (
        <WinePage
          generalInfo={generalInfo as WineryGeneralInfo}
          wine={wine as Wine}
        />
      )}
    </>
  );
}
