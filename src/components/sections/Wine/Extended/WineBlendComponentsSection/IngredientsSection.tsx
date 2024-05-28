import {
  Container,
  GrapesViewerTable,
  IngredientViewerTable,
  Text,
  WineItem,
} from "@/components";
import { BlendIngredients } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface IngredientsSectionProps {
  item: BlendIngredients;
}

export const IngredientsSection = ({ item }: IngredientsSectionProps) => {
  return (
    <>
      <Container intent="flexRowLeft" gap="xsmall" className="mt-[24px]">
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="mdi:nutrition"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="h6" variant="dim" className="font-semibold capitalize">
            Ingredients
          </Text>
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium" className="w-full mt-[12px]">
        <IngredientViewerTable
          title="Acidity Regulators"
          variant="surface"
          ingredient={item.acidityRegulators}
        />
        <IngredientViewerTable
          title="Antioxidants"
          variant="surface"
          ingredient={item.antioxidants}
        />
        <IngredientViewerTable
          title="Preservatives"
          variant="surface"
          ingredient={item.preservatives}
        />
        <IngredientViewerTable
          title="Stabilizers"
          variant="surface"
          ingredient={item.stabilizers}
        />
        <IngredientViewerTable
          title="Finings Agents"
          variant="surface"
          ingredient={item.finingAgents}
        />
      </Container>
    </>
  );
};
