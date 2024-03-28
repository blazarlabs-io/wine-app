"use client";

import {
  Button,
  CheckBox,
  CheckInputText,
  Container,
  DropDown,
  Text,
  TextInputCrud,
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

export const RegisterEuLabel = () => {
  const {
    formTitle,
    formDescription,
    updateShowRegisterWinery,
    singleEuLabel,
  } = useWinery();

  return (
    <Container
      intent="flexColLeft"
      px="3xlarge"
      py="medium"
      gap="medium"
      className="w-full"
    >
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
      <div className="h-[1px] bg-on-surface-dark/50 w-full my-[24px]" />
      {/* First Row */}
      <Container intent="grid-2" gap="medium">
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
              2feb0e353360b
            </Text>
          </Container>
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            * GTIN (UPC)
          </Text>
          <input
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.upc) || ""}
            onChange={(event: any) => {
              // singleEuLabel.upc = event.target.value;
              // updateSingleEuLabel(singleEuLabel as EuLabelsInterface);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
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
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.wineryName) || ""}
            onChange={(event: any) => {
              // singleEuLabel.wineryName = event.target.value;
              // updateSingleEuLabel(singleEuLabel as EuLabelsInterface);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            * Wine Name
          </Text>
          <input
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.wineName) || ""}
            onChange={(event: any) => {
              // singleEuLabel.wineName = event.target.value;
              // updateSingleEuLabel(singleEuLabel as EuLabelsInterface);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            * Harvest Year
          </Text>
          <input
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.harvestYear) || ""}
            onChange={(event: any) => {
              // singleEuLabel.harvestYear = event.target.value;
              // updateSingleEuLabel(singleEuLabel as EuLabelsInterface);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Controlled Designation of Origin
          </Text>
          <input
            type="text"
            placeholder=""
            value={
              (singleEuLabel && singleEuLabel.controlledDesignationOfOrigin) ||
              ""
            }
            onChange={(event: any) => {
              // singleEuLabel.controlledDesignationOfOrigin = event.target.value;
              // updateSingleEuLabel(singleEuLabel as EuLabelsInterface);
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
            items={countryList}
            fullWidth
            selectedValue={(singleEuLabel && singleEuLabel.country) || null}
            onSelect={(data: string) => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            * Product
          </Text>
          <DropDown
            items={productList}
            fullWidth
            selectedValue={(singleEuLabel && singleEuLabel.product) || null}
            onSelect={(data: string) => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Alcohol Level
          </Text>
          <Container intent="grid-2" gap="small" className="items-center">
            <input
              type="text"
              placeholder=""
              value={(singleEuLabel && singleEuLabel.alcoholLevel) || ""}
              onChange={(event: any) => {
                // generalInfo.foundedOn = event.target.value;
                // updateWinery({ generalInfo, wines, euLabels });
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
            <Text>% vol</Text>
          </Container>
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Bottle Size
          </Text>
          <DropDown
            items={bottleSizeList}
            fullWidth
            selectedValue={(singleEuLabel && singleEuLabel.bottleSize) || null}
            onSelect={(data: string) => {}}
          />
        </Container>
      </Container>

      {/* Fourth Row */}
      <Container intent="grid-4" gap="small" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Kind of Wine
          </Text>
          <DropDown
            items={kindOfWineList}
            fullWidth
            selectedValue={(singleEuLabel && singleEuLabel.kindOfWine) || null}
            onSelect={(data: string) => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Colour of Wine
          </Text>
          <DropDown
            items={colourOfWineList}
            fullWidth
            selectedValue={
              (singleEuLabel && singleEuLabel.colourOfWine) || null
            }
            onSelect={(data: string) => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Produced By
          </Text>
          <input
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.producedBy) || ""}
            onChange={(event: any) => {
              // generalInfo.foundedOn = event.target.value;
              // updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Matured in Oak Barrels?
          </Text>
          <DropDown
            items={["Yes", "No"]}
            fullWidth
            selectedValue={"No"}
            onSelect={(data: string) => {}}
          />
        </Container>
      </Container>

      {/* Sixth Row */}
      <div className="grid grid-cols-4 gap-[16px] w-full">
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Bottled By
          </Text>
          <input
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.bottledBy) || ""}
            onChange={(event: any) => {
              // generalInfo.foundedOn = event.target.value;
              // updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container
          intent="flexColLeft"
          gap="xsmall"
          className="w-full col-span-3"
        >
          <Text intent="p1" variant="dim">
            Address of Producers
          </Text>
          <input
            type="text"
            placeholder=""
            value={(singleEuLabel && singleEuLabel.addressOfProducer) || ""}
            onChange={(event: any) => {
              // generalInfo.foundedOn = event.target.value;
              // updateWinery({ generalInfo, wines, euLabels });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
      </div>

      {/* Seventh Row */}
      <Container intent="grid-2" gap="small" className="w-full">
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim" className="">
            Ingredients
          </Text>
          <Container intent="flexColLeft" gap="xsmall">
            <Container intent="flexRowCenter" className="h-[48px]">
              <CheckBox
                label="Grapes"
                onCheck={(state: boolean) => {
                  console.log(state);
                }}
              />
            </Container>
            <CheckInputText
              label="Acidity Regulators"
              placeholder="Malic acid (D, L-/L-)"
              onBoxChecked={() => {}}
            />
            <CheckInputText
              label="Antioxidants"
              placeholder="L-ascorbic acid"
              onBoxChecked={() => {}}
            />
            <CheckInputText
              label="Preservative"
              placeholder="Sulfites"
              onBoxChecked={() => {}}
            />
            <CheckInputText
              label="Stabilizer"
              placeholder="Gum arabic"
              onBoxChecked={() => {}}
            />
          </Container>
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Alergens
          </Text>
          <Container intent="grid-3" gap="large" className="h-[48px]">
            <CheckBox
              label="Sulphites"
              onCheck={(state: boolean) => {
                console.log(state);
              }}
            />
            <CheckBox
              label="Tanings"
              onCheck={(state: boolean) => {
                console.log(state);
              }}
            />
            <CheckBox
              label="Histamines"
              onCheck={(state: boolean) => {
                console.log(state);
              }}
            />
          </Container>
          <Text intent="p2" variant="dim">
            Fining Agents
          </Text>
          <Container intent="grid-3" gap="large" className="h-[48px]">
            <CheckBox
              label="Egg Whites"
              onCheck={(state: boolean) => {
                console.log(state);
              }}
            />
            <CheckBox
              label="Milk Proteins"
              onCheck={(state: boolean) => {
                console.log(state);
              }}
            />
            <CheckBox
              label="Gelatines"
              onCheck={(state: boolean) => {
                console.log(state);
              }}
            />
          </Container>
          <TextInputCrud
            placeholder="Add Fining Agent"
            onItemsChange={(items: string[]) => {
              console.log(items);
            }}
          />
        </Container>
      </Container>

      {/* Buttons */}
      <Container intent="flexRowCenter" py="medium" gap="medium">
        <Button
          intent="secondary"
          size="medium"
          fullWidth
          onClick={() => updateShowRegisterWinery(false)}
        >
          Cancel
        </Button>
        <Button intent="primary" size="medium" fullWidth>
          Register
        </Button>
      </Container>
    </Container>
  );
};
