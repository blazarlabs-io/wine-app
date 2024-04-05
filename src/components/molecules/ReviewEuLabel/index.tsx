"use client";

import { Container, Text, Button } from "@/components";
import { QRCode } from "react-qrcode-logo";

export interface ReviewEuLabelProps {
  qrCodeValue: string;
  qrCodeId: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const ReviewEuLabel = ({
  qrCodeValue,
  qrCodeId,
  onAccept,
  onCancel,
}: ReviewEuLabelProps) => {
  return (
    <Container
      intent="flexRowCenter"
      className="w-full h-full bg-surface/80 backdrop-blur-sm fixed z-[999] top-0 left-0"
    >
      <Container
        intent="flexColCenter"
        px="large"
        py="large"
        gap="large"
        className="min-w-[460px] max-w-[460px] max-h-fit bg-surface-light rounded-lg p-4"
      >
        <Container intent="flexColTop" gap="medium">
          <Text intent="h3" className="font-bold">
            Confirm EU Label Registration
          </Text>
          <Text intent="p1" variant="dim">
            You are about to register a new EU Label. Please review the details.
            This operation cannot be undone.
          </Text>
        </Container>
        <QRCode
          value={qrCodeValue} // here you should keep the link/value(string) for which you are generation promocode
          size={250} // the dimension of the QR code (number)
          qrStyle="squares" // type of qr code, wether you want dotted ones or the square ones
          eyeRadius={4} // radius of the promocode eye
          id={"sample-qr"} // id of the qr code
        />
        <Container intent="flexRowCenter" className="hidden">
          <QRCode
            value={qrCodeValue} // here you should keep the link/value(string) for which you are generation promocode
            size={1500} // the dimension of the QR code (number)
            qrStyle="squares" // type of qr code, wether you want dotted ones or the square ones
            eyeRadius={4} // radius of the promocode eye
            id={qrCodeId} // id of the qr code
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
            Confirm
          </Button>
        </Container>
      </Container>
    </Container>
  );
};
