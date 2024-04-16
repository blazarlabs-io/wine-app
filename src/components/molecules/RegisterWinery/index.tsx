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
import { WineryGeneralInfoInterface } from "@/typings/winery";
import {
  registerWineryGeneralInfoToDb,
  uploadLogoToStorage,
} from "@/utils/firestore";
import { useRef, useState } from "react";
import { validateFileSizeInMegabytes } from "@/utils/validateFileSizeInMegabytes";
import { useModal } from "@/context/modalContext";
import { useRouter } from "next/navigation";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const RegisterWinery = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { updateModal } = useModal();
  const {
    formTitle,
    formDescription,
    updateShowRegisterWinery,
    updateIsEditing,
    isEditing,
  } = useWinery();

  const { wineryGeneralInfo, updateWineryGeneralInfo } = useRealtimeDb();

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
      updateIsEditing(false);
      router.back();
    }
  };

  const handleRegistration = () => {
    setIsLoading(true);
    uploadLogoToStorage(user?.uid as string, logoFile as File, (url) => {
      wineryGeneralInfo.logo = url;

      // UPDATE TO DATABASE
      const newGeneralInfo: WineryGeneralInfoInterface = wineryGeneralInfo;
      updateWineryGeneralInfo(newGeneralInfo);

      registerWineryGeneralInfoToDb(user?.uid as string, newGeneralInfo);
      setIsLoading(false);
      router.replace("/home");
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
      className="w-full h-full bg-surface relative"
    >
      <Container
        intent="flexColTop"
        className="bg-surface min-w-[720px] relative max-w-[720px] overflow-y-auto"
      >
        {showLocationMap && (
          <div className="rounded-lg w-full h-full absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-10 bg-surface/80 backdrop-blur-sm">
            <Container
              intent="flexColCenter"
              className="bg-surface-light p-[24px]"
            >
              <LocationFinderMap
                onPin={(lat, lon) => {
                  console.log("onPin", lat, lon);
                  wineryGeneralInfo.wineryHeadquarters.latitude = lat;
                  wineryGeneralInfo.wineryHeadquarters.longitude = lon;
                }}
              />
              <Container intent="flexRowBetween" className="mt-[48px] w-full">
                <Text>Please click on maker to make it draggable.</Text>
                <Button
                  intent="primary"
                  size="medium"
                  className=""
                  onClick={() => setShowLocationMap(false)}
                >
                  Done
                </Button>
              </Container>
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
                  value={wineryGeneralInfo.name}
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      name: event.target.value,
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim">
                    Founded On
                  </Text>
                  <InfoTooltip text="What year was your winery founded?" />
                </Container>
                <input
                  type="number"
                  placeholder=""
                  value={wineryGeneralInfo.foundedOn}
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      foundedOn: event.target.value,
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim">
                    Winery Logo
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
                    Wine Collections
                  </Text>
                  <InfoTooltip text="How many wine collections has the winery ever created (approximately)" />
                </Container>
                <input
                  type="number"
                  placeholder=""
                  value={wineryGeneralInfo.collections}
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      collections: event.target.value,
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim">
                    Wineyards Surface
                  </Text>
                  <InfoTooltip text="What is the overall owned vineyards surface in hectares?" />
                </Container>
                <Container
                  intent="grid-2"
                  gap="medium"
                  className="items-center"
                >
                  <input
                    type="number"
                    placeholder=""
                    value={wineryGeneralInfo.vineyardsSurface}
                    onChange={(event: any) => {
                      const newGeneralInfo = {
                        ...wineryGeneralInfo,
                        vineyardsSurface: event.target.value,
                      };
                      updateWineryGeneralInfo(newGeneralInfo);
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                  <Text intent="p1" variant="dim">
                    Ha
                  </Text>
                </Container>
              </Container>
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim">
                    No. of Bottles Produced
                  </Text>
                  <InfoTooltip text="Quantity of bottles produced last year?" />
                </Container>
                <Container
                  intent="grid-2"
                  gap="medium"
                  className="items-center"
                >
                  <input
                    type="number"
                    placeholder=""
                    value={wineryGeneralInfo.noOfBottlesProducedPerYear}
                    onChange={(event: any) => {
                      const newGeneralInfo = {
                        ...wineryGeneralInfo,
                        noOfBottlesProducedPerYear: event.target.value,
                      };
                      updateWineryGeneralInfo(newGeneralInfo);
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                  <Text intent="p1" variant="dim">
                    Bottles
                  </Text>
                </Container>
              </Container>
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim">
                    Grape Varieties
                  </Text>
                  <InfoTooltip text="Quantity of grape varieties grown." />
                </Container>
                <input
                  type="number"
                  placeholder=""
                  value={wineryGeneralInfo.grapeVarieties}
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      grapeVarieties: event.target.value,
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim">
                    Winery Certifications
                  </Text>
                  <InfoTooltip text="Include the name of any certification your winery has." />
                </Container>
                <TextInputCrud
                  initialItems={wineryGeneralInfo.certifications}
                  placeholder=""
                  onItemsChange={(items) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      certifications: items,
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                />
              </Container>
            </Container>

            <Container intent="flexRowLeft" gap="xsmall">
              <Text intent="p1" variant="dim">
                Winery Headquarters
              </Text>
              <InfoTooltip text="Enter the Latitude and Longitude of your winery location or find it in the map." />
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p2" variant="dim">
                  Latitude
                </Text>
                <input
                  type="text"
                  value={wineryGeneralInfo.wineryHeadquarters.latitude}
                  placeholder=""
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      wineryHeadquarters: {
                        latitude: event.target.value,
                        longitude:
                          wineryGeneralInfo.wineryHeadquarters.longitude,
                      },
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
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
                  value={wineryGeneralInfo.wineryHeadquarters.longitude}
                  placeholder=""
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      wineryHeadquarters: {
                        latitude: wineryGeneralInfo.wineryHeadquarters.latitude,
                        longitude: event.target.value,
                      },
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
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
              Find on map
            </Button>
            <Container intent="flexRowLeft" gap="xsmall">
              <Text intent="p1" variant="dim">
                Winery Representative
              </Text>
              <InfoTooltip text="Enter following information of your winery's representative." />
            </Container>
            <Container intent="grid-3" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p2" variant="dim">
                  Name
                </Text>
                <input
                  type="text"
                  value={wineryGeneralInfo.wineryRepresentative.name}
                  placeholder=""
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      wineryRepresentative: {
                        name: event.target.value,
                        email: wineryGeneralInfo.wineryRepresentative.email,
                        phone: wineryGeneralInfo.wineryRepresentative.phone,
                      },
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p2" variant="dim">
                  Email
                </Text>
                <input
                  type="email"
                  value={wineryGeneralInfo.wineryRepresentative.email}
                  placeholder=""
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      wineryRepresentative: {
                        name: wineryGeneralInfo.wineryRepresentative.name,
                        email: event.target.value,
                        phone: wineryGeneralInfo.wineryRepresentative.phone,
                      },
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall" className="w-full">
                <Container intent="flexRowLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="w-full">
                    Phone
                  </Text>
                  <InfoTooltip text="Please provide the representative phone with the area code. Don't use + or ()." />
                </Container>

                <input
                  type="tel"
                  id="phone"
                  pattern="[0-9]{10,14}"
                  value={wineryGeneralInfo.wineryRepresentative.phone}
                  placeholder=""
                  onChange={(event: any) => {
                    const newGeneralInfo = {
                      ...wineryGeneralInfo,
                      wineryRepresentative: {
                        name: wineryGeneralInfo.wineryRepresentative.name,
                        email: wineryGeneralInfo.wineryRepresentative.email,
                        phone: event.target.value,
                      },
                    };
                    updateWineryGeneralInfo(newGeneralInfo);
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
            </Container>

            <Container
              intent="flexRowCenter"
              gap="medium"
              className="mt-[48px]"
            >
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
    </Container>
  );
};
