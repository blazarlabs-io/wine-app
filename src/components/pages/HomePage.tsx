"use client";

import { Container } from "../core/Container";
import { HeroSection } from "../sections/Home/HeroSection";
import { useResponsive } from "@/hooks/useResponsive";
import { useModal } from "@/context/modalContext";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState<number>(20);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let reverseCount = timeLeft;
    if (typeof window !== "undefined") {
      interval = setInterval(() => {
        reverseCount--;
        setTimeLeft(reverseCount);
        if (reverseCount <= 0) {
          clearInterval(interval);

          window.location.href = "https://tracecork.com/";
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <Container intent="flexColTop" className="w-full h-full">
      {/* 
We’re thrilled to announce an exciting update!

https://wines.blazarlabs.io/  is moving to a new home to bring you a faster, better experience. You don’t need to do a thing—your browser will automatically redirect you to our new site in a few seconds.

Your account is secure, and no action is needed. For questions, contact it@blazarlabs.io

Thank you for your support—we can’t wait to show you around our new home Tracecork.com!

*/}

      <div className="w-full h-screen flex items-center flex-col justify-center text-on-surface max-w-[640px] gap-4">
        <span className="text-center text-2xl font-bold">
          🍷We’re thrilled to announce an exciting update!
        </span>
        <span className="text-center">
          <span className="font-semibold text-primary-light">
            https://wines.blazarlabs.io/
          </span>{" "}
          is moving to a new platform to bring you a faster, better experience.
          You don’t need to do a thing—your browser will automatically redirect
          you to our new site in{" "}
          <span className="font-semibold text-primary-light">
            {timeLeft} seconds
          </span>
          .
        </span>
        <span className="text-center">
          Your account is secure, and no action is needed. For questions,
          contact{" "}
          <a
            href="mailto:it@blazarlabs.io"
            className="font-semibold text-primary-light"
          >
            it@blazarlabs.io
          </a>
        </span>
        <span className="text-center">
          Thank you for your support—we can’t wait to show you around our new
          home{" "}
          <a
            href="https://tracecork.com/"
            className="font-semibold underline text-[#31CECE]"
          >
            Tracecork.com!
          </a>
        </span>
      </div>
    </Container>
  );
};
