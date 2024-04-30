"use client";

import {
  Button,
  Container,
  Text,
  InfoTooltip,
  TextInputCrud,
  SpinnerLoader,
  MapLocationFinder,
} from "@/components";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/authContext";
import { WineryGeneralInfoInterface } from "@/typings/winery";
import {
  registerWineryGeneralInfoToDb,
  updateWineryHeadquarters,
  uploadLogoToStorage,
} from "@/utils/firestore";
import { useEffect, useRef, useState } from "react";
import { validateFileSizeAndType } from "@/utils/validateFileSizeAndType";
import { useModal } from "@/context/modalContext";
import { useRouter } from "next/navigation";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useForms } from "@/context/FormsContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useMasterLoader } from "@/context/masterLoaderContext";

export const WineryForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { updateModal } = useModal();
  const { updateMasterLoading } = useMasterLoader();
  const { wineryForm, updateWineryForm } = useForms();

  const { wineryGeneralInfo, updateWineryGeneralInfo } = useRealtimeDb();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLocationMap, setShowLocationMap] = useState<boolean>(false);
  const [initialMapPosition, setInitialMapPosition] = useState<any | null>(
    null
  );
  const [enableMapSave, setEnableMapSave] = useState<boolean>(false);

  const inputFileRef = useRef<any>(null);

  const handleCancel = () => {
    if (!wineryForm.isEditing) {
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
      router.back();
    }
  };

  const handleRegistration = () => {
    setIsLoading(true);
    setImageUploading(true);

    const newGeneralInfo: WineryGeneralInfoInterface = wineryGeneralInfo;
    updateWineryGeneralInfo(newGeneralInfo);

    // UPDATE TO DATABASE
    registerWineryGeneralInfoToDb(user?.uid as string, newGeneralInfo);
    setIsLoading(false);
    router.replace("/home");
  };

  const handleUploadLogo = (logo: File) => {
    setImageUploading(true);
    uploadLogoToStorage(user?.uid as string, logo as File, (url: string) => {
      setImageUploading(false);
      wineryGeneralInfo.logo = url;
      wineryGeneralInfo.lastUpdated = new Date().toISOString();

      const newGeneralInfo: WineryGeneralInfoInterface = wineryGeneralInfo;
      updateWineryGeneralInfo(newGeneralInfo);
      setImageUploading(false);
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleRegistration();
  };

  useEffect(() => {
    setInitialMapPosition({
      latitude: wineryGeneralInfo.wineryHeadquarters.latitude,
      longitude: wineryGeneralInfo.wineryHeadquarters.longitude,
    });
  }, [wineryGeneralInfo]);

  useEffect(() => {
    updateMasterLoading(false);
  }, []);

  return (
    <Container
      intent="flexColTop"
      className="w-full h-full bg-surface relative"
    >
      <Container
        intent="flexColTop"
        className="bg-surface min-w-[720px] relative max-w-[720px] overflow-y-auto overflow-hidden"
      >
        {showLocationMap && (
          <div className="rounded-lg w-full h-full absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-10 bg-surface/80 backdrop-blur-sm">
            <Container
              intent="flexColCenter"
              className="bg-surface-light p-[24px]"
            >
              <MapLocationFinder
                isEditing={initialMapPosition ? true : false}
                initialPosition={{
                  latitude: initialMapPosition.latitude || 54.75198957490845,
                  longitude: initialMapPosition.longitude || -2.135153202045415,
                }}
                onMarkerSet={(marker: any) => {
                  if (marker && marker.lat && marker.lng) {
                    wineryGeneralInfo.wineryHeadquarters.latitude = marker.lat;
                    wineryGeneralInfo.wineryHeadquarters.longitude = marker.lng;
                    setEnableMapSave(true);
                    updateWineryGeneralInfo(wineryGeneralInfo);
                  }
                }}
              />
              <Container intent="flexRowBetween" className="mt-[48px] w-full">
                <Text>Please find your location and click to add marker.</Text>
                <Container intent="flexRowRight" gap="medium">
                  <Button
                    intent="unstyled"
                    size="medium"
                    onClick={() => setShowLocationMap(false)}
                    className="border border-primary-light text-primary-light font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    intent="primary"
                    size="medium"
                    disabled={!enableMapSave}
                    onClick={() => {
                      setShowLocationMap(false);
                      updateWineryHeadquarters(
                        user?.uid as string,
                        parseFloat(
                          wineryGeneralInfo.wineryHeadquarters.latitude
                        ),
                        parseFloat(
                          wineryGeneralInfo.wineryHeadquarters.longitude
                        )
                      );
                    }}
                  >
                    Save
                  </Button>
                </Container>
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
                <Text intent="h2">{wineryForm.title}</Text>
              </Container>
              <Text variant="dim">{wineryForm.description}</Text>
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
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
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Founded In
                  </Text>
                  <InfoTooltip text="The year your winery was founded." />
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
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Winery Logo
                  </Text>
                  <InfoTooltip text="The image must be in *.jpg, *.jpeg or *.png format and up to 2MB file size." />
                  {imageUploading && (
                    <div className="flex items-center justify-start gap-[8px] max-w-fit">
                      <Text intent="p2" variant="dim" className="font-semibold">
                        Uploading
                      </Text>
                      <SpinnerLoader color="#ddd" />
                    </div>
                  )}
                </Container>
                <input
                  ref={inputFileRef}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  title=""
                  onChange={(event: any) => {
                    const validFile = validateFileSizeAndType(
                      event.target.files[0],
                      2
                    );
                    if (!validFile) {
                      inputFileRef.current.value = "";
                      updateModal({
                        show: true,
                        title: "Error",
                        description:
                          "File size should be less than 2MB and image types accepted are jpg, jpeg and png.",
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
                      handleUploadLogo(event.target.files[0]);
                    }
                  }}
                  className="file:mr-[8px] text-primary-light file:border-2 file:border-primary-light file:px-[36px] file:py-[10px] file:rounded-lg file:bg-transparent file:text-primary-light file:font-semibold transition-all duration-300 ease-in-out"
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Wine Collections
                  </Text>
                  <InfoTooltip text="The number of wine collections your winery has produced last year." />
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
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Wineyards Surface
                  </Text>
                  <InfoTooltip text="The overall vineyards surface (in Ha) owned by your winery." />
                </Container>
                <Container
                  intent="grid-2"
                  gap="xsmall"
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
                  <Text intent="p1" variant="dim" className="font-semibold">
                    No. of Bottles Produced
                  </Text>
                  <InfoTooltip text="Number of bottles produced last year by your winery." />
                </Container>
                <Container
                  intent="grid-2"
                  gap="xsmall"
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
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Bottles
                  </Text>
                </Container>
              </Container>
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Grape Varieties
                  </Text>
                  <InfoTooltip text="Number of different grape varieties grown on your vineyards." />
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
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Winery Certifications
                  </Text>
                  <InfoTooltip text="Add the name of any certifications your winery has." />
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
              <Text intent="p1" variant="dim" className="font-semibold">
                Winery Headquarters
              </Text>
              <InfoTooltip text="Enter the Latitude and Longitude of your winery location or find it in the map." />
            </Container>
            <Container intent="grid-2" gap="medium" className="font-semibold">
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
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
                <Text intent="p1" variant="dim" className="font-semibold">
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
              <Text intent="p1" variant="dim" className="font-semibold">
                Winery Representative
              </Text>
              <InfoTooltip text="Enter following information of your winery's representative." />
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
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
                <Text intent="p1" variant="dim" className="font-semibold">
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
            </Container>
            <Container intent="grid-2" gap="medium">
              <Container intent="flexColLeft" gap="xsmall" className="w-full">
                <Container intent="flexRowLeft" gap="xsmall" className="">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Phone
                  </Text>
                  <InfoTooltip text="Please provide the representative phone with the area code starting with +" />
                </Container>
                <div className="flex items-center justify-center gap-[8px] w-full">
                  <PhoneInput
                    name="phoneNumber"
                    type="text"
                    country={"us"}
                    enableAreaCodes={true}
                    areaCodes={{ us: ["332"] }}
                    inputProps={{
                      name: "phone",
                      country: "us",
                      required: true,
                      autoFocus: true,
                    }}
                    value={wineryGeneralInfo.wineryRepresentative.phone}
                    onChange={(event: any) => {
                      const newGeneralInfo = {
                        ...wineryGeneralInfo,
                        wineryRepresentative: {
                          name: wineryGeneralInfo.wineryRepresentative.name,
                          email: wineryGeneralInfo.wineryRepresentative.email,
                          phone: event === undefined ? "" : event,
                        },
                      };
                      updateWineryGeneralInfo(newGeneralInfo);
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "48px",
                    }}
                    className="w-full text-on-surface px-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </div>
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
                  <>{"save"}</>
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
