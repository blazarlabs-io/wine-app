"use client";

import { WinesAccordion, Container } from "@/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { dateToTimestamp } from "@/utils/dateToTimestamp";
import { fileToBase64 } from "@/utils/fileToBase64";
import { generateId } from "@/utils/generateId";
import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import { wineUrlComposerRef } from "@/utils/wineUrlComposerRef";
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

export default function Sandbox() {
  const { wines } = useRealtimeDb();
  const [qrCodeFile, setQrCodeFile] = useState<string | null>(null);
  const [ref, setRef] = useState<string | null>(null);
  const [wineUrl, setWineUrl] = useState<string | null>(null);

  const createQrCodeFile = async () => {
    const blob = await fetch(getQrCodeImageData("euLabelQrCode")).then((r) =>
      r.blob()
    );

    const referenceNumber = generateId(5) + "-" + dateToTimestamp();
    setRef(referenceNumber);
    // const tmpUrl = wineUrlComposerRef(referenceNumber);
    const dns = "https://wines.blazarlabs.io/";
    const tmpUrl = `${dns}wine/?ref=${referenceNumber}`;
    setWineUrl(tmpUrl);

    return new Promise<File>((resolve) => {
      const file = new File([blob], referenceNumber + ".png", {
        type: "image/png",
      });
      resolve(file);
    });
  };

  useEffect(() => {
    createQrCodeFile()
      .then((file: File) => {
        fileToBase64(file).then((base64: any) => {
          setQrCodeFile(base64);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container intent="flexRowCenter" className="">
      <Container intent="flexRowCenter" className="">
        {ref && qrCodeFile && (
          <QRCode
            value={wineUrl as string}
            size={1500}
            qrStyle="squares"
            eyeRadius={4}
            id={"euLabelQrCode"}
          />
        )}
      </Container>
    </Container>
  );
}
