"use client";

import Image from "next/image";
import { Container, Text } from "@/components";
import { useEffect, useState } from "react";
import { MenuItemsInterface } from "@/typings/components";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export interface AvatarMenuProps {
  src: string;
  alt: string;
  email?: string;
  className?: string;
  userMenuItems?: MenuItemsInterface;
}

export const AvatarMenu = ({
  src,
  alt,
  email,
  userMenuItems,
  className,
}: AvatarMenuProps) => {
  const router = useRouter();
  const [initials, setInitials] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [menuIcon, setMenuIcon] = useState<string>("bx:chevron-down");

  useEffect(() => {
    if (src) return;
    if (email) {
      const _initials = email.charAt(0).toUpperCase();
      setInitials(_initials);
    }
  }, [email, src]);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setShow(!show);
          setMenuIcon(show ? "bx:chevron-down" : "bx:chevron-up");
        }}
        className="flex items-center justify-center gap-[8px]"
      >
        <Icon
          icon={menuIcon}
          width="28"
          height="28"
          className="text-on-surface-dark"
        />
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={40}
            height={40}
            className={`rounded-full w-12 h-12 object-cover ${className}`}
          />
        ) : (
          <div
            className={`flex items-center justify-center rounded-full w-[40px] h-[40px] bg-primary-light/20 border-2 border-primary-light ${className}`}
          >
            <Text intent="h4" className="capitalize mt-[8px]">
              {initials}
            </Text>
          </div>
        )}
      </button>
      {userMenuItems && show && (
        <div
          onMouseLeave={() => {
            setShow(false);
            setMenuIcon("bx:chevron-down");
          }}
          className="flex flex-col items-start justify-start gap-[12px] absolute top-[40px] right-0 max-w-fit bg-surface-light shadow-lg rounded-lg p-4 z-50"
        >
          {userMenuItems?.map((item) => (
            <div key="item.key">
              <Container intent="flexRowCenter" gap="small">
                <button
                  onClick={() => {
                    if (!item.onClick) {
                      router.push(item.href);
                    } else {
                      item.onClick();
                    }
                  }}
                  className="flex items-center justify-center gap-[12px] text-on-surface hover:text-primary-light transition-all duration-300 ease-in-out"
                >
                  <Icon
                    icon={item.icon}
                    width="20"
                    height="20"
                    className="mt-[-4px]"
                  />
                  <span>{item.label}</span>
                </button>
              </Container>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
