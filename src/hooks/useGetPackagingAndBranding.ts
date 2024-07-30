import { useEffect, useState } from "react";
import { useWineClient } from "@/context/wineClientSdkContext";

export const useGetPackagingAndBranding = () => {
  const { wineClient } = useWineClient();
  const [closureTypes, setClosureTypes] = useState<string[]>([]);

  useEffect(() => {
    if (wineClient) {
      wineClient.utils
        .getSystemVariable("closureTypes")
        .then((response: any) => {
          setClosureTypes(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [wineClient]);

  return { closureTypes };
};
