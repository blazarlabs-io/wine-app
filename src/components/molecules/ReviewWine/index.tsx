"use client";

import { Container, Text, Button } from "@/components";
// import { getQrCodeImageData } from "@/utils/getQrCodeImageData";
import { base64ToFile, getQrCodeImageData } from "@/utils/qr-code";
import { useCallback, useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";

export interface ReviewWineProps {
  urlValue: string;
  qrCodeId: string;
  onSave: (file: File, base64: string) => void;
  onCancel: () => void;
}

export const ReviewWine = ({
  urlValue,
  qrCodeId,
  onSave,
  onCancel,
}: ReviewWineProps) => {
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [qrBase64, setQrBase64] = useState<string | null>(null);

  const mountRef = useRef<boolean>(false);

  const handleSave = useCallback(() => {
    onSave(qrCodeFile as File, qrBase64 as string);
  }, [onSave, qrBase64, qrCodeFile]);

  useEffect(() => {
    if (!mountRef.current && qrCodeId) {
      mountRef.current = true;
      const base64String = getQrCodeImageData("react-qrcode-logo");
      const file = base64ToFile(base64String, "qr-code.png");

      setQrBase64(base64String);
      setQrCodeFile(file);
      //
    }
  }, [qrCodeId, urlValue]);
  return (
    <div className="flex items-center justify-center w-full h-full bg-surface/80 backdrop-blur-sm fixed z-[999] top-0 left-0">
      <Container
        intent="flexColCenter"
        px="large"
        py="large"
        gap="large"
        className="min-w-[460px] max-w-[460px] max-h-fit bg-surface-light rounded-lg p-4"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3" className="font-bold">
            Add Wine
          </Text>
          <Text intent="p1" variant="dim">
            Add wine details and generate EU label QR code for your wine.
          </Text>
        </Container>
        <QRCode
          value={urlValue as string}
          size={250}
          qrStyle="squares"
          eyeRadius={4}
          id="react-qrcode-thumbnail"
        />
        <Container intent="flexRowCenter" className="hidden">
          <QRCode
            value={urlValue as string}
            size={1500}
            qrStyle="squares"
            eyeRadius={4}
            id="react-qrcode-logo"
          />
        </Container>
        <Container
          intent="flexRowCenter"
          px="medium"
          py="small"
          className="w-full bg-surface rounded-md"
        >
          <Text variant="dim">{urlValue}</Text>
        </Container>
        <Container intent="flexRowBetween" gap="medium" className="w-full">
          <Button intent="secondary" fullWidth size="medium" onClick={onCancel}>
            Cancel
          </Button>
          <Button intent="primary" fullWidth size="medium" onClick={handleSave}>
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
};
