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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        width: width,
        height: height,
      }}
      className={className}
    />
  );
};
