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

export const UserAccountPage = () => {
  const { user } = useAuth();
  const { updateModal } = useModal();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();

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
        <Container intent="flexRowCenter">
          <Text intent="h4" variant="dim">
            Account
          </Text>
        </Container>
        <Container
          intent="flexColTop"
          px="medium"
          py="medium"
          gap="medium"
          className="bg-surface-light max-w-fit rounded-lg"
        >
          <Container intent="flexRowCenter" gap="small">
            <Avatar
              src={user?.photoURL as string}
              alt="User Avatar"
              email={user?.email as string}
            />
          </Container>
          <Container intent="flexRowCenter" gap="small">
            <Text intent="h5" variant="dim">
              {user?.email}
            </Text>
          </Container>
          <Container intent="flexRowCenter">
            <Button
              intent="text"
              onClick={() => {
                handleDeleteAccount();
              }}
              className="cursor-pointer"
            >
              Delete Account
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  );
};
