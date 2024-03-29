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
import { EuLabelInterface } from "@/typings/components";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { useEffect, useRef } from "react";
import { generateId } from "@/utils/generateId";
import { useRouter } from "next/navigation";

export const RegisterEuLabel = () => {
  const router = useRouter();

  const { formTitle, formDescription, updateSingleEuLabel, singleEuLabel } =
    useWinery();

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const ref = generateId(5) + "-" + dateToTimestamp();
      console.log(ref);
      singleEuLabel.referenceNumber = ref;
      updateSingleEuLabel({
        ...(singleEuLabel as EuLabelInterface),
        referenceNumber: ref,
      });
    }
  }, []);

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
              {singleEuLabel.referenceNumber}
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
            Controlled Designation of Origin
          </Text>
          <input
            type="text"
            placeholder=""
            value={singleEuLabel.controlledDesignationOfOrigin}
            onChange={(event: any) => {
              singleEuLabel.controlledDesignationOfOrigin = event.target.value;
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
            * Product
          </Text>
          <DropDown
            items={productList}
            fullWidth
            selectedValue={singleEuLabel.product}
            onSelect={(data: string) => {
              singleEuLabel.product = data;
              updateSingleEuLabel({
                ...(singleEuLabel as EuLabelInterface),
                product: singleEuLabel.product,
              });
            }}
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
            Bottle Size
          </Text>
          <DropDown
            items={bottleSizeList}
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
            Kind of Wine
          </Text>
          <DropDown
            items={kindOfWineList}
            fullWidth
            selectedValue={singleEuLabel.kindOfWine}
            onSelect={(data: string) => {
              singleEuLabel.kindOfWine = data;
              updateSingleEuLabel({
                ...(singleEuLabel as EuLabelInterface),
                kindOfWine: singleEuLabel.kindOfWine,
              });
            }}
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Colour of Wine
          </Text>
          <DropDown
            items={colourOfWineList}
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
            Produced By
          </Text>
          <input
            type="text"
            placeholder=""
            value={singleEuLabel.producedBy}
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
          <Text intent="p1" variant="dim">
            Matured in Oak Barrels?
          </Text>
          <DropDown
            items={["Yes", "No"]}
            fullWidth
            selectedValue={"No"}
            onSelect={(data: string) => {
              singleEuLabel.maturedInOakBarrel = data === "Yes" ? true : false;
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
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Text intent="p1" variant="dim">
            Bottled By
          </Text>
          <input
            type="text"
            placeholder=""
            value={singleEuLabel.bottledBy}
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
            Ingredients
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
              placeholder="Malic acid (D, L-/L-)"
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
              placeholder="L-ascorbic acid"
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
              placeholder="Sulfites"
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
              placeholder="Gum arabic"
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
            Alergens
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
            Fining Agents
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
          intent="primary"
          size="medium"
          fullWidth
          onClick={() => {
            console.log(singleEuLabel);
          }}
        >
          Register
        </Button>
      </Container>
    </Container>
  );
};
