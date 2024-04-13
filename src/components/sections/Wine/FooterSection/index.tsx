"use client";

import { Container, EuLabelItem, NutritionTable } from "@/components/";
import Image from "next/image";
import { useResponsive } from "@/hooks/useResponsive";
import { EuLabelInterface } from "@/typings/winery";

export interface WineFooterSectionProps {
  euLabel: EuLabelInterface;
}

export const WineFooterSection = ({ euLabel }: WineFooterSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <>
          <Container intent="flexRowCenter" px="medium" className="w-full">
            <div>
              <EuLabelItem title="UPC" value={euLabel.upc} variant="surface" />
            </div>
          </Container>

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
            <Image src={euLabel?.qrCodeUrl} width={88} height={88} alt="" />
          </Container>
        </>
      )}
      {responsiveSize === "desktop" && (
        <>
          <Container intent="flexRowCenter" className="w-full">
            <div>
              <EuLabelItem title="UPC" value={euLabel.upc} variant="surface" />
            </div>
          </Container>

          <Container intent="flexRowCenter" px="medium" className="w-full">
            <Container
              intent="flexRowBetween"
              py="xsmall"
              px="xsmall"
              gap="medium"
              className="bg-surface max-w-[400px]"
            >
              <Image src={euLabel?.qrCodeUrl} width={88} height={88} alt="" />

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
