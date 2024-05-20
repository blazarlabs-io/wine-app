"use client";

import {
  Button,
  Container,
  DropDown,
  Text,
  TextInputCrud,
  ReviewWine,
  InfoTooltip,
  TextNumberMapCrud,
  CheckBox,
  SpinnerLoader,
  Toggle,
} from "@/components";
import { Icon } from "@iconify/react";
import { countryList, vintageYearList } from "@/utils/data";
import { GrapesMapCoordinatesInterface } from "@/typings/winery";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { useEffect, useRef, useState } from "react";
import { generateId } from "@/utils/generateId";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import React from "react";
import {
  registerWineryWine,
  uploadQrCodeToStorage,
  uploadWineImageToStorage,
  updateWineryWine,
  updateGrapesInWine,
} from "@/utils/firestore";
import { useAuth } from "@/context/authContext";
import { wineUrlComposerRef } from "@/utils/wineUrlComposerRef";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { validateFileSizeAndType } from "@/utils/validators/validateFileSizeAndType";
import { useModal } from "@/context/modalContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { generateWineHtml } from "@/utils/generateWineHtml";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useForms } from "@/context/FormsContext";
import { useToast } from "@/context/toastContext";
import { restrictNumberInput } from "@/utils/validators/restrictNumberInput";

