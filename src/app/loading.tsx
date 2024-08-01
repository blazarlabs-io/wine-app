"use client";

import { Icon } from "@iconify/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-surface-darker/80 backdrop-blur-sm">
      <Icon
        icon="mingcute:loading-3-fill"
        width={40}
        height={40}
        className="animate-spin text-on-surface"
      />
    </div>
  );
}
