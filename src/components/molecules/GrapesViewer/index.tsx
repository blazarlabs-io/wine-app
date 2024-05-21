import { Container, Text } from "@/components";
import { GrapeVariety } from "@/typings/winery";
import { classNames } from "@/utils/classNames";

export interface IngredientViewerProps {
  title: string;
  ingredient: GrapeVariety[];
  variant?: "normal" | "surface";
}

export const GrapesViewer = ({
  title,
  ingredient,
  variant = "normal",
}: IngredientViewerProps) => {
  return (
    <Container
      intent="flexColLeft"
      className={classNames(
        variant === "normal" && "bg-transparent",
        variant === "surface" && "bg-surface-dark rounded-md p-[16px] w-full"
      )}
      gap="small"
    >
      <Text intent="p2" variant="dim" className="">
        {title}
      </Text>
      {ingredient !== undefined ? (
        <Container intent="flexColLeft" gap="xsmall" className="max-w-fit">
          {ingredient.map((item) => (
            <div
              key={item.name}
              // className="border border-primary-light rounded-full px-[12px] py-[6px]"
              className="flex items-center gap-[8px]"
            >
              <Text intent="p2" variant="accent">
                {item.name}
              </Text>
              <Text intent="p2" variant="accent">
                {item.percentage + "%"}
              </Text>
            </div>
          ))}
        </Container>
      ) : (
        <Text>No</Text>
      )}
    </Container>
  );
};
