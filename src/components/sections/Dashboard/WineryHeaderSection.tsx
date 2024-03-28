"use client";

import {
  WineryStat,
  Container,
  Button,
  Text,
  WineryLogo,
  WineryGeneralInfo,
} from "@/components";
import { WineryStatInterface } from "@/typings/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWinery } from "@/context/wineryContext";

export const WineryHeaderSection = () => {
  const {
    generalInfo,
    updateFormTitle,
    updateFormDescription,
    updateShowRegisterWinery,
  } = useWinery();

  const wineryStats: WineryStatInterface[] = [
    {
      title: "Number of Produced Wines",
      value: (generalInfo && generalInfo.noOfProducedWines) || "0",
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
      title: "Number of Bottles Produced Last Year",
      value: (generalInfo && generalInfo.noOfBottlesProducedPerYear) || "0",
      icon: "la:wine-bottle",
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
      className="bg-[#3F2929] w-full"
    >
      <WineryGeneralInfo />
      <Container intent="flexRowCenter" gap="xsmall">
        {wineryStats.map((stat) => (
          <WineryStat key={stat.title} data={stat} />
        ))}
      </Container>
    </Container>
  );
};
