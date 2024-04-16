"use client";

import {
  Container,
  Text,
  Button,
  DropDownFilter,
  SearchFilter,
  SpinnerLoader,
} from "@/components";
import { Icon } from "@iconify/react";
import { useFilters } from "@/context/filtersContext";
import { useEffect, useState } from "react";
import { classNames } from "@/utils/classNames";
import { useResponsive } from "@/hooks/useResponsive";

export const FilterBox = () => {
  const { responsiveSize } = useResponsive();
  const {
    filters,
    updateFilters,
    updateShowFilters,
    filteredWines,
    updateFiltersMessage,
    filtersMessage,
  } = useFilters();
  const [upcFilterValue, setUpcFilterValue] = useState<string[]>([]);

  const [currentFiltering, setCurrentFiltering] = useState<string | null>(null);

  useEffect(() => {
    if (currentFiltering) {
      if (filteredWines.length > 0) {
        updateFiltersMessage(
          `Showing results for ${currentFiltering}: ${filteredWines.length} wine(s) found.`
        );
      } else {
        updateFiltersMessage(
          "No wines found for the selected filters, showing all wines."
        );
      }
    } else {
      updateFiltersMessage("Showing all wines.");
    }
  }, [filteredWines]);

  return (
    <Container
      intent="flexColCenter"
      px="medium"
      py="medium"
      gap="medium"
      className={classNames(
        "bg-surface-light rounded-lg min-h-[460px]",
        responsiveSize === "mobile"
          ? "max-w-[320px] min-w-[320px]"
          : "min-w-[440px] max-w-[440px]"
      )}
    >
      <>
        {filters.byWinery.list && filters.byWineType.list ? (
          <>
            <Container intent="flexRowBetween" gap="xsmall">
              <Container intent="flexRowLeft" gap="xsmall">
                <Icon
                  icon="lucide:filter"
                  width="20"
                  height="20"
                  className="text-on-surface"
                />
                <Text intent="h5" className="font-semibold">
                  Filters
                </Text>
              </Container>
              <Button
                disabled={false}
                intent="text"
                onClick={() => {
                  updateFilters({
                    byUpc: upcFilterValue,
                    byWineType: {
                      list: filters.byWineType.list,
                      result: null,
                    },
                    byWinery: {
                      list: filters.byWinery.list,
                      result: null,
                    },
                  });
                  setCurrentFiltering(null);
                }}
              >
                Reset
              </Button>
            </Container>
            <Container
              intent="flexColLeft"
              className="h-full w-full"
              gap="medium"
            >
              <DropDownFilter
                disabled={false}
                label="Search by winery"
                items={filters.byWinery.list}
                selectedValue={filters.byWinery.result || ""}
                onSelect={(item: string) => {
                  updateFilters({
                    byUpc: upcFilterValue,
                    byWineType: {
                      list: filters.byWineType.list,
                      result: null,
                    },
                    byWinery: {
                      list: filters.byWinery.list,
                      result: item,
                    },
                  });
                  setCurrentFiltering("winery name");
                }}
              />
              <DropDownFilter
                disabled={false}
                label="Search by wine type"
                items={filters.byWineType.list}
                selectedValue={filters.byWineType.result || ""}
                onSelect={(item: string) => {
                  // setWineTypeFilterValue(item);
                  updateFilters({
                    byUpc: upcFilterValue,
                    byWineType: {
                      list: filters.byWineType.list,
                      result: item,
                    },
                    byWinery: {
                      list: filters.byWinery.list,
                      result: null,
                    },
                  });
                  setCurrentFiltering("wine type");
                }}
              />
              <SearchFilter
                disabled={true}
                label="Search UPC code"
                onChange={(value: string[]) => {
                  // setUpcFilterValue(value);
                }}
              />
            </Container>
            <Container
              intent={currentFiltering ? "flexRowBetween" : "flexRowRight"}
              gap="medium"
            >
              {currentFiltering && (
                <Text intent="p2" variant="dim">
                  {filtersMessage}
                </Text>
              )}
              <Button
                intent="primary"
                size="medium"
                fullWidth={false}
                onClick={() => {
                  updateShowFilters(false);
                }}
              >
                Close
              </Button>
            </Container>
          </>
        ) : (
          <>
            <div className="w-full h-full">
              <SpinnerLoader width="40px" height="40px" color="#ddd" />
            </div>
          </>
        )}
      </>
    </Container>
  );
};
