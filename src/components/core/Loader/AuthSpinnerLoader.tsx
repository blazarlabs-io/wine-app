"use client";

import { Container } from "@/components";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/authContext";

export const AuthSpinnerLoader = () => {
  const { authLoading: isAuthLoading } = useAuth();
  return (
    <>
      {isAuthLoading && (
        <div className="fixed top-0 left-0 z-[999] w-full h-full bg-surface/80 flex justify-center items-center backdrop-blur-sm">
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
