"use client";
import { Container, Text, Button, DropDown } from "@/components";

export interface DropdownFilterProps {
  label: string;
  items: string[];
  selectedValue: string;
  onSelect: (item: string) => void;
  onReset: () => void;
  disabled?: boolean;
}

export const DropDownFilter = ({
  label,
  items,
  selectedValue,
  onSelect,
  onReset,
  disabled = false,
}: DropdownFilterProps) => {
  return (
    <Container intent="flexColCenter" gap="xsmall">
      <Container intent="flexRowBetween" className="w-full">
        <Text intent="p2" variant="dim">
          {label}
        </Text>
        <Button disabled={disabled} intent="text" onClick={() => onReset()}>
          Reset
        </Button>
      </Container>
      <DropDown
        disabled={disabled}
        fullWidth
        items={items}
        selectedValue={selectedValue}
        onSelect={(item: string) => onSelect(item)}
      />
    </Container>
  );
};
