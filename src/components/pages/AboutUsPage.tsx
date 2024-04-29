import { Container, Text } from "@/components";

export const AboutUsPage = () => {
  return (
    <Container
      intent="flexColTop"
      py="large"
      gap="medium"
      className="max-w-[720px]"
    >
      <Text intent="h3">About Us</Text>
      <Text>
        We at{" "}
        <a
          className="text-primary-light font-semibold"
          href="https://wines.blazarlabs.com"
        >
          wines.blazarlabs.io
        </a>{" "}
        are an IT company focused on wine-related software products which
        include EU wine labelling, wine supply chain tracking, IOT enabled
        warehouses and blockchain tokenization.
      </Text>
    </Container>
  );
};
