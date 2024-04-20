"use client";

import { Icon } from "@iconify/react";

export interface InfoTooltipProps {
  text: string;
  containerWidth?: number;
  width?: number;
  className?: string;
}

export const InfoTooltip = ({
  text,
  containerWidth = 128,
  width = 128,
  className,
}: InfoTooltipProps) => {
  return (
    <div
      style={{ width: containerWidth }}
      className="group cursor-pointer relative inline-block text-center"
    >
      <Icon
        icon="material-symbols:help-outline"
        width="16"
        height="16"
        className="text-primary-light/70"
      />
      <div
        style={{ width: width }}
        className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-[1000] group-hover:opacity-100 bottom-full -left-1/2 ml-0 px-3 pointer-events-none"
      >
        {text}
      </div>
    </div>
  );
};
