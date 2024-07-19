"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { Wine } from "@/typings/winery";
import {
  getAllWines,
  getAllWineryNames,
  getWinesByWineryName,
  getWineTypes,
  getTokenizedWines,
  getNonTokenizedWines,
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
  showTokenized: boolean | null;
}
export interface FiltersContextInterface {
  mobileFilters: boolean;
  showFilters: boolean;
  filters: FiltersInterface;
  filteredWines: Wine[];
  allWines: Wine[];
  tokenizedWines: Wine[];
  nonTokenizedWines: Wine[];
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
    showTokenized: null,
  },
  allWines: [],
  tokenizedWines: [],
  nonTokenizedWines: [],
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
    showTokenized: null,
  });
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [tokenizedWines, setTokenizedWines] = useState<Wine[]>([]);
  const [nonTokenizedWines, setNonTokenizedWines] = useState<Wine[]>([]);
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
        .then((wines: any) => {
          setFilteredWines(wines.data);
          setFiltersLoading(false);
        })
        .catch((error) => {});
      return;
    } else if (filters.showTokenized) {
      setFilteredWines(tokenizedWines);
      setFiltersLoading(false);
      return;
    }
    setFilteredWines(allWines);
    setFiltersLoading(false);
  }, [filters]);

  useEffect(() => {
    getAllWineryNames().then((wineries: any) => {
      setFilters((filters) => ({
        ...filters,
        byWinery: {
          list: wineries.data,
          result: null,
        },
      }));
    });
    getWineTypes()
      .then((wineTypes: any) => {
        setFilters((filters) => ({
          ...filters,
          byWineType: {
            list: wineTypes.data,
            result: null,
          },
        }));
      })
      .catch((error) => {});
    getAllWines()
      .then((wines: any) => {
        setAllWines(wines.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // * GET NON-TOKENIZED WINES
    getNonTokenizedWines()
      .then((response: any) => {
        setNonTokenizedWines(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });

    // * GET TOKENIZED WINES
    getTokenizedWines()
      .then((response: any) => {
        setTokenizedWines(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  const value = {
    mobileFilters,
    showFilters,
    filters,
    filteredWines,
    allWines,
    tokenizedWines,
    filtersLoading,
    filtersMessage,
    nonTokenizedWines,
    updateShowFilters,
    updateFilters,
    updateFiltersMessage,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
