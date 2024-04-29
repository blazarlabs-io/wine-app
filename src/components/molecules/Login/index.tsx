/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container, Text, Button, SpinnerLoader } from "@/components";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import { ToastProps } from "@/typings/components";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useLocalStorage } from "usehooks-ts";
import { useAuth } from "@/context/authContext";
import { useAppState } from "@/context/appStateContext";

export interface LoginProps {
  title: string;
  description: string;
}

export const Login = ({ title, description }: LoginProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const { updateAuthLoading, authLoading } = useAuth();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const [email, setEmail] = useLocalStorage(
    "email",
    { address: "" },
    {
      initializeWithValue: false,
    }
  );
  const [password, setPassword] = useLocalStorage(
    "password",
    { value: "" },
    {
      initializeWithValue: false,
    }
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    !user && updateAppLoading(false);
  }, []);

  const handleSignIn = async () => {
    updateAuthLoading(true);
    signInWithEmailAndPassword(auth, email.address, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateAuthLoading(false);
        updateAppLoading(true);
        router.replace("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
          <Text intent="p1" variant="dim" className="font-semibold">
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
          <Text intent="p1" variant="dim" className="font-semibold">
            Password
          </Text>
          <Container intent="flexRowLeft" gap="xsmall" className="relative">
            <input
              value={password.value}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(event: any) => {
                setPassword({ value: event.target.value as string });
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
        <Text intent="p1" variant="dim">
          Don't have an account yet?
        </Text>
        <Button
          intent="unstyled"
          className="text-primary-light flex items-center gap-[8px] font-semibold"
          onClick={() => router.push("/signup")}
        >
          Create an account
          {/* <Icon icon="mdi:register-outline" width="20" height="20" /> */}
        </Button>
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
          {!authLoading ? "Login" : <SpinnerLoader />}
        </Button>
      </Container>
    </Container>
  );
};
