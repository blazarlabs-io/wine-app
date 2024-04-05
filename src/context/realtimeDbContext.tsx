"use client";

import { db } from "@/lib/firebase/client";
import {
  EuLabelInterface,
  WineryGeneralInfoInterface,
  WineryInterface,
} from "@/typings/components";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

export interface RealtimeDbContextInterface {
  wineryGeneralInfo: WineryGeneralInfoInterface;
  wineryEuLabels: EuLabelInterface[];
  updateWineryGeneralInfo: (data: WineryGeneralInfoInterface) => void;
  updateWineryEuLabels: (data: EuLabelInterface[]) => void;
}

const contextInitialData: RealtimeDbContextInterface = {
  wineryGeneralInfo: {
    name: "",
    foundedOn: "",
    logo: "",
    collections: "",
    noOfProducedWines: "",
    vineyardsSurface: "",
    noOfBottlesProducedPerYear: "",
    grapeVarieties: "",
    lastUpdated: "",
    certifications: [],
    wineryHeadquarters: {
      latitude: "",
      longitude: "",
    },
    wineryRepresentative: {
      name: "",
      email: "",
      phone: "",
    },
  },
  wineryEuLabels: [],
  updateWineryGeneralInfo: () => {},
  updateWineryEuLabels: () => {},
};

const RealtimeDbContext = createContext(contextInitialData);

export const useRealtimeDb = (): RealtimeDbContextInterface => {
  const context = useContext<RealtimeDbContextInterface>(RealtimeDbContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const RealtimeDbProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const { user } = useAuth();

  const [wineryGeneralInfo, setWineryGeneralInfo] = useState(
    contextInitialData.wineryGeneralInfo
  );

  const [wineryEuLabels, setWineryEuLabels] = useState(
    contextInitialData.wineryEuLabels
  );

  const updateWineryGeneralInfo = (data: WineryGeneralInfoInterface) => {
    setWineryGeneralInfo(data);
  };

  const updateWineryEuLabels = (data: EuLabelInterface[]) => {
    setWineryEuLabels(data);
  };

  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, "wineries", user.uid as string);

    const unsubscribe: Unsubscribe = onSnapshot(docRef, (snapshot) => {
      const wineryData = snapshot.data() as WineryInterface;
      if (wineryData) {
        console.log(wineryData);
        updateWineryGeneralInfo(
          wineryData.generalInfo as WineryGeneralInfoInterface
        );
        updateWineryEuLabels(wineryData.euLabels as EuLabelInterface[]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const value = {
    wineryGeneralInfo,
    wineryEuLabels,
    updateWineryGeneralInfo,
    updateWineryEuLabels,
  };

  return (
    <RealtimeDbContext.Provider value={value}>
      {children}
    </RealtimeDbContext.Provider>
  );
};
