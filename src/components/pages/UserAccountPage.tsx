/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Container,
  Text,
  DangerZoneSection,
  GeneralSection,
} from "@/components";
import { Icon } from "@iconify/react";

export const UserAccountPage = () => {
  return (
    <>
      <Container intent="flexColCenter" py="large" gap="medium">
        <Container intent="flexColLeft" gap="large" className="rounded-lg">
          <Container intent="flexColLeft" gap="small">
            <Container intent="flexRowLeft" gap="xsmall">
              <Icon
                icon={"lucide:user-round"}
                width="28"
                height="28"
                className="text-on-surface-dark mt-[-8px]"
              />
              <Text intent="h4" variant="dim">
                My Account
              </Text>
            </Container>
            <Text intent="p1" variant="dim">
              Bellow you can manage your account settings.
            </Text>
          </Container>
          <GeneralSection />
          <DangerZoneSection />
        </Container>
      </Container>
    </>
  );
};
