"use client";

import { Container, DropDown, Text } from "@/components";

export interface ExploreModeSelectProps {}

export const ExploreModeSelect = ({}: ExploreModeSelectProps) => {
  return (
    <Container py="medium" intent="flexRowRight" className="">
      <Container intent="grid-2" gap="small" className="max-w-[240px]">
        <Container intent="flexRowRight">
          <Text className="">Exploring</Text>
        </Container>
        <DropDown
          items={["wines", "wineries"]}
          selectedValue={"wines"}
          fullWidth
          onSelect={(item: string) => {}}
          className="!bg-top-[0%]"
        />
      </Container>
    </Container>
  );
};
