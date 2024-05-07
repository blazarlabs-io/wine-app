/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Avatar,
  Button,
  Container,
  Text,
  ConfirmDeleteDialog,
} from "@/components";
import { useAuth } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { functions } from "@/lib/firebase/client";
import { ToastProps } from "@/typings/components";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { useToast } from "@/context/toastContext";
import { useAppState } from "@/context/appStateContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { Icon } from "@iconify/react";

export const UserAccountPage = () => {
  const { user } = useAuth();
  const { updateModal } = useModal();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const { wineryGeneralInfo } = useRealtimeDb();

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const deleteUser = httpsCallable(functions, "deleteUser");

  const handleDeleteAccount = () => {
    updateModal({
      show: true,
      title: "Delete Account",
      description: "Are you sure you want to delete your account?",
      action: {
        label: "Yes",
        onAction: () => {
          setShowConfirmDelete(true);
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
  };
  return (
    <>
      {showConfirmDelete && (
        <ConfirmDeleteDialog
          onDelete={() => {
            console.log("Delete Account");
            setShowConfirmDelete(false);

            deleteUser({
              data: {
                uid: user?.uid,
              },
            })
              .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
                const toastProps: ToastProps = {
                  show: true,
                  status: "success",
                  message: sanitizedMessage.message,
                  timeout: 5000,
                };
                updateAppLoading(false);
                updateToast(toastProps);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const toastProps: ToastProps = {
                  show: true,
                  status: "error",
                  message:
                    (firebaseAuthErrors[errorCode] as string) ?? errorMessage,
                  timeout: 5000,
                };
                console.log(toastProps);
                updateAppLoading(false);
                updateToast(toastProps);
              });
          }}
          onCancel={() => {
            setShowConfirmDelete(false);
          }}
        />
      )}
      <Container intent="flexColCenter" py="large" gap="medium">
        <Container intent="flexColLeft" gap="large" className="rounded-lg">
          <Container intent="flexColLeft" gap="small">
            <Container intent="flexRowLeft" gap="xsmall">
              <Icon
                icon={"lucide:user-round"}
                width="28"
                height="28"
                className="text-on-surface-dark mt-[-8px]"
              />
              <Text intent="h4" variant="dim">
                My Account
              </Text>
            </Container>
            <Text intent="p1" variant="dim">
              Bellow you can manage your account settings.
            </Text>
          </Container>
          <Container intent="flexColLeft" gap="medium">
            <Container intent="flexRowLeft" gap="xsmall">
              <Icon
                icon="streamline:information-desk"
                className="w-[24px] h-[24px] text-on-surface-dark mt-[-8px]"
              />
              <Text
                intent="h6"
                variant="dim"
                className="uppercase font-semibold"
              >
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
                  Change your account's password regularly and keep your data
                  safe.
                </Text>
              </Container>
              <Button
                intent="text"
                size="medium"
                onClick={() => {
                  // handleResetPassword();
                }}
                className="cursor-pointer border min-w-[224px] max-w-[224px] border-primary-light hover:border-primary"
              >
                Change Password
              </Button>
            </Container>
          </Container>
          <Container intent="flexColLeft" gap="small">
            <Container intent="flexRowLeft" gap="xsmall">
              <Icon
                icon="mage:electricity-danger"
                className="w-[24px] h-[24px] text-on-surface-dark mt-[-8px]"
              />
              <Text
                intent="h6"
                variant="dim"
                className="uppercase font-semibold"
              >
                Danger Zone
              </Text>
            </Container>
            <Container
              intent="flexColLeft"
              px="medium"
              py="medium"
              gap="medium"
              className="border border-status-error rounded-lg"
            >
              <Container intent="flexRowLeft" gap="xlarge">
                <Container intent="flexColLeft" gap="xsmall">
                  <Text intent="p1" className="font-semibold">
                    Disable this account.
                  </Text>
                  <Text variant="dim">
                    Disabling your account removes your data and products from
                    the public view.
                  </Text>
                </Container>
                <Button
                  intent="text"
                  size="medium"
                  onClick={() => {
                    handleDeleteAccount();
                  }}
                  className="cursor-pointer min-w-[224px] max-w-[224px] border border-on-surface-darker bg-surface-dark hover:bg-surface-dark/50"
                >
                  <Text variant="error"> Disable Account</Text>
                </Button>
              </Container>
              <div className="h-[1px] w-full bg-surface-light" />
              <Container intent="flexRowLeft" gap="xlarge">
                <Container intent="flexColLeft" gap="xsmall">
                  <Text intent="p1" className="font-semibold">
                    Delete this account.
                  </Text>
                  <Text variant="dim">
                    Once you delete an account, there is no going back. Please
                    be certain.
                  </Text>
                </Container>
                <Button
                  intent="text"
                  size="medium"
                  onClick={() => {
                    handleDeleteAccount();
                  }}
                  className="cursor-pointer min-w-[224px] max-w-[224px] border border-on-surface-darker bg-surface-dark hover:bg-surface-dark/50"
                >
                  <Text variant="error"> Delete Account</Text>
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
