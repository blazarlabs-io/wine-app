"use client";

import { CheckBox, Container } from "@/components";
import { classNames } from "@/utils/classNames";
import { useState } from "react";

export interface CheckInputTextProps {
  label: string;
  placeholder: string;
  onBoxChecked: (state: boolean) => void;
}

export const CheckInputText = ({
  label,
  placeholder,
  onBoxChecked,
}: CheckInputTextProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <Container intent="grid-2" className="max-w-fit">
      <Container intent="flexRowCenter" className="w-[160px]">
        <CheckBox
          label={label}
          onCheck={(state: boolean) => {
            setIsChecked(state);
            onBoxChecked(state);
          }}
        />
      </Container>
      <input
        disabled={!isChecked}
        type="text"
        placeholder={placeholder}
        // value={""}
        onChange={(event: any) => {
          //   generalInfo.foundedOn = event.target.value;
          //   updateWinery({ generalInfo, wines, euLabels });
        }}
        className={classNames(
          isChecked
            ? "placeholder:text-on-surface-dark"
            : "placeholder:text-on-surface-dark/50",
          "text-sm w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
        )}
      />
    </Container>
  );
};
