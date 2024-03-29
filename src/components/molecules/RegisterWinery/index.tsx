"use client";

import { Button, Container, Text, WineryGeneralInfo } from "@/components";
import { Icon } from "@iconify/react";
import {
  useWinery,
  contextInitialData as wineryResetData,
} from "@/context/wineryContext";
import { useAuth } from "@/context/authContext";
import {
  WineryDataInterface,
  WineryGeneralInfoInterface,
} from "@/typings/components";
import {
  registerWineryGeneralInfoToDb,
  uploadImageToStorage,
} from "@/utils/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { validateFileSizeInMegabytes } from "@/utils/validateFileSizeInMegabytes";
import { useModal } from "@/context/modalContext";
import { db } from "@/lib/firebase/client";
import { set } from "firebase/database";

export const RegisterWinery = () => {
  const { user } = useAuth();

  const { updateModal } = useModal();

  const {
    updateWinery,
    formTitle,
    formDescription,
    updateShowRegisterWinery,
    generalInfo,
    wines,
    euLabels,
    exists,
  } = useWinery();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputFileRef = useRef<any>(null);

  const handleCancel = () => {
    // updateWinery(wineryResetData);
    // updateShowRegisterWinery(false);
    updateModal({
      show: true,
      title: "Error",
      description: "You must complete the registration process.",
      action: {
        label: "OK",
        onAction: () =>
          updateModal({
            show: false,
            title: "",
            description: "",
            action: { label: "", onAction: () => {} },
          }),
      },
    });
  };

  const handleRegistration = () => {
    setIsLoading(true);
    uploadImageToStorage(user?.uid as string, logoFile as File, (url) => {
      console.log("handleRegistration", url);
      generalInfo.logo = url;
      const newWineryData: WineryDataInterface = {
        generalInfo,
        wines,
        euLabels,
        exists,
      };
      updateWinery(newWineryData);
      // UPDATE TO DATABASE
      const newGeneralInfo: WineryGeneralInfoInterface = generalInfo;
      console.log("newGeneralInfo", newGeneralInfo);
      registerWineryGeneralInfoToDb(user?.uid as string, newGeneralInfo);
      setIsLoading(false);
      updateShowRegisterWinery(false);
    });
  };

  return (
    // <form id="wineryRegistrationForm">
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
            required
            type="text"
            placeholder=""
            value={generalInfo.name}
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                name: event.target.value,
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
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
            value={generalInfo.foundedOn}
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                foundedOn: event.target.value,
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
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
            ref={inputFileRef}
            type="file"
            accept="image/*"
            multiple={false}
            title=""
            onChange={(event: any) => {
              const validFile = validateFileSizeInMegabytes(
                event.target.files[0],
                2
              );
              if (!validFile) {
                inputFileRef.current.value = "";
                updateModal({
                  show: true,
                  title: "Error",
                  description: "File size should be less than 2MB",
                  action: {
                    label: "OK",
                    onAction: () =>
                      updateModal({
                        show: false,
                        title: "",
                        description: "",
                        action: { label: "", onAction: () => {} },
                      }),
                  },
                });
              } else {
                setLogoFile(event.target.files[0]);
              }
            }}
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
            value={generalInfo.vineyardsSurface}
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                vineyardsSurface: event.target.value,
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
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
            value={generalInfo.noOfProducedWines}
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                noOfProducedWines: event.target.value,
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
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
            value={generalInfo.noOfBottlesProducedPerYear}
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                noOfBottlesProducedPerYear: event.target.value,
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
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
            value={generalInfo.grapeVarieties}
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                grapeVarieties: event.target.value,
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
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
            value={generalInfo.wineryHeadquarters.latitude}
            placeholder=""
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                wineryHeadquarters: {
                  latitude: event.target.value,
                  longitude: generalInfo.wineryHeadquarters.longitude,
                },
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p2" variant="dim">
            Longitude
          </Text>
          <input
            type="text"
            value={generalInfo.wineryHeadquarters.longitude}
            placeholder=""
            onChange={(event: any) => {
              const newGeneralInfo = {
                ...generalInfo,
                wineryHeadquarters: {
                  latitude: generalInfo.wineryHeadquarters.latitude,
                  longitude: event.target.value,
                },
              };
              const newWineryData: WineryDataInterface = {
                generalInfo: newGeneralInfo,
                wines,
                euLabels,
                exists,
              };
              updateWinery(newWineryData);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
      </Container>
      <Container intent="flexRowCenter" gap="medium">
        <Button
          intent="secondary"
          size="medium"
          fullWidth
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button
          intent="primary"
          size="medium"
          fullWidth
          onClick={() => handleRegistration()}
        >
          {!isLoading ? (
            "Register"
          ) : (
            <Container intent="flexRowCenter">
              <Icon icon="eos-icons:loading" className="w-[16px] h-[16px]" />
            </Container>
          )}
        </Button>
      </Container>
    </Container>
    // </form>
  );
};
