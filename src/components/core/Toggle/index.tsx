"use client";

import { Container, Text } from "@/components";
import { classNames } from "@/utils/classNames";
import { useState } from "react";

export interface ToggleProps {
  label: string;
  isChecked: boolean;
  disabled?: boolean;
  onCheck: (checked: boolean) => void;
}

export const Toggle = ({
  label,
  isChecked,
  disabled = false,
  onCheck,
}: ToggleProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Container intent="flexRowBetween" gap="small" className="">
      <label
        className="inline-block hover:cursor-pointer"
        htmlFor="flexSwitchCheckDefault"
      >
        <Container intent="flexRowLeft" gap="xsmall" className="mt-[-4px]">
          <Text
            variant={isChecked ? "success" : "error"}
            className="min-w-fit font-semibold"
          >
            {label}
          </Text>
        </Container>
      </label>
      <input
        disabled={disabled}
        className={classNames(
          "scale-[135%] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-status-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-status-success checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-status-success checked:focus:bg-status-success checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]",
          disabled && "opacity-50 hover:cursor-not-allowed"
        )}
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={isChecked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onCheck(e.target.checked);
        }}
      />
    </Container>
  );
};
