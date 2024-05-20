import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

export const useGetWineMakingTechnique = () => {
  const [sustainabilityPractices, setSustainabilityPractices] = useState<
    string[]
  >([]);
  const getSustainabilityPracticesDb = httpsCallable(
    functions,
    "getSustainabilityPracticesDb"
  );

  useEffect(() => {
    getSustainabilityPracticesDb()
      .then((res: any) => {
        setSustainabilityPractices(res.data.sustainabilityPractices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { sustainabilityPractices };
};
