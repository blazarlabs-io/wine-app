"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Button } from "../Button";
import { classNames } from "@/utils/classNames";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useResponsive } from "@/hooks/useResponsive";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export interface TopBarProps {
  className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { responsiveSize } = useResponsive();

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const items = [
    <button
      onClick={() => router.push("/home")}
      className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out"
    >
      Home
    </button>,
    <button
      onClick={() => router.push("/explore")}
      className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out"
    >
      Explore
    </button>,
    <button className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out">
      About
    </button>,
    <button className="max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out">
      Contacts
    </button>,
  ];

  const handleLogOut = async () => {
    signOut(auth)
      .then(async () => {
        redirect("/");
      })
      .catch((error) => {});
  };

  return (
    <>
      {responsiveSize === "mobile" ? (
        <>
          <MobileMenu
            show={showMobileMenu}
            items={items}
            onClose={() => {
              setShowMobileMenu(false);
            }}
          />
          <Container
            intent="flexRowBetween"
            px="small"
            py="small"
            className={classNames(
              className,
              "bg-surface-light/70",
              "backdrop-blur-sm min-w-full sticky top-0 z-50"
            )}
          >
            <Container intent="flexRowLeft" className="w-full">
              <Image
                src="/logo-by-eehub.svg"
                alt="Logo"
                width={164}
                height={56}
              />
            </Container>
            <Container intent="flexRowRight" className="w-full">
              <Button
                onClick={() => {
                  setShowMobileMenu(true);
                }}
                intent="text"
              >
                <Icon
                  icon="iconamoon:menu-burger-horizontal-bold"
                  width="32"
                  height="32"
                  className="text-on-surface"
                />
              </Button>
            </Container>
          </Container>
        </>
      ) : (
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
            <Image
              src="/logo-by-eehub.svg"
              alt="Logo"
              width={224}
              height={56}
            />
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
      )}
    </>
  );
};

export interface MobileMenuProps {
  show: boolean;
  items: any[];
  onClose: () => void;
}

export const MobileMenu = ({ show, items, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed w-screen z-[9999] h-screen bg-surface-light debug-red overflow-hidden touch-none"
        >
          <Container
            intent="flexColCenter"
            className="max-w-screen h-screen relative debug-blue"
          >
            <Button
              onClick={() => {
                onClose();
              }}
              intent="text"
              className="absolute top-4 right-4"
            >
              <Icon
                icon="material-symbols:close"
                width="32"
                height="32"
                className="text-on-surface"
              />
            </Button>
            {items.map((item, index) => (
              <div key={index} className="debug-green">
                {item}
              </div>
            ))}
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
