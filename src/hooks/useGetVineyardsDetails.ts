"use client";

import { useState, useEffect } from "react";
import { useWineClient } from "@/context/wineClientSdkContext";

export const useGetVineyardsDetails = () => {
  const { wineClient } = useWineClient();
  const [irrigationPractices, setIrrigationPractices] = useState<string[]>([]);

  useEffect(() => {
    if (wineClient) {
      wineClient.utils
        .getSystemVariable("irrigationPractices")
        .then((res: any) => {
          setIrrigationPractices(res.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [wineClient]);

  return { irrigationPractices };
};
