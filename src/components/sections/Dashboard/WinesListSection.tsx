"use client";
import { Container, Button, Text, EuLabelsAccordion } from "@/components";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { EuLabelInterface } from "@/typings/winery";
import { useForms } from "@/context/FormsContext";
import { euLabelInitData } from "@/data/euLablelInitData";
import { useModal } from "@/context/modalContext";

export const WinesListSection = () => {
  const router = useRouter();
  const { wineryEuLabels, allowedEuLabels, wineryGeneralInfo } =
    useRealtimeDb();
  const { updateEuLabelForm } = useForms();
  const { updateModal } = useModal();

  const handleMaxEuLabelsReached = () => {
    updateModal({
      title: "Error",
      description:
        "You have reached the maximum number of EU labels allowed. Please contact our team's representative and upgrade your plan to add more EU labels.",
      show: true,
      action: {
        label: "Close",
        onAction: () => {
          updateModal({
            title: "",
            description: "",
            show: false,
            action: {
              label: "",
              onAction: () => {},
            },
          });
        },
      },
    });
  };

  return (
    <>
      {wineryEuLabels && wineryEuLabels.length > 0 ? (
        <Container intent="flexColLeft" className="min-w-full">
          <Container
            intent="flexRowLeft"
            py="medium"
            gap="small"
            className="h-full"
          >
            <Button
              intent="primary"
              size="medium"
              onClick={() => {
                if (wineryEuLabels.length < allowedEuLabels) {
                  updateEuLabelForm({
                    title: "Create EU Label",
                    description:
                      "Create a new EU label for your wine. All fields marked with * are mandatory.",
                    isEditing: false,
                    formData: euLabelInitData,
                  });
                  router.push("/eu-label-form");
                } else {
                  handleMaxEuLabelsReached();
                }
              }}
              className="flex items-center gap-[8px]"
            >
              <Icon
                icon="carbon:add-filled"
                className="h-[20px] w-[20px] mt-[-4px]"
              />
              Add wine for EU Label only
            </Button>
            <Button
              intent="primary"
              size="medium"
              disabled
              className="flex items-center gap-[8px]"
            >
              <Icon
                icon="carbon:add-filled"
                className="h-[20px] w-[20px] mt-[-4px]"
              />
              Add wine for supply chain tracking
            </Button>
          </Container>
          <div className="min-w-full">
            {wineryEuLabels &&
              wineryGeneralInfo &&
              wineryEuLabels !== undefined &&
              wineryGeneralInfo !== undefined && (
                <EuLabelsAccordion
                  generalInfo={wineryGeneralInfo}
                  data={wineryEuLabels}
                  onEdit={(item: EuLabelInterface) => {
                    updateEuLabelForm({
                      title: "Edit EU Label",
                      description:
                        "Edit the EU label for your wine. All fields marked with * are mandatory.",
                      isEditing: true,
                      formData: item,
                    });

                    router.push("/eu-label-form");
                  }}
                />
              )}
          </div>
        </Container>
      ) : (
        <Container
          intent="flexColCenter"
          gap="large"
          className="min-w-full h-full min-h-[400px]"
        >
          <Container intent="flexColTop" gap="xsmall">
            <Text intent="h4" variant="normal" className="font-normal">
              Register wine for EU label only
            </Text>
            <Button
              intent="primary"
              size="medium"
              className="flex items-center gap-[8px]"
              onClick={() => {
                if (wineryEuLabels.length < allowedEuLabels) {
                  updateEuLabelForm({
                    title: "Create EU Label",
                    description:
                      "Create a new EU label for your wine. All fields marked with * are mandatory.",
                    isEditing: false,
                    formData: euLabelInitData,
                  });
                  router.push("/eu-label-form");
                } else {
                  handleMaxEuLabelsReached();
                }
              }}
            >
              <Icon
                icon="carbon:add-filled"
                className="h-[20px] w-[20px] mt-[-4px]"
              />
              Add wine
            </Button>
          </Container>
          <Container intent="flexColTop" gap="xsmall">
            <Text intent="h4" variant="dim" className="font-normal">
              Register wine for supply chain tracking
            </Text>
            <Button
              intent="primary"
              size="medium"
              disabled
              className="flex items-center gap-[8px]"
            >
              <Icon
                icon="carbon:add-filled"
                className="h-[20px] w-[20px] mt-[-4px]"
              />
              Add Wine
            </Button>
          </Container>
        </Container>
      )}
    </>
  );
};
