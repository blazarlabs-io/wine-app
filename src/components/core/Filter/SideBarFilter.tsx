"use client";

import { Container, Text, DropDownFilter, SearchFilter } from "@/components";

export const SideBarFilter = () => {
  return (
    <Container intent="flexColLeft" className="h-full w-[196px]" gap="medium">
      <DropDownFilter
        label="Search by winery"
        items={["Winery 1", "Winery 2"]}
        selectedValue={"Winery 1"}
        onSelect={(item: string) => {}}
      />
      <DropDownFilter
        label="Search by wine type"
        items={["Wine 1", "Wine 2"]}
        selectedValue={"Wine 1"}
        onSelect={(item: string) => {}}
      />
      <SearchFilter label="Search UPC code" />
    </Container>
  );
};
