"use client";

import { Container } from "@/components";
import { Icon } from "@iconify/react";

export interface AuthSpinnerLoaderProps {
  width?: string;
  height?: string;
  color?: string;
}

export const SpinnerLoader = ({
  width = "16px",
  height = "16px",
  color = "#212121",
}: AuthSpinnerLoaderProps) => {
  return (
    <Container intent="flexRowCenter" className="max-w-fit">
      <Icon
        icon="eos-icons:loading"
        color={color}
        style={{ width: width, height: height }}
      />
    </Container>
  );
};
