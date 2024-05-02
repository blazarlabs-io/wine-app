"use client";

import { Container, Text, Button } from "@/components";
import { classNames } from "@/utils/classNames";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/useResponsive";
import { useAuth } from "@/context/authContext";

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection = ({ className }: HeroSectionProps) => {
  const router = useRouter();
  const { responsiveSize } = useResponsive();
  const { user } = useAuth();

  return (
    <Container
      px={responsiveSize === "mobile" ? "medium" : "3xlarge"}
      py={responsiveSize === "mobile" ? "small" : "large"}
      intent="flexColLeft"
      gap="medium"
      className={classNames(
        className,
        "h-full",
        responsiveSize === "mobile" ? "mt-[48px]" : "mt-[88px]"
      )}
    >
      <Container
        intent="flexColLeft"
        gap={responsiveSize === "mobile" ? "medium" : "small"}
        className="max-w-[520px]"
      >
        {/* <Text
          intent={responsiveSize === "mobile" ? "h2" : "h1"}
          className="font-bold kaushan"
        >
          The <span className="text-primary">Wine Portal</span> delivered by
          Blazar Labs, powered by Cardano
        </Text> */}
        <Container intent="flexColLeft" gap="xsmall">
          <Text
            intent={responsiveSize === "mobile" ? "h2" : "h1/2"}
            className="font-bold kaushan"
          >
            The <span className="text-primary">Wine Portal</span>
          </Text>
          <Text
            intent={responsiveSize === "mobile" ? "h2" : "h1/2"}
            className="font-bold kaushan"
          >
            Delivered by
          </Text>
          <Text
            intent={responsiveSize === "mobile" ? "h2" : "h1/2"}
            className="font-bold kaushan"
          >
            Blazar Labs,
          </Text>
          <Text
            intent={responsiveSize === "mobile" ? "h2" : "h1/2"}
            className="font-bold kaushan"
          >
            Powered by Cardano
          </Text>
        </Container>
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
          Explore Wines
        </Button>
        {!user && (
          <Button
            intent="text"
            size="large"
            onClick={() => router.push("/login")}
          >
            Are you a winery owner?
          </Button>
        )}
      </Container>
    </Container>
  );
};
