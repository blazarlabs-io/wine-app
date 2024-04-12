"use client";

import { WinePage } from "@/components";
import { EuLabelInterface } from "@/typings/winery";
import { getWineByRefNumber } from "@/utils/firestore";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function WineExplorer({ params }: { params: { ref: string } }) {
  const [euLabel, setEuLabel] = useState<DocumentData | null>(null);

  useEffect(() => {
    getWineByRefNumber(params.ref, (label: EuLabelInterface | null) => {
      console.log("label", label);
      setEuLabel(label);
    });
  }, []);
  return <WinePage euLabel={euLabel as EuLabelInterface} />;
}
