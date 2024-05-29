import { Container, Text } from "@/components";
import { classNames } from "@/utils/classNames";

export interface IngredientViewerProps {
  title: string;
  variant?: "normal" | "surface";
  ingredient: {
    has: boolean;
    list: string[];
  };
}

export const IngredientViewer = ({
  title,
  variant = "normal",
  ingredient,
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
      {ingredient !== undefined && ingredient.has ? (
        <Container intent="flexColLeft" gap="xsmall" className="max-w-fit">
          {ingredient.list.map((item) => (
            <div
              key={item}
              // className="border border-primary-light rounded-full px-[12px] py-[6px]"
            >
              <Text intent="p2" variant="accent" key={item}>
                {item}
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
