"use client";
import { Container, Button, Text, WinesAccordion } from "@/components";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { Wine } from "@/typings/winery";
import { useForms } from "@/context/FormsContext";
import { wineInitData } from "@/data/wineInitData";
import { useModal } from "@/context/modalContext";
import { useEffect } from "react";

export const WinesListSection = () => {
  const router = useRouter();
  const { wines, allowedWines, wineryGeneralInfo } = useRealtimeDb();
  const { updateWineForm, wineForm } = useForms();
  const { updateModal } = useModal();

  const handleMaxWinesReached = () => {
    updateModal({
      title: "Error",
      description:
        "You have reached the maximum number of QR codes allowed. Please contact our team's representative and upgrade your plan to add more QR codes.",
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
      {wines && wines.length > 0 ? (
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
                if (wines.length < allowedWines) {
                  updateWineForm({
                    title: "Create New Wine",
                    description:
                      "Create a new wine. All fields marked with * are mandatory.",
                    isEditing: false,
                    isMinified: false,
                    formData: wineInitData,
                  });
                  router.push("/wine-form");
                } else {
                  handleMaxWinesReached();
                }
              }}
              className="flex items-center gap-[8px]"
            >
              <Icon
                icon="carbon:add-filled"
                className="h-[20px] w-[20px] mt-[-4px]"
              />
              Add wine
            </Button>
          </Container>
          <div className="min-w-full">
            {wines &&
              wines.length > 0 &&
              wineryGeneralInfo &&
              wines !== undefined &&
              wineryGeneralInfo !== undefined && (
                <WinesAccordion
                  generalInfo={wineryGeneralInfo}
                  data={wines}
                  onEdit={(item: Wine) => {
                    updateWineForm({
                      title: "Edit Wine",
                      description:
                        "Edit your wine. All fields marked with * are mandatory.",
                      isEditing: true,
                      isMinified: false,
                      formData: item as Wine,
                    });

                    router.push("/wine-form");
                  }}
                />
              )}
          </div>
        </Container>
      ) : (
        <Container
          intent="flexColCenter"
          gap="large"
          className="min-w-full h-full min-h-[400px] bg-surface-light/20 border border-on-surface/20 rounded-lg"
        >
          <Container intent="flexColTop" gap="xsmall">
            <Text intent="h4" variant="normal" className="font-normal">
              Register Wine
            </Text>
            <Button
              intent="primary"
              size="medium"
              className="flex items-center gap-[8px]"
              onClick={() => {
                if (wines.length < allowedWines) {
                  updateWineForm({
                    title: "Create New Wine",
                    description:
                      "Create a new wine. All fields marked with * are mandatory.",
                    isEditing: false,
                    isMinified: false,
                    formData: wineInitData,
                  });
                  router.push("/wine-form");
                } else {
                  handleMaxWinesReached();
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
        </Container>
      )}
    </>
  );
};
