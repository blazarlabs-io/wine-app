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
  MinifiedGrapeCrud,
  WineThumbnail,
} from "@/components";
import { useForms } from "@/context/FormsContext";
import { useAuth } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { Grape } from "@/typings/winery";
import { countryList } from "@/data";
import { uploadWineImageToStorage } from "@/utils/firestore";
import { restrictNumberInput } from "@/utils/validators/restrictNumberInput";
import { validateFileSizeAndType } from "@/utils/validators/validateFileSizeAndType";
import { useEffect, useRef, useState } from "react";
import { useIntegrateMinifiedAndExtendedWines } from "@/hooks/useIntegrateMinifiedAndExtendedWines";

export interface BasicFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export const BasicForm = ({ onSave, onCancel }: BasicFormProps) => {
  const { updateModal } = useModal();
  const { wineTypes, wineBottleSizes, wineColours, wineryGeneralInfo } =
    useRealtimeDb();
  const { wineForm, updateWineForm } = useForms();
  const { formsIntegrated } = useIntegrateMinifiedAndExtendedWines();
  const inputFileRef = useRef<any>(null);

  const { user } = useAuth();

  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

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
            minifiedWine: {
              ...wineForm.formData.minifiedWine,
              wineImageUrl: url,
            },
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

  // * Update the wine form with integrated data
  // useEffect(() => {
  //   if (formsIntegrated) {
  //     setDataReady(true);
  //   }
  // }, [formsIntegrated]);

