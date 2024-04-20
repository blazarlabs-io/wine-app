"use client";

import { Container, Text } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { classNames } from "@/utils/classNames";

export interface EuLabelItemProps {
  title: string;
  value: string;
  centered?: boolean;
  variant?: "normal" | "surface";
}

export const EuLabelItem = ({
  title,
  value,
  centered = false,
  variant = "normal",
}: EuLabelItemProps) => {
  const { responsiveSize } = useResponsive();
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
      <Text variant="dim">{value.length === 0 ? "No" : value}</Text>
    </Container>
  );
};
