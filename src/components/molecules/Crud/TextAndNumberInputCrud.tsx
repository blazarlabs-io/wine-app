"use client";
import { Button, Container, Text } from "@/components";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ItemWithPercentage } from "@/typings/winery";

export interface TextInputCrudProps {
  placeholder: string;
  initialItems: ItemWithPercentage[];
  required?: boolean;
  onItemsChange: (items: ItemWithPercentage[]) => void;
}

export const TextAndNumberInputCrud = ({
  placeholder,
  initialItems,
  required = false,
  onItemsChange,
}: TextInputCrudProps) => {
  const [items, setItems] = useState<ItemWithPercentage[] | null>(initialItems);
  const [currentItem, setCurrentItem] = useState<ItemWithPercentage | null>(
    null
  );
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [isRequired, setIsRequired] = useState<boolean>(required);

  useEffect(() => {
    if (currentItem?.name && currentItem?.percentage) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [currentItem]);

  useEffect(() => {
    if (items && items.length > 0) {
      setIsRequired(false);
    }
  }, [items]);

  return (
    <>
      <Container intent="grid-4" gap="xsmall" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="col-span-2">
          <Text intent="p2" variant="dim" className="font-semibold">
            Name
          </Text>
          <input
            type="text"
            placeholder={placeholder}
            required={isRequired}
            value={currentItem?.name}
            onChange={(event: any) => {
              const newItem = {
                name: event.target.value,
                percentage: currentItem?.percentage,
              };
              setCurrentItem(newItem as ItemWithPercentage);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>

        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p2" variant="dim" className="font-semibold">
            Percentage %
          </Text>
          <input
            type="number"
            placeholder={placeholder}
            value={currentItem?.percentage}
            onChange={(event: any) => {
              const newItem = {
                name: currentItem?.name,
                percentage: event.target.value,
              };
              setCurrentItem(newItem as ItemWithPercentage);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>

        <Button
          intent="unstyled"
          disabled={disableButton}
          onClick={() => {
            let its: ItemWithPercentage[] = [];
            if (items !== null && items !== undefined && items.length > 0) {
              its = [...items, currentItem as ItemWithPercentage];
            } else {
              its = [currentItem as ItemWithPercentage];
            }
            setItems(its);
            onItemsChange(its);
            const newItem = {
              name: "",
              percentage: "",
            };
            setCurrentItem(newItem as ItemWithPercentage);
          }}
          className="border-[1.5px] border-primary-light mt-[32px] text-[16px] flex items-center justify-center max-w-fit px-[12px] gap-[4px] text-primary-light hover:text-primary transition-all duration-200 ease-in-out"
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
                    {item.name}
                  </Text>
                  <Text intent="p2" variant="accent">
                    {item.percentage + "%"}
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
    </>
  );
};
