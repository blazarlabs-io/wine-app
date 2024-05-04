"use client";

import Image from "next/image";
import { Text } from "@/components";
import { useEffect, useState } from "react";

export interface AvatarProps {
  src: string;
  alt: string;
  email?: string;
  className?: string;
}

export const Avatar = ({ src, alt, email, className }: AvatarProps) => {
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    if (src) return;
    if (email) {
      const _initials = email.charAt(0).toUpperCase();
      setInitials(_initials);
    }
  }, [email, src]);
  return (
    <div className="flex items-center justify-center gap-[8px]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className={`rounded-full object-cover ${className}`}
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full w-[64px] h-[64px] bg-primary-light/20 border-2 border-primary-light ${className}`}
        >
          <Text intent="h3" className="capitalize mt-[12px]">
            {initials}
          </Text>
        </div>
      )}
    </div>
  );
};
