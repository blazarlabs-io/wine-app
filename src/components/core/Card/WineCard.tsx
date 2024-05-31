"use client";

import { Container, Text, Button } from "@/components";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/useResponsive";
import { classNames } from "@/utils/classNames";
import Link from "next/link";
import { wineUrlComposerRef } from "@/utils/wineUrlComposerRef";
import { tokenizedWineUrlComposerRef } from "@/utils/tokenizedWineUrlComposerRef";

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
  isTokenized?: boolean;
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
  isTokenized = false,
}: WineCardProps) => {
  const router = useRouter();
  const { responsiveSize } = useResponsive();

  return (
    <>
      <Container
        intent="flexColTop"
        className={classNames(
          "w-full bg-surface-light rounded-md shadow-lg transition-transform hover:scale-[103%] duration-150 ease-in-out max-h-[720px]",
          responsiveSize === "mobile"
            ? "min-w-[400px] max-w-[400px] "
            : "min-w-[340px] max-w-[340px] "
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
        <Container intent="flexColTop" gap="xsmall" className="relative">
          <Container
            intent={"flexColCenter"}
            gap="xsmall"
            px={responsiveSize === "mobile" ? "medium" : "medium"}
            className={classNames("min-w-full, mt-[24px]")}
          >
            {isTokenized && (
              <>
                <Icon
                  icon="formkit:cardano"
                  width="40px"
                  height="40px"
                  className="text-status-info top-0 left-[24px] absolute"
                />
                <Icon
                  icon="material-symbols-light:token-outline"
                  width="40px"
                  height="40px"
                  className="text-status-info top-0 right-[24px] absolute"
                />
              </>
            )}
            <Container
              intent="flexRowCenter"
              gap="xsmall"
              px="medium"
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
            <Text intent="h4" variant="dim" className="truncate max-w-full">
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
              <Text intent="p1" variant="dim" className="font-semibold">
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
              <Text intent="p1" variant="dim" className="font-semibold">
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
              <Text intent="p1" variant="dim" className="font-semibold">
                Alcohol Level
              </Text>
            </Container>
            <Container intent="flexRowRight">
              <Text>{alcoholLevel} % vol</Text>
            </Container>
          </Container>
        </Container>
        {isTokenized ? (
          <Container intent="flexRowBetween" px="medium" className="mb-[24px]">
            <Text variant="accent" className="text-status-info">
              This wine is tokenized
            </Text>
            <Link
              href={tokenizedWineUrlComposerRef(referenceNumber)}
              className="border border-primary-light text-primary-light hover:border-primary hover:text-primary transition-all duration-300 ease-in-out rounded-md px-2 py-1"
            >
              <Text
                variant="accent"
                className="text-primary-light hover:text-primary"
              >
                View Details
              </Text>
            </Link>
          </Container>
        ) : (
          <Container intent="flexRowRight" px="medium" className="mb-[24px]">
            <Link
              href={wineUrlComposerRef(referenceNumber)}
              className="border border-primary-light text-primary-light hover:border-primary hover:text-primary transition-all duration-300 ease-in-out rounded-md px-2 py-1"
            >
              <Text
                variant="accent"
                className="text-primary-light hover:text-primary"
              >
                View Details
              </Text>
            </Link>
          </Container>
        )}
      </Container>
    </>
  );
};
