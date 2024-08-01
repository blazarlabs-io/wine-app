"use client";

import { WineClientAPI } from "@blzlabs/wine-client-sdk";
import { createContext, useContext, useEffect, useState } from "react";

export interface WineClientInterface {
  wineClient: any;
}

const contextInitialData: WineClientInterface = {
  wineClient: null,
};

const WineClientContext = createContext(contextInitialData);

export const useWineClient = (): WineClientInterface => {
  const context = useContext<WineClientInterface>(WineClientContext);

  if (context === undefined) {
    throw new Error(
      "use WineClient Provider must be used as within a Provider"
    );
  }

  return context;
};

export const WineClientProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [wineClient, setWineClient] = useState<any>(null);

  const authenticate = async () => {
    const client = new WineClientAPI();
    try {
      await client.authenticate({
        url: process.env.NEXT_PUBLIC_WINE_CLIENT_SDK_URL as string,
        apiKey: process.env.NEXT_PUBLIC_WINE_CLIENT_SDK_KEY as string,
      });
      setWineClient(client);
      console.log("[WCAPI]: WineClientSDK authenticated");
      //

      // if (client.db) {
      //   client.db.getDocsInCollection("wineries").then((res: any) => {
      //     console.log("WINERIES", res.data);
      //   });
      // }
    } catch (error) {
      console.error("[WCAPI]: WineClientSDK authentication error", error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const value = {
    wineClient,
  };

  return (
    <WineClientContext.Provider value={value}>
      {children}
    </WineClientContext.Provider>
  );
};
