import { Container, Text } from "@/components";

export interface EuLabelItemProps {
  title: string;
  value: string;
}

export const EuLabelItem = ({ title, value }: EuLabelItemProps) => {
  return (
    <Container intent="flexColLeft" className="max-w-fit">
      <Text intent="p2" variant="dim">
        {title}
      </Text>
      <Text>{value}</Text>
    </Container>
  );
};
