"use client";

import {
  Container,
  Text,
  Button,
  DropDownFilter,
  SearchFilter,
} from "@/components";
import { Icon } from "@iconify/react";
import { useFilters } from "@/context/filtersContext";
import { useState } from "react";
import { classNames } from "@/utils/classNames";
import { useResponsive } from "@/hooks/useResponsive";

export const FilterBox = () => {
  const { responsiveSize } = useResponsive();
  const { filters, updateFilters, updateShowFilters } = useFilters();
  const [upcFilterValue, setUpcFilterValue] = useState<string[]>([]);
  const [wineTypeFilterValue, setWineTypeFilterValue] = useState<string | null>(
    null
  );
  const [wineryFilterValue, setWineryFilterValue] = useState<string | null>(
    null
  );

  return (
    <Container
      intent="flexColCenter"
      px="medium"
      py="medium"
      gap="medium"
      className={classNames(
        "bg-surface-light rounded-lg min-h-[460px]",
        responsiveSize === "mobile" ? "max-w-[320px]" : "max-w-[240px]"
      )}
    >
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
      <Container intent="flexColLeft" className="h-full w-full" gap="medium">
        <DropDownFilter
          disabled={false}
          label="Search by winery"
          items={filters.byWinery.list}
          selectedValue={wineryFilterValue || ""}
          onSelect={(item: string) => {
            setWineryFilterValue(item);
          }}
          onReset={() => {
            setWineryFilterValue(null);
          }}
        />
        <DropDownFilter
          disabled={false}
          label="Search by wine type"
          items={filters.byWineType.list}
          selectedValue={wineTypeFilterValue || ""}
          onSelect={(item: string) => {
            setWineTypeFilterValue(item);
          }}
          onReset={() => {
            setWineTypeFilterValue(null);
          }}
        />
        <SearchFilter
          disabled={true}
          label="Search UPC code"
          onChange={(value: string[]) => {
            setUpcFilterValue(value);
          }}
        />
      </Container>
      <Container intent="flexRowBetween" gap="xsmall">
        <Button
          intent="secondary"
          size="small"
          fullWidth
          className="w-full"
          onClick={() => {
            updateShowFilters(false);
          }}
        >
          Cancel
        </Button>
        <Button
          intent="primary"
          size="small"
          fullWidth
          className="w-full"
          onClick={() => {
            updateFilters({
              byUpc: upcFilterValue,
              byWineType: {
                list: filters.byWineType.list,
                result: wineTypeFilterValue,
              },
              byWinery: {
                list: filters.byWinery.list,
                result: wineryFilterValue,
              },
            });
            updateShowFilters(false);
          }}
        >
          Apply
        </Button>
      </Container>
    </Container>
  );
};
