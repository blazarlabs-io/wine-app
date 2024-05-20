"use client";

import {
  Button,
  Container,
  DropDown,
  Text,
  TextInputCrud,
  InfoTooltip,
  CheckBox,
  SpinnerLoader,
  TextAndNumberInputCrud,
  GrapeCrud,
} from "@/components";
import { useForms } from "@/context/FormsContext";
import { useAuth } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { blendComonetnInitialData } from "@/data/blendComonetnInitialData";
import { BlendComponent, GrapeVariety } from "@/typings/winery";
import { countryList } from "@/utils/data";
import { uploadWineImageToStorage } from "@/utils/firestore";
import { restrictNumberInput } from "@/utils/validators/restrictNumberInput";
import { validateFileSizeAndType } from "@/utils/validators/validateFileSizeAndType";
import { useEffect, useRef, useState } from "react";
import { useGetGrapeVarieties } from "@/hooks/useGetGrapeVarieties";

export interface BasicFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export const BasicForm = ({ onSave, onCancel }: BasicFormProps) => {
  const { updateModal } = useModal();
  const { wineTypes, wineBottleSizes, wineColours, wineryGeneralInfo } =
    useRealtimeDb();
  const { wineForm, updateWineForm } = useForms();
  const { grapesVarieties } = useGetGrapeVarieties();

  const inputFileRef = useRef<any>(null);

