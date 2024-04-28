"use client";

import {
  Button,
  Container,
  DropDown,
  Text,
  TextInputCrud,
  ReviewEuLabel,
  InfoTooltip,
  TextAndNumberInputCrud,
  TextNumberMapCrud,
  CheckBox,
  SpinnerLoader,
} from "@/components";
import { Icon } from "@iconify/react";
import {
  countryList,
  bottleSizeList,
  colourOfWineList,
  typeOfWineList,
} from "@/utils/data";
import {
  EuLabelInterface,
  GrapesMapCoordinatesInterface,
  ItemWithPercentage,
  WineryInterface,
} from "@/typings/winery";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { useEffect, useRef, useState } from "react";
import { generateId } from "@/utils/generateId";
import { useRouter, useParams } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import React from "react";
import {
  regiterWineryEuLabel,
  uploadQrCodeToStorage,
  uploadWineImageToStorage,
  updateWineryEuLabel,
  overWiteWineryData,
  updateGrapesInEuLabel,
} from "@/utils/firestore";
import { useAuth } from "@/context/authContext";
import { euLabelUrlComposer } from "@/utils/euLabelUrlComposer";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { validateFileSizeAndType } from "@/utils/validateFileSizeAndType";
import { useModal } from "@/context/modalContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { generateEuLabelHtml } from "@/utils/generateEuLabelHtml";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useForms } from "@/context/FormsContext";
import { useToast } from "@/context/toastContext";

