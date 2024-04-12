"use client";
import { Button, Container, Text } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { ContainrIntentType } from "@/typings/components";
import { EuLabelInterface } from "@/typings/winery";
import { Icon } from "@iconify/react";
import { set } from "firebase/database";
import { useEffect, useState } from "react";

export interface WineHeadSectionProps {
  euLabel: EuLabelInterface;
}

export const WineHeadSection = ({ euLabel }: WineHeadSectionProps) => {
  const { responsiveSize } = useResponsive();

  return (
    <Container
      intent={responsiveSize === "mobile" ? "flexColCenter" : "flexColLeft"}
      gap="xsmall"
      py="medium"
      px="medium"
      className=""
    >
      <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
        <Text intent="h6" variant="dim" className="">
          {euLabel?.wineryName}
        </Text>
        <Button intent="unstyled">
          <Icon
            icon="pepicons-pop:open"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
        </Button>
      </Container>
      <Text intent="h3" variant="dim" className="">
        {euLabel?.wineCollectionName}
      </Text>
      <Container
        intent={responsiveSize === "mobile" ? "flexRowCenter" : "flexRowLeft"}
        gap="medium"
        className="flex-wrap"
      >
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="material-symbols:wine-bar"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="p1" variant="dim" className="">
            {euLabel?.typeOfWine}
          </Text>
        </Container>
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="material-symbols:humidity-percentage"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="p1" variant="dim" className="">
            Alc. {euLabel?.alcoholLevel} % vol
          </Text>
        </Container>
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="ph:flag-bold"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="p1" variant="dim" className="">
            {euLabel?.country}
          </Text>
        </Container>
      </Container>
    </Container>
  );
};
