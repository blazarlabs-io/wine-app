"use client";

import {
  Container,
  WineHeadSection,
  WineGeneralInformationSection,
  WineIngredientsSection,
  GeneralLoaderOverlay,
  WineFooterSection,
} from "@/components";
import { EuLabelInterface } from "@/typings/winery";
import Image from "next/image";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { classNames } from "@/utils/classNames";

export interface WinePagePropsInterface {
  euLabel: EuLabelInterface | null;
}

export const WinePage = ({ euLabel }: WinePagePropsInterface) => {
  const { responsiveSize } = useResponsive();

  useEffect(() => {
    console.log(responsiveSize);
  }, [responsiveSize]);
  return (
    <>
      {euLabel ? (
        <Container
          intent="flexColLeft"
          className="rounded-lg min-w-full min-h-full "
        >
          <Container
            intent={responsiveSize === "mobile" ? "flexColTop" : "grid-5"}
            // gap={responsiveSize === "latptop" ? "large" : "small"}
            className={classNames(
              "min-w-full z-[-2]",
              responsiveSize === "desktop" && "bg-surface-light"
            )}
          >
            <div
              style={{
                minWidth: "100%",
                minHeight: responsiveSize === "desktop" ? 300 : 400,
                position: "relative",
                zIndex: -1,
                marginTop: responsiveSize === "desktop" ? 32 : 0,
              }}
              className=""
            >
              <Image
                src={euLabel?.wineImageUrl || "/wine-placeholder.png"}
                alt=""
                fill={true}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>

            <Container
              intent="flexColTop"
              gap="medium"
              className={classNames(
                "bg-surface-light min-w-full",
                responsiveSize === "mobile" && "rounded-t-[24px] mt-[-32px]",
                responsiveSize === "desktop" &&
                  "col-span-4 min-w-full pt-[48px]"
              )}
            >
              <WineHeadSection euLabel={euLabel as EuLabelInterface} />
              <WineGeneralInformationSection
                item={euLabel as EuLabelInterface}
              />
              <WineIngredientsSection item={euLabel as EuLabelInterface} />
              <WineFooterSection euLabel={euLabel as EuLabelInterface} />
            </Container>
          </Container>
        </Container>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
