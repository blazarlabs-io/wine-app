import { Container, Text } from "@/components";

export const AboutUsPage = () => {
  return (
    <Container
      intent="flexColTop"
      py="large"
      px="medium"
      gap="medium"
      className="max-w-[720px]"
    >
      <Text intent="h3">About Us</Text>
      <Container
        intent="flexColLeft"
        gap="medium"
        px="medium"
        py="medium"
        className="rounded-xl bg-surface-dark"
      >
        <Text>
          We at{" "}
          <a
            className="text-primary-light font-semibold"
            href="https://wines.blazarlabs.com"
          >
            wines.blazarlabs.io
          </a>{" "}
          focus on building wine-related software products. It includes EU wine
          labelling, IOT enabled warehouse. And we bring you wine supply chain
          tracking and tokenization on blockchain.
        </Text>
        <Text>
          <span className="text-primary-light font-semibold">Vision:</span> Our
          intent to reimagine the wine industry via technological advancements
          is fueled by our focus on blockchain usage. This puts us at the
          forefront of pushing traditional industries towards the future.
        </Text>
        <Text>
          <span className="text-primary-light font-semibold">Our ambition</span>{" "}
          is to enable positioning the Moldovan wine on the global wine
          landscape as highly competitive wine on par with French, Italian or
          any other acknowledged wine producing countries and which is backed by
          modern technology that enables guaranteeing the high quality of the
          wines.
        </Text>
        <Text>
          <span className="text-primary-light font-semibold">Blazar Labs</span>{" "}
          is dedicated to bridging innovative technologies like blockchain, IoT
          and AI to real world utility. We are operating from Moldova focusing
          on Innovation through Technology.
        </Text>
      </Container>
    </Container>
  );
};
