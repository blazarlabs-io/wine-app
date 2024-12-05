"use client";

import { Container } from "../core/Container";
import { HeroSection } from "../sections/Home/HeroSection";
import { useResponsive } from "@/hooks/useResponsive";
import { useModal } from "@/context/modalContext";
import { useEffect } from "react";

export const HomePage = () => {
  const { responsiveSize } = useResponsive();
  const { updateModal } = useModal();

  // useEffect(() => {
  //   updateModal({
  //     title: "Important Notice",
  //     description:
  //       "You’ve  been using our prototype Wine QR Code Solution, and we’re excited to announce that a brand-new Wine QR Generator website is coming soon! Rest assured, all QR codes—past and future—will remain fully active and functional.",
  //     show: true,
  //     action: {
  //       label: "Ok",
  //       onAction: () => {
  //         updateModal({
  //           show: false,
  //           title: "",
  //           description: "",
  //           action: {
  //             label: "",
  //             onAction: () => {},
  //           },
  //         });
  //       },
  //     },
  //   });

  // }, []);
  return (
    <Container intent="flexColTop" className="w-full h-full">
      {/* <div
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
      <HeroSection /> */}
      <div className="w-full h-screen flex items-center justify-center">
        <span className="text-on-surface">
          Great news! We have a new website. Please visit{" "}
          <a
            className="text-primary-light font-bold underline"
            href="https://tracecork.com"
          >
            Tracecork
          </a>
        </span>
      </div>
    </Container>
  );
};
