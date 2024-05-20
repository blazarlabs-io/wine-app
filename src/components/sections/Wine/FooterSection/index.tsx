"use client";

import { Container, WineItem, NutritionTable } from "@/components/";
import Image from "next/image";
import { useResponsive } from "@/hooks/useResponsive";
import { Wine } from "@/typings/winery";

export interface WineFooterSectionProps {
  wine: Wine;
}

export const WineFooterSection = ({ wine }: WineFooterSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <>
          <Container
            intent="flexColCenter"
            py="xsmall"
            px="xsmall"
            gap="large"
            className="bg-surface max-w-[440px]"
          >
            <Image
              src={"/wine-moderation.png"}
              alt=""
              width="288"
              height="80"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Image
              src={wine?.generalInformation.qrCodeUrl as string}
              width={88}
              height={88}
              alt=""
            />
          </Container>
        </>
      )}
      {responsiveSize === "desktop" && (
        <>
          <Container intent="flexRowLeft" className="w-full">
            <Container
              intent="flexRowBetween"
              py="xsmall"
              gap="medium"
              className="bg-surface max-w-[400px]"
            >
              <Image
                src={wine?.generalInformation.qrCodeUrl as string}
                width={88}
                height={88}
                alt=""
              />

              <Image
                src={"/wine-moderation.png"}
                alt=""
                width="288"
                height="80"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Container>
          </Container>
        </>
      )}
    </>
  );
};
