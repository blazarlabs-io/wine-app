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
  CheckBox,
} from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";
import {
  countryList,
  bottleSizeList,
  colourOfWineList,
  typeOfWineList,
} from "@/utils/data";
import { EuLabelInterface, ItemWithPercentage } from "@/typings/winery";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { useEffect, useRef, useState } from "react";
import { generateId } from "@/utils/generateId";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import React from "react";
import {
  registerWineryEuLabel,
  uploadQrCodeToStorage,
  uploadWineImageToStorage,
} from "@/utils/firestore";
import { useAuth } from "@/context/authContext";
import { euLabelUrlComposer } from "@/utils/euLabelUrlComposer";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { validateFileSizeInMegabytes } from "@/utils/validateFileSizeInMegabytes";
import { useModal } from "@/context/modalContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { generateEuLabelHtml } from "@/utils/generateEuLabelHtml";
import { fileToBase64 } from "@/utils/fileToBase64";

export const RegisterEuLabel = () => {
  const router = useRouter();
  const { updateAppLoading } = useAppState();
  const {
    formTitle,
    formDescription,
    updateSingleEuLabel,
    singleEuLabel,
    isEditing,
  } = useWinery();

  const { updateModal } = useModal();
  const inputFileRef = useRef<any>(null);

  const { wineryGeneralInfo } = useRealtimeDb();

  const initialized = useRef(false);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [qrCodeFile, setQrCodeFile] = useState<string | null>(null);
  const [wineImageFile, setWineImageFile] = useState<File | null>(null);

  const sendEmail = httpsCallable(functions, "sendEmail");

  useEffect(() => {
    updateAppLoading(false);

    if (!initialized.current) {
      const ref = generateId(5) + "-" + dateToTimestamp();
      console.log(ref);
      singleEuLabel.referenceNumber = ref;
      updateSingleEuLabel({
        ...(singleEuLabel as EuLabelInterface),
        referenceNumber: ref,
        wineryName: wineryGeneralInfo.name,
      });
    }
  }, []);

  const handleRegistration = () => {
    setIsLoading(true);
    updateAppLoading(true);
    uploadQrCodeToStorage(
      user?.uid as string,
      getQrCodeImageData("euLabelQrCode"),
      singleEuLabel.referenceNumber,
      (url: string) => {
        console.log("QRCODE URL", url);
        singleEuLabel.qrCodeUrl = url;
        uploadWineImageToStorage(
          user?.uid as string,
          wineImageFile as File,
          singleEuLabel.referenceNumber,
          (url: string) => {
            singleEuLabel.wineImageUrl = url;
            registerWineryEuLabel(user?.uid as string, singleEuLabel);
            setIsLoading(false);
            sendEmail({
              data: {
                from: "it@blazarlabs.io",
                to: user?.email,
                subject: "Your new EU label has been created!",
                text: `Congratulations, you have successfuly registered a new EU-Only Label.`,
                html: generateEuLabelHtml(
                  euLabelUrlComposer(singleEuLabel.referenceNumber),
                  singleEuLabel.qrCodeUrl
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
                      }),
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
                    onAction: () =>
                      updateModal({
                        show: false,
                        title: "",
                        description: "",
                        action: { label: "", onAction: () => {} },
                      }),
                  },
                });
              });
          }
        );
      }
    );
  };

  const handleSubmit = (event: any) => {
    console.log("submitting");
    event.preventDefault();
    setShowReview(true);
  };

  const createQrCodeFile = async () => {
    const blob = await fetch(getQrCodeImageData("euLabelQrCode")).then((r) =>
      r.blob()
    );
    return new Promise<File>((resolve) => {
      const file = new File([blob], singleEuLabel.referenceNumber + ".png", {
        type: "image/png",
      });
      resolve(file);
    });
  };

  useEffect(() => {
    if (showReview) {
      createQrCodeFile()
        .then((file: File) => {
          // console.log("FILE", file);
          fileToBase64(file).then((base64: any) => {
            // console.log("BASE64", base64);
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
          qrCodeValue={euLabelUrlComposer(singleEuLabel.referenceNumber)}
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
            <Text intent="h2">{formTitle}</Text>
          </Container>
          <Text variant="dim">{formDescription}</Text>
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
              <Text intent="p1" variant="dim">
                Reference Number
              </Text>
              <Container
                intent="flexRowLeft"
                gap="small"
                className="min-h-[48px] max-h-[48px]"
              >
                <Text intent="p1" variant="normal">
                  {singleEuLabel.referenceNumber}
                </Text>
              </Container>
            </Container>
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim">
                GTIN (UPC)
              </Text>
              <input
                type="text"
                placeholder=""
                value={singleEuLabel.upc}
                onChange={(event: any) => {
                  singleEuLabel.upc = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    upc: singleEuLabel.upc,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="">
              <Container intent="flexRowLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="min-w-fit">
                  Wine Image
                </Text>
                <InfoTooltip
                  width={240}
                  text="For optimal display, please upload a photo of your wine bottle against a single-color background. Ensure the bottle is vertical, occupies 80-90% of the photo's height, and is free from unnecessary elements. High or studio lighting is preferred. You can change this photo later if needed."
                />
              </Container>
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                multiple={false}
                title=""
                onChange={(event: any) => {
                  const validFile = validateFileSizeInMegabytes(
                    event.target.files[0],
                    2
                  );
                  if (!validFile) {
                    inputFileRef.current.value = "";
                    updateModal({
                      show: true,
                      title: "Error",
                      description: "File size should be less than 2MB",
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
                    setWineImageFile(event.target.files[0]);
                  }
                }}
                className="text-primary-light file:border-2 file:border-primary-light file:px-[36px] file:py-[10px] file:rounded-lg file:bg-transparent file:text-primary-light file:font-semibold transition-all duration-300 ease-in-out"
              />
            </Container>
          </Container>

          {/* Second Row */}
          <Container intent="grid-3" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                Winery Name
              </Text>
              <input
                readOnly
                type="text"
                placeholder=""
                value={singleEuLabel.wineryName}
                onChange={(event: any) => {
                  singleEuLabel.wineryName = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    wineryName: singleEuLabel.wineryName,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Wine Collection Name
              </Text>
              <input
                required
                type="text"
                placeholder=""
                value={singleEuLabel.wineCollectionName}
                onChange={(event: any) => {
                  singleEuLabel.wineCollectionName = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    wineCollectionName: singleEuLabel.wineCollectionName,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Harvest Year
              </Text>
              <input
                required
                type="number"
                placeholder=""
                value={singleEuLabel.harvestYear}
                onChange={(event: any) => {
                  singleEuLabel.harvestYear = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    harvestYear: singleEuLabel.harvestYear,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </Container>

          {/* Third Row */}
          <Container intent="grid-3" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Country
              </Text>
              <DropDown
                isRequired
                items={countryList}
                fullWidth
                selectedValue={singleEuLabel.country}
                onSelect={(data: string) => {
                  singleEuLabel.country = data;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    country: singleEuLabel.country,
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Type of Wine
              </Text>
              <DropDown
                items={typeOfWineList}
                isRequired
                fullWidth
                selectedValue={singleEuLabel.typeOfWine}
                onSelect={(data: string) => {
                  singleEuLabel.typeOfWine = data;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    typeOfWine: singleEuLabel.typeOfWine,
                  });
                }}
              />
            </Container>

            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Bottle Size
              </Text>
              <DropDown
                items={bottleSizeList}
                isRequired
                fullWidth
                selectedValue={singleEuLabel.bottleSize}
                onSelect={(data: string) => {
                  singleEuLabel.bottleSize = data;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    bottleSize: singleEuLabel.bottleSize,
                  });
                }}
              />
            </Container>
          </Container>

          {/* Fourth Row */}
          <Container intent="grid-3" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Colour of Wine
              </Text>
              <DropDown
                items={colourOfWineList}
                isRequired
                fullWidth
                selectedValue={singleEuLabel.colourOfWine}
                onSelect={(data: string) => {
                  singleEuLabel.colourOfWine = data;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    colourOfWine: singleEuLabel.colourOfWine,
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Alcohol Level %
              </Text>
              <Container intent="grid-3" gap="small" className="items-center">
                <input
                  required
                  type="number"
                  placeholder=""
                  value={singleEuLabel.alcoholLevel}
                  onChange={(event: any) => {
                    singleEuLabel.alcoholLevel = event.target.value;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      alcoholLevel: singleEuLabel.alcoholLevel,
                    });
                  }}
                  className="w-full col-span-2 text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
                <Text>% vol</Text>
              </Container>
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p1" variant="dim" className="min-w-fit">
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
                value={singleEuLabel.controlledDesignationOfOrigin}
                onChange={(event: any) => {
                  singleEuLabel.controlledDesignationOfOrigin =
                    event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    controlledDesignationOfOrigin:
                      singleEuLabel.controlledDesignationOfOrigin,
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
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p1" variant="dim" className="">
                  * Grapes Varieties
                </Text>
                <InfoTooltip text="Add each grape variety and it's percentage in the wine" />
              </Container>
              <TextAndNumberInputCrud
                placeholder=""
                required={true}
                initialItems={singleEuLabel.ingredients.grapes.list}
                onItemsChange={(items: ItemWithPercentage[]) => {
                  singleEuLabel.ingredients.grapes.list = items;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    ingredients: {
                      ...singleEuLabel.ingredients,
                      grapes: {
                        has: true,
                        list: items,
                      },
                    },
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p1" variant="dim" className="">
                Acidity Regulators
              </Text>
              <TextInputCrud
                label="Name"
                placeholder="Malic Acid"
                initialItems={singleEuLabel.ingredients.acidityRegulators.list}
                onItemsChange={(items: string[]) => {
                  singleEuLabel.ingredients.acidityRegulators.list = items;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    ingredients: {
                      ...singleEuLabel.ingredients,
                      acidityRegulators: {
                        allergens:
                          singleEuLabel.ingredients.acidityRegulators.allergens,
                        has: true,
                        list: items,
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
              <Text intent="p1" variant="dim" className="">
                Preservatives
              </Text>
              <CheckBox
                label="Sulphites"
                checked={false}
                onCheck={(state: boolean) => {
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    ingredients: {
                      ...singleEuLabel.ingredients,
                      preservatives: {
                        has: singleEuLabel.ingredients.preservatives.has,
                        list: singleEuLabel.ingredients.preservatives.list,
                        allergens: {
                          has: state,
                          list: [
                            ...singleEuLabel.ingredients.preservatives.allergens
                              .list,
                            "Sulphites (Allergen)",
                          ],
                        },
                      },
                    },
                  });
                }}
              />
              <TextInputCrud
                label="Name"
                placeholder="Sulphites"
                initialItems={singleEuLabel.ingredients.preservatives.list}
                onItemsChange={(items: string[]) => {
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    ingredients: {
                      ...singleEuLabel.ingredients,
                      preservatives: {
                        allergens:
                          singleEuLabel.ingredients.preservatives.allergens,
                        has: true,
                        list: items,
                      },
                    },
                  });
                }}
              />
            </Container>
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p1" variant="dim" className="">
                Fining Agents
              </Text>
              <Container intent="flexRowLeft" gap="small" className="max-w-fit">
                <CheckBox
                  label="Isinglass"
                  checked={false}
                  onCheck={(state: boolean) => {
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: {
                        ...singleEuLabel.ingredients,
                        finingAgents: {
                          has: singleEuLabel.ingredients.finingAgents.has,
                          list: singleEuLabel.ingredients.finingAgents.list,
                          allergens: {
                            has: state,
                            list: [
                              ...singleEuLabel.ingredients.finingAgents
                                .allergens.list,
                              "Isinglass (Fish Allergen)",
                            ],
                          },
                        },
                      },
                    });
                  }}
                />
                <CheckBox
                  label="Casein"
                  checked={false}
                  onCheck={(state: boolean) => {
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: {
                        ...singleEuLabel.ingredients,
                        finingAgents: {
                          has: singleEuLabel.ingredients.finingAgents.has,
                          list: singleEuLabel.ingredients.finingAgents.list,
                          allergens: {
                            has: state,
                            list: [
                              ...singleEuLabel.ingredients.finingAgents
                                .allergens.list,
                              "Casein (Milk Allergen)",
                            ],
                          },
                        },
                      },
                    });
                  }}
                />
              </Container>
              <TextInputCrud
                label="Name"
                placeholder="Potassium sorbate"
                initialItems={singleEuLabel.ingredients.finingAgents.list}
                onItemsChange={(items: string[]) => {
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    ingredients: {
                      ...singleEuLabel.ingredients,
                      finingAgents: {
                        allergens:
                          singleEuLabel.ingredients.finingAgents.allergens,
                        has: true,
                        list: items,
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
                <Text intent="p1" variant="dim" className="">
                  Stabilizers
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="Arabic Gum"
                  initialItems={singleEuLabel.ingredients.stabilizers.list}
                  onItemsChange={(items: string[]) => {
                    singleEuLabel.ingredients.stabilizers.list = items;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: {
                        ...singleEuLabel.ingredients,
                        stabilizers: {
                          allergens:
                            singleEuLabel.ingredients.stabilizers.allergens,
                          has: true,
                          list: items,
                        },
                      },
                    });
                  }}
                />
              </Container>
            </Container>

            <Container intent="flexColLeft" gap="small" className="w-full">
              <Container intent="flexColLeft" gap="small" className="w-full">
                <Text intent="p1" variant="dim" className="">
                  Antioxidants
                </Text>
                <TextInputCrud
                  label="Name"
                  placeholder="Gallic Acid (GA)"
                  initialItems={singleEuLabel.ingredients.antioxidants.list}
                  onItemsChange={(items: string[]) => {
                    singleEuLabel.ingredients.antioxidants.list = items;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: {
                        ...singleEuLabel.ingredients,
                        antioxidants: {
                          allergens:
                            singleEuLabel.ingredients.antioxidants.allergens,
                          has: true,
                          list: items,
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
                <Text intent="p1" variant="dim" className="">
                  * Sugars (g/100g)
                </Text>
                <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
              </Container>
              <input
                type="number"
                required
                placeholder=""
                value={singleEuLabel.ingredients.sugars}
                onChange={(event: any) => {
                  singleEuLabel.ingredients.sugars = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    ingredients: {
                      ...singleEuLabel.ingredients,
                      sugars: singleEuLabel.ingredients.sugars,
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
            onClick={() => router.back()}
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
              <>{isEditing ? "Update" : "Register"}</>
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
