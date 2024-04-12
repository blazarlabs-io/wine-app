import { Container, Text, Button } from "@/components";

interface SearchFilterProps {
  label: string;
}

export const SearchFilter = ({ label }: SearchFilterProps) => {
  return (
    <Container intent="flexColLeft" gap="xsmall">
      <Container intent="flexRowBetween" className="w-full">
        <Text intent="p2" variant="dim">
          {label}
        </Text>
        <Button intent="text">Clear</Button>
      </Container>
      <input
        required
        type="text"
        placeholder=""
        value={""}
        onChange={(event: any) => {}}
        className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
      />
    </Container>
  );
};
