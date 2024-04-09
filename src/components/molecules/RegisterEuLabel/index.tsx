"use client";

import {
  Button,
  CheckBox,
  CheckInputText,
  Container,
  DropDown,
  Text,
  TextInputCrud,
  ReviewEuLabel,
  InfoTooltip,
} from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";
import {
  countryList,
  productList,
  bottleSizeList,
  kindOfWineList,
  colourOfWineList,
} from "@/utils/data";
import { EuLabelInterface } from "@/typings/components";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { useEffect, useRef, useState } from "react";
import { generateId } from "@/utils/generateId";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/appStateContext";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import React from "react";
import {
  getWineryDataDb,
  registerWineryEuLabel,
  uploadQrCodeToStorage,
  uploadWineImageToStorage,
} from "@/utils/firestore";
import { useAuth } from "@/context/authContext";
import { euLabelUrlComposer } from "@/utils/euLabelUrlComposer";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { typeOfWineList } from "@/utils/data/typeOfWineList";
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

  const { wineryGeneralInfo, updateWineryEuLabels } = useRealtimeDb();

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
    uploadQrCodeToStorage(
      user?.uid as string,
      getQrCodeImageData("euLabelQrCode"),
      singleEuLabel.referenceNumber,
      (url: string) => {
        singleEuLabel.qrCodeUrl = url;
        uploadWineImageToStorage(
          user?.uid as string,
          wineImageFile as File,
          singleEuLabel.referenceNumber,
          (url: string) => {
            singleEuLabel.wineImageUrl = url;
            registerWineryEuLabel(user?.uid as string, singleEuLabel);
            setIsLoading(false);
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
    createQrCodeFile()
      .then((file: File) => {
        console.log("FILE", file);
        fileToBase64(file).then((base64: any) => {
          console.log("BASE64", base64);
          setQrCodeFile(base64);
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
                console.log(sanitizedMessage.message);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(firebaseAuthErrors[errorCode] as string);
              });
            router.replace("/home");
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
      {/* First Row */}
      <form onSubmit={handleSubmit}>
        <Container intent="flexColCenter" gap="medium">
          <Container intent="grid-4" gap="medium">
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
                * GTIN (UPC)
              </Text>
              <input
                required
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
            <Container intent="flexColLeft" gap="xsmall" className="col-span-2">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  Winery Image
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
          <Container intent="grid-4" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Winery Name
              </Text>
              <input
                disabled
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
                * Wine Name
              </Text>
              <input
                required
                type="text"
                placeholder=""
                value={singleEuLabel.wineName}
                onChange={(event: any) => {
                  singleEuLabel.wineName = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    wineName: singleEuLabel.wineName,
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
                type="text"
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
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Controlled Designation of Origin
              </Text>
              <input
                required
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

          {/* Third Row */}
          <Container intent="grid-4" gap="small" className="w-full">
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
                * Alcohol Level
              </Text>
              <Container intent="grid-2" gap="small" className="items-center">
                <input
                  required
                  type="text"
                  placeholder=""
                  value={singleEuLabel.alcoholLevel}
                  onChange={(event: any) => {
                    singleEuLabel.alcoholLevel = event.target.value;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      alcoholLevel: singleEuLabel.alcoholLevel,
                    });
                  }}
                  className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
                />
                <Text>% vol</Text>
              </Container>
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
          <Container intent="grid-4" gap="small" className="w-full">
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
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Produced By
                </Text>
                <InfoTooltip text="Please update if the wine is produced by an outsourced vendor" />
              </Container>
              <input
                required
                type="text"
                placeholder=""
                value={
                  singleEuLabel.producedBy.length === 0
                    ? wineryGeneralInfo.name
                    : singleEuLabel.producedBy
                }
                onChange={(event: any) => {
                  singleEuLabel.producedBy = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    producedBy: singleEuLabel.producedBy,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Container intent="flexRowLeft" gap="xsmall">
                <Text intent="p1" variant="dim">
                  * Bottled By
                </Text>
                <InfoTooltip text="Please update if the wine is bottled by an outsourced vendor" />
              </Container>
              <input
                required
                type="text"
                placeholder=""
                value={
                  singleEuLabel.bottledBy.length === 0
                    ? singleEuLabel.wineryName
                    : singleEuLabel.bottledBy
                }
                onChange={(event: any) => {
                  singleEuLabel.bottledBy = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    bottledBy: singleEuLabel.bottledBy,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Matured in Oak Barrels?
              </Text>
              <DropDown
                isRequired
                items={["Yes", "No"]}
                fullWidth
                selectedValue={singleEuLabel.maturedInOakBarrel ? "Yes" : "No"}
                onSelect={(data: string) => {
                  singleEuLabel.maturedInOakBarrel =
                    data === "Yes" ? true : false;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    maturedInOakBarrel: singleEuLabel.maturedInOakBarrel,
                  });
                }}
              />
            </Container>
          </Container>

          {/* Sixth Row */}
          <div className="grid grid-cols-4 gap-[16px] w-full">
            <Container
              intent="flexColLeft"
              gap="xsmall"
              className="w-full col-span-3"
            >
              <Text intent="p1" variant="dim">
                * Address of Producers
              </Text>
              <input
                required
                type="text"
                placeholder=""
                value={singleEuLabel.addressOfProducer}
                onChange={(event: any) => {
                  singleEuLabel.addressOfProducer = event.target.value;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    addressOfProducer: singleEuLabel.addressOfProducer,
                  });
                }}
                className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
              />
            </Container>
          </div>

          {/* Seventh Row */}
          <Container intent="grid-2" gap="small" className="w-full">
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim" className="">
                * Ingredients
              </Text>
              <Container intent="flexColLeft" gap="xsmall">
                <Container intent="flexRowCenter" className="h-[48px]">
                  <CheckBox
                    label="Grapes"
                    checked={singleEuLabel.ingredients.grapes.has}
                    onCheck={(state: boolean) => {
                      singleEuLabel.ingredients.grapes.has = state;
                      updateSingleEuLabel({
                        ...(singleEuLabel as EuLabelInterface),
                        ingredients: singleEuLabel.ingredients,
                      });
                    }}
                  />
                </Container>
                <CheckInputText
                  label="Acidity Regulators"
                  checked={singleEuLabel.ingredients.acidityRegulators.has}
                  value={singleEuLabel.ingredients.acidityRegulators.list[0]}
                  placeholder={
                    singleEuLabel.ingredients.acidityRegulators.has
                      ? ""
                      : "Malic Acid (D, L-/L-)"
                  }
                  onBoxChecked={(state: boolean) => {
                    singleEuLabel.ingredients.acidityRegulators.has = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                  onInputChange={(value: string) => {
                    singleEuLabel.ingredients.acidityRegulators.list[0] = value;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                />
                <CheckInputText
                  label="Antioxidants"
                  checked={singleEuLabel.ingredients.antioxidants.has}
                  value={singleEuLabel.ingredients.antioxidants.list[0]}
                  placeholder={
                    singleEuLabel.ingredients.antioxidants.has
                      ? ""
                      : "L-ascorbic acid"
                  }
                  onBoxChecked={(state: boolean) => {
                    singleEuLabel.ingredients.antioxidants.has = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                  onInputChange={(value: string) => {
                    singleEuLabel.ingredients.antioxidants.list[0] = value;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                />
                <CheckInputText
                  label="Preservative"
                  checked={singleEuLabel.ingredients.preservatives.has}
                  value={singleEuLabel.ingredients.preservatives.list[0]}
                  placeholder={
                    singleEuLabel.ingredients.preservatives.has
                      ? ""
                      : "Sulfites"
                  }
                  onBoxChecked={(state: boolean) => {
                    singleEuLabel.ingredients.preservatives.has = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                  onInputChange={(value: string) => {
                    singleEuLabel.ingredients.preservatives.list[0] = value;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                />
                <CheckInputText
                  label="Stabilizer"
                  checked={singleEuLabel.ingredients.stabilizers.has}
                  value={singleEuLabel.ingredients.stabilizers.list[0]}
                  placeholder={
                    singleEuLabel.ingredients.stabilizers.has
                      ? ""
                      : "Gum arabic"
                  }
                  onBoxChecked={(state: boolean) => {
                    singleEuLabel.ingredients.stabilizers.has = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                  onInputChange={(value: string) => {
                    singleEuLabel.ingredients.stabilizers.list[0] = value;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      ingredients: singleEuLabel.ingredients,
                    });
                  }}
                />
              </Container>
            </Container>
            <Container intent="flexColLeft" gap="xsmall" className="w-full">
              <Text intent="p1" variant="dim">
                * Alergens
              </Text>
              <Container intent="grid-3" gap="large" className="h-[48px]">
                <CheckBox
                  label="Sulphites"
                  checked={singleEuLabel.allergens.sulphites}
                  onCheck={(state: boolean) => {
                    singleEuLabel.allergens.sulphites = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      allergens: singleEuLabel.allergens,
                    });
                  }}
                />
                <CheckBox
                  label="Tanins"
                  checked={singleEuLabel.allergens.tanins}
                  onCheck={(state: boolean) => {
                    singleEuLabel.allergens.tanins = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      allergens: singleEuLabel.allergens,
                    });
                  }}
                />
                <CheckBox
                  label="Histamines"
                  checked={singleEuLabel.allergens.histamines}
                  onCheck={(state: boolean) => {
                    singleEuLabel.allergens.histamines = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      allergens: singleEuLabel.allergens,
                    });
                  }}
                />
              </Container>
              <Text intent="p2" variant="dim">
                * Fining Agents
              </Text>
              <Container intent="grid-3" gap="large" className="h-[48px]">
                <CheckBox
                  label="Egg Whites"
                  checked={singleEuLabel.allergens.finingAgents.eggWhites}
                  onCheck={(state: boolean) => {
                    singleEuLabel.allergens.finingAgents.eggWhites = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      allergens: singleEuLabel.allergens,
                    });
                  }}
                />
                <CheckBox
                  label="Milk Proteins"
                  checked={singleEuLabel.allergens.finingAgents.milkProteins}
                  onCheck={(state: boolean) => {
                    singleEuLabel.allergens.finingAgents.milkProteins = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      allergens: singleEuLabel.allergens,
                    });
                  }}
                />
                <CheckBox
                  label="Gelatines"
                  checked={singleEuLabel.allergens.finingAgents.gelatines}
                  onCheck={(state: boolean) => {
                    singleEuLabel.allergens.finingAgents.gelatines = state;
                    updateSingleEuLabel({
                      ...(singleEuLabel as EuLabelInterface),
                      allergens: singleEuLabel.allergens,
                    });
                  }}
                />
              </Container>
              <TextInputCrud
                placeholder="Add Fining Agent"
                initialItems={singleEuLabel.allergens.finingAgents.other}
                onItemsChange={(items: string[]) => {
                  singleEuLabel.allergens.finingAgents.other = items;
                  updateSingleEuLabel({
                    ...(singleEuLabel as EuLabelInterface),
                    allergens: singleEuLabel.allergens,
                  });
                }}
              />
            </Container>
          </Container>
        </Container>

        {/* Buttons */}
        <Container intent="flexRowCenter" py="medium" gap="medium">
          <Button
            intent="secondary"
            size="medium"
            fullWidth
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            intent="primary"
            size="medium"
            fullWidth
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
