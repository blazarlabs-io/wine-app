/* eslint-disable react/no-unescaped-entities */

"use client";

import {
  Container,
  Text,
  Button,
  Avatar,
  UpdatePasswordDialog,
} from "@/components";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/authContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useState } from "react";
import { useAppState } from "@/context/appStateContext";
import { auth } from "@/lib/firebase/client";
import { useToast } from "@/context/toastContext";
import { signOut } from "firebase/auth";
import { updateUserPassword } from "@/utils/firestore";

export const GeneralSection = () => {
  const { user } = useAuth();
  const { wineryGeneralInfo } = useRealtimeDb();
  const { updateAppLoading } = useAppState();
  const { updateToast } = useToast();
  const [showUpdatePassword, setShowUpdatePassword] = useState<boolean>(false);

  const handleUpdatePassword = (password: string) => {
    updateUserPassword({ data: { uid: user?.uid, password: password } })
      .then((res) => {
        signOut(auth)
          .then(() => {
            updateToast({
              show: true,
              status: "success",
              message: "Password updated successfully!",
              timeout: 5000,
            });
            updateAppLoading(false);
          })
          .catch((err) => {
            updateToast({
              show: true,
              status: "error",
              message: err.message,
              timeout: 5000,
            });
            updateAppLoading(false);
          });
      })
      .catch((err) => {
        updateToast({
          show: true,
          status: "error",
          message: err.message,
          timeout: 5000,
        });
        updateAppLoading(false);
      });
  };

  return (
    <>
      {showUpdatePassword && (
        <UpdatePasswordDialog
          onConfirm={(password: string) => {
            setShowUpdatePassword(false);
            handleUpdatePassword(password);
            updateAppLoading(true);
          }}
          onCancel={() => {
            setShowUpdatePassword(false);
          }}
        />
      )}
      <Container intent="flexColLeft" gap="medium">
        <Container intent="flexRowLeft" gap="xsmall">
          <Icon
            icon="streamline:information-desk"
            className="w-[24px] h-[24px] text-on-surface-dark mt-[-8px]"
          />
          <Text intent="h6" variant="dim" className="uppercase font-semibold">
            General
          </Text>
        </Container>
        <Container
          intent="flexRowCenter"
          px="medium"
          py="medium"
          gap="small"
          className="border-[2px] border-surface-light rounded-lg"
        >
          <Avatar
            src={user?.photoURL as string}
            alt="User Avatar"
            email={user?.email as string}
          />
          <Container intent="flexColLeft">
            <Text intent="p1" variant="dim" className="font-semibold">
              {wineryGeneralInfo.name}
            </Text>
            <Text intent="p1" variant="dim">
              {user?.email}
            </Text>
          </Container>
        </Container>
        <Container
          intent="flexRowLeft"
          px="medium"
          py="medium"
          className="border-[2px] border-surface-light rounded-lg"
        >
          <Container intent="flexColLeft" gap="xsmall">
            <Text intent="p1" className="font-semibold">
              Change your password
            </Text>
            <Text variant="dim">
              Change your account's password regularly and keep your data safe.
            </Text>
          </Container>
          <Button
            intent="text"
            size="medium"
            onClick={() => {
              setShowUpdatePassword(true);
            }}
            className="cursor-pointer border min-w-[224px] max-w-[224px] border-primary-light hover:border-primary"
          >
            Change Password
          </Button>
        </Container>
      </Container>
    </>
  );
};
