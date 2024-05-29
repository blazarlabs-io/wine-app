"use client";
import { Container, DropDown, Text } from "@/components";
import { vintageYearList } from "@/data";
import { Grape } from "@/typings/winery";

export interface TextInputCrudProps {
  initialItem: Grape;
  onItemChange: (item: Grape) => void;
}

export const GrapeCrud = ({
  initialItem,
  onItemChange,
}: TextInputCrudProps) => {
  return (
    <>
      <Container intent="grid-3" gap="xsmall" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="">
          <Text intent="p2" variant="dim" className="font-semibold">
            Name
          </Text>
          <input
            type="text"
            required
            value={(initialItem?.name as string) || ""}
            onChange={(event: any) => {
              const newItem = {
                name: event.target.value,
                percentage: initialItem?.percentage,
                vintageYear: initialItem?.vintageYear,
              };

              onItemChange(newItem);
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
            value={(initialItem?.percentage as string) || ""}
            onChange={(event: any) => {
              const newItem = {
                name: initialItem?.name,
                percentage: event.target.value,
                vintageYear: initialItem.vintageYear,
              };

              onItemChange(newItem);
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
              initialItem?.vintageYear
                ? initialItem?.vintageYear.toString()
                : ""
            }
            onSelect={(data: string) => {
              const newItem: Grape = {
                name: initialItem?.name as string,
                percentage: initialItem?.percentage as string,
                vintageYear: parseInt(data as string),
              };

              onItemChange(newItem);
            }}
          />
        </Container>
      </Container>
    </>
  );
};
