"use client";

import { getIrrigationPractices } from "@/utils/firestore";
import { useState, useEffect } from "react";

export const useGetVineyardsDetails = () => {
  const [irrigationPractices, setIrrigationPractices] = useState<string[]>([]);

  useEffect(() => {
    getIrrigationPractices()
      .then((res: any) => {
        setIrrigationPractices(res.data.irrigationPractices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { irrigationPractices };
};
