import type { ContainerProps } from "@/components/core/Container";

export type GridResponsivenessInterface = string & ContainerProps["intent"];

export const handleGridResponsiveness = (
  size: string
): GridResponsivenessInterface => {
  switch (size) {
    case "mobile":
      return "grid-1";
    case "tablet":
      return "grid-2";
    case "laptop":
      return "grid-3";
    case "desktop":
      return "grid-4";
    default:
      return "grid-2";
  }
};
