"use client";
import { Container, Button } from "@/components";
import { Icon } from "@iconify/react";

export const WinesListSection = () => {
  return (
    <Container intent="flexRowCenter" className="h-full">
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
  );
};
