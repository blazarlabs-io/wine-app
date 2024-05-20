import {
  Container,
  GrapesViewerTable,
  IngredientViewerTable,
  Text,
  WineItem,
  WineItemList,
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
        <GrapesViewerTable
          title="Grapes Varieties"
          variant="surface"
          ingredient={item.grapesVarieties.list}
        />
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
        <WineItem
          title="Sugars"
          value={item.sugars as string}
          extraVal="g/1000ml"
          variant="surface"
        />

        {/* <WineItem
          title="Control Designation of Origin"
          value={item.controlledDesignationOfOrigin as string}
          variant="surface"
        />
        <WineItem
          title="Elevation"
          value={item.elevation as string}
          extraVal="meters"
          variant="surface"
        />
        <WineItem
          title="Orientation"
          value={item.orientation as string}
          extraVal="orientation"
          variant="surface"
        />
        <WineItem
          title="Soil Type"
          value={item.soilType as string}
          variant="surface"
        />
        <WineItem
          title="Vines' Age"
          value={item.vinesAge as string}
          extraVal="years"
          variant="surface"
        />
        <WineItemList
          title="Irrigation Practices"
          list={item.irrigationPractices as string[]}
          variant="surface"
        /> */}
      </Container>
    </>
  );
};
