import {
  Container,
  Text,
  Button,
  WineGeneralExtendedViewer,
  WineThumbnail,
} from "@/components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { wineUrlComposerRef } from "@/utils/wineUrlComposerRef";
import { useModal } from "@/context/modalContext";
import { WineryGeneralInfo, Wine } from "@/typings/winery";

export interface WineAccordionItemInterface {
  generalInfo: WineryGeneralInfo;
  item: Wine;
  onEdit: () => void;
}

export const AccordionExtendedItem = ({
  generalInfo,
  item,
  onEdit,
}: WineAccordionItemInterface) => {
  const { updateModal } = useModal();

  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  const handleTokenization = () => {
    updateModal({
      show: true,
      title: "Tokenize Wine",
      description:
        "You are about to start a tokenization of your wine on the Cardano blockchain. Are you sure you want to proceed?",
      action: {
        label: "Tokenize",
        onAction: () => {
          updateModal({
            show: false,
            title: "Modal Title",
            description: "Modal Message",
            action: {
              label: "Action",
              onAction: () => {},
            },
          });
        },
      },
    });
  };
  return (
    <Container
      intent="flexColLeft"
      className={`flex min-w-full text-left py-[16px] bg-surface-dark`}
    >
      <Container intent="grid-6" className="min-w-full">
        <div className="flex items-center justify-center">
          <button
            className={`flex text-left max-h-fit w-full`}
            onClick={() => handleToggle()}
          >
            <div className="flex items-center justify-center h-10 w-full rounded-lg bg-surface-dark text-on-surface">
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
            </div>
          </button>
        </div>

        {/* Data to display when closed    */}
        <div className="flex items-center w-full justify-center">
          <Text intent="p1" className="font-normal text-on-surface">
            {item.generalInformation.wineCollectionName}
          </Text>
        </div>
        <div className="flex items-center w-full justify-center">
          <Text intent="p1" className="font-normal text-on-surface">
            {item.characteristics.wineType}
          </Text>
        </div>
        <div className="flex items-center w-full justify-center">
          <Text intent="p1" className="font-normal text-on-surface">
            {item.characteristics.alcoholLevel} %vol
          </Text>
        </div>
        <div className="flex items-center w-full justify-center">
          <Text intent="p1" className="font-normal text-on-surface">
            {item.generalInformation.country}
          </Text>
        </div>

        <div className="flex items-center w-full gap-[16px] justify-center">
          {/* <Button
            intent="unstyled"
            className="text-surface-dark bg-status-info px-[16px] py-[14px] rounded-md"
            onClick={() => handleTokenization()}
          >
            <Icon
              icon="hugeicons:blockchain-06"
              className="w-[20px] h-[20px]"
            />
          </Button> */}
          <Button
            intent="unstyled"
            className="text-surface-dark bg-status-warning px-[16px] py-[14px] rounded-md"
            onClick={() => onEdit()}
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
        </div>
      </Container>

      {/* Data to display when opened */}
      <Container
        intent="flexColLeft"
        px="xlarge"
        py="large"
        gap="medium"
        className={`min-w-full rounded-lg mt-[24px] bg-surface-light/100 overflow-x-hidden transform-all duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <motion.div
          className={`min-w-full flex flex-col items-start justify-center gap-[24px] transform-all duration-200 ease-in-out ${
            active ? "block" : "hidden"
          }`}
        >
          <WineGeneralExtendedViewer item={item} generalInfo={generalInfo} />
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
            <WineThumbnail
              imageUrl={item?.generalInformation.wineImageUrl as string}
            />
            <Link
              href={item.generalInformation.qrCodeUrl as string}
              target="__blank"
            >
              <div className="bg-surface p-[8px] rounded-md">
                <Image
                  src={item.generalInformation.qrCodeUrl as string}
                  width={148}
                  height={148}
                  alt={item.generalInformation.wineCollectionName as string}
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
                href={wineUrlComposerRef(item.referenceNumber as string)}
                target="__blank"
              >
                <Text variant="dim">
                  {wineUrlComposerRef(item.referenceNumber as string)}
                </Text>
              </Link>
            </Container>
          </Container>
        </motion.div>
      </Container>
    </Container>
  );
};
