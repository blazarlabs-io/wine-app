"use client";

import { Container, WineItem, NutritionTable } from "@/components/";
import Image from "next/image";
import { useResponsive } from "@/hooks/useResponsive";
import { WineInterface } from "@/typings/winery";

export interface WineFooterSectionProps {
  wine: WineInterface;
}

export const WineFooterSection = ({ wine }: WineFooterSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <>
          {wine.upc.length > 0 && (
            <Container intent="flexRowCenter" px="medium" className="w-full">
              <div>
                <WineItem title="UPC" value={wine.upc} variant="surface" />
              </div>
            </Container>
          )}

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
            <Image src={wine?.qrCodeUrl} width={88} height={88} alt="" />
          </Container>
        </>
      )}
      {responsiveSize === "desktop" && (
        <>
          {wine.upc.length > 0 && (
            <Container intent="flexRowLeft" className="w-full">
              <div>
                <WineItem title="UPC" value={wine.upc} variant="surface" />
              </div>
            </Container>
          )}

          <Container intent="flexRowLeft" className="w-full">
            <Container
              intent="flexRowBetween"
              py="xsmall"
              gap="medium"
              className="bg-surface max-w-[400px]"
            >
              <Image src={wine?.qrCodeUrl} width={88} height={88} alt="" />

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
