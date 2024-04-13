"use client";

import { Container, Text, Button } from "@/components";
import { useState } from "react";
import { useSearchUpc } from "@/hooks/useSearchUpc";

interface SearchFilterProps {
  label: string;
  onChange?: (results: string[]) => void;
  disabled?: boolean;
}

export const SearchFilter = ({
  label,
  onChange,
  disabled = false,
}: SearchFilterProps) => {
  const { searchUpc } = useSearchUpc();
  const [value, setValue] = useState<string>("");
  return (
    <Container intent="flexColLeft" gap="xsmall">
      <Container intent="flexRowBetween" className="w-full">
        <Text intent="p2" variant="dim">
          {label}
        </Text>
        <Button intent="text" disabled={disabled} onClick={() => setValue("")}>
          Clear
        </Button>
      </Container>
      <input
        required
        disabled={disabled}
        type="text"
        placeholder=""
        value={value}
        onChange={(event: any) => {
          setValue(event.target.value);
          onChange && onChange(searchUpc(event.target.value));
        }}
        className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
      />
    </Container>
  );
};
