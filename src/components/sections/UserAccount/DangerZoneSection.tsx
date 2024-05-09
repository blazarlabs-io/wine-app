"use client";

import {
  Container,
  Text,
  Button,
  ConfirmDeleteDialog,
  ConfirmDisableDialog,
} from "@/components";
import { functions } from "@/lib/firebase/client";
import { Icon } from "@iconify/react";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { ToastProps } from "@/typings/components";
import { useAppState } from "@/context/appStateContext";
import { useToast } from "@/context/toastContext";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useModal } from "@/context/modalContext";
import { useRouter } from "next/navigation";

export const DangerZoneSection = () => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showConfirmDisable, setShowConfirmDisable] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const { updateModal } = useModal();

  const deleteUser = httpsCallable(functions, "deleteUser");
  const disableUser = httpsCallable(functions, "disableUser");

  const handleDisableAccount = () => {
    updateModal({
      show: true,
      title: "Disable Account",
      description: "Are you sure you want to disable your account?",
      action: {
        label: "Yes",
        onAction: () => {
          setShowConfirmDisable(true);
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
      {showConfirmDisable && (
        <ConfirmDisableDialog
          onDisable={() => {
            console.log("Delete Account");
            setShowConfirmDisable(false);

            updateAppLoading(true);

            disableUser({
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
                router.replace("/");
                user?.reload();
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
            setShowConfirmDisable(false);
          }}
        />
      )}
      {showConfirmDelete && (
        <ConfirmDeleteDialog
          onDelete={() => {
            console.log("Delete Account");
            setShowConfirmDelete(false);

            updateAppLoading(true);

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
                router.replace("/");
                user?.reload();
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
      <Container intent="flexColLeft" gap="small">
        <Container intent="flexRowLeft" gap="xsmall">
          <Icon
            icon="mage:electricity-danger"
            className="w-[24px] h-[24px] text-on-surface-dark mt-[-8px]"
          />
          <Text intent="h6" variant="dim" className="uppercase font-semibold">
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
                Disabling your account removes your data and products from the
                public view.
              </Text>
            </Container>
            <Button
              intent="text"
              size="medium"
              onClick={() => {
                handleDisableAccount();
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
                Once you delete an account, there is no going back. Please be
                certain.
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
    </>
  );
};
