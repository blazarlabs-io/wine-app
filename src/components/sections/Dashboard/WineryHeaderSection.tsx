"use client";
import { WineryStat, Container, Button, Text, WineryLogo } from "@/components";
import { WineryStatInterface } from "@/typings/components";
import { Icon } from "@iconify/react/dist/iconify.js";

const wineryStats: WineryStatInterface[] = [
  {
    title: "Number of Produced Wines",
    value: "0",
    icon: "fluent:drink-wine-24-regular",
    updatedAt: new Date().toLocaleString(),
  },
  {
    title: "Vineyards Surface",
    value: "0 km",
    icon: "material-symbols:landscape-outline",
    updatedAt: new Date().toLocaleString(),
  },
  {
    title: "Number of Bottles Produced Per Year",
    value: "0",
    icon: "la:wine-bottle",
    updatedAt: new Date().toLocaleString(),
  },
  {
    title: "Grape Varieties",
    value: "0",
    icon: "fluent-emoji-high-contrast:grapes",
    updatedAt: new Date().toLocaleString(),
  },
];

export const WineryHeaderSection = () => {
  return (
    <Container
      intent="flexRowBetween"
      py="large"
      px="2xlarge"
      className="bg-[#3F2929]"
    >
      <Container intent="flexColLeft" gap="small" className="">
        <Button
          intent="unstyled"
          onClick={() => console.log("clicked")}
          className="min-w-fit p-0 text-primary-light font-semibold hover:text-primary transition-all duration-300 ease-in-out"
        >
          <Container intent="flexRowCenter" gap="xsmall" className="w-full">
            <Icon
              icon="ant-design:edit-outlined"
              className="w-[16px] h-[16px]"
            />
            Edit details
          </Container>
        </Button>
        <Container intent="flexRowLeft" gap="small" className="w-full">
          <WineryLogo url="/winery-sample-logo.png" width={80} height={80} />
          <Container intent="flexColLeft" className="w-full">
            <Text intent="h3" className="text-on-surface">
              Winery Name
            </Text>
            <Text intent="p1" variant="dim" className="text-on-surface">
              founded on 1923
            </Text>
          </Container>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall" className="w-full">
          <Icon
            icon="charm:map-pin"
            className="w-[20px] h-[20px] text-on-surface-dark"
          />
          <Text variant="dim">39990 Anza Road, Temecula, CA 92591</Text>
        </Container>
        <Button
          intent="unstyled"
          onClick={() => console.log("clicked")}
          className="min-w-fit p-0 text-primary-light font-semibold hover:text-primary transition-all duration-300 ease-in-out"
        >
          Show on map
        </Button>
      </Container>
      <Container intent="flexRowCenter" gap="small">
        {wineryStats.map((stat) => (
          <WineryStat key={stat.title} data={stat} />
        ))}
      </Container>
    </Container>
  );
};
