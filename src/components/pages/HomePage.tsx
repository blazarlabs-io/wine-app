"use client";

import { Container } from "../core/Container";
import { HeroSection } from "../sections/Home/HeroSection";
import { useResponsive } from "@/hooks/useResponsive";

export const HomePage = () => {
  const { responsiveSize } = useResponsive();
  return (
    <Container intent="flexColTop" className="w-full h-full">
      <div
        style={{
          backgroundImage:
            responsiveSize === "mobile"
              ? "url('/bg-mobile-2.png')"
              : "url('/bg-2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left 40%",
          width: "100%",
          height: "100%",
          // maxHeight: "100vh",
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: -1,
        }}
        className=""
      />
      <HeroSection />
    </Container>
  );
};
