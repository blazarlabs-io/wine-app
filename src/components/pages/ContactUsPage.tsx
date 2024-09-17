"use client";

import { Container, Text } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";

export const ContactUsPage = () => {
  const { responsiveSize } = useResponsive();
  return (
    <Container intent="flexColTop" py="large" gap="medium">
      <Text intent="h3">Contact Us</Text>
      <Container
        intent={responsiveSize === "mobile" ? "flexColTop" : "flexRowLeft"}
        gap="medium"
        className="max-h-[320px] max-w-fit"
      >
        <Image
          src="/contact-us.jpg"
          alt=""
          width={300}
          height={300}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 99999,
            border: "2px solid #D68287",
          }}
        />

        <Container
          intent="flexColLeft"
          px="large"
          py="large"
          gap="medium"
          className=""
        >
          <Container intent="flexColLeft" gap="small">
            <Text intent="h5" variant="dim" className="font-semibold">
              E-mail
            </Text>
            <Text variant="accent" className="font-semibold">
              wines@blazarlabs.io
            </Text>
          </Container>
          <Container intent="flexColLeft" gap="small">
            <Text intent="h5" variant="dim" className="font-semibold">
              Or call us
            </Text>
            <Container intent="flexRowLeft" gap="small">
              <Text variant="accent" className="font-semibold">
                +447763931433
              </Text>
              <Text variant="accent" className="font-semibold">
                +373 790 90 091
              </Text>
            </Container>
          </Container>
          <Container intent="flexRowLeft" py="small" gap="small">
            <Link href="https://x.com/BlazarLabs" target="_blank" className="">
              <Image
                src="/twitter.svg"
                width={32}
                height={32}
                alt=""
                className="hover:animated-bounce"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/blazarlabs"
              target="_blank"
              className=""
            >
              <Image
                src="/linkedin.svg"
                width={32}
                height={32}
                alt=""
                className="hover:animated-bounce"
              />
            </Link>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
