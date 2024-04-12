"use client";
import { Icon } from "@iconify/react";

export interface BounceLoaderProps {
  width?: string;
  height?: string;
  color?: string;
}

export const BounceLoader = ({
  width = "16",
  height = "16",
  color = "#fff",
}: BounceLoaderProps) => {
  return (
    <Icon
      icon="svg-spinners:3-dots-bounce"
      width={width}
      height={height}
      color={color}
    />
  );
};
