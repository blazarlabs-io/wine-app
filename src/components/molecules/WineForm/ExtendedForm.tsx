"use client";

import {
  Button,
  Container,
  DropDown,
  Text,
  TextInputCrud,
  InfoTooltip,
  SpinnerLoader,
  SelectOrTextInputCrud,
  SelectAndTextInputCrud,
  SelectCrud,
  BlendComponentCrud,
  WineThumbnail,
} from "@/components";
import { useForms } from "@/context/FormsContext";
import { useAuth } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useIntegrateMinifiedAndExtendedWines } from "@/hooks/useIntegrateMinifiedAndExtendedWines";
import { BlendComponent, SelectedTemperature } from "@/typings/winery";
import {
  countryList,
  vintageYearList,
  blendComponentInitialData,
} from "@/data";
import { uploadWineImageToStorage } from "@/utils/firestore";
import { restrictNumberInput } from "@/utils/validators/restrictNumberInput";
import { validateFileSizeAndType } from "@/utils/validators/validateFileSizeAndType";
import { useEffect, useRef, useState } from "react";

export interface BasicFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export const ExtendedForm = ({ onSave, onCancel }: BasicFormProps) => {
  // * Hooks
  const { updateModal } = useModal();
  const {
    wineTypes,
    wineBottleSizes,
    wineColours,
    wineryGeneralInfo,
    aromaProfiles,
    flavourProfiles,
    sustainabilityPractices,
    closureTypes,
  } = useRealtimeDb();
  const { wineForm, updateWineForm } = useForms();
  const { formsIntegrated } = useIntegrateMinifiedAndExtendedWines();
  const { user } = useAuth();

  // * Refs
  const inputFileRef = useRef<any>(null);

  // * States
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [dataReady, setDataReady] = useState<boolean>(false);

  // * Handle wine image upload
  const handleWineImageUpload = (wineImageFile: File) => {
    setImageUploading(true);
    uploadWineImageToStorage(
      user?.uid as string,
      wineImageFile as File,
      wineForm.formData.referenceNumber as string,
      (url: string) => {
        updateWineForm({
          ...wineForm,
          formData: {
            ...wineForm.formData,
            generalInformation: {
              ...wineForm.formData.generalInformation,
              wineImageUrl: url,
            },
          },
        });
        setImageUploading(false);
      }
    );
  };

  // * Handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSave();
  };

  // * Update the wine form with integrated data
  useEffect(() => {
    if (formsIntegrated) {
      setDataReady(true);
    }
  }, [formsIntegrated]);

  return (
    <>
      <div className="h-[1px] bg-on-surface-dark/50 w-full my-[24px]" />
      <Container intent="flexRowLeft">
        <Text intent="h5" variant="accent" className="mb-[32px] font-semibold">
          General Information
        </Text>
      </Container>
      {/* First Row */}
      {dataReady && (
        <>
          <form onSubmit={handleSubmit}>
            <Container intent="flexColCenter" gap="medium">
              <Container intent="grid-3" gap="medium">
                <Container intent="flexColLeft" gap="xsmall">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    GTIN (UPC)
                  </Text>
                  <input
                    type="text"
                    placeholder=""
                    value={
                      (wineForm.formData.packagingAndBranding.upc as string) ||
                      ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.packagingAndBranding.upc =
                        event.target.value;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          packagingAndBranding: {
                            ...wineForm.formData.packagingAndBranding,
                            upc: wineForm.formData.packagingAndBranding.upc,
                          },
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
                <Container intent="flexRowLeft" gap="xsmall">
                  <div className="bg-surface-light p-[4px] rounded-lg">
                    <WineThumbnail
                      imageUrl={
                        wineForm.formData.generalInformation.wineImageUrl
                      }
                      width={80}
                      height={80}
                    />
                  </div>
                  <Container intent="flexColLeft" gap="xsmall" className="">
                    <Container
                      intent="flexRowLeft"
                      gap="xsmall"
                      className="max-w-fit"
                    >
                      <Text
                        intent="p1"
                        variant="dim"
                        className="font-semibold min-w-fit"
                      >
                        Wine Image
                      </Text>
                      <InfoTooltip
                        width={240}
                        text="For optimal display, please upload a photo of your wine bottle against a single-color background. Ensure the bottle is vertical, occupies 80-90% of the photo's height, and is free from unnecessary elements. High or studio lighting is preferred. You can change this photo later if needed."
                      />
                      {imageUploading && (
                        <div className="flex items-center justify-start gap-[8px] max-w-fit">
                          <Text
                            intent="p2"
                            variant="dim"
                            className="font-semibold"
                          >
                            Uploading
                          </Text>
                          <SpinnerLoader color="#ddd" />
                        </div>
                      )}
                    </Container>
                    <input
                      id="files"
                      ref={inputFileRef}
                      type="file"
                      accept="image/*"
                      multiple={false}
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
                              "File size should be less than 2MB and image types accepted are jpeg and png.",
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
                          handleWineImageUpload(event.target.files[0]);
                        }
                      }}
                      className="file:mr-[8px] text-primary-light file:border-2 file:border-primary-light file:px-[36px] file:py-[10px] file:rounded-lg file:bg-transparent file:text-primary-light file:font-semibold transition-all duration-300 ease-in-out"
                    />
                  </Container>
                </Container>
              </Container>

              {/* Second Row */}
              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Winery Name
                  </Text>
                  <input
                    readOnly
                    type="text"
                    placeholder=""
                    value={
                      (wineForm.formData.generalInformation
                        .wineryName as string) || ""
                    }
                    onChange={(event: any) => {}}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Wine Collection Name
                  </Text>
                  <input
                    required
                    type="text"
                    placeholder=""
                    value={
                      (wineForm.formData.generalInformation
                        .wineCollectionName as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.generalInformation.wineCollectionName =
                        event.target.value;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          generalInformation: {
                            ...wineForm.formData.generalInformation,
                            wineCollectionName:
                              wineForm.formData.generalInformation
                                .wineCollectionName,
                          },
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Country
                  </Text>
                  <DropDown
                    isRequired
                    id="country"
                    items={countryList}
                    fullWidth
                    selectedValue={wineForm.formData.generalInformation.country}
                    onSelect={(data: string) => {
                      wineForm.formData.generalInformation.country = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          generalInformation: {
                            ...wineForm.formData.generalInformation,
                            country:
                              wineForm.formData.generalInformation.country,
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>
              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Wine Collection Size
                  </Text>
                  <input
                    required
                    type="number"
                    placeholder=""
                    value={
                      (wineForm.formData.generalInformation
                        .collectionSize as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.generalInformation.collectionSize =
                        event.target.value;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          generalInformation: {
                            ...wineForm.formData.generalInformation,
                            collectionSize:
                              wineForm.formData.generalInformation
                                .collectionSize,
                          },
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Bottling Year
                  </Text>
                  <DropDown
                    items={vintageYearList}
                    id="bottlingYear"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.generalInformation
                        .bottlingYear as string
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.generalInformation.bottlingYear = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          generalInformation: {
                            ...wineForm.formData.generalInformation,
                            bottlingYear:
                              wineForm.formData.generalInformation.bottlingYear,
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>
              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Awards and Recognitions
                  </Text>
                  <TextInputCrud
                    label="Name"
                    placeholder="Award name"
                    initialItems={
                      wineForm.formData.blendComponents[0].ingredients
                        .acidityRegulators.list
                    }
                    onItemsChange={(items: string[]) => {
                      wineForm.formData.blendComponents[0].ingredients.acidityRegulators.list =
                        items;

                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          blendComponents: [
                            {
                              ...wineForm.formData.blendComponents[0],
                              ingredients: {
                                ...wineForm.formData.blendComponents[0]
                                  .ingredients,
                                acidityRegulators: {
                                  allergens:
                                    wineForm.formData.blendComponents[0]
                                      .ingredients.acidityRegulators.allergens,
                                  has: true,
                                  list: items,
                                },
                              },
                            },
                          ],
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="flexRowLeft" gap="xsmall">
                <Text
                  intent="h5"
                  variant="accent"
                  className="mb-[8px] font-semibold"
                >
                  Characteristics
                </Text>
                <InfoTooltip
                  className="mt-[-8px]"
                  text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
                />
              </Container>

              {/* Third Row */}
              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Type of Wine
                  </Text>
                  <DropDown
                    items={wineTypes}
                    id="typeOfWine"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.characteristics.wineType as string
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.characteristics.wineType = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          characteristics: {
                            ...wineForm.formData.characteristics,
                            wineType:
                              wineForm.formData.characteristics.wineType,
                          },
                        },
                      });
                    }}
                  />
                </Container>

                {/* <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Bottle Size
                  </Text>
                  <DropDown
                    items={wineBottleSizes}
                    id="wineBottleSizes"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.packagingAndBranding.bottleSize
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.packagingAndBranding.bottleSize = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          packagingAndBranding: {
                            ...wineForm.formData.packagingAndBranding,
                            bottleSize:
                              wineForm.formData.packagingAndBranding.bottleSize,
                          },
                        },
                      });
                    }}
                  />
                </Container> */}
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Wine Color
                  </Text>
                  <DropDown
                    items={wineColours}
                    id="wineColours"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.characteristics.wineColour as string
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.characteristics.wineColour = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          characteristics: {
                            ...wineForm.formData.characteristics,
                            wineColour:
                              wineForm.formData.characteristics.wineColour,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text intent="p1" variant="dim" className="font-semibold">
                      * Alcohol Level %
                    </Text>
                  </Container>
                  <Container
                    intent="grid-2"
                    gap="xsmall"
                    className="items-center"
                  >
                    <input
                      required
                      type="number"
                      min="0"
                      max="100"
                      step={0.5}
                      placeholder=""
                      value={
                        (wineForm.formData.characteristics
                          .alcoholLevel as string) || ""
                      }
                      onChange={(event: any) => {
                        const restrictedVal = restrictNumberInput(
                          0,
                          100,
                          event.target.value
                        );
                        wineForm.formData.characteristics.alcoholLevel =
                          restrictedVal.toString();
                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            characteristics: {
                              ...wineForm.formData.characteristics,
                              alcoholLevel:
                                wineForm.formData.characteristics.alcoholLevel,
                            },
                          },
                        });
                      }}
                      className="text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                    />
                    <Text>% vol</Text>
                  </Container>
                </Container>
              </Container>

              {/* Fourth Row */}
              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text intent="p1" variant="dim" className="font-semibold">
                      * Residual Sugar
                    </Text>
                  </Container>
                  <Container
                    intent="grid-2"
                    gap="xsmall"
                    className="items-center"
                  >
                    <input
                      required
                      type="number"
                      min="0"
                      max="100"
                      step={0.5}
                      placeholder=""
                      value={
                        (wineForm.formData.characteristics
                          .residualSugar as string) || ""
                      }
                      onChange={(event: any) => {
                        wineForm.formData.characteristics.residualSugar =
                          restrictNumberInput(
                            0,
                            100,
                            event.target.value
                          ).toString();

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            characteristics: {
                              ...wineForm.formData.characteristics,
                              residualSugar:
                                wineForm.formData.characteristics.residualSugar,
                            },
                          },
                        });
                      }}
                      className="text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                    />
                    <Text>g/100ml</Text>
                  </Container>
                </Container>
                <Container intent="flexColLeft" gap="xsmall">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text intent="p1" variant="dim" className="font-semibold">
                      * Acidity Level
                    </Text>
                  </Container>
                  <Container
                    intent="grid-2"
                    gap="xsmall"
                    className="items-center"
                  >
                    <input
                      required
                      type="number"
                      min="0"
                      max="100"
                      step={0.5}
                      placeholder=""
                      value={
                        (wineForm.formData.characteristics
                          .acidityLevel as string) || ""
                      }
                      onChange={(event: any) => {
                        wineForm.formData.characteristics.acidityLevel =
                          restrictNumberInput(
                            0,
                            100,
                            event.target.value
                          ).toString();

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            characteristics: {
                              ...wineForm.formData.characteristics,
                              acidityLevel:
                                wineForm.formData.characteristics.acidityLevel,
                            },
                          },
                        });
                      }}
                      className="text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                    />
                    <Text>g/100ml</Text>
                  </Container>
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Tannin Level
                  </Text>
                  <DropDown
                    items={["None", "Low", "Medium", "High"]}
                    id="taninLevel"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.characteristics.tanningLevel as string
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.characteristics.tanningLevel = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          characteristics: {
                            ...wineForm.formData.characteristics,
                            tanningLevel:
                              wineForm.formData.characteristics.tanningLevel,
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Aroma Profile
                  </Text>
                  <SelectOrTextInputCrud
                    dropdownLabel="Add From Aromas List"
                    textInputLabel="Add Your Own Aroma"
                    list={aromaProfiles}
                    initialItems={
                      wineForm.formData.characteristics.aromaProfile
                        .list as string[]
                    }
                    placeholder="e.g. Apple, Pear, Citrus"
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          characteristics: {
                            ...wineForm.formData.characteristics,
                            aromaProfile: {
                              has: true,
                              list: items,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Flavour Profile
                  </Text>
                  <SelectOrTextInputCrud
                    dropdownLabel="Add From Flavours List"
                    textInputLabel="Add Your Own Flavour"
                    list={aromaProfiles}
                    initialItems={
                      wineForm.formData.characteristics.flavourProfile
                        .list as string[]
                    }
                    placeholder="e.g. Apple, Pear, Citrus"
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          characteristics: {
                            ...wineForm.formData.characteristics,
                            flavourProfile: {
                              has: true,
                              list: items,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text intent="p1" variant="dim" className="font-semibold">
                      * Sulphites Level
                    </Text>
                  </Container>
                  <Container
                    intent="grid-2"
                    gap="xsmall"
                    className="items-center"
                  >
                    <input
                      required
                      type="number"
                      min="0"
                      max="999"
                      step={0.5}
                      placeholder=""
                      value={
                        (wineForm.formData.characteristics
                          .sulphiteLevel as string) || ""
                      }
                      onChange={(event: any) => {
                        wineForm.formData.characteristics.sulphiteLevel =
                          restrictNumberInput(
                            0,
                            999,
                            event.target.value
                          ).toString();

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            characteristics: {
                              ...wineForm.formData.characteristics,
                              sulphiteLevel:
                                wineForm.formData.characteristics.sulphiteLevel,
                            },
                          },
                        });
                      }}
                      className="text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                    />
                    <Text>ppm</Text>
                  </Container>
                </Container>
              </Container>

              <Container intent="flexRowLeft" gap="xsmall">
                <Text
                  intent="h5"
                  variant="accent"
                  className="mb-[8px] font-semibold"
                >
                  Storage Conditions
                </Text>
                <InfoTooltip
                  className="mt-[-8px]"
                  text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
                />
              </Container>

              {/*  */}
              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Estate/Place for initial storage
                  </Text>
                  <input
                    required
                    type="text"
                    placeholder=""
                    value={
                      (wineForm.formData.storageConditions
                        .placeForInitialStorage as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.storageConditions.placeForInitialStorage =
                        event.target.value;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          storageConditions: {
                            ...wineForm.formData.storageConditions,
                            placeForInitialStorage:
                              wineForm.formData.storageConditions
                                .placeForInitialStorage,
                          },
                        },
                      });
                    }}
                    className="mt-[30px] w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Temperature
                  </Text>
                  <SelectAndTextInputCrud
                    list={
                      wineForm.formData.storageConditions.storageTemperature
                        .units
                    }
                    dropdownLabel="Select Unit"
                    placeholder="e.g. 12"
                    textInputLabel="Add Temperature"
                    initialItems={
                      wineForm.formData.storageConditions.storageTemperature
                        .selected as SelectedTemperature
                    }
                    onItemsChange={(items: SelectedTemperature) => {
                      wineForm.formData.storageConditions.storageTemperature.selected =
                        items;

                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          storageConditions: {
                            ...wineForm.formData.storageConditions,
                            storageTemperature: {
                              ...wineForm.formData.storageConditions
                                .storageTemperature,
                              selected: items,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="grid-3" gap="xsmall">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Lighting Conditions
                  </Text>
                  <DropDown
                    items={[
                      "No light",
                      "Low light",
                      "Moderate light",
                      "High light",
                    ]}
                    id="lightingConditions"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.storageConditions
                        .lightingConditions as string
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.storageConditions.lightingConditions =
                        data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          storageConditions: {
                            ...wineForm.formData.storageConditions,
                            lightingConditions:
                              wineForm.formData.storageConditions
                                .lightingConditions,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Vibration Levels
                  </Text>
                  <DropDown
                    items={["None", "Low", "Moderate", "High"]}
                    id="vibrationLevels"
                    isRequired
                    fullWidth
                    selectedValue={
                      wineForm.formData.storageConditions
                        .vibrationLevel as string
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.storageConditions.vibrationLevel = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          storageConditions: {
                            ...wineForm.formData.storageConditions,
                            vibrationLevel:
                              wineForm.formData.storageConditions
                                .vibrationLevel,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text intent="p1" variant="dim" className="font-semibold">
                      * Humidity Levels
                    </Text>
                  </Container>
                  <Container
                    intent="grid-2"
                    gap="xsmall"
                    className="items-center"
                  >
                    <input
                      required
                      type="number"
                      min="0"
                      max="100"
                      step={0.5}
                      placeholder=""
                      value={
                        (wineForm.formData.storageConditions
                          .humidityLevel as string) || ""
                      }
                      onChange={(event: any) => {
                        wineForm.formData.storageConditions.humidityLevel =
                          event.target.value;

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            storageConditions: {
                              ...wineForm.formData.storageConditions,
                              humidityLevel:
                                wineForm.formData.storageConditions
                                  .humidityLevel,
                            },
                          },
                        });
                      }}
                      className="text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                    />
                    <Text>%</Text>
                  </Container>
                </Container>
              </Container>

              <Container intent="flexRowLeft" gap="xsmall">
                <Text
                  intent="h5"
                  variant="accent"
                  className="mb-[8px] font-semibold"
                >
                  Wine Making Technique
                </Text>
                <InfoTooltip
                  className="mt-[-8px]"
                  text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
                />
              </Container>

              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Vegan
                  </Text>
                  <DropDown
                    items={["Yes", "No"]}
                    id="vegan"
                    isRequired
                    fullWidth
                    selectedValue={
                      (wineForm.formData.wineMakingTechnique
                        .isWineVegan as boolean)
                        ? "Yes"
                        : "No"
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.wineMakingTechnique.isWineVegan =
                        data === "Yes";
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          wineMakingTechnique: {
                            ...wineForm.formData.wineMakingTechnique,
                            isWineVegan:
                              wineForm.formData.wineMakingTechnique.isWineVegan,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Organic
                  </Text>
                  <DropDown
                    items={["Yes", "No"]}
                    id="organic"
                    isRequired
                    fullWidth
                    selectedValue={
                      (wineForm.formData.wineMakingTechnique
                        .isWineOrganic as boolean)
                        ? "Yes"
                        : "No"
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.wineMakingTechnique.isWineOrganic =
                        data === "Yes";
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          wineMakingTechnique: {
                            ...wineForm.formData.wineMakingTechnique,
                            isWineOrganic:
                              wineForm.formData.wineMakingTechnique
                                .isWineOrganic,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Bio Dynamic
                  </Text>
                  <DropDown
                    items={["Yes", "No"]}
                    id="bioDynamic"
                    isRequired
                    fullWidth
                    selectedValue={
                      (wineForm.formData.wineMakingTechnique
                        .isWineBioDynamic as boolean)
                        ? "Yes"
                        : "No"
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.wineMakingTechnique.isWineBioDynamic =
                        data === "Yes";
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          wineMakingTechnique: {
                            ...wineForm.formData.wineMakingTechnique,
                            isWineBioDynamic:
                              wineForm.formData.wineMakingTechnique
                                .isWineBioDynamic,
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="grid-3" gap="xsmall" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Natural
                  </Text>
                  <DropDown
                    items={["Yes", "No"]}
                    id="natural"
                    isRequired
                    fullWidth
                    selectedValue={
                      (wineForm.formData.wineMakingTechnique
                        .isWineNatural as boolean)
                        ? "Yes"
                        : "No"
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.wineMakingTechnique.isWineNatural =
                        data === "Yes";
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          wineMakingTechnique: {
                            ...wineForm.formData.wineMakingTechnique,
                            isWineNatural:
                              wineForm.formData.wineMakingTechnique
                                .isWineNatural,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container
                  intent="flexColLeft"
                  gap="xsmall"
                  className="w-full col-span-2"
                >
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Sustainability Practices
                  </Text>
                  <SelectCrud
                    list={sustainabilityPractices as string[]}
                    selectedValue=""
                    initialItems={
                      wineForm.formData.wineMakingTechnique.sustainablePractices
                        .list as string[]
                    }
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          wineMakingTechnique: {
                            ...wineForm.formData.wineMakingTechnique,
                            sustainablePractices: {
                              has: true,
                              list: items,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Container>
              </Container>

              <Container intent="flexRowLeft" gap="xsmall">
                <Text
                  intent="h5"
                  variant="accent"
                  className="mb-[8px] font-semibold"
                >
                  Packaging and Branding
                </Text>
                <InfoTooltip
                  className="mt-[-8px]"
                  text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
                />
              </Container>

              <Container intent="grid-3" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Bottle Size
                  </Text>
                  <DropDown
                    items={wineBottleSizes}
                    id="natural"
                    isRequired
                    fullWidth
                    selectedValue={
                      (wineForm.formData.packagingAndBranding
                        .bottleSize as string) || ""
                    }
                    onSelect={(data: string) => {
                      wineForm.formData.packagingAndBranding.bottleSize = data;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          packagingAndBranding: {
                            ...wineForm.formData.packagingAndBranding,
                            bottleSize:
                              wineForm.formData.packagingAndBranding.bottleSize,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Closure Types
                  </Text>
                  <SelectCrud
                    list={closureTypes as string[]}
                    selectedValue=""
                    initialItems={
                      wineForm.formData.packagingAndBranding
                        .closureType as string[]
                    }
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          packagingAndBranding: {
                            ...wineForm.formData.packagingAndBranding,
                            closureType: items,
                          },
                        },
                      });
                    }}
                  />
                </Container>
                <Container intent="flexColLeft" gap="xsmall">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text intent="p1" variant="dim" className="font-semibold">
                      Extra Packaging
                    </Text>
                  </Container>

                  <input
                    type="text"
                    placeholder=""
                    value={
                      (wineForm.formData.packagingAndBranding
                        .extraPackaging as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.packagingAndBranding.extraPackaging =
                        event.target.value;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          packagingAndBranding: {
                            ...wineForm.formData.packagingAndBranding,
                            extraPackaging:
                              wineForm.formData.packagingAndBranding
                                .extraPackaging,
                          },
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
              </Container>

              <Container intent="flexRowLeft" gap="xsmall">
                <Text
                  intent="h5"
                  variant="accent"
                  className="mb-[8px] font-semibold"
                >
                  Wine Blend
                </Text>
                <InfoTooltip
                  className="mt-[-8px]"
                  text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
                />
              </Container>

              {wineForm.formData.blendComponents.length > 0 && (
                <Container intent="flexRowLeft" gap="xsmall">
                  <BlendComponentCrud
                    components={
                      wineForm.formData.blendComponents as BlendComponent[]
                    }
                    onSave={() => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          blendComponents: wineForm.formData.blendComponents,
                        },
                      });
                    }}
                  />
                </Container>
              )}

              {/* Buttons */}

              <Container intent="flexRowRight" py="medium" gap="medium">
                <Button
                  intent="secondary"
                  size="medium"
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  intent="primary"
                  size="medium"
                  onClick={() => {
                    // ? We need to make sure that the form is set to not MINIFIED before saving
                    wineForm.isMinified = false;
                    updateWineForm(wineForm);
                  }}
                >
                  Save
                </Button>
              </Container>
            </Container>
          </form>
        </>
      )}
    </>
  );
};
