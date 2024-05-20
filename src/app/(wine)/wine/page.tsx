"use client";

import { WinePage } from "@/components";
import { Wine, WineryGeneralInfo, Winery } from "@/typings/winery";
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
      getWineByRefNumber(ref, (label: Wine | null) => {
        setWine(label);
      });
      getWineryByWineRefNumber(ref, (data: Winery | null) => {
        setGeneralInfo(data?.generalInfo as WineryGeneralInfo);
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
