"use client";
import { Button, Container, DropDown, Text } from "@/components";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { classNames } from "@/utils/classNames";
import { set } from "firebase/database";
import {
  SelectedTemperature,
  StorageTemperature,
  TemperatureUnits,
} from "@/typings/winery";

export interface TextInputCrudProps {
  list: string[];
  dropdownLabel?: string;
  textInputLabel?: string;
  placeholder: string;
  initialItems: SelectedTemperature;
  onItemsChange: (items: SelectedTemperature) => void;
}

export const SelectAndTextInputCrud = ({
  list,
  dropdownLabel,
  textInputLabel,
  placeholder,
  initialItems,
  onItemsChange,
}: TextInputCrudProps) => {
  const [currentItem, setCurrentItem] = useState<SelectedTemperature | null>(
    initialItems
  );
  const [placeholderVisible, setPlaceholderVisible] = useState<boolean>(true);

  useEffect(() => {
    if (currentItem?.value && currentItem?.unit) {
      onItemsChange(currentItem as SelectedTemperature);
    }
  }, [currentItem]);

  return (
    <Container intent="flexColLeft" gap="small">
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
            selectedValue={currentItem?.value || ""}
            isRequired
            fullWidth
            onSelect={(it: string) => {
              setCurrentItem(
                it === "celcius"
                  ? { unit: "celcius", value: "" }
                  : { unit: "fahrenheit", value: "" }
              );
            }}
          />
        </Container>
        <Container intent="flexRowLeft" gap="xsmall" className="max-w-fit">
          <Container intent="flexColLeft" gap="xsmall" className="max-w-fit">
            {textInputLabel && (
              <Text intent="p2" variant="dim" className="font-semibold">
                {textInputLabel}
              </Text>
            )}
            <input
              type="number"
              placeholder={placeholderVisible ? placeholder : ""}
              value={currentItem?.value || ""}
              onFocus={(event: any) => {
                setPlaceholderVisible(false);
              }}
              onBlur={(event: any) => {
                if (event.target.value === "") {
                  setPlaceholderVisible(true);
                }
              }}
              onChange={(event: any) => {
                setCurrentItem({
                  unit: currentItem?.unit as TemperatureUnits,
                  value: event.target.value,
                });
              }}
              className="max-w-[160px] placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
