"use client";

import { Button, Container, DropDown, Text } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { useFilters } from "@/context/filtersContext";
import { Icon } from "@iconify/react";
export interface ExploreModeSelectProps {}

export const ExploreModeSelect = ({}: ExploreModeSelectProps) => {
  const { responsiveSize } = useResponsive();
  const { mobileFilters, updateShowFilters, filters, updateFilters } =
    useFilters();
  return (
    <>
      <Container
        py="small"
        px={responsiveSize === "mobile" ? "small" : "none"}
        intent={responsiveSize === "mobile" ? "flexRowBetween" : "flexRowRight"}
        className="min-w-full"
      >
        {mobileFilters && (
          <Button
            intent="text"
            className="flex items-center justify-start gap-[8px]"
            onClick={() => {
              updateShowFilters(true);
            }}
          >
            <Icon
              icon="lucide:filter"
              width="20"
              height="20"
              className="text-primary-light"
            />
            Filters
          </Button>
        )}
        <Container intent="grid-2" gap="small" className="max-w-[240px]">
          <Container intent="flexRowRight">
            <Text className="text-on-surface/40">Exploring</Text>
          </Container>
          <DropDown
            disabled
            items={["wines", "wineries"]}
            selectedValue={"wines"}
            fullWidth
            onSelect={(item: string) => {}}
            className="!bg-top-[0%]"
          />
        </Container>
      </Container>
      {filters.byUpc && filters.byUpc.length > 0 && (
        <Container
          intent="flexRowLeft"
          px={responsiveSize === "mobile" ? "medium" : "none"}
          gap="small"
          className="mb-[16px] min-w-full"
        >
          <Container
            gap="xsmall"
            px="xsmall"
            intent="flexRowLeft"
            className="border border-primary-light rounded-full bg-primary-light bg-opacity-10 max-w-fit"
          >
            <Text variant="accent" className="">
              upc
            </Text>

            <Button
              intent="text"
              onClick={() => {
                updateFilters({ ...filters, byUpc: null });
              }}
            >
              <Icon
                icon="mdi:close"
                width="20"
                height="20"
                className="text-primary-light"
              />
            </Button>
          </Container>
        </Container>
      )}
    </>
  );
};
