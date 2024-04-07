"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Button } from "../Button";
import { classNames } from "@/utils/classNames";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export interface TopBarProps {
  className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogOut = async () => {
    signOut(auth)
      .then(async () => {
        redirect("/");
      })
      .catch((error) => {});
  };

  return (
    <Container
      px="large"
      py="small"
      intent="flexRowBetween"
      className={classNames(
        className,
        "bg-surface-light/70",
        "backdrop-blur-sm min-w-full sticky top-0 z-50"
      )}
    >
      <Container intent="flexRowLeft" className="w-full">
        <Image src="/logo-by-eehub.svg" alt="Logo" width={224} height={56} />
      </Container>
      <Container intent="flexRowCenter" gap="large" className="">
        <button
          onClick={() => router.push("/home")}
          className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/explore")}
          className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out"
        >
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
            if (!user) {
              router.push("/login");
            } else {
              handleLogOut();
            }
          }}
          intent="text"
        >
          {!user ? "Log in as winery owner" : "Log out"}
        </Button>
      </Container>
    </Container>
  );
};
