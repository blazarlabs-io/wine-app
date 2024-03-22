import { Container, Text, Button } from "@/components";
import { useLogin } from "@/context/loginContext";
import { Icon } from "@iconify/react";
import { useState } from "react";

export interface LoginProps {
  title: string;
  description: string;
}

export const Login = ({ title, description }: LoginProps) => {
  const { updateShowLogin } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          onClick={() => updateShowLogin(false)}
        >
          Cancel
        </Button>
        <Button intent="primary" size="medium" fullWidth>
          Login
        </Button>
      </Container>
    </Container>
  );
};
