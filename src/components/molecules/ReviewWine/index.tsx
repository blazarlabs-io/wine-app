"use client";

import { Container, Text, Button } from "@/components";
import { QRCode } from "react-qrcode-logo";

export interface ReviewWineProps {
  qrCodeValue: string;
  qrCodeId: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const ReviewWine = ({
  qrCodeValue,
  qrCodeId,
  onAccept,
  onCancel,
}: ReviewWineProps) => {
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
          value={qrCodeValue}
          size={250}
          qrStyle="squares"
          eyeRadius={4}
          id={"sample-qr"}
        />
        <Container intent="flexRowCenter" className="hidden">
          <QRCode
            value={qrCodeValue}
            size={1500}
            qrStyle="squares"
            eyeRadius={4}
            id={qrCodeId}
          />
        </Container>
        <Container
          intent="flexRowCenter"
          px="medium"
          py="small"
          className="w-full bg-surface rounded-md"
        >
          <Text variant="dim">{qrCodeValue}</Text>
        </Container>
        <Container intent="flexRowBetween" gap="medium" className="w-full">
          <Button intent="secondary" fullWidth size="medium" onClick={onCancel}>
            Cancel
          </Button>
          <Button intent="primary" fullWidth size="medium" onClick={onAccept}>
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
};
