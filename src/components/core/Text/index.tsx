import { cva, type VariantProps } from "class-variance-authority";

const text = cva("", {
  variants: {
    intent: {
      h1: ["text-[64px]", "font-bold"],
      h2: ["text-[48px]", "font-semibold"],
      h3: ["text-[32px]", "font-bold"],
      h4: ["text-[24px]", "font-bold"],
      h5: ["text-[20px]", "font-medium"],
      h6: ["text-[18px]", "font-medium"],
      p1: ["text-[16px]", "", "", ""],
      p2: ["text-[14px]", "", "", ""],
    },
    variant: {
      normal: ["text-on-surface"],
      accent: ["text-primary"],
      dim: ["text-on-surface/80"],
      inverted: ["text-surface"],
      error: ["text-status-error"],
      success: ["text-status-success"],
      warning: ["text-status-warning"],
      info: ["text-status-info"],
    },
  },
  compoundVariants: [{ intent: "p1", variant: "normal", class: "" }],
});

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  intent?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p1" | "p2";
  variant?:
    | "normal"
    | "accent"
    | "dim"
    | "inverted"
    | "error"
    | "success"
    | "warning"
    | "info";
}

export const Text = ({
  children,
  className,
  intent = "p1",
  variant = "normal",
}: TextProps) => {
  return (
    <span className={text({ intent, variant, className })}>{children}</span>
  );
};
