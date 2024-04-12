"use client";

import {
  Container,
  Button,
  Text,
  WineryLogo,
  SimpleMapViewer,
  InfoTooltip,
} from "@/components";
import { Icon } from "@iconify/react";
import { useWinery } from "@/context/wineryContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { classNames } from "@/utils/classNames";

export interface WineryGeneralInfoPublicProps {
  fullWidth?: boolean;
}

export const WineryGeneralInfoPublic = ({
  fullWidth = true,
}: WineryGeneralInfoPublicProps) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const router = useRouter();
  const { updateFormTitle, updateFormDescription, updateIsEditing } =
    useWinery();
  const { wineryGeneralInfo, level, tier } = useRealtimeDb();

  return (
    <>
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.25 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-60 z-[999] w-screen h-screen backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.25,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="p-[48px] flex flex-col items-center justify-center w-[920px] max-h-fit bg-surface-light rounded-lg relative"
            >
              <Button
                intent="text"
                onClick={() => setShowMap(false)}
                className="absolute top-[12px] right-[12px]"
              >
                <Icon
                  icon="material-symbols:close"
                  width="24"
                  height="24"
                  className="text-on-surface-dark"
                />
              </Button>
              <SimpleMapViewer
                lat={wineryGeneralInfo.wineryHeadquarters.latitude}
                lon={wineryGeneralInfo.wineryHeadquarters.longitude}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Container
        intent="flexColLeft"
        gap="medium"
        px="medium"
        py="medium"
        className={classNames(
          "bg-surface rounded-md h-full",
          fullWidth ? "w-full" : "max-w-fit"
        )}
      >
        <Container
          intent="grid-3"
          gap="small"
          className="w-full place-items-start"
        >
          {/* <Button
            intent="unstyled"
            onClick={() => {
              updateFormTitle("Edit Winery Details");
              updateFormDescription(
                "Please fill in the form to edit your winery details. All fields marked with * are mandatory."
              );
              // updateShowRegisterWinery(true);

              updateIsEditing(true);
              router.push("/register-winery");
            }}
            className="min-w-fit p-0 text-primary-light font-semibold hover:text-primary transition-all duration-300 ease-in-out"
          >
            <Container intent="flexRowCenter" gap="xsmall" className="w-full">
              <Icon
                icon="ant-design:edit-outlined"
                className="w-[20px] h-[20px]"
              />
              Edit details
            </Container>
          </Button> */}
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <div>
              <Icon
                icon="material-symbols:verified-outline"
                className="w-[20px] h-[20px] text-secondary"
              />
            </div>
            <div className="min-w-fit">
              <Text>{`Tier ${tier}`}</Text>
            </div>
            <div>
              <InfoTooltip text="Tier" />
            </div>
          </Container>
          <Container intent="flexRowCenter" gap="xsmall" className="w-full">
            <div>
              <Icon
                icon="mage:gem-stone"
                className="w-[20px] h-[20px] text-status-warning"
              />
            </div>
            <div>
              <Text>{level}</Text>
            </div>
            <div>
              <InfoTooltip text="Level" />
            </div>
          </Container>
        </Container>
        <Container
          intent="flexRowLeft"
          gap="medium"
          className="w-full min-h-[80px] max-h-[80px]"
        >
          <WineryLogo
            url={
              wineryGeneralInfo.logo !== undefined &&
              wineryGeneralInfo.logo.length > 0
                ? wineryGeneralInfo.logo
                : "/winery-sample-logo.svg"
            }
            width={80}
            height={80}
          />

          <Container intent="flexColLeft" className="w-full">
            <Text intent="h3" className="text-on-surface">
              {(wineryGeneralInfo && wineryGeneralInfo.name) || "Winery Name"}
            </Text>
            <Text intent="p1" variant="dim" className="text-on-surface">
              {`Founded on ${
                (wineryGeneralInfo && wineryGeneralInfo.foundedOn) || "N/A"
              }`}
            </Text>
          </Container>
        </Container>
        <Button
          intent="unstyled"
          onClick={() => {
            setShowMap(true);
          }}
          className="min-w-fit p-0 text-primary-light font-semibold hover:text-primary transition-all duration-300 ease-in-out"
        >
          Show on map
        </Button>
      </Container>
    </>
  );
};
