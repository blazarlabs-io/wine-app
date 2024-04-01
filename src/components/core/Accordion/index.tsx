"use client";

import { Button, Container, Text } from "@/components";
import { WinesInterface } from "@/typings/components";
import { textFromKey } from "@/utils/textFromKey";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

export interface AccordionProps {
  data: WinesInterface[];
}

export interface AccordionItemInterface {
  item: WinesInterface;
}

export const Accordion = ({ data }: AccordionProps) => {
  return (
    <section className="relative z-20 overflow-y-hidden h-full bg-surface w-full">
      <div className="w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full gap-[12px]">
            {data.map((item) => (
              <AccordionItem
                key={item.generalInfo.collectionName}
                item={item}
              />
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
      <button
        className={`flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <Container
          intent="flexRowCenter"
          className="mr-5 h-10 w-full max-w-[40px] rounded-lg bg-surface-dark text-on-surface"
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

        {/* Data to display when closed    */}
        <Container
          intent="grid-6"
          className="w-full my-auto items-center justify-center"
        >
          <Text intent="p1" className="font-semibold text-on-surface">
            {item.generalInfo.collectionName}
          </Text>
          <Text intent="p1" className="font-semibold text-on-surface">
            {item.generalInfo.yearOfBottling}
          </Text>
          <Text intent="p1" className="font-semibold text-on-surface">
            {item.generalInfo.bottlesProduced}
          </Text>
          <Text intent="p1" className="font-semibold text-on-surface">
            {item.makingTechniques.technique}
          </Text>
          <Text intent="p1" className="font-semibold text-on-surface">
            {item.packaging.upcCode}
          </Text>
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
              intent="unstyled"
              className="text-surface-dark bg-status-error px-[16px] py-[14px] rounded-md"
            >
              <Icon icon="ph:trash" className="w-[20px] h-[20px]" />
            </Button>
          </Container>
        </Container>
      </button>

      <Container
        intent="flexColLeft"
        px="xlarge"
        py="large"
        gap="medium"
        className={`transform-all duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <motion.div
          className={`flex flex-col items-start justify-center gap-[24px] transform-all duration-200 ease-in-out ${
            active ? "block" : "hidden"
          }`}
        >
          <Text intent="p1" variant="accent" className="font-semibold">
            General Information
          </Text>
          <Container intent="flexRowLeft" gap="large" className="">
            {Object.keys(item.generalInfo).map((key) => (
              <Container intent="flexRowLeft" key={key} className="max-w-fit">
                <Container intent="flexColLeft" className="max-w-fit">
                  <Text intent="p2" variant="dim">
                    {textFromKey(key)}
                  </Text>
                  <Text>
                    {item.generalInfo[key as keyof typeof item.generalInfo]}
                  </Text>
                </Container>
              </Container>
            ))}
          </Container>

          <Text intent="p1" variant="accent" className="font-semibold">
            Characteristics
          </Text>
          <Container intent="flexRowLeft" gap="large" className="">
            {Object.keys(item.characteristics).map((key) => (
              <Container intent="flexRowLeft" key={key} className="max-w-fit">
                <Container intent="flexColLeft" className="max-w-fit">
                  <Text intent="p2" variant="dim">
                    {textFromKey(key)}
                  </Text>
                  <Text>
                    {
                      item.characteristics[
                        key as keyof typeof item.characteristics
                      ]
                    }
                  </Text>
                </Container>
              </Container>
            ))}
          </Container>

          <Text intent="p1" variant="accent" className="font-semibold">
            Storage Conditions
          </Text>
          <Container intent="flexRowLeft" gap="large" className="">
            {Object.keys(item.storageConditions).map((key) => (
              <Container intent="flexRowLeft" key={key} className="max-w-fit">
                <Container intent="flexColLeft" className="max-w-fit">
                  <Text intent="p2" variant="dim">
                    {textFromKey(key)}
                  </Text>
                  <Text>
                    {
                      item.storageConditions[
                        key as keyof typeof item.storageConditions
                      ]
                    }
                  </Text>
                </Container>
              </Container>
            ))}
          </Container>

          <Text intent="p1" variant="accent" className="font-semibold">
            Wine Making Technique
          </Text>
          <Container intent="flexRowLeft" gap="large" className="">
            {Object.keys(item.makingTechniques).map((key) => (
              <Container intent="flexRowLeft" key={key} className="max-w-fit">
                <Container intent="flexColLeft" className="max-w-fit">
                  <Text intent="p2" variant="dim">
                    {textFromKey(key)}
                  </Text>
                  <Text>
                    {
                      item.makingTechniques[
                        key as keyof typeof item.makingTechniques
                      ]
                    }
                  </Text>
                </Container>
              </Container>
            ))}
          </Container>

          <Text intent="p1" variant="accent" className="font-semibold">
            Packaging and Branding
          </Text>
          <Container intent="flexRowLeft" gap="large" className="">
            {Object.keys(item.packaging).map((key) => (
              <Container intent="flexRowLeft" key={key} className="max-w-fit">
                <Container intent="flexColLeft" className="max-w-fit">
                  <Text intent="p2" variant="dim">
                    {textFromKey(key)}
                  </Text>
                  <Text>
                    {item.packaging[key as keyof typeof item.packaging]}
                  </Text>
                </Container>
              </Container>
            ))}
          </Container>
        </motion.div>
      </Container>
    </Container>
  );
};
