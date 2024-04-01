"use client";

import { VariantProps, cva } from "class-variance-authority";

const button = cva("button rounded-lg", {
  variants: {
    intent: {
      primary: [
        "bg-primary",
        "text-on-primary",
        "font-semibold",
        "hover:bg-primary-dark",
        "transition-all",
        "duration-300",
        "ease-in-out",
      ],
      secondary: [
        "border-[1.5px]",
        "border-primary",
        "font-semibold",
        "text-primary",
      ],
      text: [
        "text-primary-light",
        "font-semibold",
        "hover:text-primary",
        "transition-all",
        "duration-300",
        "ease-in-out",
      ],
      unstyled: [""],
    },
    size: {
      small: ["text-sm", "px-[24px]", "py-[8px]"],
      medium: [
        "text-base",
        "px-[48px]",
        "py-[12px]",
        "min-h-[48px]",
        "max-h-[48px]",
      ],
      large: ["text-lg", "px-[56px]", "py-[16px]"],
    },
    fullWidth: {
      true: ["w-full"],
    },
    disabled: {
      true: ["cursor-not-allowed", "opacity-50"],
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  intent: "primary" | "secondary" | "text" | "unstyled";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const Button = ({
  intent,
  size,
  fullWidth,
  disabled,
  type = "button",
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={button({
        intent,
        size,
        fullWidth,
        disabled,
        className: props.className,
      })}
      onClick={() => {
        onClick && onClick();
      }}
    />
  );
};
