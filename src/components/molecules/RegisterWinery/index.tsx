"use client";

import { Button, Container, Text } from "@/components";
import { Icon } from "@iconify/react";
import { WineryContextInterface, useWinery } from "@/context/wineryContext";

export const RegisterWinery = () => {
  const {
    updateWinery,
    formTitle,
    formDescription,
    updateShowRegisterWinery,
    generalInfo,
    wines,
    euLabels,
  } = useWinery();
  return (
    <Container
      intent="flexColLeft"
      px="medium"
      py="medium"
      gap="medium"
      className="bg-surface-light max-w-fit rounded-lg shadow-lg"
    >
      <Container intent="flexColLeft" gap="medium">
        <Container intent="flexRowLeft" gap="small">
          <Icon
            icon="game-icons:cellar-barrels"
            className="w-[56px] h-[56px] text-primary-light"
          />
          <Text intent="h2">{formTitle}</Text>
        </Container>
        <Text variant="dim">{formDescription}</Text>
      </Container>
      <Container intent="grid-2" gap="medium">
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * Winery Name
          </Text>
          <input
            type="text"
            placeholder=""
            value={(generalInfo && generalInfo.name) || ""}
            onChange={(event: any) => {
              generalInfo.name = event.target.value;
              updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * Founded On
          </Text>
          <input
            type="text"
            placeholder=""
            value={(generalInfo && generalInfo.foundedOn) || ""}
            onChange={(event: any) => {
              generalInfo.foundedOn = event.target.value;
              updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium">
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * Winery Logo
          </Text>
          <input
            type="file"
            title=""
            onChange={(event: any) => {}}
            className="text-primary-light file:border-2 file:border-primary-light file:px-[36px] file:py-[10px] file:rounded-lg file:bg-transparent file:text-primary-light file:font-semibold transition-all duration-300 ease-in-out"
          />
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium">
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * Wineyards Surface
          </Text>
          <input
            type="text"
            placeholder=""
            value={(generalInfo && generalInfo.vineyardsSurface) || ""}
            onChange={(event: any) => {
              generalInfo.vineyardsSurface = event.target.value;
              updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * No. of Produced Wines
          </Text>
          <input
            type="text"
            placeholder=""
            value={(generalInfo && generalInfo.noOfProducedWines) || ""}
            onChange={(event: any) => {
              generalInfo.noOfProducedWines = event.target.value;
              updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium">
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * No. of Bottles Produced Per Year
          </Text>
          <input
            type="text"
            placeholder=""
            value={
              (generalInfo && generalInfo.noOfBottlesProducedPerYear) || ""
            }
            onChange={(event: any) => {
              generalInfo.noOfBottlesProducedPerYear = event.target.value;
              updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * Grape Varieties
          </Text>
          <input
            type="text"
            placeholder=""
            value={(generalInfo && generalInfo.grapeVarieties) || ""}
            onChange={(event: any) => {
              generalInfo.grapeVarieties = event.target.value as string;
              updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
      </Container>
      <Text intent="p1" variant="dim">
        * Winery Headquarters
      </Text>
      <Container intent="grid-2" gap="medium">
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p2" variant="dim">
            Latitude
          </Text>
          <input
            type="text"
            placeholder=""
            onChange={(event: any) => {}}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p2" variant="dim">
            Longitude
          </Text>
          <input
            type="text"
            placeholder=""
            onChange={(event: any) => {}}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
      </Container>
      <Container intent="flexRowCenter" gap="medium">
        <Button
          intent="secondary"
          size="medium"
          fullWidth
          onClick={() => updateShowRegisterWinery(false)}
        >
          Cancel
        </Button>
        <Button intent="primary" size="medium" fullWidth>
          Register
        </Button>
      </Container>
    </Container>
  );
};
