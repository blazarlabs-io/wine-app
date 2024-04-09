"use client";
import {
  Container,
  Button,
  Text,
  Accordion,
  EuLabelsAccordion,
} from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const WinesListSection = () => {
  const { updateFormTitle, updateFormDescription } = useWinery();
  const router = useRouter();
  const { updateAppLoading } = useAppState();

  const { wineryEuLabels } = useRealtimeDb();

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
                updateFormTitle("Register EU Label");
                updateFormDescription(
                  "Register a new EU label for your wine. All fields marked with * are mandatory."
                );
                router.push("/generate-eu-label");
              }}
              className="flex items-center gap-[8px]"
            >
              <Icon icon="bi:qr-code" className="h-[20px] w-[20px] mt-[-4px]" />
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
            <EuLabelsAccordion data={wineryEuLabels} />
          </div>
        </Container>
      ) : (
        <Container
          intent="flexColCenter"
          gap="large"
          className="min-w-full h-full min-h-[400px]"
        >
          <Container intent="flexColTop" gap="xsmall">
            <Text intent="h4" variant="dim" className="font-normal">
              Add wine for supply chain tracking
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
          <Container intent="flexColTop" gap="xsmall">
            <Text intent="h4" variant="normal" className="font-normal">
              Add wine for EU Label only
            </Text>
            <Button
              intent="primary"
              size="medium"
              className="flex items-center gap-[8px]"
              onClick={() => {
                updateAppLoading(true);
                updateFormTitle("Register EU Label");
                updateFormDescription(
                  "Register a new EU label for your wine. All fields marked with * are mandatory."
                );
                router.push("/generate-eu-label");
              }}
            >
              <Icon icon="bi:qr-code" className="h-[20px] w-[20px] mt-[-4px]" />
              Generate EU Label
            </Button>
          </Container>
        </Container>
      )}
    </>
  );
};
