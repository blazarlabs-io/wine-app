"use client";
import { Container, Button, Text, Accordion } from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";

export const WinesListSection = () => {
  const { wines } = useWinery();
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
