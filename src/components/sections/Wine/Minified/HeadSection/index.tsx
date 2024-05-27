"use client";
import { Button, Container, Text } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { MinifiedWine, Wine } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { Icon } from "@iconify/react";

export interface WineHeadSectionProps {
  wine: MinifiedWine;
}

export const WineHeadSection = ({ wine }: WineHeadSectionProps) => {
  const { responsiveSize } = useResponsive();

  return (
    <Container
      intent={"flexColCenter"}
      gap="xsmall"
      py="medium"
      px={responsiveSize === "mobile" ? "medium" : "none"}
      className={classNames(
        "min-w-full",
        responsiveSize === "mobile" &&
          "rounded-t-[24px] mt-[-68px] bg-surface z-10",
        responsiveSize === "desktop" && "bg-surface"
      )}
    >
      <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
        <Text intent="h6" variant="dim" className="">
          {wine?.wineryName}
        </Text>
        <Button intent="unstyled" disabled={true}>
          <Icon
            icon="pepicons-pop:open"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
        </Button>
      </Container>
      <Text intent="h3" variant="dim" className="">
        {wine?.wineCollectionName}
      </Text>
      <Container intent={"flexRowCenter"} gap="medium" className="flex-wrap">
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="material-symbols:wine-bar"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="p1" variant="dim" className="font-semibold">
            {wine?.wineType}
          </Text>
        </Container>
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="material-symbols:humidity-percentage"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="p1" variant="dim" className="font-semibold">
            Alc. {wine?.alcoholLevel} % vol
          </Text>
        </Container>
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="ph:flag-bold"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="p1" variant="dim" className="font-semibold">
            {wine?.country}
          </Text>
        </Container>
      </Container>
    </Container>
  );
};
