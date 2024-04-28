"use client";

import { Container, Text, Button } from "@/components";
import { euLabelUrlComposer } from "@/utils/euLabelUrlComposer";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/useResponsive";
import { classNames } from "@/utils/classNames";

export interface WineCardProps {
  imageUrl: string;
  wineCollectionName: string;
  upc: string;
  wineryName: string;
  country: string;
  harvestYear: string;
  referenceNumber: string;
  alcoholLevel: string;
  typeOfWine: string;
}

export const WineCard = ({
  imageUrl,
  wineCollectionName,
  upc,
  wineryName,
  country,
  referenceNumber,
  alcoholLevel,
  typeOfWine,
}: WineCardProps) => {
  const router = useRouter();
  const { responsiveSize } = useResponsive();

  return (
    <>
      <Container
        intent="flexColTop"
        className={classNames(
          "w-full bg-surface-light rounded-md shadow-lg transition-transform hover:scale-[103%] duration-150 ease-in-out",
          responsiveSize === "mobile" ? "max-w-[400px] " : "max-w-[340px] "
        )}
        gap="medium"
      >
        <div className="relative w-full h-[400px]">
          <Image
            src={imageUrl}
            alt="Wine bottle"
            width={200}
            height={200}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
        <Container intent="flexColTop" gap="xsmall">
          <Container
            intent={"flexColCenter"}
            gap="xsmall"
            px={responsiveSize === "mobile" ? "medium" : "none"}
            className={classNames("min-w-full, mt-[24px]")}
          >
            <Container
              intent="flexRowCenter"
              gap="xsmall"
              className="max-w-fit"
            >
              <Text intent="h6" variant="dim" className="">
                {wineryName}
              </Text>
              <Button intent="unstyled" disabled>
                <Icon
                  icon="pepicons-pop:open"
                  width="20"
                  height="20"
                  className="text-primary-light mt-[-4px]"
                />
              </Button>
            </Container>
            <Text intent="h3" variant="dim" className="">
              {wineCollectionName}
            </Text>
          </Container>
        </Container>
        <Container intent="flexColCenter" px="medium" gap="xsmall">
          <Container intent="flexRowBetween" gap="xsmall" className="w-full">
            <Container intent="flexRowLeft" gap="xsmall" className="w-full">
              <Icon
                icon="material-symbols:wine-bar"
                width={16}
                height={16}
                className="text-primary-light"
              />
              <Text intent="p1" variant="dim">
                Type of Wine
              </Text>
            </Container>
            <Container intent="flexRowRight" gap="xsmall">
              <Text className="capitalize">{typeOfWine}</Text>
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
              <Text intent="p1" variant="dim" className="">
                Country
              </Text>
            </Container>
            <Container intent="flexRowRight" className="max-w-[142px]">
              <Text className="truncate">{country}</Text>
            </Container>
          </Container>
          <Container intent="flexRowBetween" gap="xsmall" className="w-full">
            <Container intent="flexRowLeft" gap="xsmall" className="w-full">
              <Icon
                icon="material-symbols:humidity-percentage"
                width={16}
                height={16}
                className="text-primary-light"
              />
              <Text intent="p1" variant="dim">
                Alcohol Level
              </Text>
            </Container>
            <Container intent="flexRowRight">
              <Text>{alcoholLevel} % vol</Text>
            </Container>
          </Container>
        </Container>
        <Container intent="flexRowBetween" px="medium" className="mb-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="max-w-fit">
            <Container intent="flexRowLeft" gap="xsmall" className="w-full">
              <Text
                intent="p1"
                variant="dim"
                className="text-on-surface-dark/60"
              >
                UPC
              </Text>
            </Container>
            <Text intent="p1" variant="dim" className="text-on-surface-dark/60">
              {upc}
            </Text>
          </Container>
          <Button
            intent="unstyled"
            size="small"
            onClick={() => {
              router.push(euLabelUrlComposer(referenceNumber));
            }}
            className="border border-primary-light text-primary-light hover:border-primary hover:text-primary transition-all duration-300 ease-in-out rounded-md px-2 py-1"
          >
            View Details
          </Button>
        </Container>
      </Container>
    </>
  );
};
