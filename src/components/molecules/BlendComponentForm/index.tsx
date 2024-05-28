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

  const [selectedGrape, setSelectedGrape] = useState<Grape | null>(null);

  return (
    <>
      {componentIndex !== null && (
        <form className="fixed flex items-center justify-center top-0 left-0 z-[999] w-full h-full bg-black/80 backdrop-blur-sm">
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
              <Container intent="flexColLeft" gap="small">
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
                  <Container intent="grid-3" gap="xsmall" className="w-full">
                    <Container intent="flexColLeft" gap="xsmall" className="">
                      <Text intent="p2" variant="dim" className="font-semibold">
                        Name
                      </Text>
                      <input
                        type="text"
                        required
                        value={
                          (wineForm.formData.blendComponents[componentIndex]
                            .vineyardDetails.grape?.name as string) || ""
                        }
                        onChange={(event: any) => {
                          const newItem = {
                            name: event.target.value,
                            percentage:
                              component.vineyardDetails.grape?.percentage,
                            vintageYear:
                              component.vineyardDetails.grape?.vintageYear,
                          };

                          setSelectedGrape(newItem);

                          wineForm.formData.blendComponents[
                            componentIndex
                          ].vineyardDetails.grape = newItem;

                          updateWineForm({
                            ...wineForm,
                            formData: {
                              ...wineForm.formData,
                              blendComponents:
                                wineForm.formData.blendComponents,
                            },
                          });
                        }}
                        className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                      />
                    </Container>

                    <Container
                      intent="flexColLeft"
                      gap="xsmall"
                      className="w-full"
                    >
                      <Text intent="p2" variant="dim" className="font-semibold">
                        Percentage %
                      </Text>
                      <input
                        type="number"
                        value={
                          (wineForm.formData.blendComponents[componentIndex]
                            .vineyardDetails.grape?.percentage as string) || ""
                        }
                        onChange={(event: any) => {
                          const newItem = {
                            name: component.vineyardDetails.grape?.name,
                            percentage: event.target.value,
                            vintageYear:
                              component.vineyardDetails.grape?.vintageYear,
                          };

                          setSelectedGrape(newItem);

                          wineForm.formData.blendComponents[
                            componentIndex
                          ].vineyardDetails.grape = newItem;

                          updateWineForm({
                            ...wineForm,
                            formData: {
                              ...wineForm.formData,
                              blendComponents:
                                wineForm.formData.blendComponents,
                            },
                          });
                        }}
                        className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                      />
                    </Container>
                    <Container
                      intent="flexColLeft"
                      gap="xsmall"
                      className="w-full"
                    >
                      <Text intent="p2" variant="dim" className="font-semibold">
                        Vintage Year
                      </Text>
                      <DropDown
                        isRequired
                        id="vintageYear"
                        items={vintageYearList.sort()}
                        fullWidth
                        selectedValue={
                          wineForm.formData.blendComponents[componentIndex]
                            .vineyardDetails.grape?.vintageYear
                            ? wineForm.formData.blendComponents[
                                componentIndex
                              ].vineyardDetails.grape?.vintageYear.toString()
                            : ""
                        }
                        onSelect={(data: string) => {
                          const newItem: Grape = {
                            name: component.vineyardDetails.grape
                              ?.name as string,
                            vintageYear: parseInt(data as string),
                            percentage: component.vineyardDetails.grape
                              ?.percentage as string,
                          };

                          setSelectedGrape(newItem);

                          wineForm.formData.blendComponents[
                            componentIndex
                          ].vineyardDetails.grape = newItem;

                          updateWineForm({
                            ...wineForm,
                            formData: {
                              ...wineForm.formData,
                              blendComponents:
                                wineForm.formData.blendComponents,
                            },
                          });
                        }}
                      />
                    </Container>
                  </Container>
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
                type="button"
                className=""
                onClick={() => onSave()}
              >
                Save
              </Button>
            </Container>
          </Container>
        </form>
      )}
    </>
  );
};
