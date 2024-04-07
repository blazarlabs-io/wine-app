import { Container, Text } from "@/components";

export interface IngredientViewerProps {
  title: string;
  ingredient: {
    has: boolean;
    list: string[];
  };
}

export const IngredientViewer = ({
  title,
  ingredient,
}: IngredientViewerProps) => {
  return (
    <Container intent="flexColLeft" className="max-w-fit" gap="small">
      <Text intent="p2" variant="dim" className="">
        {title}
      </Text>
      {ingredient !== undefined && ingredient.has ? (
        <Container intent="flexColLeft" gap="small" className="max-w-fit">
          {ingredient.list.map((item) => (
            <div
              key={item}
              className="border border-primary-light rounded-full px-[12px] py-[6px]"
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