export const EuLabelForm = () => {
  const router = useRouter();
  const { updateAppLoading } = useAppState();

  const { euLabelForm, updateEuLabelForm } = useForms();

  const { updateModal } = useModal();
  const inputFileRef = useRef<any>(null);

  const { wineryGeneralInfo, wineryEuLabels, tier, level } = useRealtimeDb();

  const initialized = useRef(false);
  const { user } = useAuth();

  const { updateToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [qrCodeFile, setQrCodeFile] = useState<string | null>(null);

  const sendEmail = httpsCallable(functions, "sendEmail");

  useEffect(() => {
    if (!initialized.current && !euLabelForm.isEditing) {
      const ref = generateId(5) + "-" + dateToTimestamp();
      console.log("Generating new EU LABEL", ref);
      euLabelForm.formData.referenceNumber = ref;
      updateEuLabelForm({
        ...euLabelForm,
        formData: {
          ...euLabelForm.formData,
          referenceNumber: ref,
          wineryName: wineryGeneralInfo.name,
        },
      });
    } else {
      updateEuLabelForm({
        ...euLabelForm,
        formData: {
          ...euLabelForm.formData,
          wineryName: wineryGeneralInfo.name,
        },
      });
    }
    updateAppLoading(false);
  }, []);

  const handleRegistration = () => {
    setIsLoading(true);
    updateAppLoading(true);
    if (!euLabelForm.isEditing) {
      uploadQrCodeToStorage(
        user?.uid as string,
        getQrCodeImageData("euLabelQrCode"),
        euLabelForm.formData.referenceNumber,
        (url: string) => {
          console.log("QRCODE URL", url);
          euLabelForm.formData.qrCodeUrl = url;
          regiterWineryEuLabel(user?.uid as string, euLabelForm.formData);
          setIsLoading(false);
          sendEmail({
            data: {
              from: "it@blazarlabs.io",
              to: user?.email,
              subject: "Your new EU label has been created!",
              text: `Congratulations, you have successfuly registered a new EU-Only Label.`,
              html: generateEuLabelHtml(
                euLabelUrlComposer(euLabelForm.formData.referenceNumber),
                euLabelForm.formData.qrCodeUrl
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
        }
      );
    } else {
      // console.log("Updating EU LABEL", euLabelForm.formData);
      updateWineryEuLabel(user?.uid as string, euLabelForm.formData);

      // const sortedEuLabels = wineryEuLabels;
      // wineryEuLabels.forEach((label, index) => {
      //   if (label.referenceNumber === euLabelForm.formData.referenceNumber) {
      //     sortedEuLabels[index] = euLabelForm.formData;
      //   }
      // });

      // const wineryData: WineryInterface = {
      //   generalInfo: wineryGeneralInfo,
      //   tier: tier || null,
      //   level: level || null,
      //   wines: [] || null,
      //   euLabels: sortedEuLabels || null,
      // };
      // // console.log("wineryEuLabels", wineryEuLabels);
      // // console.log(sortedEuLabels);
      // overWiteWineryData(user?.uid as string, wineryData)
      //   .then(() => {
      //     updateToast({
      //       show: true,
      //       status: "success",
      //       message: "EU Label updated successfully",
      //       timeout: 3000,
      //     });
      //   })
      //   .catch((error) => {
      //     updateToast({
      //       show: true,
      //       status: "error",
      //       message: "Failed to update EU Label",
      //       timeout: 3000,
      //     });
      //   });

      router.replace("/home");
    }
  };

  const handleSubmit = (event: any) => {
    console.log("submitting");
    event.preventDefault();
    if (!euLabelForm.isEditing) {
      setShowReview(true);
    } else {
      handleRegistration();
    }
  };

  const createQrCodeFile = async () => {
    const blob = await fetch(getQrCodeImageData("euLabelQrCode")).then((r) =>
      r.blob()
    );
    return new Promise<File>((resolve) => {
      const file = new File(
        [blob],
        euLabelForm.formData.referenceNumber + ".png",
        {
          type: "image/png",
        }
      );
      resolve(file);
    });
  };

  const handleWineImageUpload = (wineImageFile: File) => {
    setImageUploading(true);
    uploadWineImageToStorage(
      user?.uid as string,
      wineImageFile as File,
      euLabelForm.formData.referenceNumber,
      (url: string) => {
        updateEuLabelForm({
          ...euLabelForm,
          formData: {
            ...euLabelForm.formData,
            wineImageUrl: url,
          },
        });
        setImageUploading(false);
      }
    );
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
        <ReviewEuLabel
          qrCodeValue={euLabelUrlComposer(euLabelForm.formData.referenceNumber)}
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
            <Text intent="h2">{euLabelForm.title}</Text>
          </Container>
          <Text variant="dim">{euLabelForm.description}</Text>
        </Container>
      </Container>
      <div className="h-[1px] bg-on-surface-dark/50 w-full my-[24px]" />
      <Container intent="flexRowLeft">
        <Text intent="h5" variant="accent" className="mb-[32px] font-semibold">
          General Information
        </Text>
      </Container>
      {/* First Row */}
      <form onSubmit={handleSubmit}>
        <Container intent="flexColCenter" gap="medium">
          <Container intent="grid-3" gap="medium">
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim" className="font-semibold">
                GTIN (UPC)
              </Text>
              <input
                type="text"
                placeholder=""
                value={euLabelForm.formData.upc}
                onChange={(event: any) => {
                  euLabelForm.formData.upc = event.target.value;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      upc: euLabelForm.formData.upc,
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="">
              <Container
                intent="flexRowLeft"
                gap="xsmall"
                className="max-w-fit"
              >
                <Text
                  intent="p1"
                  variant="dim"
                  className="font-semibold min-w-fit"
                >
                  Wine Image
                </Text>
                <InfoTooltip
                  width={240}
                  text="For optimal display, please upload a photo of your wine bottle against a single-color background. Ensure the bottle is vertical, occupies 80-90% of the photo's height, and is free from unnecessary elements. High or studio lighting is preferred. You can change this photo later if needed."
                />
                {imageUploading && (
                  <div className="flex items-center justify-start gap-[8px] max-w-fit">
                    <Text intent="p2" variant="dim" className="font-semibold">
                      Uploading
                    </Text>
                    <SpinnerLoader color="#ddd" />
                  </div>
                )}
              </Container>
              <input
                id="files"
                ref={inputFileRef}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(event: any) => {
                  const validFile = validateFileSizeAndType(
                    event.target.files[0],
                    2
                  );
                  if (!validFile) {
                    inputFileRef.current.value = "";
                    updateModal({
                      show: true,
                      title: "Error",
                      description:
                        "File size should be less than 2MB and image types accepted are jpeg and png.",
                      action: {
                        label: "OK",
                        onAction: () =>
                          updateModal({
                            show: false,
                            title: "",
                            description: "",
                            action: { label: "", onAction: () => {} },
                          }),
                      },
                    });
                  } else {
                    handleWineImageUpload(event.target.files[0]);
                  }
                }}
                className="file:mr-[8px] text-primary-light file:border-2 file:border-primary-light file:px-[36px] file:py-[10px] file:rounded-lg file:bg-transparent file:text-primary-light file:font-semibold transition-all duration-300 ease-in-out"
              />
            </Container>
          </Container>

          {/* Second Row */}
          <Container intent="grid-3" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                Winery Name
              </Text>
              <input
                readOnly
                type="text"
                placeholder=""
                value={euLabelForm.formData.wineryName}
                onChange={(event: any) => {}}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Wine Collection Name
              </Text>
              <input
                required
                type="text"
                placeholder=""
                value={euLabelForm.formData.wineCollectionName}
                onChange={(event: any) => {
                  euLabelForm.formData.wineCollectionName = event.target.value;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      wineCollectionName:
                        euLabelForm.formData.wineCollectionName,
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Harvest Year
              </Text>
              <input
                required
                type="number"
                placeholder=""
                value={euLabelForm.formData.harvestYear}
                onChange={(event: any) => {
                  euLabelForm.formData.harvestYear = event.target.value;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      harvestYear: euLabelForm.formData.harvestYear,
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>

          {/* Third Row */}
          <Container intent="grid-3" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Country
              </Text>
              <DropDown
                isRequired
                items={countryList}
                fullWidth
                selectedValue={euLabelForm.formData.country}
                onSelect={(data: string) => {
                  euLabelForm.formData.country = data;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      country: euLabelForm.formData.country,
                    },
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Type of Wine
              </Text>
              <DropDown
                items={typeOfWineList}
                isRequired
                fullWidth
                selectedValue={euLabelForm.formData.typeOfWine}
                onSelect={(data: string) => {
                  euLabelForm.formData.typeOfWine = data;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      typeOfWine: euLabelForm.formData.typeOfWine,
                    },
                  });
                }}
              />
            </Container>

            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Bottle Size
              </Text>
              <DropDown
                items={bottleSizeList}
                isRequired
                fullWidth
                selectedValue={euLabelForm.formData.bottleSize}
                onSelect={(data: string) => {
                  euLabelForm.formData.bottleSize = data;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      bottleSize: euLabelForm.formData.bottleSize,
                    },
                  });
                }}
              />
            </Container>
          </Container>

          {/* Fourth Row */}
          <Container intent="grid-3" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                * Wine Color
              </Text>
              <DropDown
                items={colourOfWineList}
                isRequired
                fullWidth
                selectedValue={euLabelForm.formData.colourOfWine}
                onSelect={(data: string) => {
                  euLabelForm.formData.colourOfWine = data;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      colourOfWine: euLabelForm.formData.colourOfWine,
                    },
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Alcohol Level %
                </Text>
              </Container>
              <Container intent="grid-2" gap="xsmall" className="items-center">
                <input
                  required
                  type="number"
                  placeholder=""
                  value={euLabelForm.formData.alcoholLevel}
                  onChange={(event: any) => {
                    euLabelForm.formData.alcoholLevel = event.target.value;
                    updateEuLabelForm({
                      ...euLabelForm,
                      formData: {
                        ...euLabelForm.formData,
                        alcoholLevel: euLabelForm.formData.alcoholLevel,
                      },
                    });
                  }}
                  className="text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
                <Text>% vol</Text>
              </Container>
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text
                  intent="p1"
                  variant="dim"
                  className="font-semibold min-w-fit"
                >
                  Controlled Designation of Origin
                </Text>
                <InfoTooltip
                  width={200}
                  text="Are the grapes from a vineyard that is internationally acknowledged CDO?"
                />
              </Container>
              <input
                type="text"
                placeholder=""
                value={euLabelForm.formData.controlledDesignationOfOrigin}
                onChange={(event: any) => {
                  euLabelForm.formData.controlledDesignationOfOrigin =
                    event.target.value;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      controlledDesignationOfOrigin:
                        euLabelForm.formData.controlledDesignationOfOrigin,
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>

          <Container intent="flexRowLeft">
            <Text
              intent="h5"
              variant="accent"
              className="mb-[8px] font-semibold"
            >
              Ingredients
            </Text>
          </Container>
          {/* Fith Row */}
          <Container intent="grid-2" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Grapes Varieties
                </Text>
                <InfoTooltip text="Add each grape variety and its percentage in the wine" />
              </Container>
              <TextNumberMapCrud
                initialPosition={wineryGeneralInfo.wineryHeadquarters}
                placeholder=""
                required={true}
                initialItems={euLabelForm.formData.ingredients.grapes.list}
                onItemsChange={(items: GrapesMapCoordinatesInterface[]) => {
                  // console.log("ON ITEMS CHANGE", items);

                  const dataToUpdate = {
                    has: items.length > 0 ? true : false,
                    list: items,
                  };
                  updateGrapesInEuLabel(
                    user?.uid as string,
                    euLabelForm.formData.referenceNumber,
                    dataToUpdate
                  );

                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        grapes: {
                          has: items.length > 0 ? true : false,
                          list: items,
                        },
                      },
                    },
                  });
                }}
                onPolygonComplete={(items: GrapesMapCoordinatesInterface[]) => {
                  // console.log("POLYGON COMPLETE", items);

                  const dataToUpdate = {
                    has: items.length > 0 ? true : false,
                    list: items,
                  };
                  updateGrapesInEuLabel(
                    user?.uid as string,
                    euLabelForm.formData.referenceNumber,
                    dataToUpdate
                  );

                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        grapes: {
                          has: items.length > 0 ? true : false,
                          list: items,
                        },
                      },
                    },
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                Acidity Regulators
              </Text>
              <TextInputCrud
                label="Name"
                placeholder="e.g. Malic Acid"
                initialItems={
                  euLabelForm.formData.ingredients.acidityRegulators.list
                }
                onItemsChange={(items: string[]) => {
                  euLabelForm.formData.ingredients.acidityRegulators.list =
                    items;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        acidityRegulators: {
                          allergens:
                            euLabelForm.formData.ingredients.acidityRegulators
                              .allergens,
                          has: true,
                          list: items,
                        },
                      },
                    },
                  });
                }}
              />
            </Container>
          </Container>

          {/* Sixth Row */}
          <Container intent="grid-2" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                Preservatives
              </Text>
              <CheckBox
                label="Sulphites"
                checked={
                  euLabelForm.formData.ingredients.preservatives.allergens.has
                }
                onCheck={(state: boolean) => {
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        preservatives: {
                          has: euLabelForm.formData.ingredients.preservatives
                            .has,
                          list: euLabelForm.formData.ingredients.preservatives
                            .list,
                          allergens: {
                            has: state,
                            list: [
                              ...euLabelForm.formData.ingredients.preservatives
                                .allergens.list,
                              "Sulphites (Allergen)",
                            ],
                          },
                        },
                      },
                    },
                  });
                }}
              />
              <TextInputCrud
                label="Name"
                placeholder="e.g. Sulphites"
                initialItems={
                  euLabelForm.formData.ingredients.preservatives.list
                }
                onItemsChange={(items: string[]) => {
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        preservatives: {
                          allergens:
                            euLabelForm.formData.ingredients.preservatives
                              .allergens,
                          has: true,
                          list: items,
                        },
                      },
                    },
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p1" variant="dim" className="font-semibold">
                Fining Agents
              </Text>
              <Container intent="flexRowLeft" gap="small" className="max-w-fit">
                <CheckBox
                  label="Isinglass"
                  checked={euLabelForm.formData.ingredients.finingAgents.allergens.list.includes(
                    "Isinglass (Fish Allergen)"
                  )}
                  onCheck={(state: boolean) => {
                    updateEuLabelForm({
                      ...euLabelForm,
                      formData: {
                        ...euLabelForm.formData,
                        ingredients: {
                          ...euLabelForm.formData.ingredients,
                          finingAgents: {
                            has: euLabelForm.formData.ingredients.finingAgents
                              .has,
                            list: euLabelForm.formData.ingredients.finingAgents
                              .list,
                            allergens: {
                              has: state,
                              list: [
                                ...euLabelForm.formData.ingredients.finingAgents
                                  .allergens.list,
                                "Isinglass (Fish Allergen)",
                              ],
                            },
                          },
                        },
                      },
                    });
                  }}
                />
                <CheckBox
                  label="Casein"
                  checked={euLabelForm.formData.ingredients.finingAgents.allergens.list.includes(
                    "Casein (Milk Allergen)"
                  )}
                  onCheck={(state: boolean) => {
                    updateEuLabelForm({
                      ...euLabelForm,
                      formData: {
                        ...euLabelForm.formData,
                        ingredients: {
                          ...euLabelForm.formData.ingredients,
                          finingAgents: {
                            has: euLabelForm.formData.ingredients.finingAgents
                              .has,
                            list: euLabelForm.formData.ingredients.finingAgents
                              .list,
                            allergens: {
                              has: state,
                              list: [
                                ...euLabelForm.formData.ingredients.finingAgents
                                  .allergens.list,
                                "Casein (Milk Allergen)",
                              ],
                            },
                          },
                        },
                      },
                    });
                  }}
                />
              </Container>
              <TextInputCrud
                label="Name"
                placeholder="e.g. Potassium sorbate"
                initialItems={
                  euLabelForm.formData.ingredients.finingAgents.list
                }
                onItemsChange={(items: string[]) => {
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        finingAgents: {
                          allergens:
                            euLabelForm.formData.ingredients.finingAgents
                              .allergens,
                          has: true,
                          list: items,
                        },
                      },
                    },
                  });
                }}
              />
            </Container>
          </Container>

          {/* Seventh Row */}
          <Container intent="grid-2" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Stabilizers
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Arabic Gum"
                  initialItems={
                    euLabelForm.formData.ingredients.stabilizers.list
                  }
                  onItemsChange={(items: string[]) => {
                    updateEuLabelForm({
                      ...euLabelForm,
                      formData: {
                        ...euLabelForm.formData,
                        ingredients: {
                          ...euLabelForm.formData.ingredients,
                          stabilizers: {
                            allergens:
                              euLabelForm.formData.ingredients.stabilizers
                                .allergens,
                            has: true,
                            list: items,
                          },
                        },
                      },
                    });
                  }}
                />
              </Container>
            </Container>

            <Container intent="flexColLeft" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="font-semibold">
                  Antioxidants
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="e.g. Gallic Acid (GA)"
                  initialItems={
                    euLabelForm.formData.ingredients.antioxidants.list
                  }
                  onItemsChange={(items: string[]) => {
                    updateEuLabelForm({
                      ...euLabelForm,
                      formData: {
                        ...euLabelForm.formData,
                        ingredients: {
                          ...euLabelForm.formData.ingredients,
                          antioxidants: {
                            allergens:
                              euLabelForm.formData.ingredients.antioxidants
                                .allergens,
                            has: true,
                            list: items,
                          },
                        },
                      },
                    });
                  }}
                />
              </Container>
            </Container>
          </Container>
          <Container intent="grid-2" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p1" variant="dim" className="font-semibold">
                  * Sugars (g/100g)
                </Text>
                <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
              </Container>
              <input
                type="number"
                required
                placeholder=""
                value={euLabelForm.formData.ingredients.sugars}
                onChange={(event: any) => {
                  euLabelForm.formData.ingredients.sugars = event.target.value;
                  updateEuLabelForm({
                    ...euLabelForm,
                    formData: {
                      ...euLabelForm.formData,
                      ingredients: {
                        ...euLabelForm.formData.ingredients,
                        sugars: euLabelForm.formData.ingredients.sugars,
                      },
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>
        </Container>

        {/* Buttons */}
        <Container intent="flexRowRight" py="medium" gap="medium">
          <Button
            intent="secondary"
            size="medium"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            intent="primary"
            size="medium"
            onClick={() => {}}
          >
            {!isLoading ? (
              <>{"Save"}</>
            ) : (
              <Container intent="flexRowCenter">
                <Icon icon="eos-icons:loading" className="w-[16px] h-[16px]" />
              </Container>
            )}
          </Button>
        </Container>
      </form>
    </Container>
  );
};
