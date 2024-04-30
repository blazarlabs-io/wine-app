"use client";

import { Container } from "@/components";
import { Icon } from "@iconify/react";
import { useMasterLoader } from "@/context/masterLoaderContext";

export const MasterLoaderOverlay = () => {
  const { isMasterLoading } = useMasterLoader();
  return (
    <>
      {isMasterLoading && (
        <div className="fixed top-0 left-0 z-[3000] w-full h-full bg-surface/90 flex justify-center items-center backdrop-blur-md">
          <Container intent="flexRowCenter">
            <Icon
              icon="svg-spinners:270-ring"
              color="#ffffffbb"
              className="w-[48px] h-[48px]"
            />
          </Container>
        </div>
      )}
    </>
  );
};
