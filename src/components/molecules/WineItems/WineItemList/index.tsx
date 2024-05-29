"use client";

import { Container, Text } from "@/components";
import { classNames } from "@/utils/classNames";

export interface WineItemProps {
  title: string;
  list: string[];
  onEmpty?: string;
  centered?: boolean;
  variant?: "normal" | "surface";
}

export const WineItemList = ({
  title,
  list,
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
      {!list || list === undefined || list.length === 0 ? (
        <Text variant="dim">{onEmpty ? onEmpty : "No"}</Text>
      ) : (
        <Container intent="flexColLeft" gap="xsmall">
          {list.map((item, index) => (
            <div key={index}>
              <Text variant="dim">{item}</Text>
            </div>
          ))}
        </Container>
      )}
    </Container>
  );
};