export const WineForm = () => {
  const router = useRouter();
  const { updateAppLoading } = useAppState();

  const { wineForm, updateWineForm } = useForms();

  const { updateModal } = useModal();
  const inputFileRef = useRef<any>(null);

  const {
    wineryGeneralInfo,
    wines,
    tier,
    level,
    wineColours,
    wineTypes,
    wineBottleSizes,
  } = useRealtimeDb();

  const initialized = useRef(false);
  const { user } = useAuth();

  const { updateToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [qrCodeFile, setQrCodeFile] = useState<string | null>(null);
  const [showExtendedForm, setShowExtendedForm] = useState<boolean>(false);

  const sendEmail = httpsCallable(functions, "sendEmail");

  useEffect(() => {
    if (!initialized.current && !wineForm.isEditing) {
      const ref = generateId(5) + "-" + dateToTimestamp();
      wineForm.formData.referenceNumber = ref;
      updateWineForm({
        ...wineForm,
        formData: {
          ...wineForm.formData,
          referenceNumber: ref,
          wineryName: wineryGeneralInfo.name,
        },
      });
    } else {
      updateWineForm({
        ...wineForm,
        formData: {
          ...wineForm.formData,
          wineryName: wineryGeneralInfo.name,
        },
      });
    }
    updateAppLoading(false);
  }, []);

  const handleRegistration = () => {
    setIsLoading(true);
    updateAppLoading(true);
    if (!wineForm.isEditing) {
      uploadQrCodeToStorage(
        user?.uid as string,
        getQrCodeImageData("euLabelQrCode"),
        wineForm.formData.referenceNumber,
        (url: string) => {
          wineForm.formData.qrCodeUrl = url;
          registerWineryWine(user?.uid as string, wineForm.formData);
          setIsLoading(false);
          sendEmail({
            data: {
              from: "it@blazarlabs.io",
              to: user?.email,
              subject: "Your new EU label has been created!",
              text: `Congratulations, you have successfuly registered a new EU Label.`,
              html: generateWineHtml(
                wineUrlComposerRef(wineForm.formData.referenceNumber),
                wineForm.formData.qrCodeUrl
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
      updateWineryWine(user?.uid as string, wineForm.formData);

      router.replace("/home");
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!wineForm.isEditing) {
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
        wineForm.formData.referenceNumber + ".png",
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
      wineForm.formData.referenceNumber,
      (url: string) => {
        updateWineForm({
          ...wineForm,
          formData: {
            ...wineForm.formData,
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
        <ReviewWine
          qrCodeValue={wineUrlComposerRef(wineForm.formData.referenceNumber)}
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
            <Toggle
              label="Show extended form"
              isChecked={showExtendedForm}
              onCheck={(checked: boolean) => {
                setShowExtendedForm(checked);
              }}
            />
          </Container>
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
                value={wineForm.formData.upc}
                onChange={(event: any) => {
                  wineForm.formData.upc = event.target.value;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      upc: wineForm.formData.upc,
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
                value={wineForm.formData.wineryName}
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
                value={wineForm.formData.wineCollectionName}
                onChange={(event: any) => {
                  wineForm.formData.wineCollectionName = event.target.value;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      wineCollectionName: wineForm.formData.wineCollectionName,
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
              <DropDown
                isRequired
                items={vintageYearList.sort()}
                fullWidth
                selectedValue={wineForm.formData.country}
                onSelect={(data: string) => {
                  wineForm.formData.harvestYear = data;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      harvestYear: wineForm.formData.harvestYear,
                    },
                  });
                }}
              />
              {/* <input
                required
                type="number"
                placeholder=""
                value={wineForm.formData.harvestYear}
                onChange={(event: any) => {
                  wineForm.formData.harvestYear = event.target.value;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      harvestYear: wineForm.formData.harvestYear,
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              /> */}
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
                selectedValue={wineForm.formData.country}
                onSelect={(data: string) => {
                  wineForm.formData.country = data;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      country: wineForm.formData.country,
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
                items={wineTypes}
                isRequired
                fullWidth
                selectedValue={wineForm.formData.typeOfWine}
                onSelect={(data: string) => {
                  wineForm.formData.typeOfWine = data;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      typeOfWine: wineForm.formData.typeOfWine,
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
                items={wineBottleSizes}
                isRequired
                fullWidth
                selectedValue={wineForm.formData.bottleSize}
                onSelect={(data: string) => {
                  wineForm.formData.bottleSize = data;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      bottleSize: wineForm.formData.bottleSize,
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
                items={wineColours}
                isRequired
                fullWidth
                selectedValue={wineForm.formData.colourOfWine}
                onSelect={(data: string) => {
                  wineForm.formData.colourOfWine = data;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      colourOfWine: wineForm.formData.colourOfWine,
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
                  min="0"
                  max="100"
                  step={0.5}
                  placeholder=""
                  value={wineForm.formData.alcoholLevel}
                  onChange={(event: any) => {
                    const restrictedVal = restrictNumberInput(
                      0,
                      100,
                      event.target.value
                    );
                    wineForm.formData.alcoholLevel = restrictedVal.toString();
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        alcoholLevel: wineForm.formData.alcoholLevel,
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
                value={wineForm.formData.controlledDesignationOfOrigin}
                onChange={(event: any) => {
                  wineForm.formData.controlledDesignationOfOrigin =
                    event.target.value;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      controlledDesignationOfOrigin:
                        wineForm.formData.controlledDesignationOfOrigin,
                    },
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>

          <Container intent="flexRowLeft" gap="xsmall">
            <Text
              intent="h5"
              variant="accent"
              className="mb-[8px] font-semibold"
            >
              Ingredients
            </Text>
            <InfoTooltip
              className="mt-[-8px]"
              text="List of potential allergens MUST be included on the printed bottle label if present in the product Eg: sulphites, albumin, isinglass, casein"
            />
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
                initialPosition={
                  wineryGeneralInfo.wineryHeadquarters || {
                    latitud: 0,
                    longitud: 0,
                  }
                }
                placeholder=""
                required={true}
                initialItems={wineForm.formData.ingredients.grapes.list}
                onItemsChange={(items: GrapesMapCoordinatesInterface[]) => {
                  const dataToUpdate = {
                    has: items.length > 0 ? true : false,
                    list: items,
                  };
                  updateGrapesInWine(
                    user?.uid as string,
                    wineForm.formData.referenceNumber,
                    dataToUpdate
                  );

                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
                        grapes: {
                          has: items.length > 0 ? true : false,
                          list: items,
                        },
                      },
                    },
                  });
                }}
                onPolygonComplete={(items: GrapesMapCoordinatesInterface[]) => {
                  const dataToUpdate = {
                    has: items.length > 0 ? true : false,
                    list: items,
                  };
                  updateGrapesInWine(
                    user?.uid as string,
                    wineForm.formData.referenceNumber,
                    dataToUpdate
                  );

                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
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
                  wineForm.formData.ingredients.acidityRegulators.list
                }
                onItemsChange={(items: string[]) => {
                  wineForm.formData.ingredients.acidityRegulators.list = items;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
                        acidityRegulators: {
                          allergens:
                            wineForm.formData.ingredients.acidityRegulators
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
                  wineForm.formData.ingredients.preservatives.allergens.has
                }
                onCheck={(state: boolean) => {
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
                        preservatives: {
                          has: wineForm.formData.ingredients.preservatives.has,
                          list: wineForm.formData.ingredients.preservatives
                            .list,
                          allergens: {
                            has: state,
                            list: [
                              ...wineForm.formData.ingredients.preservatives
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
                initialItems={wineForm.formData.ingredients.preservatives.list}
                onItemsChange={(items: string[]) => {
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
                        preservatives: {
                          allergens:
                            wineForm.formData.ingredients.preservatives
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
                  checked={wineForm.formData.ingredients.finingAgents.allergens.list.includes(
                    "Isinglass (Fish Allergen)"
                  )}
                  onCheck={(state: boolean) => {
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        ingredients: {
                          ...wineForm.formData.ingredients,
                          finingAgents: {
                            has: wineForm.formData.ingredients.finingAgents.has,
                            list: wineForm.formData.ingredients.finingAgents
                              .list,
                            allergens: {
                              has: state,
                              list: [
                                ...wineForm.formData.ingredients.finingAgents
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
                  checked={wineForm.formData.ingredients.finingAgents.allergens.list.includes(
                    "Casein (Milk Allergen)"
                  )}
                  onCheck={(state: boolean) => {
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        ingredients: {
                          ...wineForm.formData.ingredients,
                          finingAgents: {
                            has: wineForm.formData.ingredients.finingAgents.has,
                            list: wineForm.formData.ingredients.finingAgents
                              .list,
                            allergens: {
                              has: state,
                              list: [
                                ...wineForm.formData.ingredients.finingAgents
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
                initialItems={wineForm.formData.ingredients.finingAgents.list}
                onItemsChange={(items: string[]) => {
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
                        finingAgents: {
                          allergens:
                            wineForm.formData.ingredients.finingAgents
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
                  initialItems={wineForm.formData.ingredients.stabilizers.list}
                  onItemsChange={(items: string[]) => {
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        ingredients: {
                          ...wineForm.formData.ingredients,
                          stabilizers: {
                            allergens:
                              wineForm.formData.ingredients.stabilizers
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
                  initialItems={wineForm.formData.ingredients.antioxidants.list}
                  onItemsChange={(items: string[]) => {
                    updateWineForm({
                      ...wineForm,
                      formData: {
                        ...wineForm.formData,
                        ingredients: {
                          ...wineForm.formData.ingredients,
                          antioxidants: {
                            allergens:
                              wineForm.formData.ingredients.antioxidants
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
                value={wineForm.formData.ingredients.sugars}
                onChange={(event: any) => {
                  wineForm.formData.ingredients.sugars = event.target.value;
                  updateWineForm({
                    ...wineForm,
                    formData: {
                      ...wineForm.formData,
                      ingredients: {
                        ...wineForm.formData.ingredients,
                        sugars: wineForm.formData.ingredients.sugars,
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
        <Container intent="flexRowBetween">
          <Toggle
            label="Show extended form"
            isChecked={showExtendedForm}
            onCheck={(checked: boolean) => {
              setShowExtendedForm(checked);
            }}
          />
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
                  <Icon
                    icon="eos-icons:loading"
                    className="w-[16px] h-[16px]"
                  />
                </Container>
              )}
            </Button>
          </Container>
        </Container>
      </form>
    </Container>
  );
};
