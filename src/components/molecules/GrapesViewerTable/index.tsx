import { Container, Text } from "@/components";
import { GrapeVariety } from "@/typings/winery";
import { classNames } from "@/utils/classNames";

export interface IngredientViewerProps {
  title: string;
  ingredient: GrapeVariety[];
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
      {ingredient !== undefined && ingredient.length > 0 ? (
        <Container intent="flexColLeft" gap="xsmall" className="w-full">
          {ingredient.map((item) => (
            <div
              key={item.name}
              // className="border border-primary-light rounded-full px-[12px] py-[6px]"
              className="flex items-center justify-between gap-[8px]  w-full"
            >
              <Text intent="p1" variant="dim">
                {item.name}
              </Text>
              <Text intent="p1" variant="dim">
                {item.percentage + "%"}
              </Text>
            </div>
          ))}
        </Container>
      ) : (
        <Text variant="dim">No</Text>
      )}
    </Container>
  );
};
