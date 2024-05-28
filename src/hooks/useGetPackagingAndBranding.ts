import { getClosureTypesDb } from "@/utils/firestore";
import { useEffect, useState } from "react";

export const useGetPackagingAndBranding = () => {
  const [closureTypes, setClosureTypes] = useState<string[]>([]);

  useEffect(() => {
    getClosureTypesDb()
      .then((response: any) => {
        setClosureTypes(response.data.closureTypes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { closureTypes };
};
