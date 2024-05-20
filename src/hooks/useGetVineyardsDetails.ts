"use client";

import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";

export const useGetVineyardsDetails = () => {
  const [irrigationPractices, setIrrigationPractices] = useState<string[]>([]);

  const getIrrigationPracticesDb = httpsCallable(
    functions,
    "getIrrigationPracticesDb"
  );

  useEffect(() => {
    getIrrigationPracticesDb()
      .then((res: any) => {
        setIrrigationPractices(res.data.irrigationPractices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { irrigationPractices };
};
