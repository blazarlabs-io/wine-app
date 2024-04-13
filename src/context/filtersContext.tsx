"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { EuLabelInterface } from "@/typings/winery";
import { getAllEuLabelWines, getWineByUpcCode } from "@/utils/firestore";

export interface FiltersInterface {
  byWinery: any;
  byWineType: any;
  byUpc: string[] | null;
}
export interface FiltersContextInterface {
  mobileFilters: boolean;
  showFilters: boolean;
  filters: FiltersInterface;
  filteredWines: EuLabelInterface[];
  allWines: EuLabelInterface[];
  filtersLoading: boolean;
  updateShowFilters: (value: boolean) => void;
  updateFilters: (filts: FiltersInterface) => void;
}

const contextInitialData: FiltersContextInterface = {
  mobileFilters: false,
  showFilters: false,
  filters: {
    byWinery: null,
    byWineType: null,
    byUpc: null,
  },
  allWines: [],
  filteredWines: [],
  filtersLoading: false,
  updateShowFilters: () => {},
  updateFilters: () => {},
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
    byWinery: null,
    byWineType: null,
    byUpc: null,
  });
  const [filteredWines, setFilteredWines] = useState<EuLabelInterface[]>([]);
  const [allWines, setAllWines] = useState<EuLabelInterface[]>([]);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);

  const updateShowFilters = (value: boolean) => {
    setShowFilters(value);
  };

  const updateFilters = (filts: FiltersInterface) => {
    setFiltersLoading(true);
    setFilters(filts);
  };

  useEffect(() => {
    if (responsiveSize === "mobile") {
      setMobileFilters(true);
    } else {
      setMobileFilters(false);
    }
  }, [responsiveSize]);

  useEffect(() => {
    console.log("Use state filter context", filters);
    if (filters.byUpc) {
      filters?.byUpc?.map((upc: string) => {
        getWineByUpcCode(upc, (wine: EuLabelInterface | null) => {
          if (wine) {
            setFilteredWines((filteredWines) => [...filteredWines, wine]);
            setFiltersLoading(false);
          } else {
            setFiltersLoading(false);
          }
        });
      });
    } else {
      console.log("No filters");
      setFilteredWines([]);
      setFiltersLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    getAllEuLabelWines().then((wines) => {
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
    updateShowFilters,
    updateFilters,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
