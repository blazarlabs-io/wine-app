/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Container,
  Text,
  Button,
  SpinnerLoader,
  InfoTooltip,
} from "@/components";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import { useAuth } from "@/context/authContext";
import { useAppState } from "@/context/appStateContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useModal } from "@/context/modalContext";
import { CreateAdminNotification } from "@/typings/winery";
import { Timestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { useFormValidation } from "@/hooks/useFormValidation";

export interface LoginProps {
  title: string;
  description: string;
}

export const Signup = ({ title, description }: LoginProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const { updateAuthLoading, authLoading } = useAuth();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const { updateModal } = useModal();
  const { handleChange, errors } = useFormValidation();

  const createNotification = httpsCallable(functions, "createNotification");

  const [wineryName, setWineryName] = useState<string | null>(null);
  const [wineryEmail, setWineryEmail] = useState<string | null>(null);
  const [wineryPhone, setWineryPhone] = useState<string | null>(null);
  const [wineryRepresentative, setWineryRepresentative] = useState<
    string | null
  >(null);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    !user && updateAppLoading(false);
  }, []);

  useEffect(() => {
    if (errors.email === null && errors.text === null) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  }, [errors]);

  const handleRegistration = (
    wn: string,
    we: string,
    wp: string,
    wr: string
  ) => {
    updateAuthLoading(true);
    const data: CreateAdminNotification = {
      requestDate: Timestamp.now(),
      wineryName: wn,
      wineryEmail: we,
      wineryPhone: wp,
      wineryRepresentative: wr,
    };

    createNotification({ data: data })
      .then((res: any) => {
        const { exists } = res.data;
        updateAuthLoading(false);
        if (!exists) {
          updateToast({
            show: true,
            status: "success",
            message: "Request sent successfully",
            timeout: 5000,
          });
          router.replace("/");
        } else {
          updateToast({
            show: true,
            status: "error",
            message: "Request already exists",
            timeout: 5000,
          });
        }
      })
      .catch((error) => {
        updateAuthLoading(false);
        updateToast({
          show: true,
          status: "error",
          message: "Request failed",
          timeout: 5000,
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
      gap="large"
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
      <form>
        <Container intent="flexColTop" gap="small">
          <Container intent="grid-2" gap="small">
            <Container intent="flexColLeft" gap="xsmall">
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
                  handleChange(event, "text");
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Winery Email
              </Text>
              <input
                required
                type="email"
                value={wineryEmail as string}
                placeholder="Enter your email"
                onChange={(event: any) => {
                  setWineryEmail(event.target.value as string);
                  handleChange(event, "email");
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>
          <Container intent="grid-2" gap="small">
            <Container intent="flexColLeft" gap="xsmall">
              <Container intent="flexRowLeft" gap="xsmall" className="">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Phone
                </Text>
                <InfoTooltip text="Please provide the representative phone with the area code starting with +" />
              </Container>
              <div className="flex items-center justify-center gap-[8px] w-full">
                <PhoneInput
                  name="phoneNumber"
                  type="text"
                  country={"us"}
                  enableAreaCodes={true}
                  areaCodes={{ us: ["332"] }}
                  inputProps={{
                    name: "phone",
                    country: "us",
                    required: true,
                    autoFocus: true,
                  }}
                  value={wineryPhone as string}
                  onChange={(event: any) => {
                    setWineryPhone(event as string);
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                  }}
                  className="w-full text-on-surface px-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
              </div>
            </Container>
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim" className="font-semibold">
                Representative Name
              </Text>
              <input
                type="text"
                value={wineryRepresentative as string}
                placeholder="Enter name"
                onChange={(event: any) => {
                  setWineryRepresentative(event.target.value as string);
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
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
            handleRegistration(
              wineryName as string,
              wineryEmail as string,
              wineryPhone as string,
              wineryRepresentative as string
            );
          }}
        >
          {!authLoading ? "Send" : <SpinnerLoader />}
        </Button>
      </Container>
    </Container>
  );
};
