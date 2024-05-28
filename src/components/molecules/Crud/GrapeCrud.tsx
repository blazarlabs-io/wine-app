"use client";
import { Button, Container, DropDown, Text } from "@/components";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { BlendComponent, Grape } from "@/typings/winery";
import { vintageYearList } from "@/data";
import { useGetAndResolveGrapes } from "@/hooks/useGetAndResolveGrapes";

export interface TextInputCrudProps {
  initialItems: BlendComponent[];
  required?: boolean;
  onItemAdd: (items: BlendComponent[] | null) => void;
  onItemDelete: (item: Grape | null) => void;
}

export const GrapeCrud = ({
  initialItems,
  required = false,
  onItemAdd,
  onItemDelete,
}: TextInputCrudProps) => {
  const { grapes, updateGrapes, resolvedBlendComponents } =
    useGetAndResolveGrapes(initialItems);

  const [currentItem, setCurrentItem] = useState<Grape | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  useEffect(() => {
    if (grapes && grapes.length > 0) {
    }
    if (resolvedBlendComponents && resolvedBlendComponents.length > 0) {
      onItemAdd(resolvedBlendComponents);
    }
  }, [grapes, resolvedBlendComponents]);

  // * Disable or enable the button based on the input fields
  useEffect(() => {
    if (
      currentItem?.name &&
      currentItem?.percentage &&
      currentItem?.vintageYear
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [currentItem]);

  return (
    <>
      <Container intent="grid-4" gap="xsmall" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="">
          <Text intent="p2" variant="dim" className="font-semibold">
            Name
          </Text>
          <input
            type="text"
            required={required}
            value={(currentItem?.name as string) || ""}
            onChange={(event: any) => {
              const newItem = {
                name: event.target.value,
                percentage: currentItem?.percentage,
              };
              setCurrentItem(newItem as Grape);
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
            value={(currentItem?.percentage as string) || ""}
            onChange={(event: any) => {
              const newItem = {
                name: currentItem?.name,
                percentage: event.target.value,
              };
              setCurrentItem(newItem as Grape);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p2" variant="dim" className="font-semibold">
            Vintage Year
          </Text>
          <DropDown
            isRequired
            id="vintageYear"
            items={vintageYearList.sort()}
            fullWidth
            selectedValue={
              currentItem?.vintageYear
                ? currentItem?.vintageYear.toString()
                : ""
            }
            onSelect={(data: string) => {
              const newItem: Grape = {
                name: currentItem?.name as string,
                vintageYear: parseInt(data as string),
                percentage: currentItem?.percentage as string,
              };
              setCurrentItem(newItem);
            }}
          />
        </Container>
        <Button
          intent="unstyled"
          disabled={disableButton}
          onClick={() => {
            if (currentItem) {
              updateGrapes([...grapes, currentItem]);
              setCurrentItem(null);
            }
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
        {grapes !== null && grapes !== undefined && (
          <>
            {grapes.map((item, index) => (
              <div key={item.name}>
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
                  <Text intent="p2" variant="accent">
                    {item.vintageYear}
                  </Text>
                  <Button
                    intent="unstyled"
                    onClick={() => {
                      // remove the item from the grapeItems array
                      const newItems = grapes.filter(
                        (i) => i.name !== item.name
                      );
                      updateGrapes(newItems);
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