  const { user } = useAuth();

  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [dataReady, setDataReady] = useState<boolean>(false);

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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSave();
  };

  useEffect(() => {
    // if empty push initial empty data to blend components
    if (wineForm.formData.blendComponents.length === 0) {
      const components: BlendComponent[] = [];
      components.push(blendComonetnInitialData);

      updateWineForm({
        ...wineForm,
        formData: {
          ...wineForm.formData,
          blendComponents: components,
        },
      });

      setDataReady(true);
    } else {
      setDataReady(true);
    }
  }, [wineForm]);

  return (
    <>
      <div className="h-[1px] bg-on-surface-dark/50 w-full my-[24px]" />
      <Container intent="flexRowLeft">
        <Text intent="h5" variant="accent" className="mb-[32px] font-semibold">
          General Information
        </Text>
      </Container>
      {/* First Row */}
      {dataReady && wineForm.formData.blendComponents.length > 0 && (
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

                <Container intent="flexColLeft" gap="xsmall" className="w-full">
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
                </Container>
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
              </Container>

              {/* Fourth Row */}
              <Container intent="grid-3" gap="small" className="w-full">
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
                <Container intent="flexColLeft" gap="xsmall" className="w-full">
                  <Container intent="flexRowLeft" gap="xsmall">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      Controlled Designation of Origin
                    </Text>
                    <InfoTooltip
                      width={200}
                      text="Are the grapes from a vineyard that is internationally acknowledged CDO?"
                    />
                  </Container>
                  <input
                    type="text"
                    placeholder=""
                    value={
                      (wineForm.formData.blendComponents[0].vineyardDetails
                        .controlledDesignationOfOrigin as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.blendComponents[0].vineyardDetails.controlledDesignationOfOrigin =
                        event.target.value;
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          blendComponents: [
                            {
                              ...wineForm.formData.blendComponents[0],
                              vineyardDetails: {
                                ...wineForm.formData.blendComponents[0]
                                  .vineyardDetails,
                                controlledDesignationOfOrigin:
                                  wineForm.formData.blendComponents[0]
                                    .vineyardDetails
                                    .controlledDesignationOfOrigin,
                              },
                            },
                          ],
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
                  Ingredients
                </Text>
                <InfoTooltip
                  className="mt-[-8px]"
                  text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
                />
              </Container>

              {/* FITH ROW */}
              <Container intent="flexColLeft" gap="medium" className="w-full">
                <Container intent="flexRowLeft" gap="xsmall">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    * Grapes Varieties
                  </Text>
                  <InfoTooltip text="Add each grape variety and its percentage in the wine" />
                </Container>
                <GrapeCrud
                  initialItem={grapesVarieties[0] as GrapeVariety}
                  onItemsChange={(item: GrapeVariety | null) => {
                    wineForm.formData.blendComponents[0].ingredients.grapesVarieties.list[0] =
                      item as GrapeVariety;
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
                              grapesVarieties: {
                                ...wineForm.formData.blendComponents[0]
                                  .ingredients.grapesVarieties,
                                list: [item as GrapeVariety],
                              },
                            },
                            vineyardDetails: {
                              ...wineForm.formData.blendComponents[0]
                                .vineyardDetails,
                              grapeGrown: item as GrapeVariety,
                            },
                          },
                        ],
                      },
                    });
                  }}
                />
              </Container>

              {/* SIXTH Row */}
              <Container intent="grid-2" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="medium" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Acidity Regulators
                  </Text>
                  <TextInputCrud
                    label="Name"
                    placeholder="e.g. Malic Acid"
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
                <Container intent="flexColLeft" gap="small" className="w-full">
                  <Container
                    intent="flexColLeft"
                    gap="small"
                    className="w-full"
                  >
                    <Text intent="p1" variant="dim" className="font-semibold">
                      Stabilizers
                    </Text>
                    <TextInputCrud
                      label="Name"
                      placeholder="e.g. Arabic Gum"
                      initialItems={
                        wineForm.formData.blendComponents[0].ingredients
                          .stabilizers.list
                      }
                      onItemsChange={(items: string[]) => {
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
                                  stabilizers: {
                                    allergens:
                                      wineForm.formData.blendComponents[0]
                                        .ingredients.stabilizers.allergens,
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
              </Container>

              {/* SEVENTH Row */}
              <Container intent="grid-2" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="medium" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Fining Agents
                  </Text>
                  <Container
                    intent="flexRowLeft"
                    gap="small"
                    className="max-w-fit"
                  >
                    <CheckBox
                      label="Isinglass"
                      checked={wineForm.formData.blendComponents[0].ingredients.finingAgents.allergens.list.includes(
                        "Isinglass (Fish Allergen)"
                      )}
                      onCheck={(state: boolean) => {
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
                                  finingAgents: {
                                    allergens: {
                                      has: state,
                                      list: [
                                        ...wineForm.formData.blendComponents[0]
                                          .ingredients.finingAgents.allergens
                                          .list,
                                        "Isinglass (Fish Allergen)",
                                      ],
                                    },
                                    has: true,
                                    list: [
                                      ...wineForm.formData.blendComponents[0]
                                        .ingredients.finingAgents.list,
                                      "Isinglass",
                                    ],
                                  },
                                },
                              },
                            ],
                          },
                        });
                      }}
                    />
                    <CheckBox
                      label="Casein"
                      checked={wineForm.formData.blendComponents[0].ingredients.finingAgents.allergens.list.includes(
                        "Casein (Milk Allergen)"
                      )}
                      onCheck={(state: boolean) => {
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
                                  finingAgents: {
                                    allergens: {
                                      has: state,
                                      list: [
                                        ...wineForm.formData.blendComponents[0]
                                          .ingredients.finingAgents.allergens
                                          .list,
                                        "Casein (Milk Allergen)",
                                      ],
                                    },
                                    has: true,
                                    list: [
                                      ...wineForm.formData.blendComponents[0]
                                        .ingredients.finingAgents.list,
                                      "Casein",
                                    ],
                                  },
                                },
                              },
                            ],
                          },
                        });
                      }}
                    />
                  </Container>
                  <TextInputCrud
                    label="Name"
                    placeholder="e.g. Potassium sorbate"
                    initialItems={
                      wineForm.formData.blendComponents[0].ingredients
                        .finingAgents.list
                    }
                    onItemsChange={(items: string[]) => {
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
                                finingAgents: {
                                  allergens:
                                    wineForm.formData.blendComponents[0]
                                      .ingredients.finingAgents.allergens,
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
                <Container intent="flexColLeft" gap="medium" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Preservatives
                  </Text>
                  <CheckBox
                    label="Sulphites"
                    checked={
                      wineForm.formData.blendComponents[0].ingredients
                        .preservatives.allergens.has
                    }
                    onCheck={(state: boolean) => {
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
                                preservatives: {
                                  allergens: {
                                    has: state,
                                    list: [
                                      ...wineForm.formData.blendComponents[0]
                                        .ingredients.preservatives.allergens
                                        .list,
                                      "Sulphites",
                                    ],
                                  },
                                  has: true,
                                  list: [
                                    ...wineForm.formData.blendComponents[0]
                                      .ingredients.preservatives.list,
                                    "Sulphites",
                                  ],
                                },
                              },
                            },
                          ],
                        },
                      });
                    }}
                  />
                  <TextInputCrud
                    label="Name"
                    placeholder="e.g. Sulphites"
                    initialItems={
                      wineForm.formData.blendComponents[0].ingredients
                        .preservatives.list
                    }
                    onItemsChange={(items: string[]) => {
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
                                preservatives: {
                                  allergens:
                                    wineForm.formData.blendComponents[0]
                                      .ingredients.preservatives.allergens,
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

              {/* EIGHTH Row */}
              <Container intent="grid-2" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="small" className="w-full">
                  <Container
                    intent="flexColLeft"
                    gap="small"
                    className="w-full"
                  >
                    <Text intent="p1" variant="dim" className="font-semibold">
                      Antioxidants
                    </Text>
                    <TextInputCrud
                      label="Name"
                      placeholder="e.g. Gallic Acid (GA)"
                      initialItems={
                        wineForm.formData.blendComponents[0].ingredients
                          .antioxidants.list
                      }
                      onItemsChange={(items: string[]) => {
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
                                  antioxidants: {
                                    allergens:
                                      wineForm.formData.blendComponents[0]
                                        .ingredients.antioxidants.allergens,
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
                <Container intent="flexColLeft" gap="small" className="w-full">
                  <Container intent="flexRowLeft" gap="small">
                    <Container
                      intent="flexRowLeft"
                      gap="xsmall"
                      className="mb-[28px]"
                    >
                      <Text intent="p1" variant="dim" className="font-semibold">
                        * Sugars (g/100g)
                      </Text>
                      <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                    </Container>
                  </Container>
                  <input
                    type="number"
                    required
                    placeholder=""
                    value={
                      (wineForm.formData.blendComponents[0].ingredients
                        .sugars as string) || ""
                    }
                    onChange={(event: any) => {
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
                                sugars: event.target.value,
                              },
                            },
                          ],
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                </Container>
              </Container>
              <Container
                intent="grid-2"
                gap="small"
                className="w-full"
              ></Container>

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
                    onSave();
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
