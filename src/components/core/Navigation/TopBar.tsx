"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Button } from "../Button";
import { classNames } from "@/utils/classNames";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useResponsive } from "@/hooks/useResponsive";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AvatarMenu } from "@/components";
import { MenuItemsInterface } from "@/typings/components";

export interface TopBarProps {
  className?: string;
}

export interface MenuItemInterface {
  label: string;
  key: string;
  onClick: () => void;
  disabled: boolean;
}

export const TopBar = ({ className }: TopBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { responsiveSize } = useResponsive();

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const menuItems: MenuItemInterface[] = [
    {
      label: "Home",
      key: "home",
      onClick: () => router.push("/"),
      disabled: false,
    },
    {
      label: "Explore",
      key: "explore",
      onClick: () => router.push("/explore"),
      disabled: false,
    },
    {
      label: "Pricing",
      key: "pricing",
      onClick: () => router.push("/pricing"),
      disabled: false,
    },
    {
      label: "About Us",
      key: "about",
      onClick: () => router.push("/about-us"),
      disabled: false,
    },
    {
      label: "Contact Us",
      key: "contact-us",
      onClick: () => router.push("/contact-us"),
      disabled: false,
    },
  ];

  const userMenu: MenuItemsInterface = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "ant-design:dashboard-outlined",
      href: "/home",
      disabled: false,
    },
    {
      key: "account",
      label: "Account",
      icon: "lucide:user-round",
      href: "/account",
      disabled: false,
    },
    {
      key: "logout",
      label: "Logout",
      href: "/",
      icon: "ri:logout-box-line",
      onClick: () => {
        signOut(auth)
          .then(async () => {
            redirect("/");
          })
          .catch((error) => {});
      },
      disabled: false,
    },
  ];

  return (
    <>
      {responsiveSize === "mobile" ? (
        <>
          <MobileMenuOverlay
            show={showMobileMenu}
            items={menuItems}
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
              <button
                onClick={() => router.replace("/")}
                className="cursor-pointer"
              >
                <Image
                  src="/logo-by-blazarlabs.png"
                  alt="Logo"
                  width={200}
                  height={56}
                />
              </button>
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
            <button
              onClick={() => router.replace("/")}
              className="cursor-pointer"
            >
              <Image src="/wines-logo.png" alt="Logo" width={240} height={56} />
            </button>
          </Container>
          <Container intent="flexRowCenter" gap="large" className="">
            {menuItems.map((item: MenuItemInterface) => (
              <button
                key={item.key}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick();
                }}
                className="min-w-fit disabled:text-status-disabled disabled:cursor-not-allowed max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out"
              >
                {item.label}
              </button>
            ))}
          </Container>
          <Container intent="flexRowRight" gap="medium">
            <>
              {user ? (
                <AvatarMenu
                  src={user?.photoURL as string}
                  alt="User Avatar"
                  email={user?.email as string}
                  userMenuItems={userMenu}
                />
              ) : (
                <LoginButton />
              )}
            </>
          </Container>
        </Container>
      )}
    </>
  );
};

export interface MobileMenuProps {
  show: boolean;
  items: MenuItemInterface[];
  onClose: () => void;
}

export const MobileMenuOverlay = ({
  show,
  items,
  onClose,
}: MobileMenuProps) => {
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed w-screen z-[9999] h-screen bg-surface-light overflow-hidden touch-none"
        >
          <Container
            intent="flexColCenter"
            gap="medium"
            className="max-w-screen h-screen relative"
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
            {items.map((item: MenuItemInterface) => (
              <button
                key={item.key}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick();
                  onClose();
                }}
                className="disabled:text-status-disabled disabled:cursor-not-allowed text-2xl max-w-fit p-[0px] text-on-surface font-normal hover:text-primary-light transition-all duration-300 ease-in-out"
              >
                {item.label}
              </button>
            ))}

            {/* <LoginButton /> */}
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LoginButton = () => {
  const router = useRouter();
  const { responsiveSize } = useResponsive();

  return (
    <Button
      onClick={() => {
        router.push("/login");
      }}
      intent="text"
      className={classNames(
        responsiveSize === "mobile" ? "text-2xl font-normal" : "text-base"
      )}
    >
      Login as Winery Owner
    </Button>
  );
};
