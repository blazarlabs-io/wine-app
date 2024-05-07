"use client";
import {
  Button,
  Container,
  PolygonViewerMap,
  PolygonEditorMap,
  Text,
} from "@/components";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  GrapesMapCoordinatesInterface,
  ItemWithPercentage,
} from "@/typings/winery";
import { classNames } from "@/utils/classNames";

export interface TextInputCrudProps {
  initialPosition: any;
  placeholder: string;
  initialItems: GrapesMapCoordinatesInterface[];
  required?: boolean;
  onItemsChange: (items: GrapesMapCoordinatesInterface[]) => void;
  onPolygonComplete: (items: GrapesMapCoordinatesInterface[]) => void;
}

export const TextNumberMapCrud = ({
  initialPosition,
  placeholder,
  initialItems,
  required = false,
  onItemsChange,
  onPolygonComplete,
}: TextInputCrudProps) => {
  const [items, setItems] = useState<GrapesMapCoordinatesInterface[] | null>(
    initialItems
  );
  const [currentItem, setCurrentItem] =
    useState<GrapesMapCoordinatesInterface | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [isRequired, setIsRequired] = useState<boolean>(required);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showViewMap, setShowViewMap] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    useState<GrapesMapCoordinatesInterface | null>(null);

  const handleOnPolygonComplete = () => {
    onPolygonComplete(items as GrapesMapCoordinatesInterface[]);
  };

  useEffect(() => {
    if (currentItem?.name && currentItem?.percentage) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [currentItem]);

  useEffect(() => {
    if (items && items.length > 0) {
      setIsRequired(false);
    }
  }, [items]);

  return (
    <>
      {showMap && (
        <div className="fixed top-0 left-0 z-[999] flex items-center justify-center bg-surface/80 backdrop-blur-sm w-full h-full">
          <PolygonEditorMap
            initialPosition={initialPosition}
            selectedItem={selectedItem}
            initialItems={initialItems}
            onPolygonComplete={(item, polygon) => {
              setItems(
                (items as GrapesMapCoordinatesInterface[]).map((i) => {
                  if (i.name === item.name) {
                    return {
                      ...i,
                      coordinates: polygon,
                    };
                  }
                  return i;
                })
              );
            }}
            onSave={() => {
              handleOnPolygonComplete();
              setShowMap(false);
            }}
            onCancel={() => {
              setShowMap(false);
            }}
          />
        </div>
      )}
      {showViewMap && (
        <div className="fixed top-0 left-0 z-[999] flex items-center justify-center bg-surface/80 backdrop-blur-sm w-full h-full">
          <PolygonViewerMap
            initialPosition={initialPosition}
            selectedItem={selectedItem}
            initialItems={initialItems}
            onClose={() => {
              setShowViewMap(false);
            }}
          />
        </div>
      )}
      <Container intent="grid-4" gap="xsmall" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="col-span-2">
          <Text intent="p2" variant="dim" className="font-semibold">
            Name
          </Text>
          <input
            type="text"
            placeholder={placeholder}
            required={isRequired}
            value={currentItem?.name}
            onChange={(event: any) => {
              const newItem = {
                name: event.target.value,
                percentage: currentItem?.percentage,
                coordinates: [],
              };
              setCurrentItem(newItem as GrapesMapCoordinatesInterface);
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
            value={currentItem?.percentage}
            onChange={(event: any) => {
              const newItem = {
                name: currentItem?.name,
                percentage: event.target.value,
                coordinates: [],
              };
              setCurrentItem(newItem as GrapesMapCoordinatesInterface);
            }}
            className="w-full placeholder:text-on-surface-dark/50 text-sm text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>

        <Button
          intent="unstyled"
          disabled={disableButton}
          onClick={() => {
            let its: GrapesMapCoordinatesInterface[] = [];
            if (items !== null && items !== undefined && items.length > 0) {
              its = [...items, currentItem as GrapesMapCoordinatesInterface];
            } else {
              its = [currentItem as GrapesMapCoordinatesInterface];
            }
            setItems(its);
            onItemsChange(its);

            // RESET CURRENT ITEM
            const newItem = {
              name: "",
              percentage: "",
              coordinates: [],
            };
            setCurrentItem(newItem as GrapesMapCoordinatesInterface);
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
        {items !== null && items !== undefined && items.length > 0 && (
          <>
            {items.map((item, index) => (
              <div
                key={index.toString()}
                className="p-[16px] min-h-[126px] rounded-md border-[1.5px] border-primary-light relative"
              >
                <Button
                  intent="unstyled"
                  onClick={() => {
                    const its = items.filter((_, i) => i !== index);
                    setItems(its);
                    onItemsChange(its);
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
                  <Text intent="p2" variant="dim" className="font-semibold">
                    {item.name}
                  </Text>
                  <Text intent="p2" variant="dim">
                    Percentage: {item.percentage + "%"}
                  </Text>
                </Container>
                <Container intent="flexRowLeft" className="w-full mt-[12px]">
                  <>
                    {item.coordinates.length > 0 ? (
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
                              setSelectedItem(item);
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
                          setSelectedItem(item);
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
      </Container>
    </>
  );
};
