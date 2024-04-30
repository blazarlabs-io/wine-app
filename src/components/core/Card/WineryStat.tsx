"use client";

import { Container, Text } from "@/components";
import { WineryStatInterface } from "@/typings/components";
import { Icon } from "@iconify/react";

export interface WineryStatProps {
  data: WineryStatInterface;
}

export const WineryStat = ({ data }: WineryStatProps) => {
  return (
    <Container
      intent="flexColBetween"
      className="bg-surface rounded-md shadow-sm p-[16px] min-w-[212px] max-w-[212px] h-full"
      gap="medium"
    >
      <Container intent="flexColLeft" gap="xsmall" className="h-full">
        <Container intent="flexRowLeft">
          {data.value === " Ha" ? (
            <Text intent="h2">0</Text>
          ) : (
            <Text intent="h2">{data.value}</Text>
          )}
        </Container>
        <Container
          intent="flexRowLeft"
          gap="xsmall"
          className="min-h-[44px] max-h-[44px]"
        >
          <Icon
            icon={data.icon}
            className="min-w-[20px] min-h-[20px] text-primary-light"
          />
          <Text intent="h6" variant="dim" className="font-semibold">
            {data.title}
          </Text>
        </Container>
      </Container>
      {/* <Container intent="flexRowLeft" gap="xsmall" className="h-full">
        <Icon
          icon="material-symbols:update"
          color="#cccccc"
          className="min-w-[16px] min-h-[16px] mt-[-8px]"
        />
        <Text intent="p2" variant="dim">
          Updated
        </Text>
        <Text intent="p2" variant="dim" className="truncate">
          {data.updatedAt}
        </Text>
      </Container> */}
    </Container>
  );
};
