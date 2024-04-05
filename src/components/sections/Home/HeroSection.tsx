"use client";

import { Container, Text, Button } from "@/components";
import { classNames } from "@/utils/classNames";
import { useRouter } from "next/navigation";

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection = ({ className }: HeroSectionProps) => {
  const router = useRouter();

  return (
    <Container
      px="3xlarge"
      py="large"
      intent="flexColLeft"
      gap="medium"
      className={classNames(className, "h-full mt-[112px]")}
    >
      <Container intent="flexColLeft" gap="small" className="max-w-[440px]">
        <Text intent="h1" className="font-bold kaushan">
          The <span className="text-primary">Wine Portal</span> delivered by EE
          Cardano HUB
        </Text>
        <Text intent="p1" variant="dim">
          QR code supply chain tracking, for transparency, connection and EU
          Regulations
        </Text>
      </Container>
      <Container intent="flexRowLeft">
        <Button
          intent="primary"
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
