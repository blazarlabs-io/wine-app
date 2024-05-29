"use client";

import { Button, Container, PasswordInput, Text } from "@/components";
import { useEffect, useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";

export interface UpdatePasswordDialogProps {
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

export const UpdatePasswordDialog = ({
  onConfirm,
  onCancel,
}: UpdatePasswordDialogProps) => {
  const { handleChange, errors } = useFormValidation();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

  useEffect(() => {
    if (
      errors.email === null &&
      errors.text === null &&
      errors.password === null &&
      passwordsMatch
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (
      !passwordsMatch &&
      password.length > 0 &&
      confirmPassword.length === 0 &&
      errors.password
    ) {
      setErrorMessage(errors.password);
    }
  }, [errors, passwordsMatch, password, confirmPassword]);

  useEffect(() => {
    if (password.length > 0) {
      if (password === confirmPassword) {
        setPasswordsMatch(true);
        setErrorMessage(null);
      } else {
        setPasswordsMatch(false);
        setErrorMessage("Passwords don't match!");
      }
    } else {
      setErrorMessage(null);
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[520px] max-w-[520px]"
        gap="medium"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">Update Password</Text>
          <Text>Please enter your new password and confirm it to proceed.</Text>
        </Container>
        <form className=" w-full">
          <Container intent="flexColTop" gap="small">
            <Container intent="flexRowLeft" gap="small"></Container>
            <Container intent="flexColLeft" gap="small">
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Password
                </Text>
                <PasswordInput
                  onChange={(value: string) => {
                    setPassword(value);
                    handleChange(value, "password");
                  }}
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Confirm Password
                </Text>
                <PasswordInput
                  onChange={(value: string) => {
                    setConfirmPassword(value);
                    handleChange(value, "password");
                  }}
                />
              </Container>
            </Container>
          </Container>
        </form>
        <Container intent="flexColLeft" className="h-[24px] mb-[12px]">
          {errorMessage && (
            <Text intent="p2" variant="error">
              {errorMessage}
            </Text>
          )}
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Button intent="secondary" size="medium" fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button
            intent="primary"
            size="medium"
            disabled={isDisabled}
            fullWidth
            onClick={() => {
              onConfirm(password);
            }}
          >
            Confirm
          </Button>
        </Container>
      </Container>
    </div>
  );
};
