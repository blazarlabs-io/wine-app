"use client";

import { Container, Button, Text, WineryLogo } from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";

export const WineryGeneralInfo = () => {
  const {
    generalInfo,
    updateFormTitle,
    updateFormDescription,
    updateShowRegisterWinery,
  } = useWinery();

  return (
    <Container
      intent="flexColLeft"
      gap="xsmall"
      px="medium"
      py="medium"
      className="bg-surface max-w-fit rounded-md"
    >
      <Container intent="flexRowBetween" gap="small" className="w-full">
        <Button
          intent="unstyled"
          onClick={() => {
            updateFormTitle("Edit Winery Details");
            updateFormDescription(
              "Please fill in the form to edit your winery details. All fields marked with * are mandatory."
            );
            updateShowRegisterWinery(true);
          }}
          className="min-w-fit p-0 text-primary-light font-semibold hover:text-primary transition-all duration-300 ease-in-out"
        >
          <Container intent="flexRowCenter" gap="xsmall" className="w-full">
            <Icon
              icon="ant-design:edit-outlined"
              className="w-[20px] h-[20px]"
            />
            Edit details
          </Container>
        </Button>
        <Container intent="flexRowCenter" gap="xsmall" className="w-full">
          <Icon
            icon="material-symbols:verified-outline"
            className="w-[20px] h-[20px] text-secondary"
          />
          <Text>Tier 1</Text>
        </Container>
        <Container intent="flexRowCenter" gap="xsmall" className="w-full">
          <Icon
            icon="mage:gem-stone"
            className="w-[20px] h-[20px] text-status-warning"
          />
          <Text>Bronze</Text>
        </Container>
      </Container>
      <Container intent="flexRowLeft" gap="small" className="w-full">
        <WineryLogo url="/winery-sample-logo.png" width={72} height={72} />
        <Container intent="flexColLeft" className="w-full">
          <Text intent="h3" className="text-on-surface">
            {(generalInfo && generalInfo.name) || "Winery Name"}
          </Text>
          <Text intent="p1" variant="dim" className="text-on-surface">
            {`Founded on ${(generalInfo && generalInfo.foundedOn) || "N/A"}`}
          </Text>
        </Container>
      </Container>
      <Container intent="flexRowLeft" gap="xsmall" className="w-full">
        <Icon
          icon="charm:map-pin"
          className="w-[20px] h-[20px] text-on-surface-dark"
        />
        <Text variant="dim">
          {(generalInfo && generalInfo.location) || "N/A"}
        </Text>
      </Container>
      <Button
        intent="unstyled"
        onClick={() => console.log("clicked")}
        className="min-w-fit p-0 text-primary-light font-semibold hover:text-primary transition-all duration-300 ease-in-out"
      >
        Show on map
      </Button>
    </Container>
  );
};
