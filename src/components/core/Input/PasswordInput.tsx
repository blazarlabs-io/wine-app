"use client";

import { Button, Container } from "@/components";
import { Icon } from "@iconify/react";
import { useState } from "react";

export interface PasswordInputProps {
  onChange: (val: string) => void;
}

export const PasswordInput = ({ onChange }: PasswordInputProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container
      intent="flexRowLeft"
      className="w-full text-on-surface px-[16px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
    >
      <input
        type={showPassword ? "text" : "password"}
        required
        placeholder={"Enter your password"}
        value={password}
        onChange={(event: any) => {
          setPassword(event.target.value);
          onChange(event.target.value);
        }}
        className="bg-transparent grow outline-none w-full"
      />
      <Button
        intent="unstyled"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        <Icon
          icon={!showPassword ? "mdi:eye-off" : "mdi:eye"}
          width="16"
          height="16"
        />
      </Button>
    </Container>
  );
};
