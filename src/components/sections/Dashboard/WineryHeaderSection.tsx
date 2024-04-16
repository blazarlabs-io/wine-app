"use client";

import { WineryStat, Container, WineryGeneralInfo, Text } from "@/components";
import { WineryStatInterface } from "@/typings/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { Icon } from "@iconify/react/dist/iconify.js";

export const WineryHeaderSection = () => {
  const { wineryGeneralInfo, allowedEuLabels, wineryEuLabels } =
    useRealtimeDb();

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
      <Container intent="flexColBetween" gap="large" className="w-full h-full">
        <Container intent="flexRowBetween" gap="medium" className="h-full">
          {wineryStats.map((stat) => (
            <div key={stat.title} className="h-full">
              <WineryStat data={stat} />
            </div>
          ))}
        </Container>
        <Container intent="flexRowBetween" gap="medium" className="h-full">
          <Container intent="flexRowLeft" gap="xsmall" className="max-w-fit">
            <div className="relative">
              <div className="absolute z-[100] top-[-16px] left-[-8px] bg-primary flex items-center justify-center rounded-full px-[6px] py-[4px]">
                <p className="text-[10px] text-on-primary leading-none">
                  {allowedEuLabels - wineryEuLabels.length}
                </p>
              </div>
              <Icon
                icon="bi:qr-code"
                className="h-[16px] w-[16px] mt-[-4px] text-on-surface z-[-10]"
              />
            </div>
            <Text intent="p2" variant="dim" className="font-semibold">
              {`${allowedEuLabels - wineryEuLabels.length} EU labels left`}
            </Text>
          </Container>
          <Container intent="flexRowRight" gap="small" className="max-w-fit">
            <Container intent="flexRowLeft" gap="xsmall" className="max-w-fit">
              <Icon
                icon="material-symbols:update"
                color="#cccccc"
                className="min-w-[16px] min-h-[16px] mt-[-2px]"
              />
              <Text intent="p2" variant="normal" className="font-semibold">
                Last Updated
              </Text>
            </Container>
            <Text intent="p2" variant="normal" className="truncate">
              {wineryGeneralInfo && wineryGeneralInfo.lastUpdated}
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
