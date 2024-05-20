/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  Button,
  Container,
  PolygonViewerMap,
  PolygonEditorMap,
  Text,
  DropDown,
  SpinnerLoader,
} from "@/components";
import { use, useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  CoordinateInterface,
  GrapeAndVineyard,
  GrapeVariety,
  VineyardDetails,
} from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { vintageYearList } from "@/utils/data";
import { useRouter } from "next/navigation";
import { useGetGrapeVarieties } from "@/hooks/useGetGrapeVarieties";
import { useGrapeAndVineyards } from "@/hooks/useGrapeAndVineyards";

export interface TextInputCrudProps {
  initialPosition: CoordinateInterface | null;
  placeholder: string;
  required?: boolean;
  isLoading?: boolean;
  onItemsChange: (items: GrapeVariety[]) => void;
  onPolygonComplete: (items: GrapeAndVineyard) => void;
}

export const TextNumberMapCrud = ({
  initialPosition,
  placeholder,
  isLoading = false,
  required = false,
  onItemsChange,
  onPolygonComplete,
}: TextInputCrudProps) => {
  const router = useRouter();
  const { grapesVarieties } = useGetGrapeVarieties();
  const { grapesAndVineyards } = useGrapeAndVineyards();

  const [currentGrape, setCurrentGrape] = useState<GrapeVariety | null>(null);
  const [currentVineyard, setCurrentVineyard] =
    useState<VineyardDetails | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [isRequired, setIsRequired] = useState<boolean>(required);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showViewMap, setShowViewMap] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<GrapeVariety | null>(null);
  const [singleGrapeAndVineyard, setSingleGrapeAndVineyard] =
    useState<GrapeAndVineyard | null>(null);

  const polygonCompleteHandler = useCallback(() => {
    setCurrentVineyard(singleGrapeAndVineyard?.vineyard as VineyardDetails);
    onPolygonComplete(singleGrapeAndVineyard as GrapeAndVineyard);
  }, [singleGrapeAndVineyard, onPolygonComplete]);

  useEffect(() => {
    if (
      currentGrape?.name &&
      currentGrape?.percentage &&
      currentGrape?.vintageYear
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [currentGrape]);

  useEffect(() => {
    if (grapesVarieties && grapesVarieties.length > 0) {
      setIsRequired(false);
    }
  }, [grapesVarieties]);

  // useEffect(() => {
  //   if (grapesAndVineyards && grapesAndVineyards.length > 0) {
  //     console.log("grapesAndVineyards", grapesAndVineyards);
  //   }
  // }, [grapesAndVineyards]);

  return (
    <>
      {showMap && (
        <div className="fixed top-0 left-0 z-[999] flex items-center justify-center bg-surface/80 backdrop-blur-sm w-full h-full">
          {initialPosition ? (
            <PolygonEditorMap
              initialPosition={initialPosition}
              selectedItem={selectedItem}
              initialItems={[]}
              onPolygonComplete={(item, polygon) => {
                // console.log(item, polygon);
                const newGrapeAndVineyard = {
                  grape: item,
                  vineyard: {
                    id: item.name,
                    controlledDesignationOfOrigin: null,
                    elevation: null,
                    orientation: null,
                    soilType: null,
                    vinesAge: null,
                    irrigationPractices: null,
                    coordinates: polygon,
                  },
                };
                setSingleGrapeAndVineyard(
                  newGrapeAndVineyard as GrapeAndVineyard
                );
              }}
              onSave={() => {
                polygonCompleteHandler();
                setShowMap(false);
              }}
              onCancel={() => {
                setShowMap(false);
              }}
            />
          ) : (
            <Container
              intent="flexColCenter"
              gap="small"
              className="bg-surface-light p-[24px] rounded-md max-w-[520px]"
            >
              <Text intent="h3" className="">
                Sorry
              </Text>
              <Text intent="h6" className="text-center">
                Winery's headquarters not found!
              </Text>
              <Text intent="p1" variant="dim" className="text-center">
                To set your winery's headquarters, go to your dashboard and edit
                your winery's details.
              </Text>

              <Container intent="flexColCenter" gap="small">
                <Button
                  intent="text"
                  size="medium"
                  onClick={() => {
                    setShowMap(false);
                    router.push("/home");
                  }}
                  className=""
                >
                  Go to dashboard
                </Button>
                <Container intent="flexRowCenter">
                  <Button
                    intent="primary"
                    size="medium"
                    onClick={() => {
                      setShowMap(false);
                    }}
                    className="mt-[16px]"
                  >
                    Cancel
                  </Button>
                </Container>
              </Container>
            </Container>
          )}
        </div>
      )}
      {showViewMap && (
        <div className="fixed top-0 left-0 z-[999] flex items-center justify-center bg-surface/80 backdrop-blur-sm w-full h-full">
          {initialPosition ? (
            <PolygonViewerMap
              initialPosition={initialPosition}
              selectedItem={selectedItem}
              initialItems={grapesAndVineyards}
              onClose={() => {
                setShowViewMap(false);
              }}
            />
          ) : (
            <Container
              intent="flexColCenter"
              gap="small"
              className="bg-surface-light p-[24px] rounded-md max-w-[848px]"
            >
              <Text intent="h6" className="">
                No coordinates to show
              </Text>
            </Container>
          )}
        </div>
      )}
      <Container intent="grid-4" gap="xsmall" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="">
          <Text intent="p2" variant="dim" className="font-semibold">
            Name
          </Text>
          <input
            type="text"
            placeholder={placeholder}
            required={isRequired}
            value={(currentGrape?.name as string) || ""}
            onChange={(event: any) => {
              const newItem: GrapeVariety = {
                name: event.target.value as string,
                vintageYear: currentGrape?.vintageYear as number,
                percentage: currentGrape?.percentage as string,
              };
              setCurrentGrape(newItem as GrapeVariety);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>

        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p2" variant="dim" className="font-semibold">
            Percentage %
          </Text>
          <input
            type="number"
            placeholder={placeholder}
            value={(currentGrape?.percentage as string) || ""}
            onChange={(event: any) => {
              const newItem: GrapeVariety = {
                name: currentGrape?.name as string,
                vintageYear: currentGrape?.vintageYear as number,
                percentage: event.target.value as string,
              };
              setCurrentGrape(newItem as GrapeVariety);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>

        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p2" variant="dim" className="font-semibold">
            Vintage Year
          </Text>
          <DropDown
            isRequired
            id="vintageYear"
            items={vintageYearList.sort()}
            fullWidth
            selectedValue={
              currentGrape?.vintageYear
                ? currentGrape?.vintageYear.toString()
                : ""
            }
            onSelect={(data: string) => {
              const newItem: GrapeVariety = {
                name: currentGrape?.name as string,
                vintageYear: parseInt(data as string),
                percentage: currentGrape?.percentage as string,
              };
              setCurrentGrape(newItem);
            }}
          />
        </Container>

        <Button
          intent="unstyled"
          disabled={disableButton}
          onClick={() => {
            // const its = grapeVarieties ? [...grapeVarieties] : [];
            // if (!items) {
            //   setItems([currentGrape as GrapeVariety]);
            //   onItemsChange([currentGrape as GrapeVariety]);
            // } else {
            //   setItems([...items, currentGrape as GrapeVariety]);
            //   onItemsChange([...items, currentGrape as GrapeVariety]);
            // }

            // setItems(its);
            // onItemsChange(its);

            // RESET CURRENT ITEM
            const newItem: GrapeVariety = {
              name: "",
              percentage: "",
              vintageYear: 0,
            };
            setCurrentGrape(newItem as GrapeVariety);
          }}
          className={classNames(
            "border-[1.5px] border-primary-light mt-[32px] text-[16px] flex items-center justify-center max-w-fit px-[12px] gap-[4px] text-primary-light hover:text-primary transition-all duration-200 ease-in-out",
            disableButton ? "cursor-not-allowed opacity-30" : ""
          )}
        >
          <Icon
            icon="material-symbols:add"
            className="mt-[-4px] h-[16px] w-[16px]"
          />
          Add
        </Button>
      </Container>
      <Container intent="flexRowWrap" gap="small" className="">
        {isLoading ? (
          <div className="flex items-center justify-center p-[16px] min-w-[126px] min-h-[126px] rounded-md border-[1.5px] border-primary-light">
            <SpinnerLoader />
          </div>
        ) : (
          <>
            {grapesAndVineyards !== null &&
              grapesAndVineyards !== undefined &&
              grapesAndVineyards.length > 0 && (
                <>
                  {grapesAndVineyards.map((item, index) => (
                    <div
                      key={index.toString()}
                      className="p-[16px] min-h-[126px] rounded-md border-[1.5px] border-primary-light relative"
                    >
                      <Button
                        intent="unstyled"
                        onClick={() => {
                          // const its = grapeVarieties.filter(
                          //   (_, i) => i !== index
                          // );
                          // onItemsChange(its);
                        }}
                        className="absolute top-[10px] right-[6px] text-[16px] flex items-center max-w-fit text-primary-light hover:text-primary transition-all duration-200 ease-in-out"
                      >
                        <Icon
                          icon="material-symbols:close"
                          className="mt-[-5px] h-[16px] w-[16px]"
                        />
                      </Button>
                      <Container
                        intent="flexColLeft"
                        className="max-w-fit gap-[8px] text-on-surface-dark/50 hover:text-on-surface-dark transition-all duration-200 ease-in-out"
                        //   className="max-w-fit border-[1.5px] border-primary-light rounded-full px-[12px] py-[6px] gap-[8px] text-on-surface-dark/50 hover:text-on-surface-dark transition-all duration-200 ease-in-out hover:cursor-pointer"
                      >
                        <Text
                          intent="p2"
                          variant="dim"
                          className="font-semibold"
                        >
                          {item.grape.name}
                        </Text>
                        <Text intent="p2" variant="dim">
                          Percentage: {item.grape.percentage + "%"}
                        </Text>
                      </Container>
                      <Container
                        intent="flexRowLeft"
                        className="w-full mt-[12px]"
                      >
                        <>
                          {item.vineyard.coordinates &&
                          item?.vineyard.coordinates.length > 0 ? (
                            <>
                              <Container intent="flexRowLeft" gap="xsmall">
                                <Text
                                  intent="p2"
                                  variant="success"
                                  className="font-semibold"
                                >
                                  Location set
                                </Text>
                                <Button
                                  intent="unstyled"
                                  onClick={() => {
                                    setSelectedItem(item.grape);
                                    setShowViewMap(true);
                                  }}
                                  className="text-sm text-primary-light font-semibold flex items-center justify-center gap-[8px] hover:text-primary transition-all duration-300 ease-in-out"
                                >
                                  <Icon
                                    icon="carbon:map"
                                    width="16"
                                    height="16"
                                    className="mt-[-4px]"
                                  />
                                  View
                                </Button>
                              </Container>
                            </>
                          ) : (
                            <Button
                              intent="unstyled"
                              onClick={() => {
                                setSelectedItem(item.grape);
                                setShowMap(true);
                              }}
                              className="text-sm text-primary-light font-semibold flex items-center justify-center gap-[8px] hover:text-primary transition-all duration-300 ease-in-out"
                            >
                              <Icon
                                icon="carbon:map"
                                width="16"
                                height="16"
                                className="mt-[-4px]"
                              />
                              Find on map
                            </Button>
                          )}
                        </>
                      </Container>
                    </div>
                  ))}
                </>
              )}
          </>
        )}
      </Container>
    </>
  );
};
