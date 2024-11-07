"use client";

import { Container, ReviewWine, Text, Toggle } from "@/components";
import { useForms } from "@/context/FormsContext";
import { useAppState } from "@/context/appStateContext";
import { useAuth } from "@/context/authContext";
import { useBanner } from "@/context/bannerContext";
import { useModal } from "@/context/modalContext";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useToast } from "@/context/toastContext";
import { useWineClient } from "@/context/wineClientSdkContext";
import { db } from "@/lib/firebase/services/db";
import storage from "@/lib/firebase/services/storage";
import { DbReturn } from "@/typings/firestore";
import { Wine } from "@/typings/winery";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { fileToBase64 } from "@/utils/fileToBase64";
import { generateId } from "@/utils/generateId";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import { Icon } from "@iconify/react";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BasicForm } from "./BasicForm";
import { ExtendedForm } from "./ExtendedForm";

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

  const handleRegistration = (qrCodeFile: File, base64: string) => {
    setIsLoading(true);
    updateAppLoading(true);
    if (!wineForm.isEditing) {
      // * SET WINE FOR THE FIRST TIME
      console.log("qrCodeFile", qrCodeFile);
      console.log("wineForm", wineForm);

      // * Upload Generated QR Code to Storage
      storage.wine.upload(
        qrCodeFile,
        `images/${user?.uid}/${wineForm.formData.referenceNumber}.png`,
        (progress: any) => {},
        (error: any) => {},
        async (url: string) => {
          // * After file uploaded to storage
          wineForm.formData.createdAt = Timestamp.now();
          wineForm.formData.generalInformation.wineryId = user?.uid as string;
          wineForm.formData.minifiedWine.wineryId = user?.uid as string;
          wineForm.formData.minifiedWine.qrCodeUrl = url;
          wineForm.formData.generalInformation.qrCodeUrl = url;

          // * Save new wine to DB
          db.wine
            .set(user?.uid as string, wineForm.formData as Wine)
            .then((res: DbReturn) => {
              console.log("res", res);
              setIsLoading(false);
              updateAppLoading(false);
              updateToast({
                show: true,
                message: "Wine registered successfully",
                status: "success",
                timeout: 3000,
              });

              // * Send QRCODE Email
              fetch("/api/send-email", {
                method: "POST",
                body: JSON.stringify({
                  to: "fitosegrera@gmail.com",
                  templateId: "d-e43ea96c084e472abf812e22f2412c8e",
                  dynamic_template_data: {
                    qrCodeUrl: url,
                  },
                  attachments: [
                    {
                      content: base64,
                      filename: qrCodeFile.name,
                      type: qrCodeFile.type,
                      disposition: "attachment",
                      // cid: "euLabelQrCode",
                      // content_id: "euLabelQrCode",
                    },
                  ],
                }),
                headers: {
                  "content-type": "application/json",
                },
              })
                .then(async (res) => {
                  console.log("Email sent");
                  console.log(await res.json());
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((err: DbReturn) => {
              console.log("err", err);
            });
        }
      );
    } else {
      // * UPDATE WINE IN DATABASE
      setIsLoading(true);
      updateAppLoading(true);
      // Update the wine
      // wineClient &&
      //   wineClient.winery
      //     .updateWineryWine({ uid: user?.uid, wine: wineForm.formData })
      //     .then((result: any) => {
      //       setIsLoading(false);
      //       updateAppLoading(false);
      //       updateToast({
      //         show: true,
      //         status: "success",
      //         message: "Wine updated successfully",
      //         timeout: 3000,
      //       });
      //     })
      //     .catch((error: any) => {
      //       setIsLoading(false);
      //       updateAppLoading(false);
      //       updateToast({
      //         show: true,
      //         status: "error",
      //         message: "Error updating wine",
      //         timeout: 3000,
      //       });
      //     });

      // router.replace("/home");
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
          urlValue={`${
            process.env.NEXT_PUBLIC_DYNAMIC_QR_CODES_STATIC_URL as string
          }${wineForm.formData.referenceNumber}`}
          qrCodeId={wineForm.formData.referenceNumber as string}
          onSave={(qrCodeFile: File, qrBase64: string) => {
            handleRegistration(qrCodeFile, qrBase64);
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
              // handleRegistration();
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
              // handleRegistration();
            }
          }}
          onCancel={() => router.replace("/home")}
        />
      )}
    </Container>
  );
};
