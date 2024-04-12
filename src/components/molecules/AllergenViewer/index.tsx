import { Container, Text } from "@/components";

export interface AllergenViewerProps {
  title: string;
  has: boolean;
}

export const AllergenViewer = ({ title, has }: AllergenViewerProps) => {
  return (
    <Container intent="flexColLeft" className="max-w-fit" gap="small">
      <Text intent="p2" variant="dim" className="">
        {title}
      </Text>
      {has ? <Text>Yes</Text> : <Text>No</Text>}
    </Container>
  );
};
