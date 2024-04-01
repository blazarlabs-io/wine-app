"use client";

import { WineryStat, Container, WineryGeneralInfo } from "@/components";
import { WineryStatInterface } from "@/typings/components";
import { useWinery } from "@/context/wineryContext";

export const WineryHeaderSection = () => {
  const { generalInfo } = useWinery();

  const wineryStats: WineryStatInterface[] = [
    {
      title: "Wine Collections",
      value: (generalInfo && generalInfo.collections) || "0",
      icon: "fluent:drink-wine-24-regular",
      updatedAt: (generalInfo && generalInfo.lastUpdated) || "",
    },
    {
      title: "Vineyards Surface",
      value: (generalInfo && generalInfo.vineyardsSurface) || "0",
      icon: "material-symbols:landscape-outline",
      updatedAt: (generalInfo && generalInfo.lastUpdated) || "",
    },
    {
      title: "Grape Varieties",
      value: (generalInfo && generalInfo.grapeVarieties) || "0",
      icon: "fluent-emoji-high-contrast:grapes",
      updatedAt: (generalInfo && generalInfo.lastUpdated) || "",
    },
  ];

  return (
    <Container
      intent="flexRowBetween"
      py="large"
      px="xlarge"
      gap="large"
      className="bg-[#3F2929] w-full min-h-[320px] max-h-[320px]"
    >
      <WineryGeneralInfo />
      <Container intent="flexRowBetween" gap="medium" className="h-full">
        {wineryStats.map((stat) => (
          <div key={stat.title} className="h-full">
            <WineryStat data={stat} />
          </div>
        ))}
      </Container>
    </Container>
  );
};
