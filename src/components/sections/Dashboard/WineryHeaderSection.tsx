"use client";

import { WineryStat, Container, WineryGeneralInfo } from "@/components";
import { WineryStatInterface } from "@/typings/components";
import { useWinery } from "@/context/wineryContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const WineryHeaderSection = () => {
  const { wineryGeneralInfo } = useRealtimeDb();

  const wineryStats: WineryStatInterface[] = [
    {
      title: "Wine Collections",
      value: (wineryGeneralInfo && wineryGeneralInfo.collections) || "0",
      icon: "fluent:drink-wine-24-regular",
      updatedAt: (wineryGeneralInfo && wineryGeneralInfo.lastUpdated) || "",
    },
    {
      title: "Vineyards Surface",
      value:
        (wineryGeneralInfo && wineryGeneralInfo.vineyardsSurface) + " Ha" ||
        "0 Ha",
      icon: "material-symbols:landscape-outline",
      updatedAt: (wineryGeneralInfo && wineryGeneralInfo.lastUpdated) || "",
    },
    {
      title: "Grape Varieties",
      value: (wineryGeneralInfo && wineryGeneralInfo.grapeVarieties) || "0",
      icon: "fluent-emoji-high-contrast:grapes",
      updatedAt: (wineryGeneralInfo && wineryGeneralInfo.lastUpdated) || "",
    },
  ];

  return (
    <Container
      intent="flexRowBetween"
      py="large"
      px="xlarge"
      gap="large"
      className="bg-[#3F2929] min-w-full min-h-[320px] max-h-[320px]"
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
