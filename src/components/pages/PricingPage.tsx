"use client";

import { Container, Text, PricingCard, SpinnerLoader } from "@/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";

export const PricingPage = () => {
  const { availableLevels, maxPrice } = useRealtimeDb();
  const { responsiveSize } = useResponsive();
  return (
    <Container
      intent="flexColTop"
      py="large"
      gap="medium"
      className="w-full h-ful"
    >
      <Container
        intent="flexColTop"
        gap="medium"
        px="medium"
        className="max-w-[480px] h-full"
      >
        <Text intent="h3">Pricing</Text>
        <Text intent="p1" className="text-center">
          All prices are yearly. Please{" "}
          <Link href="/signup" className="text-primary-light font-semibold">
            register
          </Link>{" "}
          for an account and soon you will be contacted by our team.
        </Text>
      </Container>
      {maxPrice ? (
        <Container
          intent={responsiveSize === "mobile" ? "grid-1" : "grid-4"}
          gap="medium"
          px="medium"
          className="w-full mt-[48px]"
        >
          <>
            {availableLevels?.map((level) => (
              <div key={level.name}>
                <PricingCard data={level} maxPrice={maxPrice} />
              </div>
            ))}
          </>
        </Container>
      ) : (
        <Container intent="flexColCenter" className="w-full min-h-[400px]">
          <SpinnerLoader width="24px" height="24px" />
        </Container>
      )}
    </Container>
  );
};
