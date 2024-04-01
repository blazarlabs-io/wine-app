"use client";

import {
  Button,
  Container,
  Text,
  InfoTooltip,
  LocationFinderMap,
  TextInputCrud,
} from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";
import { useAuth } from "@/context/authContext";
import {
  WineryDataInterface,
  WineryGeneralInfoInterface,
} from "@/typings/components";
import {
  registerWineryGeneralInfoToDb,
  uploadImageToStorage,
} from "@/utils/firestore";
import { useRef, useState } from "react";
import { validateFileSizeInMegabytes } from "@/utils/validateFileSizeInMegabytes";
import { useModal } from "@/context/modalContext";

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
    updateIsEditing,
    isEditing,
  } = useWinery();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLocationMap, setShowLocationMap] = useState<boolean>(false);

  const inputFileRef = useRef<any>(null);

  const handleCancel = () => {
    if (!isEditing) {
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
    } else {
      updateShowRegisterWinery(false);
      updateIsEditing(false);
    }
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
      updateIsEditing(false);
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleRegistration();
  };

  return (
    <Container
      intent="flexColTop"
      className="bg-surface-light min-w-[720px] rounded-lg shadow-lg relative max-w-[720px] overflow-y-auto"
    >
      {showLocationMap && (
        <div className="rounded-lg p-[24px] absolute top-0 left-0 w-full h-full z-10 bg-surface-light">
          <LocationFinderMap
            onPin={(lat, lon) => {
              console.log("onPin", lat, lon);
              generalInfo.wineryHeadquarters.latitude = lat;
              generalInfo.wineryHeadquarters.longitude = lon;
            }}
          />
          <Container intent="flexRowRight" className="mt-[48px] w-full">
            <Button
              intent="primary"
              size="medium"
              className=""
              onClick={() => setShowLocationMap(false)}
            >
              Done
            </Button>
          </Container>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Container
          intent="flexColLeft"
          px="medium"
          py="medium"
          gap="small"
          className=""
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
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Founded On
                </Text>
                <InfoTooltip text="What year was your winery founded?" />
              </Container>
              <input
                required
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
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Winery Logo
                </Text>
                <InfoTooltip text="Winery logo image up to 2Mb file size." />
              </Container>
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
            <Container intent="flexColLeft" gap="xsmall">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Wine Collections
                </Text>
                <InfoTooltip text="How many wine collections has the winery ever created (approximately)" />
              </Container>
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
          </Container>
          <Container intent="grid-2" gap="medium">
            <Container intent="flexColLeft" gap="xsmall">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Wineyards Surface
                </Text>
                <InfoTooltip text="What is the overall owned vineyards surface in hectares?" />
              </Container>
              <input
                required
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
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * No. of Produced Wines
                </Text>
                <InfoTooltip text="How many different wines did your winery produce last year?" />
              </Container>
              <input
                required
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
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * No. of Bottles Produced
                </Text>
                <InfoTooltip text="Quantity of bottles produced last year?" />
              </Container>
              <input
                required
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
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Grape Varieties
                </Text>
                <InfoTooltip text="Quantity of grape varieties grown." />
              </Container>
              <input
                required
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
          <Container intent="flexColLeft" gap="xsmall">
            <Container intent="flexRowLeft" gap="xsmall">
              <Text intent="p1" variant="dim">
                Winery Certifications
              </Text>
              <InfoTooltip text="Include the name of any certification your winery has." />
            </Container>
            <TextInputCrud
              initialItems={generalInfo.certifications}
              placeholder=""
              onItemsChange={(items) => {
                const newGeneralInfo = {
                  ...generalInfo,
                  certifications: items,
                };
                const newWineryData: WineryDataInterface = {
                  generalInfo: newGeneralInfo,
                  wines,
                  euLabels,
                  exists,
                };
                updateWinery(newWineryData);
              }}
            />
          </Container>
          <Container intent="flexRowLeft" gap="xsmall">
            <Text intent="p1" variant="dim">
              * Winery Headquarters
            </Text>
            <InfoTooltip text="Enter the Latitude and Longitude of your winery location or find it in the map." />
          </Container>
          <Container intent="grid-2" gap="medium">
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p2" variant="dim">
                Latitude
              </Text>
              <input
                required
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
                required
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
          <Button
            intent="unstyled"
            onClick={() => setShowLocationMap(true)}
            className="text-primary-light font-semibold flex items-center justify-center gap-[8px] transition-all duration-300 ease-in-out"
          >
            <Icon
              icon="carbon:map"
              width="16"
              height="16"
              className="mt-[-4px]"
            />
            Find in map
          </Button>
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
              type="submit"
              onClick={() => {}}
            >
              {!isLoading ? (
                <>{isEditing ? "Update" : "Register"}</>
              ) : (
                <Container intent="flexRowCenter">
                  <Icon
                    icon="eos-icons:loading"
                    className="w-[16px] h-[16px]"
                  />
                </Container>
              )}
            </Button>
          </Container>
        </Container>
      </form>
    </Container>
  );
};
