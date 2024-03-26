"use client";

import { Container, Text, Button } from "@/components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export interface LoginProps {
  title: string;
  description: string;
}

export const Login = ({ title, description }: LoginProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signed in", user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
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
            placeholder="Enter your email"
            onChange={(event: any) => {
              setEmail(event.target.value as string);
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
                <Icon icon="mdi:eye-outline" />
              ) : (
                <Icon icon="mdi:eye-off-outline" />
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
          Login
        </Button>
      </Container>
    </Container>
  );
};
