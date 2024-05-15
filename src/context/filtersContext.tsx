"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { WineInterface } from "@/typings/winery";
import {
  getAllWines,
  getAllWineryNames,
  getWinesByWineType,
  getWinesByWineryName,
  getWineTypes,
} from "@/utils/firestore";

export interface FiltersInterface {
  byWinery: {
    list: string[];
    result: any;
  };
  byWineType: {
    list: string[];
    result: any;
  };
  byUpc: string[] | null;
}
export interface FiltersContextInterface {
  mobileFilters: boolean;
  showFilters: boolean;
  filters: FiltersInterface;
  filteredWines: WineInterface[];
  allWines: WineInterface[];
  filtersLoading: boolean;
  filtersMessage: string;
  updateShowFilters: (value: boolean) => void;
  updateFilters: (filts: FiltersInterface) => void;
  updateFiltersMessage: (message: string) => void;
}

const contextInitialData: FiltersContextInterface = {
  mobileFilters: false,
  showFilters: false,
  filters: {
    byWinery: {
      list: [],
      result: null,
    },
    byWineType: {
      list: [],
      result: null,
    },
    byUpc: null,
  },
  allWines: [],
  filteredWines: [],
  filtersLoading: false,
  filtersMessage: "",
  updateShowFilters: () => {},
  updateFilters: () => {},
  updateFiltersMessage: () => {},
};

const FiltersContext = createContext(contextInitialData);

export const useFilters = (): FiltersContextInterface => {
  const context = useContext<FiltersContextInterface>(FiltersContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const FiltersProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const { responsiveSize } = useResponsive();

  const [mobileFilters, setMobileFilters] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FiltersInterface>({
    byWinery: {
      list: [],
      result: null,
    },
    byWineType: {
      list: [],
      result: null,
    },
    byUpc: null,
  });
  const [filteredWines, setFilteredWines] = useState<WineInterface[]>([]);
  const [allWines, setAllWines] = useState<WineInterface[]>([]);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);
  const [filtersMessage, setFiltersMessage] = useState<string>("");

  const updateShowFilters = (value: boolean) => {
    setShowFilters(value);
  };

  const updateFilters = (filts: FiltersInterface) => {
    setFiltersLoading(true);
    setFilters(filts);
  };

  const updateFiltersMessage = (message: string) => {
    setFiltersMessage(message);
  };

  useEffect(() => {
    if (responsiveSize === "mobile") {
      setMobileFilters(true);
    } else {
      setMobileFilters(false);
    }
  }, [responsiveSize]);

  useEffect(() => {
    if (filters.byWinery.result && !filters.byWineType.result) {
      getWinesByWineryName(filters.byWinery.result)
        .then((wines: WineInterface[]) => {
          setFilteredWines(wines);
          setFiltersLoading(false);
        })
        .catch((error) => {});
      return;
    }
    if (filters.byWineType.result && !filters.byWinery.result) {
      getWinesByWineType(filters.byWineType.result)
        .then((wines) => {
          setFilteredWines(wines);
          setFiltersLoading(false);
        })
        .catch((error) => {});
      return;
    }

    setFilteredWines(allWines);
    setFiltersLoading(false);
  }, [filters]);

  useEffect(() => {
    getAllWineryNames().then((wineries) => {
      setFilters((filters) => ({
        ...filters,
        byWinery: {
          list: wineries,
          result: null,
        },
      }));
    });
    getWineTypes()
      .then((wineTypes) => {
        setFilters((filters) => ({
          ...filters,
          byWineType: {
            list: wineTypes,
            result: null,
          },
        }));
      })
      .catch((error) => {});
    getAllWines().then((wines) => {
      setAllWines(wines);
    });
  }, []);

  const value = {
    mobileFilters,
    showFilters,
    filters,
    filteredWines,
    allWines,
    filtersLoading,
    filtersMessage,
    updateShowFilters,
    updateFilters,
    updateFiltersMessage,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
