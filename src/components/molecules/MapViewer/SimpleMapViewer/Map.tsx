"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { SimpleMapViewerProps } from "./ClientMap";

// this is a "barrel file" that prevents the ClientMap from ever getting loaded in the server.
export const Map: FunctionComponent<SimpleMapViewerProps> = (props) => {
  const [Client, setClient] =
    useState<FunctionComponent<SimpleMapViewerProps>>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== "undefined") {
        const newClient = (await import("./ClientMap")).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  if (typeof global.window === "undefined" || !Client) {
    return null;
  }

  return Client ? <Client {...props} /> : null;
};
