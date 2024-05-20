"use client";
import { Button, Container, DropDown, Text } from "@/components";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { classNames } from "@/utils/classNames";

export interface TextInputCrudProps {
  list: string[];
  dropdownLabel?: string;
  initialItems: string[];
  selectedValue: string;
  onItemsChange: (items: string[]) => void;
}

export const SelectCrud = ({
  list,
  dropdownLabel,
  initialItems,
  selectedValue,
  onItemsChange,
}: TextInputCrudProps) => {
  const [items, setItems] = useState<string[] | null>(initialItems);
  const [currentItem, setCurrentItem] = useState<string>("");

  return (
    <Container intent="flexColLeft" gap="small" className="">
      <Container intent="flexRowLeft" gap="xsmall" className="">
        <Container intent="flexColLeft" gap="xsmall" className="min-w-[160px]">
          {dropdownLabel && (
            <Text intent="p2" variant="dim" className="font-semibold">
              {dropdownLabel}
            </Text>
          )}
          <DropDown
            items={list as string[]}
            id="aromaProfile"
            selectedValue={currentItem || ""}
            isRequired
            fullWidth
            onSelect={(it: string) => {
              setCurrentItem(it);
            }}
          />
        </Container>
        <Button
          intent="unstyled"
          disabled={!currentItem}
          onClick={() => {
            let its: string[] = [];
            if (items !== null && items !== undefined && items.length > 0) {
              its = [...items, currentItem];
            } else {
              its = [currentItem];
            }
            setItems(its);
            onItemsChange(its);
            setCurrentItem("");
          }}
          className={classNames(
            "min-h-[48px] max-h-[48px] border-[1.5px] border-primary-light  text-[16px] flex items-center justify-center max-w-fit px-[12px] gap-[4px] text-primary-light hover:text-primary transition-all duration-200 ease-in-out",
            dropdownLabel && "mt-[32px]",
            !currentItem ? "cursor-not-allowed opacity-30" : ""
          )}
        >
          <Icon
            icon="material-symbols:add"
            className="mt-[-4px] h-[16px] w-[16px]"
          />
          Add
        </Button>
      </Container>
      <Container intent="flexRowWrap" gap="small" className="">
        {items !== null && items !== undefined && items.length > 0 && (
          <>
            {items.map((item, index) => (
              <div key={index.toString()}>
                <Container
                  intent="flexRowCenter"
                  className="max-w-fit border-[1.5px] border-primary-light rounded-full px-[12px] py-[6px] gap-[8px] bg-surface-dark text-on-surface-dark/50 hover:text-on-surface-dark transition-all duration-200 ease-in-out hover:cursor-pointer"
                >
                  <Text intent="p2" variant="accent">
                    {item}
                  </Text>
                  <Button
                    intent="unstyled"
                    onClick={() => {
                      const its = items.filter((_, i) => i !== index);
                      setItems(its);
                      onItemsChange(its);
                    }}
                    className="text-[16px] flex items-center max-w-fit text-primary-light hover:text-primary transition-all duration-200 ease-in-out"
                  >
                    <Icon
                      icon="material-symbols:close"
                      className="mt-[-5px] h-[16px] w-[16px]"
                    />
                  </Button>
                </Container>
              </div>
            ))}
          </>
        )}
      </Container>
    </Container>
  );
};
