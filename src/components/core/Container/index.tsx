import { cva, type VariantProps } from "class-variance-authority";

const container = cva("container", {
  variants: {
    intent: {
      unstyled: [""],
      flexColCenter: ["flex", "flex-col", "items-center", "justify-center"],
      flexColTop: ["flex", "flex-col", "items-center", "justify-start"],
      flexColLeft: ["flex", "flex-col", "items-start", "justify-start"],
      flexRowLeft: ["flex", "flex-row", "items-center", "justify-start"],
      flexRowRight: [
        "flex",
        "flex-row",
        "items-center",
        "justify-end",
        "w-full",
      ],
      flexRowCenter: ["flex", "flex-row", "items-center", "justify-center"],
      flexRowWrap: [
        "flex",
        "flex-row",
        "flex-wrap",
        "items-center",
        "justify-between",
        "w-full",
      ],
      flexRowBetween: [
        "flex",
        "flex-row",
        "items-center",
        "justify-between",
        "w-full",
      ],
      "grid-2": ["grid", "grid-cols-2", "w-full", "justify-center"],
      "grid-3": ["grid", "grid-cols-3", "w-full", "justify-center"],
      "grid-4": ["grid", "grid-cols-4", "w-full", "justify-center"],
      "grid-5": ["grid", "grid-cols-5", "w-full", "justify-center"],
      "grid-6": ["grid", "grid-cols-6", "w-full", "justify-center"],
      "grid-7": ["grid", "grid-cols-7", "w-full", "justify-center"],
      "grid-8": ["grid", "grid-cols-8", "w-full", "justify-center"],
    },
    px: {
      none: [""],
      xsmall: ["px-[8px]"],
      small: ["px-[16px]"],
      medium: ["px-[24px]"],
      large: ["px-[48px]"],
      xlarge: ["px-[64px]"],
      "2xlarge": ["px-[80px]"],
      "3xlarge": ["px-[136px]"],
    },
    py: {
      none: [""],
      xsmall: ["py-[8px]"],
      small: ["py-[16px]"],
      medium: ["py-[24px]"],
      large: ["py-[48px]"],
      xlarge: ["py-[64px]"],
      "2xlarge": ["py-[80px]"],
      "3xlarge": ["px-[136px]"],
    },
    gap: {
      none: [""],
      xsmall: ["gap-[8px]"],
      small: ["gap-[16px]"],
      medium: ["gap-[24px]"],
      large: ["gap-[48px]"],
      xlarge: ["gap-[72px]"],
      "2xlarge": ["gap-[96px]"],
      "3xlarge": ["px-[136px]"],
    },
  },
  compoundVariants: [{ intent: "unstyled", class: "" }],
});

export interface ContainerProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof container> {
  intent:
    | "flexColCenter"
    | "flexColTop"
    | "flexColLeft"
    | "flexRowLeft"
    | "flexRowRight"
    | "flexRowCenter"
    | "flexRowWrap"
    | "flexRowBetween"
    | "grid-2"
    | "grid-3"
    | "grid-4"
    | "grid-5"
    | "grid-6"
    | "grid-7"
    | "grid-8";

  px?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "2xlarge"
    | "3xlarge";
  py?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "2xlarge"
    | "3xlarge";
  gap?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "2xlarge"
    | "3xlarge";
  props?: any;
}
export const Container = ({
  intent,
  gap,
  px,
  py,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={container({ intent, gap, px, py, className: props.className })}
    >
      {props.children}
    </div>
  );
};
