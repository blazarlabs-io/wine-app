"use client";

import { Container, Text, ReviewWine, Toggle } from "@/components";
import { Icon } from "@iconify/react";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { useEffect, useRef, useState } from "react";
import { generateId } from "@/utils/generateId";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import React from "react";
import { uploadQrCodeToStorage } from "@/utils/firestore";
import { useAuth } from "@/context/authContext";
import { wineUrlComposerRef } from "@/utils/wineUrlComposerRef";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useModal } from "@/context/modalContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { generateWineHtml } from "@/utils/generateWineHtml";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useForms } from "@/context/FormsContext";
import { useBanner } from "@/context/bannerContext";
import { BasicForm } from "./BasicForm";
import { ExtendedForm } from "./ExtendedForm";
import { useToast } from "@/context/toastContext";
import { MinifiedWine } from "@/typings/winery";
import { minifiedWineInitData } from "@/data/minifiedWineInitData";
import { Timestamp } from "firebase/firestore";
import { useWineClient } from "@/context/wineClientSdkContext";

export const WineForm = () => {
  const router = useRouter();
  const { updateAppLoading } = useAppState();

  const { wineForm, updateWineForm } = useForms();

  const { updateModal } = useModal();

  const { updateToast } = useToast();

  const { updateBanner } = useBanner();

  const { wineryGeneralInfo } = useRealtimeDb();

  const { wineClient } = useWineClient();

  const initialized = useRef(false);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [qrCodeFile, setQrCodeFile] = useState<string | null>(null);
  const [showExtendedForm, setShowExtendedForm] = useState<boolean | null>(
    null
  );

  const sendEmail = httpsCallable(functions, "email-sendEmail");

  useEffect(() => {
    updateBanner(false, "");

    // wineForm.formData.generalInformation.wineryName = wineryGeneralInfo.name;
    // wineForm.formData.minifiedWine.wineryName = wineryGeneralInfo.name;

    if (!initialized.current && !wineForm.isEditing) {
      const ref = generateId(5) + "-" + dateToTimestamp();
      console.log("ref", ref);
      wineForm.formData.referenceNumber = ref;

      updateWineForm({
        ...wineForm,
        formData: {
          ...wineForm.formData,
          referenceNumber: ref as string,
          generalInformation: {
            ...wineForm.formData.generalInformation,
          },
          minifiedWine: {
            ...wineForm.formData.minifiedWine,
            wineryName: wineryGeneralInfo.name,
          },
        },
      });
    } else {
      updateWineForm({
        ...wineForm,
        formData: {
          ...wineForm.formData,
          generalInformation: {
            ...wineForm.formData.generalInformation,
          },
          minifiedWine: {
            ...wineForm.formData.minifiedWine,
            wineryName: wineryGeneralInfo.name,
          },
        },
      });
    }
    updateAppLoading(false);
  }, []);

  // * Update the minified form based on the extended form toggle
  useEffect(() => {
    if (showExtendedForm == null) {
      setShowExtendedForm(!wineForm.formData.isMinified);
    } else {
      updateWineForm({
        ...wineForm,
        formData: {
          ...wineForm.formData,
          isMinified: !showExtendedForm,
        },
      });
    }
  }, [showExtendedForm]);

  const handleRegistration = () => {
    setIsLoading(true);
    updateAppLoading(true);
    if (!wineForm.isEditing) {
      uploadQrCodeToStorage(
        user?.uid as string,
        getQrCodeImageData("euLabelQrCode"),
        wineForm.formData.referenceNumber as string,
        (url: string) => {
          wineForm.formData.createdAt = Timestamp.now();
          wineForm.formData.generalInformation.wineryId = user?.uid as string;
          wineForm.formData.minifiedWine.wineryId = user?.uid as string;
          wineForm.formData.minifiedWine.qrCodeUrl = url;
          wineForm.formData.generalInformation.qrCodeUrl = url;
          // Register the wine
          wineClient &&
            wineClient.winery
              .registerWineryWine({
                uid: user?.uid as string,
                wine: wineForm.formData,
              })
              .then((result: any) => {
                setIsLoading(false);
                sendEmail({
                  data: {
                    from: "it@blazarlabs.io",
                    to: user?.email,
                    subject: "Your new EU label has been created!",
                    text: `Congratulations, you have successfuly registered a new EU Label.`,
                    html: generateWineHtml(
                      wineUrlComposerRef(
                        wineForm.formData.referenceNumber as string
                      ),
                      wineForm.formData.generalInformation.qrCodeUrl as string
                    ),
                  },
                })
                  .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    const data = result.data;
                    const sanitizedMessage: any = data;

                    updateAppLoading(false);
                    updateModal({
                      show: true,
                      title: "Success",
                      description:
                        "Your EU Label has been registered, and an email has been sent to you with the details.",
                      action: {
                        label: "OK",
                        onAction: () => {
                          updateModal({
                            show: false,
                            title: "",
                            description: "",
                            action: { label: "", onAction: () => {} },
                          });
                          router.replace("/home");
                        },
                      },
                    });
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    updateAppLoading(false);
                    updateModal({
                      show: true,
                      title: "Error",
                      description: firebaseAuthErrors[errorCode] as string,
                      action: {
                        label: "OK",
                        onAction: () => {
                          updateModal({
                            show: false,
                            title: "",
                            description: "",
                            action: { label: "", onAction: () => {} },
                          });
                        },
                      },
                    });
                  });
              })
              .catch((error: any) => {});
        }
      );
    } else {
      setIsLoading(true);
      updateAppLoading(true);
      // Update the wine
      wineClient &&
        wineClient.winery
          .updateWineryWine({ uid: user?.uid, wine: wineForm.formData })
          .then((result: any) => {
            setIsLoading(false);
            updateAppLoading(false);
            updateToast({
              show: true,
              status: "success",
              message: "Wine updated successfully",
              timeout: 3000,
            });
          })
          .catch((error: any) => {
            setIsLoading(false);
            updateAppLoading(false);
            updateToast({
              show: true,
              status: "error",
              message: "Error updating wine",
              timeout: 3000,
            });
          });

      router.replace("/home");
    }
  };

  const createQrCodeFile = async () => {
    const blob = await fetch(getQrCodeImageData("euLabelQrCode")).then((r) =>
      r.blob()
    );
    return new Promise<File>((resolve) => {
      const file = new File(
        [blob],
        wineForm.formData.referenceNumber + ".png",
        {
          type: "image/png",
        }
      );
      resolve(file);
    });
  };

  useEffect(() => {
    if (showReview) {
      createQrCodeFile()
        .then((file: File) => {
          fileToBase64(file).then((base64: any) => {
            setQrCodeFile(base64);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [showReview]);

  return (
    <Container
      intent="flexColLeft"
      px="3xlarge"
      py="medium"
      className="w-full h-full"
    >
      {showReview && (
        <ReviewWine
          qrCodeValue={wineUrlComposerRef(
            wineForm.formData.referenceNumber as string
          )}
          qrCodeId={"euLabelQrCode"}
          onAccept={() => {
            handleRegistration();
            setShowReview(false);
          }}
          onCancel={() => setShowReview(false)}
        />
      )}
      <Container intent="flexRowBetween" gap="medium" className="w-full">
        <Container intent="flexColLeft" gap="medium">
          <Container intent="flexRowLeft" gap="small">
            <Icon
              icon="bi:qr-code"
              className="w-[56px] h-[56px] text-primary-light"
            />
            <Text intent="h2">{wineForm.title}</Text>
          </Container>
          <Container intent="flexRowBetween">
            <Text variant="dim">{wineForm.description}</Text>
            <div>
              <Toggle
                disabled={false}
                label="Show extended form"
                isChecked={(showExtendedForm as boolean) || false}
                onCheck={(checked: boolean) => {
                  setShowExtendedForm(checked);
                  updateBanner(
                    checked,
                    "You are now editing extended form. This form allows you to tokenize your wine for supply chain tracking."
                  );
                }}
              />
            </div>
          </Container>
        </Container>
      </Container>
      {showExtendedForm ? (
        <ExtendedForm
          onSave={() => {
            if (!wineForm.isEditing) {
              setShowReview(true);
            } else {
              handleRegistration();
            }
          }}
          onCancel={() => router.replace("/home")}
        />
      ) : (
        <BasicForm
          onSave={() => {
            if (!wineForm.isEditing) {
              setShowReview(true);
            } else {
              handleRegistration();
            }
          }}
          onCancel={() => router.replace("/home")}
        />
      )}
    </Container>
  );
};
