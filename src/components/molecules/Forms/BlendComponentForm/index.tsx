"use client";

import {
  BlendComponent,
  CoordinateInterface,
  Grape,
  VineyardGrapeAndCoordinates,
} from "@/typings/winery";
import {
  Button,
  CheckBox,
  Container,
  DropDown,
  GrapeCrud,
  InfoTooltip,
  SelectCrud,
  Text,
  TextInputCrud,
  VineyardCoordinatesCrud,
} from "@/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useForms } from "@/context/FormsContext";
import { Icon } from "@iconify/react";
import { useGetBlendComponentIndex } from "@/hooks/useGetBlendComponentIndex";
import { useEffect, useState } from "react";
import { vintageYearList } from "@/data";

export interface BlendComponentFormProps {
  title: string;
  description: string;
  component: BlendComponent;
  onSave: () => void;
  onCancel: () => void;
}

export const BlendComponentForm = ({
  title,
  description,
  component,
  onSave,
  onCancel,
}: BlendComponentFormProps) => {
  const { irrigationPractices } = useRealtimeDb();
  const { wineForm, updateWineForm } = useForms();
  const { componentIndex } = useGetBlendComponentIndex(component);

  const maxAllowedChars = 250;

  const [selectedGrape, setSelectedGrape] = useState<Grape | null>(null);
  const [charsLeft, setCharsLeft] = useState<number>(maxAllowedChars);
  const [disableSave, setDisableSave] = useState<boolean>(true);

  const handleCharacterCount = (event: any) => {
    console.log(event.target.value.length);
    setCharsLeft(maxAllowedChars - event.target.value.length);
  };

  useEffect(() => {
    if (
      wineForm.formData.blendComponents[componentIndex as number]?.name.length >
      3
    ) {
      setDisableSave(false);
    }
  }, [wineForm.formData.blendComponents[componentIndex as number]?.name]);

  return (
    <>
      {componentIndex !== null && (
        <div className="fixed flex items-center justify-center top-0 left-0 z-[8999] w-full h-full bg-black/80 backdrop-blur-sm">
          <Container
            intent="flexColLeft"
            px="large"
            py="large"
            gap="medium"
            className="bg-surface max-w-[1080px] rounded-lg max-h-[90vh] overflow-y-auto"
          >
            <Container intent="flexRowLeft" gap="xsmall">
              <Icon
                icon="radix-icons:blending-mode"
                width="32px"
                height="32px"
                className="text-primary-light mt-[-8px]"
              />
              <Text intent="h4">{title}</Text>
            </Container>
            <Text intent="p1">{description}</Text>
            <Container intent="flexRowLeft" gap="xsmall">
              <Text
                intent="h5"
                variant="accent"
                className="mb-[8px] font-semibold"
              >
                Name
              </Text>
              <InfoTooltip
                className="mt-[-8px]"
                text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
              />
            </Container>
            <Container intent="grid-2" gap="small">
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Name your blend component
                </Text>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={
                    (wineForm.formData.blendComponents[componentIndex]
                      .name as string) || ""
                  }
                  onChange={(event: any) => {
                    wineForm.formData.blendComponents[componentIndex].name =
                      event.target.value;
                    wineForm.formData.blendComponents[componentIndex].id =
                      event.target.value
                        .split(" ")
                        .join("-")
                        .toLocaleLowerCase();

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
              {/* <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Blend Type
                </Text>
                <input
                  type="text"
                  placeholder=""
                  value={
                    (wineForm.formData.blendComponents[componentIndex]
                      .type as string) || ""
                  }
                  onChange={(event: any) => {
                    wineForm.formData.blendComponents[componentIndex].type =
                      event.target.value;

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container> */}
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
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Acidity Regulators
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Malic Acid"
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      .ingredients?.acidityRegulators.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].ingredients.acidityRegulators.list = items;

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
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Stabilizers
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Arabic Gum"
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      .ingredients?.stabilizers?.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].ingredients.stabilizers.list = items;

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
            </Container>
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
                    checked={
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].ingredients?.finingAgents?.allergens.list.includes(
                        "Isinglass (Fish Allergen)"
                      ) as boolean
                    }
                    onCheck={(state: boolean) => {
                      if (component) {
                        if (state) {
                          wineForm.formData.blendComponents[
                            componentIndex
                          ].ingredients?.finingAgents.allergens.list.push(
                            "Isinglass (Fish Allergen)"
                          );
                        } else {
                          wineForm.formData.blendComponents[
                            componentIndex
                          ].ingredients.finingAgents.allergens.list =
                            component.ingredients?.finingAgents.allergens.list.filter(
                              (item) => item !== "Isinglass (Fish Allergen)"
                            );
                        }

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            blendComponents: wineForm.formData.blendComponents,
                          },
                        });
                      }
                    }}
                  />
                  <CheckBox
                    label="Casein"
                    checked={
                      wineForm.formData.blendComponents[
                        componentIndex
                      ]?.ingredients?.finingAgents?.allergens.list.includes(
                        "Casein (Milk Allergen)"
                      ) as boolean
                    }
                    onCheck={(state: boolean) => {
                      if (component) {
                        if (state) {
                          wineForm.formData.blendComponents[
                            componentIndex
                          ].ingredients.finingAgents.allergens.list.push(
                            "Casein (Milk Allergen)"
                          );
                        } else {
                          wineForm.formData.blendComponents[
                            componentIndex
                          ].ingredients.finingAgents.allergens.list =
                            component.ingredients?.finingAgents.allergens.list.filter(
                              (item) => item !== "Casein (Milk Allergen)"
                            );
                        }

                        updateWineForm({
                          ...wineForm,
                          formData: {
                            ...wineForm.formData,
                            blendComponents: wineForm.formData.blendComponents,
                          },
                        });
                      }
                    }}
                  />
                </Container>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Potassium sorbate"
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      ?.ingredients?.finingAgents?.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    if (component) {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].ingredients.finingAgents.list = items;
                    }

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
              <Container intent="flexColLeft" gap="medium" className="w-full">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Preservatives
                </Text>
                <CheckBox
                  label="Sulphites"
                  checked={
                    wineForm.formData.blendComponents[componentIndex]
                      ?.ingredients?.preservatives?.allergens.has as boolean
                  }
                  onCheck={(state: boolean) => {
                    if (component) {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].ingredients.preservatives.allergens.has = state;
                    }

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                />
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Sulphites"
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      ?.ingredients?.preservatives.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    if (component) {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].ingredients.preservatives.list = items;
                    }

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
            </Container>
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexColLeft" gap="small" className="w-full">
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Antioxidants
                  </Text>
                  <TextInputCrud
                    label="Name"
                    placeholder="e.g. Gallic Acid (GA)"
                    initialItems={
                      wineForm.formData.blendComponents[componentIndex]
                        ?.ingredients?.antioxidants.list as string[]
                    }
                    onItemsChange={(items: string[]) => {
                      if (component) {
                        wineForm.formData.blendComponents[
                          componentIndex
                        ].ingredients.antioxidants.list = items;
                      }

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
              </Container>
            </Container>
            <Container intent="flexRowLeft" gap="xsmall">
              <Text
                intent="h5"
                variant="accent"
                className="mb-[8px] font-semibold"
              >
                Vineyard Details
              </Text>
              <InfoTooltip
                className="mt-[-8px]"
                text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
              />
            </Container>
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      Vineyard Name
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <input
                  type="text"
                  placeholder=""
                  value={
                    (wineForm.formData.blendComponents[componentIndex]
                      ?.vineyardDetails?.name as string) || ""
                  }
                  onChange={(event: any) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].vineyardDetails.name = event.target.value;

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>

              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      Controlled Designation of Origin
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <input
                  type="text"
                  placeholder=""
                  value={
                    (wineForm.formData.blendComponents[componentIndex]
                      ?.vineyardDetails
                      ?.controlledDesignationOfOrigin as string) || ""
                  }
                  onChange={(event: any) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].vineyardDetails.controlledDesignationOfOrigin =
                      event.target.value;

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
            </Container>

            <Container intent="grid-2" gap="small">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      * Orientation
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={
                    (wineForm.formData.blendComponents[componentIndex]
                      ?.vineyardDetails?.orientation as string) || ""
                  }
                  onChange={(event: any) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].vineyardDetails.orientation = event.target.value;

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      * Elevation
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <Container intent="flexRowLeft" gap="small">
                  <input
                    type="number"
                    required
                    placeholder=""
                    value={
                      (wineForm.formData.blendComponents[componentIndex]
                        ?.vineyardDetails?.elevation as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].vineyardDetails.elevation = event.target.value;

                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          blendComponents: wineForm.formData.blendComponents,
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                  <Text>Meters</Text>
                </Container>
              </Container>
            </Container>

            {/*  */}
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      * Age of Vines
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <Container intent="flexRowLeft" gap="small">
                  <input
                    type="number"
                    required
                    placeholder=""
                    value={
                      (wineForm.formData.blendComponents[componentIndex]
                        ?.vineyardDetails?.vinesAge as string) || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].vineyardDetails.vinesAge = event.target.value;

                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          blendComponents: wineForm.formData.blendComponents,
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                  <Text>Years</Text>
                </Container>
              </Container>
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      * Soil Type
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <Container intent="flexRowLeft" gap="small">
                  <TextInputCrud
                    label=""
                    placeholder="e.g. Clay"
                    initialItems={
                      wineForm.formData.blendComponents[componentIndex]
                        ?.vineyardDetails?.soilType as string[]
                    }
                    onItemsChange={(items: string[]) => {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].vineyardDetails.soilType = items;

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
              </Container>
            </Container>

            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      * Irrigation Practices
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <SelectCrud
                  dropdownLabel="Irrigation Practices"
                  list={irrigationPractices as string[]}
                  selectedValue=""
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      ?.vineyardDetails?.irrigationPractices as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].vineyardDetails.irrigationPractices = items;

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
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Container intent="flexRowLeft" gap="small">
                  <Container intent="flexRowLeft" gap="xsmall" className="">
                    <Text
                      intent="p1"
                      variant="dim"
                      className="font-semibold min-w-fit"
                    >
                      Grape
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <Container intent="flexColLeft">
                  <GrapeCrud
                    initialItem={
                      wineForm.formData.blendComponents[componentIndex]
                        .vineyardDetails.grape
                    }
                    onItemChange={(item: Grape) => {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].vineyardDetails.grape = item;

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
              </Container>
            </Container>
            <div className="flex flex-col items-start justify-start min-w-full">
              <Container
                intent="flexRowLeft"
                gap="xsmall"
                className="mt-[16px]"
              >
                <Text
                  intent="p1"
                  variant="dim"
                  className="font-semibold min-w-fit"
                >
                  * Vineyard Location
                </Text>
                <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
              </Container>
              <VineyardCoordinatesCrud
                blendComponent={
                  wineForm.formData.blendComponents[componentIndex]
                }
                grape={selectedGrape as Grape}
                onSave={(grapeAndCoordinates: VineyardGrapeAndCoordinates) => {
                  wineForm.formData.blendComponents[
                    componentIndex
                  ].vineyardDetails.grape = grapeAndCoordinates.grape;

                  wineForm.formData.blendComponents[
                    componentIndex
                  ].vineyardDetails.coordinates =
                    grapeAndCoordinates.coordinates;

                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      blendComponents: wineForm.formData.blendComponents,
                    },
                  });
                }}
                onCancel={() => {}}
                onDelete={() => {
                  wineForm.formData.blendComponents[
                    componentIndex
                  ].vineyardDetails.grape = {
                    name: "",
                    percentage: "",
                    vintageYear: 0,
                  } as Grape;

                  wineForm.formData.blendComponents[
                    componentIndex
                  ].vineyardDetails.coordinates = [] as CoordinateInterface[];

                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      blendComponents: wineForm.formData.blendComponents,
                    },
                  });
                }}
              />
            </div>

            <Container intent="flexRowLeft" gap="xsmall" className="mt-[20px]">
              <Text
                intent="h5"
                variant="accent"
                className="mb-[8px] font-semibold"
              >
                Grapes Harvesting
              </Text>
              <InfoTooltip
                className="mt-[-8px]"
                text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
              />
            </Container>
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Harvesting Method
                </Text>
                <DropDown
                  id="harvestingMethod"
                  fullWidth
                  items={[
                    "Manual harvesting",
                    "Machine harvesting",
                    "Mixed harvesting",
                  ]}
                  selectedValue={
                    wineForm.formData.blendComponents[componentIndex]
                      .grapesHarvesting.harvestMethod as string
                  }
                  onSelect={(data: string) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].grapesHarvesting.harvestMethod = data;

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
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Grapes Selection Process
                </Text>
                <DropDown
                  id="grapesSelectionProcess"
                  fullWidth
                  items={[
                    "Manual selection",
                    "Machine selection",
                    "Mixed selection",
                  ]}
                  selectedValue={
                    wineForm.formData.blendComponents[componentIndex]
                      .grapesHarvesting.selectionProcess as string
                  }
                  onSelect={(data: string) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].grapesHarvesting.selectionProcess = data;

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
              <Container
                intent="flexColLeft"
                gap="small"
                className="w-full mt-[16px]"
              >
                <Text intent="p1" variant="dim" className="font-semibold">
                  Yield per Ha
                </Text>
                <Container
                  intent="grid-2"
                  gap="xsmall"
                  className="items-center w-full"
                >
                  <input
                    required
                    type="text"
                    placeholder=""
                    value={
                      wineForm.formData.blendComponents[componentIndex]
                        .grapesHarvesting.yieldPerHectare || ""
                    }
                    onChange={(event: any) => {
                      wineForm.formData.blendComponents[
                        componentIndex
                      ].grapesHarvesting.yieldPerHectare = event.target.value;

                      updateWineForm({
                        ...wineForm,
                        formData: {
                          ...wineForm.formData,
                          blendComponents: wineForm.formData.blendComponents,
                        },
                      });
                    }}
                    className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                  />
                  <Text>Kg/Hectare</Text>
                </Container>
              </Container>
            </Container>

            <Container intent="flexRowLeft" gap="xsmall" className="mt-[20px]">
              <Text
                intent="h5"
                variant="accent"
                className="mb-[8px] font-semibold"
              >
                Fermentation Process
              </Text>
              <InfoTooltip
                className="mt-[-8px]"
                text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
              />
            </Container>

            <Container intent="flexColLeft" gap="small">
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Method Description
                </Text>
              </Container>
              <textarea
                rows={4}
                placeholder=""
                maxLength={maxAllowedChars}
                value={
                  (wineForm.formData.blendComponents[componentIndex]
                    .fermentationProcess.method as string) || ""
                }
                onChange={(event: any) => {
                  wineForm.formData.blendComponents[
                    componentIndex
                  ].fermentationProcess.method = event.target.value;

                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      blendComponents: wineForm.formData.blendComponents,
                    },
                  });
                }}
                onKeyUp={(event: any) => {
                  handleCharacterCount(event);
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] "
              />
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p2" variant="dim" className="">
                  {charsLeft} characters left
                </Text>
              </Container>
            </Container>
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Fermentation Time
                </Text>
                <TextInputCrud
                  label=""
                  placeholder="e.g. 14 days"
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      .fermentationProcess.time as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].fermentationProcess.time = items;

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
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Yeast Type
                </Text>
                <TextInputCrud
                  label=""
                  placeholder="e.g. Pasteur Red"
                  initialItems={
                    wineForm.formData.blendComponents[componentIndex]
                      .fermentationProcess.time as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].fermentationProcess.time = items;

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
            </Container>
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Malolactic Fermentation
                </Text>
                <CheckBox
                  label="Yes / No"
                  checked={
                    wineForm.formData.blendComponents[componentIndex]
                      .fermentationProcess.malolactic as boolean
                  }
                  onCheck={(state: boolean) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].fermentationProcess.malolactic = state;

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
            </Container>
            <Container intent="flexRowLeft" gap="xsmall" className="mt-[20px]">
              <Text
                intent="h5"
                variant="accent"
                className="mb-[8px] font-semibold"
              >
                Ageing Process
              </Text>
              <InfoTooltip
                className="mt-[-8px]"
                text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
              />
            </Container>
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Vessel Type
                </Text>
                <input
                  type="text"
                  placeholder=""
                  value={
                    (wineForm.formData.blendComponents[componentIndex]
                      .agingProcess.vesselType as string) || ""
                  }
                  onChange={(event: any) => {
                    wineForm.formData.blendComponents[
                      componentIndex
                    ].agingProcess.vesselType = event.target.value;

                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        blendComponents: wineForm.formData.blendComponents,
                      },
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </Container>
            </Container>
            <Container intent="flexRowRight" gap="medium">
              <Button
                intent="secondary"
                size="medium"
                type="button"
                onClick={() => onCancel()}
                className=""
              >
                Cancel
              </Button>
              <Button
                intent="primary"
                size="medium"
                type="submit"
                disabled={disableSave}
                className=""
                onClick={() => onSave()}
              >
                Save
              </Button>
            </Container>
          </Container>
        </div>
      )}
    </>
  );
};
