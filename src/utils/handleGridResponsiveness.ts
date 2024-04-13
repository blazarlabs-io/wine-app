import type { ContainerProps } from "@/components/core/Container";

export type GridResponsivenessInterface = string & ContainerProps["intent"];

export const handleGridResponsiveness = (
  size: string
): GridResponsivenessInterface => {
  switch (size) {
    case "mobile":
      return "flexColTop";
    case "desktop":
      return "flexRowWrap";
    default:
      return "grid-1";
  }
};
