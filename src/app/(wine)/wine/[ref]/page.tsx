"use client";

import { WinePage } from "@/components";
import {
  EuLabelInterface,
  WineryGeneralInfoInterface,
  WineryInterface,
} from "@/typings/winery";
import {
  getWineByRefNumber,
  getWineryByWineRefNumber,
} from "@/utils/firestore";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WineExplorer({ params }: { params: { ref: string } }) {
  const [generalInfo, setGeneralInfo] =
    useState<WineryGeneralInfoInterface | null>(null);
  const router = useRouter();
  const [euLabel, setEuLabel] = useState<DocumentData | null>(null);

  useEffect(() => {
    router.refresh();
    getWineByRefNumber(params.ref, (label: EuLabelInterface | null) => {
      setEuLabel(label);
    });
    getWineryByWineRefNumber(params.ref, (data: WineryInterface | null) => {
      setGeneralInfo(data?.generalInfo as WineryGeneralInfoInterface);
    });
  }, []);
  return (
    <WinePage
      generalInfo={generalInfo as WineryGeneralInfoInterface}
      euLabel={euLabel as EuLabelInterface}
    />
  );
}
