"use client";

import { Button, Container, Text } from "@/components";
import { AvailableLevels } from "@/typings/systemVariables";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export interface PricingCardProps {
  data: AvailableLevels;
  maxPrice: number;
}

export const PricingCard = ({ data, maxPrice }: PricingCardProps) => {
  const [price, setPrice] = useState<string>("");
  const [allowedLabels, setAllowedLabels] = useState<string>("");

  useEffect(() => {
    if (data.price === 0) {
      setAllowedLabels("2 Free QR Codes");
      setPrice("Free");
    } else if (data.price > 0 && data.price < maxPrice) {
      setAllowedLabels(data.euLabels + " QR Codes");
      setPrice("$" + data.price.toLocaleString("en-US"));
    } else if (data.price === maxPrice) {
      setAllowedLabels("Unlimited QR Codes");
      setPrice("$" + data.price.toLocaleString("en-US"));
    }
  }, [data]);
  return (
    <>
      <Container
        intent="flexColTop"
        px="medium"
        py="large"
        className="bg-surface-light rounded-lg max-h-[300px]"
      >
        <Container intent="flexColCenter" className="">
          <Container intent="flexRowCenter" gap="xsmall">
            <Icon
              icon="mage:gem-stone"
              width="20"
              height="20"
              className="text-secondary mt-[-4px]"
            />
            <Text intent="h5" variant="dim" className="">
              {data.name.toLocaleUpperCase()}
            </Text>
          </Container>
          <Text intent="h2" className="font-semibold">
            {price}
          </Text>
        </Container>
        <div className="w-full h-[2px] bg-on-surface-dark/30" />
        <Container
          intent="flexColLeft"
          gap="large"
          px="medium"
          py="medium"
          className="mt-[24px] bg-surface-dark rounded-lg"
        >
          <Container
            intent="flexRowCenter"
            gap="xsmall"
            className="flex items-center justify-center w-full"
          >
            {/* <div className="min-w-[8px] min-h-[8px] max-w-[8px] max-h-[8px] mt-[8px] rounded-full bg-primary-light" /> */}
            <Text
              intent="h5"
              variant="dim"
              className="text-center font-semibold"
            >
              {allowedLabels}
            </Text>
          </Container>
          {/* <ul className="space-y-[12px]">
            <Container
              intent="unstyled"
              gap="xsmall"
              className="flex items-start"
            >
              <div className="min-w-[8px] min-h-[8px] max-w-[8px] max-h-[8px] mt-[8px] rounded-full bg-primary-light" />
              <li className="text-on-surface">
                Access to Wines Administration Dashboard
              </li>
            </Container>
            <Container
              intent="unstyled"
              gap="xsmall"
              className="flex items-start"
            >
              <div className="min-w-[8px] min-h-[8px] max-w-[8px] max-h-[8px] mt-[8px] rounded-full bg-primary-light" />
              <li className="text-on-surface">Wineyards location mapping</li>
            </Container>
            <Container
              intent="unstyled"
              gap="xsmall"
              className="flex items-start"
            >
              <div className="min-w-[8px] min-h-[8px] max-w-[8px] max-h-[8px] mt-[8px] rounded-full bg-primary-light" />
              <li className="text-on-surface">{allowedLabels}</li>
            </Container>
          </ul> */}
          {/* <Container intent="flexRowCenter" gap="small">
          <Button
            intent="primary"
            size="medium"
            className="pricing-card__button"
          >
            Select Package
          </Button>
        </Container> */}
        </Container>
      </Container>
    </>
  );
};
