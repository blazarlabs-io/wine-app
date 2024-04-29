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
import { wineryInitialData } from "@/data/wineryInitialData";
import { getWineryLevelDb } from "@/utils/firestore";
import { AvailableLevels, LevelsInterface } from "@/typings/systemVariables";

export interface RealtimeDbContextInterface {
  wineryGeneralInfo: WineryGeneralInfoInterface;
  tier: string;
  level: string;
  maxPrice: number;
  availableLevels: AvailableLevels[] | null;
  wineryEuLabels: EuLabelInterface[];
  allowedEuLabels: number;
  updateWineryGeneralInfo: (data: WineryGeneralInfoInterface) => void;
  updateTier: (tier: string) => void;
  updateLevel: (level: string) => void;
  regiterWineryEuLabels: (data: EuLabelInterface[]) => void;
}

const contextInitialData: RealtimeDbContextInterface = {
  wineryGeneralInfo: wineryInitialData,
  tier: "",
  level: "",
  maxPrice: 0,
  availableLevels: [],
  wineryEuLabels: [],
  allowedEuLabels: 0,
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
  const [availableLevels, setAvailableLevels] = useState<
    AvailableLevels[] | null
  >(null);

  const [allowedEuLabels, setAllowedEuLabels] = useState(
    contextInitialData.allowedEuLabels
  );

  const [wineryEuLabels, setWineryEuLabels] = useState(
    contextInitialData.wineryEuLabels
  );

  const [maxPrice, setMaxPrice] = useState(contextInitialData.maxPrice);

  const sortLevels = (levels: LevelsInterface) => {
    const sortedLevels: LevelsInterface = {
      bronze: null,
      silver: null,
      gold: null,
      diamond: null,
    };

    Object.keys(levels)
      .sort()
      .forEach((key) => {
        sortedLevels[key as keyof LevelsInterface] =
          levels[key as keyof LevelsInterface];
      });

    return sortedLevels;
  };

  const updateWineryGeneralInfo = (data: WineryGeneralInfoInterface) => {
    setWineryGeneralInfo(data);
  };

  const updateTier = (tier: string) => setTier(tier);

  const updateLevel = (level: string) => setLevel(level);

  const regiterWineryEuLabels = (data: EuLabelInterface[]) => {
    setWineryEuLabels(data);
  };

  useEffect(() => {
    const unsubscribeSysteVariables = onSnapshot(
      doc(db, "utils", "systemVariables"),
      (snapshot) => {
        const data = snapshot.data();
        if (data) {
          const levels: AvailableLevels[] = [];
          const sorted = sortLevels(data.level);
          const levelsKeys = Object.keys(sorted);
          levelsKeys.forEach((key) => {
            const k = key as keyof LevelsInterface;
            if (sorted[k] !== null)
              levels.push({
                name: k,
                price: sorted[k]?.price as number,
                euLabels: sorted[k]?.euLabels as number,
              });
          });
          setAvailableLevels(levels);
        }
      }
    );

    if (!user) return;

    const docRef = doc(db, "wineries", user.uid as string);

    const unsubscribeWineries: Unsubscribe = onSnapshot(docRef, (snapshot) => {
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
      unsubscribeWineries();
      unsubscribeSysteVariables();
    };
  }, [user]);

  useEffect(() => {
    if (level) {
      getWineryLevelDb(level as string).then((data) => {
        if (data) setAllowedEuLabels(data.euLabels as number);
      });
    }
  }, [level]);

  useEffect(() => {
    const findMaxPrice = (data: any) => {
      return Math.max.apply(
        Math,
        data.map(function (o: any) {
          return o.price;
        })
      );
    };

    if (availableLevels) {
      const maxPrice = findMaxPrice(availableLevels);
      setMaxPrice(maxPrice);
    }
  }, [availableLevels]);

  const value = {
    wineryGeneralInfo,
    tier,
    level,
    maxPrice,
    availableLevels,
    wineryEuLabels,
    allowedEuLabels,
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
