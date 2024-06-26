"use client";

import { Container } from "@/components";
import { useState } from "react";

export interface CheckBoxProps {
  label: string;
  checked: boolean;
  isRequired?: boolean;
  onCheck: (state: boolean) => void;
}

export const CheckBox = ({
  label,
  checked,
  onCheck,
  isRequired,
}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  return (
    <Container intent="flexRowLeft" gap="xsmall" className="">
      <input
        required={isRequired ? true : false}
        onChange={() => {
          let state = !isChecked;
          setIsChecked(state);
          onCheck(state);
        }}
        type="checkbox"
        className="accent-primary-light mt-[-1px] border-gray-200 rounded text-primary-light focus:ring-primary-light disabled:opacity-50 disabled:pointer-events-none "
        id="checkbox"
        checked={isChecked}
      />
      <label className="text-sm text-on-surface-dark">{label}</label>
    </Container>
  );
};
