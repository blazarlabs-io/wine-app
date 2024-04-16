"use client";
import { Button, Container, Text } from "@/components";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { classNames } from "@/utils/classNames";
import { set } from "firebase/database";

export interface TextInputCrudProps {
  label?: string;
  placeholder: string;
  initialItems: string[];
  onItemsChange: (items: string[]) => void;
}

export const TextInputCrud = ({
  label,
  placeholder,
  initialItems,
  onItemsChange,
}: TextInputCrudProps) => {
  const [items, setItems] = useState<string[] | null>(initialItems);
  const [currentItem, setCurrentItem] = useState<string>("");
  const [placeholderVisible, setPlaceholderVisible] = useState<boolean>(true);
  return (
    <Container intent="flexColLeft" gap="small">
      <Container intent="grid-4" gap="xsmall" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="col-span-3">
          {label && (
            <Text intent="p2" variant="dim" className="font-semibold">
              {label}
            </Text>
          )}
          <input
            type="text"
            placeholder={placeholderVisible ? placeholder : ""}
            value={currentItem}
            onFocus={(event: any) => {
              setPlaceholderVisible(false);
            }}
            onBlur={(event: any) => {
              if (currentItem === "") {
                setPlaceholderVisible(true);
              }
            }}
            onChange={(event: any) => {
              setCurrentItem(event.target.value);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Button
          intent="unstyled"
          disabled={!currentItem}
          onClick={() => {
            console.log("currentItem", currentItem);
            let its: string[] = [];
            if (items !== null && items !== undefined && items.length > 0) {
              its = [...items, currentItem];
            } else {
              its = [currentItem];
            }
            setItems(its);
            onItemsChange(its);
            setCurrentItem("");
            setPlaceholderVisible(true);
          }}
          className={classNames(
            "border-[1.5px] border-primary-light  text-[16px] flex items-center justify-center max-w-fit px-[12px] gap-[4px] text-primary-light hover:text-primary transition-all duration-200 ease-in-out",
            label && "mt-[32px]"
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
