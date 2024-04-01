import { classNames } from "@/utils/classNames";

export interface WineryLogoProps {
  url: string;
  width: number;
  height: number;
  className?: string;
}

export const WineryLogo = ({
  url,
  width,
  height,
  className,
}: WineryLogoProps) => {
  return (
    <div
      style={{
        backgroundImage: `url('${url}')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: width,
        height: height,
        minWidth: "fit-content",
      }}
      className={className}
    />
  );
};
