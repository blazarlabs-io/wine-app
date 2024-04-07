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

export default function WineExplorer({ params }: { params: { ref: string } }) {
  const [euLabel, setEuLabel] = useState<DocumentData | null>(null);

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
      px="xlarge"
      gap="2xlarge"
      className="rounded-lg min-w-full min-h-full bg-surface-light"
    >
      <Container intent="flexRowLeft" gap="large">
        <Container
          intent="flexRowCenter"
          className="min-w-[200px] min-h-[200px] max-w-fit"
        >
          <Image src="/wine-sample.png" width={72} height={210} alt="" />
        </Container>
        <Container intent="flexRowLeft" gap="medium">
          <WineryGeneralInfo fullWidth={false} />
          <Container
            intent="flexColCenter"
            px="xsmall"
            py="xsmall"
            className="max-w-fit bg-surface rounded-md"
          >
            {euLabel ? (
              <Image src={euLabel?.qrCodeUrl} width={200} height={200} alt="" />
            ) : (
              <Container intent="flexColCenter" className="w-[200px] h-[200px]">
                <BounceLoader color="#dddddd" width="40" height="40" />
              </Container>
            )}
          </Container>
        </Container>
      </Container>
      <EuLabelGeneralViewer item={euLabel as EuLabelInterface} />
    </Container>
  );
}
