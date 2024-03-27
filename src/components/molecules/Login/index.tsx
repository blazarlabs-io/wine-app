"use client";

import { Container, Text, Button } from "@/components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import { ToastProps } from "@/typings/components";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useLocalStorage } from "usehooks-ts";
import { useAuth } from "@/context/authContext";

export interface LoginProps {
  title: string;
  description: string;
}

const key = "email";
const initialValue = { address: "" };

export const Login = ({ title, description }: LoginProps) => {
  const router = useRouter();
  const { updateAuthLoading, authLoading } = useAuth();
  const { updateToast } = useToast();
  const [email, setEmail] = useLocalStorage(key, initialValue, {
    initializeWithValue: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    updateAuthLoading(true);
    signInWithEmailAndPassword(auth, email.address, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signed in", user);
        updateAuthLoading(false);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(firebaseAuthErrors[errorCode] as string);
        const toastProps: ToastProps = {
          show: true,
          status: "error",
          message: (firebaseAuthErrors[errorCode] as string) ?? errorMessage,
          timeout: 5000,
        };
        updateToast(toastProps);
        updateAuthLoading(false);
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
      gap="medium"
      className="bg-surface-light min-w-fit rounded-lg shadow-lg max-w-[420px]"
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
      <Container intent="flexColTop" gap="small">
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Email
          </Text>
          <input
            type="email"
            value={email.address}
            placeholder="Enter your email"
            onChange={(event: any) => {
              setEmail({ address: event.target.value as string });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Password
          </Text>
          <Container intent="flexRowLeft" gap="xsmall" className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(event: any) => {
                setPassword(event.target.value as string);
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
            <button
              type="button"
              className="text-black dark:text-white absolute right-[8px] top-[16px]"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? (
                <Icon icon="mdi:eye-off-outline" />
              ) : (
                <Icon icon="mdi:eye-outline" />
              )}
            </button>
          </Container>
        </Container>
      </Container>
      <Container intent="flexRowBetween" gap="small">
        <Button
          intent="secondary"
          size="medium"
          fullWidth
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button intent="primary" size="medium" fullWidth onClick={handleSignIn}>
          {!authLoading ? (
            "Login"
          ) : (
            <Container intent="flexRowCenter">
              <Icon icon="eos-icons:loading" className="w-[16px] h-[16px]" />
            </Container>
          )}
        </Button>
      </Container>
    </Container>
  );
};
