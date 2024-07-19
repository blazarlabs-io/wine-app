/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Container,
  Text,
  Button,
  SpinnerLoader,
  InfoTooltip,
  PasswordInput,
} from "@/components";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import { useAuth } from "@/context/authContext";
import { useAppState } from "@/context/appStateContext";
import "react-phone-number-input/style.css";
import { useModal } from "@/context/modalContext";
import { auth } from "@/lib/firebase/client";
import { useFormValidation } from "@/hooks/useFormValidation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useMasterLoader } from "@/context/masterLoaderContext";

export interface LoginProps {
  title: string;
  description: string;
}

export const Signup = ({ title, description }: LoginProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const { updateToast } = useToast();
  const { updateModal } = useModal();
  const { updateAppLoading } = useAppState();
  const { updateMasterLoading } = useMasterLoader();
  const { handleChange, errors } = useFormValidation();

  const [wineryName, setWineryName] = useState<string | null>(null);
  const [wineryEmail, setWineryEmail] = useState<string | null>(null);
  const [wineryPhone, setWineryPhone] = useState<string | null>(null);
  const [wineryRepresentative, setWineryRepresentative] = useState<
    string | null
  >(null);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    updateAppLoading(false);
  }, []);

  useEffect(() => {
    if (
      errors.email === null &&
      errors.text === null &&
      errors.password === null &&
      passwordsMatch
    ) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
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

  const handleRegistration = () => {
    updateMasterLoading(true);
    createUserWithEmailAndPassword(auth, wineryEmail as string, password)
      .then((userCredential) => {
        updateMasterLoading(false);

        updateToast({
          show: true,
          status: "success",
          message: "Account created successfully.",
          timeout: 5000,
        });
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", error);
        updateAppLoading(false);

        updateModal({
          show: true,
          title: "Error",
          description: firebaseAuthErrors[error.code] as string,
          action: {
            label: "OK",
            onAction: () => {
              updateModal({
                show: false,
                title: "",
                description: "",
                action: {
                  label: "",
                  onAction: () => {},
                },
              });
            },
          },
        });
      });
  };

  const handleCancel = async () => {
    router.replace("/");
  };

  return (
    <Container
      px="medium"
      py="medium"
      intent="flexColTop"
      gap="small"
      className="bg-surface-light min-w-fit rounded-lg shadow-lg max-w-[520px]"
    >
      <Container intent="flexColLeft" gap="small">
        <Container intent="flexRowLeft" gap="xsmall">
          <Icon
            icon="ph:user"
            color="#cccccc"
            className="w-[32px] h-[32px] mt-[-8px]"
          />
          <Text intent="h3" className="font-bold">
            {title}
          </Text>
        </Container>
        <Text intent="p1" variant="dim">
          {description}
        </Text>
      </Container>
      <form className="mt-[24px] w-full">
        <Container intent="flexColTop" gap="small">
          <Container intent="flexRowLeft" gap="small">
            {/* <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Winery Name
              </Text>
              <input
                required
                type="text"
                value={wineryName as string}
                placeholder="Name of your Winery"
                onChange={(event: any) => {
                  setWineryName(event.target.value as string);
                  handleChange(event.target.value, "text");
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container> */}
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Winery Email
              </Text>
              <input
                required
                type="email"
                value={(wineryEmail as string) || ""}
                placeholder="Enter your email"
                onChange={(event: any) => {
                  setWineryEmail(event.target.value as string);
                  handleChange(event.target.value, "email");
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>
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

          <Container intent="flexRowLeft" className="h-[48px]">
            {errorMessage && (
              <Text intent="p2" variant="error" className="">
                {errorMessage}
              </Text>
            )}
          </Container>
        </Container>
      </form>
      <Container intent="flexRowBetween" gap="small">
        <Button
          intent="secondary"
          size="medium"
          fullWidth
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          intent="primary"
          size="medium"
          fullWidth
          disabled={sendButtonDisabled}
          onClick={() => {
            updateAppLoading(true);
            handleRegistration();
          }}
        >
          Create Account
        </Button>
      </Container>
    </Container>
  );
};
function generateWelcomelHtml() {
  throw new Error("Function not implemented.");
}
