"use client";

import { useResponsive } from "@/hooks/useResponsive";
import Image from "next/image";

export interface WineImageProps {
  imageUrl: string;
}

export const WineImage = ({ imageUrl }: WineImageProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div
          style={{
            minWidth: "100vw",
            minHeight: 400,
            position: "relative",
            zIndex: -1,
            marginTop: 0,
          }}
          className=""
        >
          <Image
            src={imageUrl || "/wine-placeholder.png"}
            alt=""
            fill={true}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="w-full flex items-center justify-center mt-[48px] rounded-lg">
          <div
            style={{
              minWidth: 400,
              minHeight: 400,
              position: "relative",
              zIndex: 1,
              marginTop: 0,
            }}
            className="rounded-lg"
          >
            <Image
              src={imageUrl || "/wine-placeholder.png"}
              alt=""
              fill={true}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};
