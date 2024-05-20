"use client";

import { Container, Text } from "@/components";
import { classNames } from "@/utils/classNames";

export interface WineItemProps {
  title: string;
  value: string;
  extraVal?: string;
  onEmpty?: string;
  centered?: boolean;
  variant?: "normal" | "surface";
}

export const WineItem = ({
  title,
  value,
  extraVal,
  onEmpty,
  centered = false,
  variant = "normal",
}: WineItemProps) => {
  return (
    <Container
      intent={!centered ? "flexColLeft" : "flexColTop"}
      className={classNames(
        variant === "surface" &&
          "bg-surface-dark/30 rounded-md p-[16px] w-full",
        variant === "normal" && "bg-transparent max-w-fit"
      )}
    >
      <Text intent="p1" variant="dim" className="font-semibold">
        {title}
      </Text>
      <Text variant="dim">
        {value == null || value === undefined || value.length === 0
          ? onEmpty
            ? onEmpty
            : "No"
          : value + (extraVal ? " " + extraVal : "")}
      </Text>
    </Container>
  );
};
