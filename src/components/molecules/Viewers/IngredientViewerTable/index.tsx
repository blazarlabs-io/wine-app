"use client";

import { Container, Text } from "@/components";
import { classNames } from "@/utils/classNames";
import { useEffect } from "react";

export interface IngredientViewerTableProps {
  title: string;
  variant?: "normal" | "surface";
  ingredient: {
    allergens: {
      has: boolean;
      list: string[];
    };
    has: boolean;
    list: string[];
  };
}

export const IngredientViewerTable = ({
  title,
  variant = "normal",
  ingredient,
}: IngredientViewerTableProps) => {
  return (
    <Container
      intent="flexColLeft"
      px="small"
      py="small"
      className={classNames(
        variant === "normal" && "bg-transparent",
        variant === "surface" && "bg-surface-dark/30 rounded-md  w-full"
      )}
      gap="small"
    >
      <Text intent="p1" variant="dim" className="font-semibold">
        {title}
      </Text>

      {ingredient && ingredient !== undefined && (
        <Container intent="flexColLeft" gap="xsmall" className="max-w-fit">
          <>
            {ingredient.allergens.has && (
              <>
                {ingredient.allergens.list.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-[8px] w-full"
                  >
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold text-primary-light/80"
                    >
                      {item}
                    </Text>
                  </div>
                ))}
              </>
            )}
            {ingredient.list.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-[8px] w-full"
              >
                <Text intent="p1" variant="dim" key={item}>
                  {item}
                </Text>
              </div>
            ))}
            {ingredient.list.length === 0 &&
              ingredient.allergens.list.length === 0 && (
                <Text intent="p1" variant="dim">
                  No
                </Text>
              )}
          </>
        </Container>
      )}
    </Container>
  );
};
