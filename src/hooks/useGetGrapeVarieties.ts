import { GrapeVariety } from "@/typings/winery";
import { getGrapeVarieties, getVineyardGrapeGrown } from "@/utils/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

export const useGetGrapeVarieties = () => {
  const { user } = useAuth();

  const [grapesVarieties, setGrapesVarieties] = useState<GrapeVariety[]>([]);

  useEffect(() => {
    getGrapeVarieties(user?.uid as string)
      .then((data: any) => {
        setGrapesVarieties(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { grapesVarieties };
};
