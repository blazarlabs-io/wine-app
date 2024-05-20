import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

export const useGetPackagingAndBranding = () => {
  const [closureTypes, setClosureTypes] = useState<string[]>([]);

  const getClosureTypesDb = httpsCallable(functions, "getClosureTypesDb");

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
