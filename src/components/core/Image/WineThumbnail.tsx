"use client";

import { useResponsive } from "@/hooks/useResponsive";
import Image from "next/image";
import { useState } from "react";
import { SpinnerLoader } from "../Loader/SpinnerLoader";

export interface WineImageProps {
  imageUrl: string;
  width?: number;
  height?: number;
}

export const WineThumbnail = ({
  imageUrl,
  width = 160,
  height = 160,
}: WineImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-center rounded-lg">
      <div
        style={{
          minWidth: width,
          minHeight: height,
          position: "relative",
          zIndex: 1,
          marginTop: 0,
        }}
        className="rounded-lg"
      >
        {!imageLoaded && (
          <div
            style={{
              minWidth: width,
              minHeight: height,
            }}
            className="flex items-center justify-center bg-surface-light rounded-lg"
          >
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
  );
};
