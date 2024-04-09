"use client";

import {
  BounceLoader,
  Container,
  EuLabelGeneralViewer,
  WineryGeneralInfo,
} from "@/components";
import { EuLabelInterface } from "@/typings/components";
import { getWineByRefNumber } from "@/utils/firestore";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

export default function WineExplorer({ params }: { params: { ref: string } }) {
  const [euLabel, setEuLabel] = useState<DocumentData | null>(null);
  const { responsiveSize } = useResponsive();

  useEffect(() => {
    getWineByRefNumber(params.ref, (label: EuLabelInterface | null) => {
      console.log(label);
      setEuLabel(label);
    });
  }, []);
  return (
    <Container
      intent="flexColLeft"
      py="large"
      px={responsiveSize !== "mobile" ? "xlarge" : "medium"}
      gap="2xlarge"
      className="rounded-lg min-w-full min-h-full bg-surface-light"
    >
      <Container
        intent={responsiveSize !== "mobile" ? "flexRowLeft" : "flexColTop"}
        gap="large"
      >
        <div
          style={{
            minWidth: responsiveSize !== "mobile" ? 225 : "100%",
            minHeight: responsiveSize !== "mobile" ? 225 : 300,
            maxWidth: 225,
            maxHeight: 225,
            position: "relative",
          }}
        >
          <Image
            src={euLabel?.wineImageUrl}
            alt=""
            fill={true}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: 8,
            }}
          />
        </div>
        {responsiveSize !== "mobile" && (
          <Container intent="flexRowLeft" gap="medium">
            <WineryGeneralInfo fullWidth={false} />
          </Container>
        )}
      </Container>
      <EuLabelGeneralViewer item={euLabel as EuLabelInterface} />
      <Container intent="flexRowCenter" px="large" py="small">
        <Container
          intent="flexRowCenter"
          px="xsmall"
          py="xsmall"
          className="max-w-fit bg-surface rounded-md absolute bottom-0 left-0 ml-[48px] mb-[24px]"
        >
          {euLabel ? (
            <Image src={euLabel?.qrCodeUrl} width={120} height={120} alt="" />
          ) : (
            <Container intent="flexColCenter" className="w-[200px] h-[200px]">
              <BounceLoader color="#dddddd" width="40" height="40" />
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  );
}
