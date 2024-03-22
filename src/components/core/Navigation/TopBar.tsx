"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Button } from "../Button";
import { classNames } from "@/utils/classNames";
import { useLogin } from "@/context/loginContext";

export interface TopBarProps {
  className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
  const { updateShowLogin } = useLogin();

  return (
    <Container
      px="large"
      py="small"
      intent="flexRowBetween"
      className={classNames(className, "bg-surface/80", "backdrop-blur-sm")}
    >
      <Container intent="flexRowLeft" className="w-full">
        <Image src="/logo-by-eehub.svg" alt="Logo" width={224} height={56} />
      </Container>
      <Container intent="flexRowCenter" gap="large" className="">
        <button className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out">
          Explore
        </button>
        <button className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out">
          About
        </button>
        <button className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out">
          Contacts
        </button>
      </Container>
      <Container intent="flexRowRight" gap="medium">
        <Button
          onClick={() => {
            updateShowLogin(true);
          }}
          intent="text"
          size="medium"
        >
          Log in as winery owner
        </Button>
      </Container>
    </Container>
  );
};
