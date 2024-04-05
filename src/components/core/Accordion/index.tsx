"use client";

import {
  AllergenViewer,
  Button,
  Container,
  EuLabelItem,
  IngredientViewer,
  Text,
} from "@/components";
import { EuLabelInterface, WinesInterface } from "@/typings/components";
import { euLabelUrlComposer } from "@/utils/euLabelUrlComposer";
import { textFromKey } from "@/utils/textFromKey";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface AccordionProps {
  data: EuLabelInterface[];
}

export interface AccordionItemInterface {
  item: EuLabelInterface;
}

export const Accordion = ({ data }: AccordionProps) => {
  return (
    <section className="relative z-20 overflow-y-hidden h-full bg-surface w-full">
      <div className="w-full">
        <div className="flex flex-col w-full">
          <Container
            intent="flexColLeft"
            className="w-full rounded-lg bg-transparent p-4 shadow-xl"
          >
            <Container intent="flexRowLeft" className={`flex w-full text-left`}>
              <Container
                intent="flexRowCenter"
                className="invisible mr-5 h-10 w-full max-w-[40px] rounded-lg bg-transparent text-on-surface"
              >
                <svg
                  className={`fill-on-surface stroke-on-surface duration-200 ease-in-out`}
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill=""
                    stroke=""
                  />
                </svg>
              </Container>
              <Container
                intent="grid-6"
                className="w-full my-auto items-center justify-center"
              >
                <Container intent="flexRowCenter" className="w-full">
                  <Text intent="h6" className="font-semibold text-on-surface">
                    Wine Name
                  </Text>
                </Container>
                <Container intent="flexRowCenter" className="w-full">
                  <Text intent="h6" className="font-semibold text-on-surface">
                    Reference Number
                  </Text>
                </Container>
                <Container intent="flexRowCenter" className="w-full">
                  <Text intent="h6" className="font-semibold text-on-surface">
                    Harvest Year
                  </Text>
                </Container>
                <Container intent="flexRowCenter" className="w-full">
                  <Text intent="h6" className="font-semibold text-on-surface">
                    Country
                  </Text>
                </Container>
                <Container intent="flexRowCenter" className="w-full">
                  <Text intent="h6" className="font-semibold text-on-surface">
                    UPC
                  </Text>
                </Container>
                <Container intent="flexRowCenter" className="w-full">
                  <Text intent="h6" className="font-semibold text-on-surface">
                    Edit
                  </Text>
                </Container>
              </Container>
            </Container>
          </Container>
          <div className="flex flex-col w-full gap-[12px]">
            {data.map((item) => (
              <AccordionItem key={item.wineName} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ item }: AccordionItemInterface) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };
  return (
    <Container
      intent="flexColLeft"
      className="w-full rounded-lg bg-surface-dark p-4 shadow-xl"
    >
      <Container intent="flexRowLeft">
        <button
          className={`flex text-left max-h-fit`}
          onClick={() => handleToggle()}
        >
          <Container
            intent="flexRowCenter"
            className="mx-5 h-10 w-full max-w-[40px] rounded-lg bg-surface-dark text-on-surface"
          >
            <svg
              className={`fill-on-surface stroke-on-surface duration-200 ease-in-out ${
                active ? "rotate-180" : ""
              }`}
              width="17"
              height="10"
              viewBox="0 0 17 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                fill=""
                stroke=""
              />
            </svg>
          </Container>
        </button>

        {/* Data to display when closed    */}
        <Container
          intent="grid-6"
          className="w-full my-auto items-center justify-center"
        >
          <Container intent="flexRowCenter" className="w-full">
            <Text intent="p1" className="font-normal text-on-surface">
              {item.wineName}
            </Text>
          </Container>
          <Container intent="flexRowCenter" className="w-full">
            <Text intent="p1" className="font-normal text-on-surface">
              {item.referenceNumber}
            </Text>
          </Container>
          <Container intent="flexRowCenter" className="w-full">
            <Text intent="p1" className="font-normal text-on-surface">
              {item.harvestYear}
            </Text>
          </Container>
          <Container intent="flexRowCenter" className="w-full">
            <Text intent="p1" className="font-normal text-on-surface">
              {item.country}
            </Text>
          </Container>
          <Container intent="flexRowCenter" className="w-full">
            <Text intent="p1" className="font-normal text-on-surface">
              {item.upc}
            </Text>
          </Container>

          <Container
            intent="flexRowCenter"
            gap="small"
            className="font-semibold text-on-surface"
          >
            <Button
              intent="unstyled"
              className="text-surface-dark bg-status-warning px-[16px] py-[14px] rounded-md"
            >
              <Icon
                icon="ant-design:edit-outlined"
                className="w-[20px] h-[20px]"
              />
            </Button>
            <Button
              disabled
              intent="unstyled"
              className="text-surface-dark bg-status-error px-[16px] py-[14px] rounded-md"
            >
              <Icon icon="ph:trash" className="w-[20px] h-[20px]" />
            </Button>
          </Container>
        </Container>
      </Container>

      {/* Data to display when opened */}
      <Container
        intent="flexColLeft"
        px="xlarge"
        py="large"
        gap="medium"
        className={`rounded-lg mt-[24px] bg-surface-light/100 overflow-x-hidden transform-all duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <motion.div
          className={`flex flex-col items-start justify-center gap-[24px] transform-all duration-200 ease-in-out ${
            active ? "block" : "hidden"
          }`}
        >
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              General Information
            </Text>
          </Container>
          <Container intent="grid-5" gap="large" className="">
            <EuLabelItem
              title="Reference Number"
              value={item.referenceNumber}
            />
            <EuLabelItem title="Wine Name" value={item.wineName} />
            <EuLabelItem title="UPC" value={item.upc} />
            <EuLabelItem title="Harvest Year" value={item.harvestYear} />
            <EuLabelItem title="Country" value={item.country} />
            <EuLabelItem
              title="Controlled Designation of Origin"
              value={item.controlledDesignationOfOrigin}
            />
            <EuLabelItem
              title="Alcohol Level"
              value={item.alcoholLevel + " %vol"}
            />
            <EuLabelItem title="Product" value={item.product} />
            <EuLabelItem title="Kind of Wine" value={item.kindOfWine} />
            <EuLabelItem title="Colour of Wine" value={item.colourOfWine} />
            <EuLabelItem title="Bottle Size" value={item.bottleSize} />
            <EuLabelItem title="Produced By" value={item.producedBy} />
            <EuLabelItem title="Bottled By" value={item.bottledBy} />
          </Container>

          {/* Ingredients */}
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              Ingredients
            </Text>
          </Container>
          <Container intent="grid-5" gap="large" className="">
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p2" variant="dim">
                Grapes
              </Text>
              {item.ingredients.grapes.has ? <Text>Yes</Text> : <Text>No</Text>}
            </Container>
            <IngredientViewer
              title="Acidity Regulators"
              ingredient={item.ingredients.acidityRegulators}
            />
            <IngredientViewer
              title="Antioxidants"
              ingredient={item.ingredients.antioxidants}
            />
            <IngredientViewer
              title="Preservatives"
              ingredient={item.ingredients.preservatives}
            />
            <IngredientViewer
              title="Stabilizers"
              ingredient={item.ingredients.stabilizers}
            />
          </Container>

          {/* Allergens */}
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              Allergens
            </Text>
          </Container>
          <Container intent="grid-5" gap="large" className="">
            <Container
              intent="flexColLeft"
              gap="medium"
              className="w-full col-span-2"
            >
              <Text intent="p2" variant="dim">
                Fining Agents
              </Text>
              <Container intent="flexColLeft" gap="medium">
                <Container intent="flexRowLeft" gap="small" className="w-full">
                  <AllergenViewer
                    title="Egg Whites"
                    has={item.allergens.finingAgents.eggWhites}
                  />
                  <AllergenViewer
                    title="Milk Proteins"
                    has={item.allergens.finingAgents.milkProteins}
                  />
                  <AllergenViewer
                    title="Gelatines"
                    has={item.allergens.finingAgents.gelatines}
                  />
                </Container>
                <Container intent="flexColLeft" gap="small" className="w-full">
                  <Text intent="p2" variant="dim">
                    Other Agents
                  </Text>
                  <Container
                    intent="flexRowLeft"
                    gap="small"
                    className="w-full"
                  >
                    {item.allergens.finingAgents.other.map((agent) => (
                      <div
                        key={agent}
                        className="border border-primary-light rounded-full px-[12px] py-[6px]"
                      >
                        <Text intent="p2" variant="accent">
                          {agent}
                        </Text>
                      </div>
                    ))}
                  </Container>
                </Container>
              </Container>
            </Container>
            <AllergenViewer title="Sulphites" has={item.allergens.sulphites} />
            <AllergenViewer title="Tanins" has={item.allergens.tanins} />
            <AllergenViewer
              title="Histamines"
              has={item.allergens.histamines}
            />
          </Container>
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              QR Code & Url
            </Text>
          </Container>
          <Container
            intent="unstyled"
            gap="medium"
            className="flex items-start"
          >
            <Link href={item.qrCodeUrl} target="__blank">
              <div className="bg-surface p-[8px] rounded-md">
                <Image
                  src={item.qrCodeUrl}
                  width={112}
                  height={112}
                  alt={item.wineName}
                  className="rounded-md"
                />
              </div>
            </Link>
            <Container
              intent="flexRowCenter"
              px="medium"
              py="small"
              className="max-w-fit h-full bg-surface rounded-md"
            >
              <Link
                href={euLabelUrlComposer(item.referenceNumber)}
                target="__blank"
              >
                <Text variant="dim">
                  {euLabelUrlComposer(item.referenceNumber)}
                </Text>
              </Link>
            </Container>
          </Container>
        </motion.div>
      </Container>
    </Container>
  );
};
