"use client";

import { Container, EuLabelItem, Text } from "@/components/";
import { kcal, kj } from "@/utils/nutritionCalculator";
import { Icon } from "@iconify/react";

export interface NutritionTableProps {
  items: {
    alcoholLevel: string;
    sugars: string;
    bottleSize: string;
  };
}

export const NutritionTable = ({ items }: NutritionTableProps) => {
  return (
    <Container
      intent="flexColCenter"
      px="medium"
      py="medium"
      className="w-full"
    >
      <Container
        intent="flexColLeft"
        px="small"
        py="small"
        gap="xsmall"
        className="bg-surface-dark/30 w-full rounded-md border-[1.5px] border-on-surface-dark/40"
      >
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Container intent="flexRowCenter" gap="xsmall" className="w-full">
            <Icon
              icon="mdi:nutrition"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Nutrition Facts
            </Text>
          </Container>
          <Container intent="flexColLeft">
            <Container intent="flexRowBetween" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                Serving Size
              </Text>
              <Text intent="p1" variant="dim">
                100ml (3.52 fl oz)
              </Text>
            </Container>
            <Container intent="flexRowBetween" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                Servings Per Container
              </Text>
              <Text intent="p1" variant="dim">
                {parseFloat(items.bottleSize) / 100}
              </Text>
            </Container>
          </Container>
        </Container>
        <div className="h-[2.5px] w-full bg-on-surface-dark/40" />

        <Container
          intent="flexRowRight"
          className="w-full border-b-[1.5px] border-b-on-surface-dark/40"
        >
          <Text intent="p2" variant="dim" className="font-bold">
            Amount per serving
          </Text>
        </Container>

        <Container intent="flexColCenter" gap="small" className="w-full">
          <Container
            intent="flexRowBetween"
            className="w-full border-b-[1.5px] border-b-on-surface-dark/40"
          >
            <Text intent="p1" variant="dim" className="font-bold">
              Alcohol volume
            </Text>
            <Text intent="p1" variant="dim">
              {items.alcoholLevel + " %"}
            </Text>
          </Container>
          <Container
            intent="flexRowBetween"
            className="w-full border-b-[1.5px] border-b-on-surface-dark/40"
          >
            <Text intent="p1" variant="dim" className="font-bold">
              Calories (kcal)
            </Text>
            <Text intent="p1" variant="dim">
              {kcal(items.alcoholLevel, items.sugars).toString()}
            </Text>
          </Container>
          <Container
            intent="flexRowBetween"
            className="w-full border-b-[1.5px] border-b-on-surface-dark/40"
          >
            <Text intent="p1" variant="dim" className="font-bold">
              Energy (kj)
            </Text>
            <Text intent="p1" variant="dim">
              {kj(items.alcoholLevel, items.sugars).toString()}
            </Text>
          </Container>
          <Container intent="flexRowBetween" className="w-full">
            <Text intent="p1" variant="dim" className="font-bold">
              Sugars (g)
            </Text>
            <Text intent="p1" variant="dim">
              {items.sugars}
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
