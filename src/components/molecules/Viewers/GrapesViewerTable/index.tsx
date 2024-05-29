import { Container, Text } from "@/components";
import { Grape } from "@/typings/winery";
import { classNames } from "@/utils/classNames";

export interface IngredientViewerProps {
  title: string;
  ingredient: Grape;
  variant?: "normal" | "surface";
}

export const GrapesViewerTable = ({
  title,
  ingredient,
  variant = "normal",
}: IngredientViewerProps) => {
  return (
    <Container
      intent="flexColLeft"
      px="small"
      py="small"
      className={classNames(
        variant === "normal" && "bg-transparent",
        variant === "surface" && "bg-surface-dark/30 rounded-md w-full"
      )}
      gap="small"
    >
      <Text intent="p1" variant="dim" className="font-semibold">
        {title}
      </Text>
      {ingredient !== undefined && ingredient !== null ? (
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          <Container intent="grid-3">
            <Text intent="p2" variant="dim" className="font-semibold">
              Name
            </Text>
            <Text intent="p2" variant="dim" className="font-semibold">
              Percentage
            </Text>
            <Text intent="p2" variant="dim" className="font-semibold">
              Year
            </Text>
            <Text intent="p1" variant="dim">
              {ingredient.name}
            </Text>
            <Text intent="p1" variant="dim">
              {ingredient.percentage + "%"}
            </Text>
            <Text intent="p1" variant="dim">
              {ingredient.vintageYear}
            </Text>
          </Container>
        </Container>
      ) : (
        <Text variant="dim">No</Text>
      )}
    </Container>
  );
};
