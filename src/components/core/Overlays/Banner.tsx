"use client";

import { Container, Text } from "@/components";
import { useBanner } from "@/context/bannerContext";

export const Banner = () => {
  const { show, text } = useBanner();
  return (
    <>
      {show && (
        <div className="flex items-center justify-center w-full fixed top-0 left-0 z-[999] bg-status-success/90 backdrop-blur-sm">
          <Container
            intent="flexRowCenter"
            py="xsmall"
            className="flex items-center justify-center p-2"
          >
            <Text intent="p1" variant="inverted" className="">
              {text}
            </Text>
          </Container>
        </div>
      )}
    </>
  );
};
