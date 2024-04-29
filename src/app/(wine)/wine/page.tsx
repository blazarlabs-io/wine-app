"use client";

import { WinePage } from "@/components";
import {
  EuLabelInterface,
  WineryGeneralInfoInterface,
  WineryInterface,
} from "@/typings/winery";
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
  const [generalInfo, setGeneralInfo] =
    useState<WineryGeneralInfoInterface | null>(null);
  const [euLabel, setEuLabel] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (ref) {
      getWineByRefNumber(ref, (label: EuLabelInterface | null) => {
        setEuLabel(label);
      });
      getWineryByWineRefNumber(ref, (data: WineryInterface | null) => {
        setGeneralInfo(data?.generalInfo as WineryGeneralInfoInterface);
      });
    }
  }, [ref]);

  useEffect(() => {
    updateAppLoading(false);
    setRef(searchParams.get("ref"));
  }, []);
  return (
    <>
      {euLabel && generalInfo && (
        <WinePage
          generalInfo={generalInfo as WineryGeneralInfoInterface}
          euLabel={euLabel as EuLabelInterface}
        />
      )}
    </>
  );
}
