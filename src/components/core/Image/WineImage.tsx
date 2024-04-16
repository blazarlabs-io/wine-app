"use client";

import { useResponsive } from "@/hooks/useResponsive";
import Image from "next/image";
import { useState } from "react";
import { SpinnerLoader } from "../Loader/SpinnerLoader";

export interface WineImageProps {
  imageUrl: string;
}

export const WineImage = ({ imageUrl }: WineImageProps) => {
  const { responsiveSize } = useResponsive();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
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
            blurDataURL="/wine-blur.png"
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
            {!imageLoaded && (
              <div className="flex items-center justify-center w-[400px] h-[400px] bg-surface-light rounded-lg">
                <SpinnerLoader width="48px" height="48px" color="#ddd" />
              </div>
            )}
            <Image
              src={imageUrl || "/wine-placeholder.png"}
              alt=""
              fill={true}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              onLoad={(e) => {
                setImageLoaded(true);
              }}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};