  // * VALIDATE DATA
  useEffect(() => {
    if (
      wineForm.formData.minifiedWine.country.length > 0 &&
      wineForm.formData.minifiedWine.wineCollectionName.length > 0 &&
      wineForm.formData.minifiedWine.wineType.length > 0 &&
      wineForm.formData.minifiedWine.bottleSize.length > 0 &&
      wineForm.formData.minifiedWine.wineColour.length > 0 &&
      wineForm.formData.minifiedWine.alcoholLevel.length > 0 &&
      wineForm.formData.minifiedWine.grapes.length > 0 &&
      wineForm.formData.minifiedWine.residualSugar.length > 0
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [wineForm.formData.minifiedWine]);

  return (
    <>
      <div className="h-[1px] bg-on-surface-dark/50 w-full my-[24px]" />
      <Container intent="flexRowLeft">
        <Text intent="h5" variant="accent" className="mb-[32px] font-semibold">
          General Information
        </Text>
      </Container>
      {/* First Row */}
      {wineForm.formData.minifiedWine && (
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
                    value={wineForm.formData.minifiedWine.upc || ""}
                    onChange={(event: any) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            upc: event.target.value,
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
                      imageUrl={wineForm.formData.minifiedWine.wineImageUrl}
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
                            variant="warning"
                            className="font-semibold"
                          >
                            Uploading
                          </Text>
                          <SpinnerLoader color="#FEDD68" />
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
                    value={wineForm.formData.minifiedWine.wineryName || ""}
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
                      wineForm.formData.minifiedWine.wineCollectionName || ""
                    }
                    onChange={(event: any) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            wineCollectionName: event.target.value,
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
                    selectedValue={wineForm.formData.minifiedWine.country}
                    onSelect={(data: string) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            country: data,
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
                    selectedValue={wineForm.formData.minifiedWine.wineType}
                    onSelect={(data: string) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            wineType: data,
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
                    selectedValue={wineForm.formData.minifiedWine.bottleSize}
                    onSelect={(data: string) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            bottleSize: data,
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
                    selectedValue={wineForm.formData.minifiedWine.wineColour}
                    onSelect={(data: string) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            wineColour: data,
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
                      value={wineForm.formData.minifiedWine.alcoholLevel || ""}
                      onChange={(event: any) => {
                        const restrictedVal = restrictNumberInput(
                          0,
                          100,
                          event.target.value
                        );
                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            minifiedWine: {
                              ...wineForm.formData.minifiedWine,
                              alcoholLevel: restrictedVal.toString(),
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
                      wineForm.formData.minifiedWine
                        .controlledDesignationOfOrigin || ""
                    }
                    onChange={(event: any) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            controlledDesignationOfOrigin: event.target.value,
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
                <MinifiedGrapeCrud
                  initialItems={
                    wineForm.formData.minifiedWine.grapes as Grape[]
                  }
                  onItemAdd={(items: Grape[] | null) => {
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        minifiedWine: {
                          ...wineForm.formData.minifiedWine,
                          grapes: items as Grape[],
                        },
                      },
                    });
                  }}
                  onItemDelete={(item: Grape[] | null) => {
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        minifiedWine: {
                          ...wineForm.formData.minifiedWine,
                          grapes: item as Grape[],
                        },
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
                      wineForm.formData.minifiedWine.blendIngredients
                        ?.acidityRegulators?.list
                    }
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            blendIngredients: {
                              ...wineForm.formData.minifiedWine
                                .blendIngredients,
                              acidityRegulators: {
                                allergens: {
                                  has: wineForm.formData.minifiedWine
                                    .blendIngredients?.acidityRegulators
                                    ?.allergens.has,
                                  list: wineForm.formData.minifiedWine
                                    .blendIngredients?.acidityRegulators
                                    ?.allergens.list,
                                },
                                has: true,
                                list: items,
                              },
                            },
                          },
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
                        wineForm.formData.minifiedWine.blendIngredients
                          ?.stabilizers.list
                      }
                      onItemsChange={(items: string[]) => {
                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            minifiedWine: {
                              ...wineForm.formData.minifiedWine,
                              blendIngredients: {
                                ...wineForm.formData.minifiedWine
                                  .blendIngredients,
                                stabilizers: {
                                  allergens: {
                                    has: wineForm.formData.minifiedWine
                                      .blendIngredients?.stabilizers?.allergens
                                      .has,
                                    list: wineForm.formData.minifiedWine
                                      .blendIngredients?.stabilizers?.allergens
                                      .list,
                                  },
                                  has: true,
                                  list: items,
                                },
                              },
                            },
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
                      checked={wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens.list.includes(
                        "Isinglass (Fish Allergen)"
                      )}
                      onCheck={(state: boolean) => {
                        if (state) {
                          wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens?.list.push(
                            "Isinglass (Fish Allergen)"
                          );
                        } else {
                          const index =
                            wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens?.list.indexOf(
                              "Isinglass (Fish Allergen)"
                            );
                          if (index > -1) {
                            wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens?.list.splice(
                              index,
                              1
                            );
                          }
                        }
                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            minifiedWine: {
                              ...wineForm.formData.minifiedWine,
                              blendIngredients: {
                                ...wineForm.formData.minifiedWine
                                  .blendIngredients,
                                finingAgents: {
                                  allergens: {
                                    has: state,
                                    list: wineForm.formData.minifiedWine
                                      .blendIngredients?.finingAgents?.allergens
                                      ?.list,
                                  },
                                  has: true,
                                  list: [
                                    ...wineForm.formData.minifiedWine
                                      .blendIngredients?.finingAgents?.list,
                                  ],
                                },
                              },
                            },
                          },
                        });
                      }}
                    />
                    <CheckBox
                      label="Casein"
                      checked={wineForm.formData.minifiedWine.blendIngredients?.finingAgents.allergens?.list.includes(
                        "Casein (Milk Allergen)"
                      )}
                      onCheck={(state: boolean) => {
                        if (state) {
                          wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens?.list.push(
                            "Casein (Milk Allergen)"
                          );
                        } else {
                          const index =
                            wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens?.list.indexOf(
                              "Casein (Milk Allergen)"
                            );
                          if (index > -1) {
                            wineForm.formData.minifiedWine.blendIngredients?.finingAgents?.allergens?.list.splice(
                              index,
                              1
                            );
                          }
                        }

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            minifiedWine: {
                              ...wineForm.formData.minifiedWine,
                              blendIngredients: {
                                ...wineForm.formData.minifiedWine
                                  .blendIngredients,
                                finingAgents: {
                                  allergens: {
                                    has: state,
                                    list: wineForm.formData.minifiedWine
                                      .blendIngredients?.finingAgents?.allergens
                                      ?.list,
                                  },
                                  has: true,
                                  list: [
                                    ...wineForm.formData.minifiedWine
                                      .blendIngredients?.finingAgents?.list,
                                  ],
                                },
                              },
                            },
                          },
                        });
                      }}
                    />
                  </Container>
                  <TextInputCrud
                    label="Name"
                    placeholder="e.g. Potassium sorbate"
                    initialItems={
                      wineForm.formData.minifiedWine.blendIngredients
                        ?.finingAgents?.list
                    }
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            blendIngredients: {
                              ...wineForm.formData.minifiedWine
                                .blendIngredients,
                              finingAgents: {
                                allergens: {
                                  has: wineForm.formData.minifiedWine
                                    .blendIngredients?.finingAgents?.allergens
                                    ?.has,
                                  list: wineForm.formData.minifiedWine
                                    .blendIngredients?.finingAgents?.allergens
                                    ?.list,
                                },
                                has: true,
                                list: items,
                              },
                            },
                          },
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
                      wineForm.formData.minifiedWine.blendIngredients
                        ?.preservatives.allergens.has
                    }
                    onCheck={(state: boolean) => {
                      if (state) {
                        wineForm.formData.minifiedWine.blendIngredients?.preservatives?.allergens?.list.push(
                          "Sulphites"
                        );
                      } else {
                        const index =
                          wineForm.formData.minifiedWine.blendIngredients?.preservatives?.allergens?.list.indexOf(
                            "Sulphites"
                          );
                        if (index > -1) {
                          wineForm.formData.minifiedWine.blendIngredients?.preservatives?.allergens?.list.splice(
                            index,
                            1
                          );
                        }
                      }

                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            blendIngredients: {
                              ...wineForm.formData.minifiedWine
                                .blendIngredients,
                              preservatives: {
                                allergens: {
                                  has: state,
                                  list: wineForm.formData.minifiedWine
                                    .blendIngredients?.preservatives?.allergens
                                    ?.list,
                                },
                                has: true,
                                list: [
                                  ...wineForm.formData.minifiedWine
                                    .blendIngredients?.preservatives?.list,
                                ],
                              },
                            },
                          },
                        },
                      });
                    }}
                  />
                  <TextInputCrud
                    label="Name"
                    placeholder="e.g. Sulphites"
                    initialItems={
                      wineForm.formData.minifiedWine.blendIngredients
                        ?.preservatives.list
                    }
                    onItemsChange={(items: string[]) => {
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            blendIngredients: {
                              ...wineForm.formData.minifiedWine
                                .blendIngredients,
                              preservatives: {
                                allergens: {
                                  has: wineForm.formData.minifiedWine
                                    .blendIngredients?.preservatives?.allergens
                                    ?.has,
                                  list: wineForm.formData.minifiedWine
                                    .blendIngredients?.preservatives?.allergens
                                    ?.list,
                                },
                                has: true,
                                list: items,
                              },
                            },
                          },
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
                        wineForm.formData.minifiedWine.blendIngredients
                          ?.antioxidants.list
                      }
                      onItemsChange={(items: string[]) => {
                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            minifiedWine: {
                              ...wineForm.formData.minifiedWine,
                              blendIngredients: {
                                ...wineForm.formData.minifiedWine
                                  .blendIngredients,
                                antioxidants: {
                                  allergens: {
                                    has: wineForm.formData.minifiedWine
                                      .blendIngredients?.antioxidants?.allergens
                                      ?.has,
                                    list: wineForm.formData.minifiedWine
                                      .blendIngredients?.antioxidants?.allergens
                                      ?.list,
                                  },
                                  has: true,
                                  list: items,
                                },
                              },
                            },
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
                    min="0"
                    max="100"
                    step={0.5}
                    placeholder=""
                    value={wineForm.formData.minifiedWine.residualSugar || ""}
                    onChange={(event: any) => {
                      const restrictedVal = restrictNumberInput(
                        0,
                        100,
                        event.target.value
                      );
                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          minifiedWine: {
                            ...wineForm.formData.minifiedWine,
                            residualSugar: restrictedVal.toString(),
                          },
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
                  disabled={!validated}
                  onClick={() => {
                    // onSave();
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
