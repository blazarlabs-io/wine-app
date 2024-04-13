"use client";

import { Container, Text, Button } from "@/components";
import { classNames } from "@/utils/classNames";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/useResponsive";

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection = ({ className }: HeroSectionProps) => {
  const router = useRouter();
  const { responsiveSize } = useResponsive();

  return (
    <Container
      px={responsiveSize === "mobile" ? "medium" : "3xlarge"}
      py={responsiveSize === "mobile" ? "small" : "large"}
      intent="flexColLeft"
      gap="medium"
      className={classNames(
        className,
        "h-full",
        responsiveSize === "mobile" ? "mt-[48px]" : "mt-[112px]"
      )}
    >
      <Container
        intent="flexColLeft"
        gap={responsiveSize === "mobile" ? "medium" : "small"}
        className="max-w-[440px]"
      >
        <Text
          intent={responsiveSize === "mobile" ? "h2" : "h1"}
          className="font-bold kaushan"
        >
          The <span className="text-primary">Wine Portal</span> delivered by EE
          Cardano HUB
        </Text>
        <Text
          intent={responsiveSize === "mobile" ? "h5" : "p1"}
          variant={responsiveSize === "mobile" ? "normal" : "dim"}
        >
          QR code supply chain tracking, for transparency, connection and EU
          Regulations
        </Text>
      </Container>
      <Container
        intent={responsiveSize === "mobile" ? "flexColCenter" : "flexRowLeft"}
      >
        <Button
          intent="primary"
          fullWidth={responsiveSize === "mobile"}
          size="large"
          onClick={() => router.push("/explore")}
        >
          Explore
        </Button>
        <Button
          intent="text"
          size="large"
          onClick={() => router.push("/login")}
        >
          Are you a winery owner?
        </Button>
      </Container>
    </Container>
  );
};
