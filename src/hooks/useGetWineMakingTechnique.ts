import { db } from "@/lib/firebase/services/db";
import { useEffect, useState } from "react";

export const useGetWineMakingTechnique = () => {
  const [sustainabilityPractices, setSustainabilityPractices] = useState<
    string[]
  >([]);

  useEffect(() => {
    db.systemVariables
      .getOne("sustainabilityPractices")
      .then((res: any) => {
        setSustainabilityPractices(res.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return { sustainabilityPractices };
};
