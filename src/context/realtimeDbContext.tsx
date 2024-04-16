"use client";

import { db } from "@/lib/firebase/client";
import {
  EuLabelInterface,
  WineryGeneralInfoInterface,
  WineryInterface,
} from "@/typings/winery";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

export interface RealtimeDbContextInterface {
  wineryGeneralInfo: WineryGeneralInfoInterface;
  tier: string;
  level: string;
  wineryEuLabels: EuLabelInterface[];
  updateWineryGeneralInfo: (data: WineryGeneralInfoInterface) => void;
  updateTier: (tier: string) => void;
  updateLevel: (level: string) => void;
  regiterWineryEuLabels: (data: EuLabelInterface[]) => void;
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
  tier: "",
  level: "",
  wineryEuLabels: [],
  updateWineryGeneralInfo: () => {},
  updateTier: () => {},
  updateLevel: () => {},
  regiterWineryEuLabels: () => {},
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

  const [tier, setTier] = useState(contextInitialData.tier);
  const [level, setLevel] = useState(contextInitialData.level);

  const [wineryEuLabels, setWineryEuLabels] = useState(
    contextInitialData.wineryEuLabels
  );

  const updateWineryGeneralInfo = (data: WineryGeneralInfoInterface) => {
    setWineryGeneralInfo(data);
  };

  const updateTier = (tier: string) => setTier(tier);

  const updateLevel = (level: string) => setLevel(level);

  const regiterWineryEuLabels = (data: EuLabelInterface[]) => {
    setWineryEuLabels(data);
  };

  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, "wineries", user.uid as string);

    const unsubscribe: Unsubscribe = onSnapshot(docRef, (snapshot) => {
      const wineryData = snapshot.data() as WineryInterface;
      if (wineryData) {
        let generalInfo: WineryGeneralInfoInterface;

        if (
          Object.keys(wineryData.generalInfo as WineryGeneralInfoInterface)
            .length === 0
        ) {
          generalInfo = contextInitialData.wineryGeneralInfo;
        } else {
          generalInfo = wineryData.generalInfo as WineryGeneralInfoInterface;
        }

        updateWineryGeneralInfo(generalInfo);
        regiterWineryEuLabels(wineryData.euLabels as EuLabelInterface[]);
        setTier(wineryData.tier as string);
        setLevel(wineryData.level as string);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const value = {
    wineryGeneralInfo,
    tier,
    level,
    wineryEuLabels,
    updateWineryGeneralInfo,
    updateTier,
    updateLevel,
    regiterWineryEuLabels,
  };

  return (
    <RealtimeDbContext.Provider value={value}>
      {children}
    </RealtimeDbContext.Provider>
  );
};
