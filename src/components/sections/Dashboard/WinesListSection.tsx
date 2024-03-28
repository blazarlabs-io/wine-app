"use client";
import { Container, Button, Text, Accordion } from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";
import { useRouter } from "next/navigation";

export const WinesListSection = () => {
  const { wines, updateFormTitle, updateFormDescription } = useWinery();
  const router = useRouter();

  return (
    <>
      {wines && wines.length > 0 ? (
        <>
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
              Generate EU Label
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
              Add Wine
            </Button>
          </Container>
          <Accordion data={wines} />
        </>
      ) : (
        <Container intent="flexColCenter" gap="small" className="h-full">
          <Text intent="h4" variant="dim" className="font-normal">
            Add new Wine
          </Text>
          <Button
            intent="primary"
            size="medium"
            className="flex items-center gap-[8px]"
          >
            <Icon
              icon="carbon:add-filled"
              className="h-[20px] w-[20px] mt-[-4px]"
            />
            Add Wine
          </Button>
        </Container>
      )}
    </>
  );
};
