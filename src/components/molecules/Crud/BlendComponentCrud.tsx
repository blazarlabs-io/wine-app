"use client";

import {
  BlendComponent,
  GrapeVariety,
  VineyardGrapeGrownWithCoordinates,
} from "@/typings/winery";
import {
  Button,
  CheckBox,
  Container,
  InfoTooltip,
  SelectCrud,
  Text,
  TextAndNumberInputCrud,
  TextInputCrud,
  VineyardCoordinatesCrud,
} from "@/components";
import { useState } from "react";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useForms } from "@/context/FormsContext";

export interface BlendComponentCrudProps {
  components: BlendComponent[];
  referenceNumber: string;
  onSave: (item: BlendComponent) => void;
}

export const BlendComponentCrud = ({
  components,
  referenceNumber,
  onSave,
}: BlendComponentCrudProps) => {
  const { irrigationPractices } = useRealtimeDb();
  const { wineForm, updateWineForm } = useForms();
  const [showComponentEditor, setShowComponentEditor] =
    useState<boolean>(false);
  const [componentToEdit, setComponentToEdit] = useState<BlendComponent>(
    {} as BlendComponent
  );
  return (
    <>
      {showComponentEditor && (
        <div className="fixed flex items-center justify-center top-0 left-0 z-[999] w-full h-full bg-black/80 backdrop-blur-sm">
          <Container
            intent="flexColLeft"
            px="large"
            py="medium"
            gap="medium"
            className="bg-surface max-w-[800px] rounded-lg max-h-[90vh] overflow-y-auto"
          >
            <Text intent="h4">Edit Blend Component</Text>
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
            <Container intent="grid-2">
              <Container intent="flexColLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Name your blend component
                </Text>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={(componentToEdit?.name as string) || ""}
                  onChange={(event: any) => {
                    console.log(event.target.value);
                    componentToEdit.name = event.target.value;
                    setComponentToEdit(componentToEdit);
                    wineForm.formData.blendComponents[0].name =
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
            <Container intent="flexColLeft" gap="medium" className="w-full">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Grapes Varieties
                </Text>
                <InfoTooltip text="Add each grape variety and its percentage in the wine" />
              </Container>
              <TextAndNumberInputCrud
                initialItems={
                  componentToEdit?.ingredients?.grapesVarieties
                    .list as GrapeVariety[]
                }
                onItemsChange={(items: GrapeVariety[] | string[]) => {
                  componentToEdit.ingredients.grapesVarieties.list =
                    items as GrapeVariety[];
                  setComponentToEdit(componentToEdit);

                  wineForm.formData.blendComponents[0].ingredients.grapesVarieties.list =
                    items as GrapeVariety[];

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
            <Container intent="grid-2" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Acidity Regulators
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Malic Acid"
                  initialItems={
                    componentToEdit?.ingredients.acidityRegulators
                      .list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    componentToEdit.ingredients.acidityRegulators.list = items;
                    setComponentToEdit(componentToEdit);

                    wineForm.formData.blendComponents[0].ingredients.acidityRegulators.list =
                      items;

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
                    componentToEdit?.ingredients.stabilizers.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    componentToEdit.ingredients.stabilizers.list = items;
                    setComponentToEdit(componentToEdit);

                    wineForm.formData.blendComponents[0].ingredients.stabilizers.list =
                      items;

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
                      componentToEdit?.ingredients.finingAgents.allergens.list.includes(
                        "Isinglass (Fish Allergen)"
                      ) as boolean
                    }
                    onCheck={(state: boolean) => {
                      if (componentToEdit) {
                        if (state) {
                          componentToEdit.ingredients.finingAgents.allergens.list.push(
                            "Isinglass (Fish Allergen)"
                          );

                          wineForm.formData.blendComponents[0].ingredients.finingAgents.allergens.list.push(
                            "Isinglass (Fish Allergen)"
                          );
                        } else {
                          componentToEdit.ingredients.finingAgents.allergens.list =
                            componentToEdit.ingredients.finingAgents.allergens.list.filter(
                              (item) => item !== "Isinglass (Fish Allergen)"
                            );

                          wineForm.formData.blendComponents[0].ingredients.finingAgents.allergens.list =
                            componentToEdit.ingredients.finingAgents.allergens.list.filter(
                              (item) => item !== "Isinglass (Fish Allergen)"
                            );
                        }
                        setComponentToEdit(componentToEdit);

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
                      componentToEdit?.ingredients.finingAgents.allergens.list.includes(
                        "Casein (Milk Allergen)"
                      ) as boolean
                    }
                    onCheck={(state: boolean) => {
                      if (componentToEdit) {
                        if (state) {
                          componentToEdit.ingredients.finingAgents.allergens.list.push(
                            "Casein (Milk Allergen)"
                          );
                        } else {
                          componentToEdit.ingredients.finingAgents.allergens.list =
                            componentToEdit.ingredients.finingAgents.allergens.list.filter(
                              (item) => item !== "Casein (Milk Allergen)"
                            );
                        }
                        setComponentToEdit(componentToEdit);
                      }
                    }}
                  />
                </Container>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Potassium sorbate"
                  initialItems={
                    componentToEdit?.ingredients.finingAgents.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    if (componentToEdit) {
                      componentToEdit.ingredients.finingAgents.list = items;
                      setComponentToEdit(componentToEdit);
                    }
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
                    componentToEdit?.ingredients.preservatives.allergens
                      .has as boolean
                  }
                  onCheck={(state: boolean) => {
                    if (componentToEdit) {
                      componentToEdit.ingredients.preservatives.allergens.has =
                        state;
                      setComponentToEdit(componentToEdit);
                    }
                  }}
                />
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Sulphites"
                  initialItems={
                    componentToEdit?.ingredients.preservatives.list as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    if (componentToEdit) {
                      componentToEdit.ingredients.preservatives.list = items;
                      setComponentToEdit(componentToEdit);
                    }
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
                      componentToEdit?.ingredients.antioxidants.list as string[]
                    }
                    onItemsChange={(items: string[]) => {
                      if (componentToEdit) {
                        componentToEdit.ingredients.antioxidants.list = items;
                        setComponentToEdit(componentToEdit);
                      }
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
                  value={(componentToEdit?.ingredients.sugars as string) || ""}
                  onChange={(event: any) => {
                    componentToEdit.ingredients.sugars = event.target.value;
                    setComponentToEdit(componentToEdit);

                    wineForm.formData.blendComponents[0].ingredients.sugars =
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
                      * Controlled Designation of Origin
                    </Text>
                    <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
                  </Container>
                </Container>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={
                    (componentToEdit?.vineyardDetails
                      .controlledDesignationOfOrigin as string) || ""
                  }
                  onChange={(event: any) => {
                    componentToEdit.vineyardDetails.controlledDesignationOfOrigin =
                      event.target.value;
                    setComponentToEdit(componentToEdit);

                    wineForm.formData.blendComponents[0].vineyardDetails.controlledDesignationOfOrigin =
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
                    type="text"
                    required
                    placeholder=""
                    value={
                      (componentToEdit?.vineyardDetails.elevation as string) ||
                      ""
                    }
                    onChange={(event: any) => {
                      componentToEdit.vineyardDetails.elevation =
                        event.target.value;

                      wineForm.formData.blendComponents[0].vineyardDetails.elevation =
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
                    (componentToEdit?.vineyardDetails.orientation as string) ||
                    ""
                  }
                  onChange={(event: any) => {
                    componentToEdit.vineyardDetails.orientation =
                      event.target.value;
                    setComponentToEdit(componentToEdit);

                    wineForm.formData.blendComponents[0].vineyardDetails.orientation =
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
                    type="text"
                    required
                    placeholder=""
                    value={
                      (componentToEdit?.vineyardDetails.vinesAge as string) ||
                      ""
                    }
                    onChange={(event: any) => {
                      componentToEdit.vineyardDetails.vinesAge =
                        event.target.value;
                      setComponentToEdit(componentToEdit);

                      wineForm.formData.blendComponents[0].vineyardDetails.vinesAge =
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
                    componentToEdit?.vineyardDetails
                      .irrigationPractices as string[]
                  }
                  onItemsChange={(items: string[]) => {
                    componentToEdit.vineyardDetails.irrigationPractices = items;
                    setComponentToEdit(componentToEdit);

                    wineForm.formData.blendComponents[0].vineyardDetails.irrigationPractices =
                      items;

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
            <VineyardCoordinatesCrud
              referenceNumber={referenceNumber}
              onSave={(item: VineyardGrapeGrownWithCoordinates) => {
                if (componentToEdit) {
                  componentToEdit.vineyardDetails.coordinates =
                    item.coordinates;
                  setComponentToEdit(componentToEdit);
                  setShowComponentEditor(false);
                }
              }}
              onCancel={() => setShowComponentEditor(false)}
            />
            <Container intent="flexRowBetween"></Container>
          </Container>
        </div>
      )}
      {components &&
        components.map((component, index) => (
          <button
            type="button"
            key={index}
            onClick={() => {
              setShowComponentEditor(true);
              setComponentToEdit(component);
            }}
          >
            <Container
              intent="flexColLeft"
              gap="small"
              px="medium"
              py="small"
              className="border-[1.5px] border-primary-light rounded-lg"
            >
              <Text intent="p1">{component.name || "Component Name"}</Text>
            </Container>
          </button>
        ))}
      {/* <Container intent="flexRowRight" gap="small">
        <Button
          intent="primary"
          size="medium"
          onClick={() => {
            onSave(componentToEdit as BlendComponent);
            setShowComponentEditor(false);
            setComponentToEdit(null);
          }}
        >
          Save
        </Button>
      </Container> */}
    </>
  );
};
