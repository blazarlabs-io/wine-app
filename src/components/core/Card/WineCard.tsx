"use client";

import { Container, Text, Button } from "@/components";
import { Icon } from "@iconify/react";
import Image from "next/image";

export interface WineCardProps {
  imageUrl: string;
  wineName: string;
  upc: string;
  wineryName: string;
  country: string;
  harvestYear: string;
}

export const WineCard = ({
  imageUrl,
  wineName,
  upc,
  wineryName,
  country,
  harvestYear,
}: WineCardProps) => {
  return (
    <Container
      intent="flexColTop"
      px="medium"
      py="small"
      className="w-full bg-surface-light rounded-md shadow-lg transition-transform hover:scale-[103%] duration-150 ease-in-out"
      gap="medium"
    >
      <Container intent="flexColTop" gap="xsmall">
        <Image src={imageUrl} alt="Wine bottle" width={36} height={200} />
        <Container intent="flexRowCenter" className="w-full">
          <Text intent="p1" variant="normal">
            {wineName}
          </Text>
        </Container>
        <Container intent="flexRowCenter" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            GTIN (UPC)
          </Text>
          <Text intent="p1" variant="dim">
            {upc}
          </Text>
        </Container>
      </Container>
      <Container intent="flexColCenter" gap="xsmall">
        <Container intent="flexRowBetween" gap="xsmall" className="w-full">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="game-icons:cellar-barrels"
              width={16}
              height={16}
              className="text-primary-light"
            />
            <Text intent="p1" variant="dim">
              Winery
            </Text>
          </Container>
          <Container intent="flexRowRight" gap="xsmall">
            <Text>{wineryName}</Text>
            <Button intent="text">
              <Icon
                icon="radix-icons:open-in-new-window"
                width={16}
                height={16}
                className="mt-[-4px]"
              />
            </Button>
          </Container>
        </Container>
        <Container intent="flexRowBetween" gap="xsmall" className="w-full">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="ph:flag-bold"
              width={16}
              height={16}
              className="text-primary-light"
            />
            <Text intent="p1" variant="dim">
              Country
            </Text>
          </Container>
          <Container intent="flexRowRight">
            <Text>{country}</Text>
          </Container>
        </Container>
        <Container intent="flexRowBetween" gap="xsmall" className="w-full">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="mdi:calendar"
              width={16}
              height={16}
              className="text-primary-light"
            />
            <Text intent="p1" variant="dim">
              Harvest Year
            </Text>
          </Container>
          <Container intent="flexRowRight">
            <Text>{harvestYear}</Text>
          </Container>
        </Container>
      </Container>
      <Container intent="flexRowRight">
        <Button intent="text">View Details</Button>
      </Container>
    </Container>
  );
};
