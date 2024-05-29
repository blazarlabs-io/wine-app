"use client";

import { BlendComponent } from "@/typings/winery";
import { Button, Container, Text } from "@/components";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { BlendComponentForm } from "@/components";
import { blendComponentInitialData } from "@/data";
import { useForms } from "@/context/FormsContext";
export interface BlendComponentCrudProps {
  components: BlendComponent[];
  onSave: () => void;
}

export const BlendComponentCrud = ({
  components,
  onSave,
}: BlendComponentCrudProps) => {
  const { updateWineForm, wineForm } = useForms();

  const [showComponentForm, setShowComponentForm] = useState<boolean>(false);
  const [componentToCreateOrEdit, setComponentToCreateOrEdit] =
    useState<BlendComponent>({} as BlendComponent);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");

  const handleAddComponent = (component: BlendComponent) => {
    console.log("handleAddComponent", wineForm.formData.blendComponents.length);

    wineForm.formData.blendComponents.push(component);
    updateWineForm({
      ...wineForm,
      formData: {
        ...wineForm.formData,
        blendComponents: wineForm.formData.blendComponents,
      },
    });

    setFormTitle("Add Component");
    setFormDescription("Add a new blend component to the wine blend.");
    setComponentToCreateOrEdit(component);
    setShowComponentForm(true);
  };

  const handleEditComponent = (component: BlendComponent) => {
    setFormTitle("Edit Component");
    setFormDescription("Edit the blend component details below.");
    setComponentToCreateOrEdit(component);
    setShowComponentForm(true);
  };

  const handleDeleteComponent = (component: BlendComponent) => {
    const updatedComponents = components.filter(
      (comp) => comp.id !== component.id
    );
    updateWineForm({
      ...wineForm,
      formData: {
        ...wineForm.formData,
        blendComponents: updatedComponents,
      },
    });
  };
  return (
    <>
      {showComponentForm && (
        <BlendComponentForm
          title={formTitle}
          description={formDescription}
          component={componentToCreateOrEdit as BlendComponent}
          onSave={() => {
            onSave();
            setShowComponentForm(false);
          }}
          onCancel={() => {
            setShowComponentForm(false);
            wineForm.formData.blendComponents.pop();
            updateWineForm({
              ...wineForm,
              formData: {
                ...wineForm.formData,
                blendComponents: wineForm.formData.blendComponents,
              },
            });
          }}
        />
      )}
      {components && (
        <>
          <Container intent="flexColLeft" gap="medium">
            {components.map((component, index) => {
              return (
                <div key={`${component.id}-${index}`} className="w-full">
                  {component.id && (
                    <Container
                      intent="flexRowBetween"
                      px="small"
                      py="xsmall"
                      className="rounded-lg border-[1.5px] border-primary-light/50 bg-surface-light/30"
                    >
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          handleEditComponent(component);
                        }}
                      >
                        <Container
                          intent="flexColLeft"
                          gap="small"
                          px="medium"
                          py="small"
                        >
                          <Text
                            intent="p1"
                            className="text-primary-light font-semibold"
                          >
                            {component.name ||
                              component.vineyardDetails.grape?.name ||
                              "Component Name"}
                          </Text>
                        </Container>
                      </button>
                      <div className="flex items-center max-w-fit gap-[0px] justify-center">
                        <Button
                          intent="unstyled"
                          className="text-surface-dark  px-[16px] py-[14px] rounded-md"
                          onClick={() => {
                            handleEditComponent(component);
                          }}
                        >
                          <Icon
                            icon="ant-design:edit-outlined"
                            className="w-[20px] h-[20px] text-status-warning"
                          />
                        </Button>
                        <Button
                          intent="unstyled"
                          className="text-surface-dark px-[16px] py-[14px] rounded-md"
                          onClick={() => {
                            handleDeleteComponent(component);
                          }}
                        >
                          <Icon
                            icon="ph:trash"
                            className="w-[20px] h-[20px] text-status-error"
                          />
                        </Button>
                      </div>
                    </Container>
                  )}
                </div>
              );
            })}
            <Button
              intent="unstyled"
              type="button"
              onClick={() => {
                const newComponent: BlendComponent = blendComponentInitialData;
                handleAddComponent(newComponent);
              }}
              className="flex gap-[8px] items-center justify-center text-primary-light font-semibold"
            >
              <Icon
                icon="mdi:plus"
                width={20}
                height={20}
                className="mt-[-4px]"
              />
              Add component
            </Button>
          </Container>
        </>
      )}
    </>
  );
};
