"use client";

import {
  Container,
  Text,
  DropDownFilter,
  SearchFilter,
  FilterBox,
} from "@/components";
import { useFilters } from "@/context/filtersContext";

export const SideBarFilter = () => {
  const { mobileFilters } = useFilters();
  return <>{!mobileFilters && <FilterBox />}</>;
};
