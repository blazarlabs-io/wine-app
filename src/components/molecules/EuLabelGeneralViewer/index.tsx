import {
  AllergenViewer,
  Container,
  EuLabelItem,
  IngredientViewer,
  BounceLoader,
  Text,
} from "@/components";
import { EuLabelInterface } from "@/typings/components";

export interface EuLabelGeneralViewerInterface {
  item: EuLabelInterface;
}

export const EuLabelGeneralViewer = ({
  item,
}: EuLabelGeneralViewerInterface) => {
  return (
    <>
      {item && item !== undefined ? (
        <div className="flex flex-col items-start justify-center min-w-full gap-[24px]">
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              General Information
            </Text>
          </Container>
          <Container intent="grid-5" gap="large" className="">
            <EuLabelItem
              title="Reference Number"
              value={item.referenceNumber}
            />
            <EuLabelItem title="Wine Name" value={item.wineName} />
            <EuLabelItem title="UPC" value={item.upc} />
            <EuLabelItem title="Harvest Year" value={item.harvestYear} />
            <EuLabelItem title="Country" value={item.country} />
            <EuLabelItem
              title="Controlled Designation of Origin"
              value={item.controlledDesignationOfOrigin}
            />
            <EuLabelItem
              title="Alcohol Level"
              value={item.alcoholLevel + " %vol"}
            />
            <EuLabelItem title="Product" value={item.product} />
            <EuLabelItem title="Kind of Wine" value={item.kindOfWine} />
            <EuLabelItem title="Colour of Wine" value={item.colourOfWine} />
            <EuLabelItem title="Bottle Size" value={item.bottleSize} />
            <EuLabelItem title="Produced By" value={item.producedBy} />
            <EuLabelItem title="Bottled By" value={item.bottledBy} />
          </Container>

          {/* Ingredients */}
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              Ingredients
            </Text>
          </Container>
          <Container intent="grid-5" gap="large" className="">
            <Container intent="flexColLeft" gap="small" className="w-full">
              <Text intent="p2" variant="dim">
                Grapes
              </Text>
              {item.ingredients.grapes.has ? <Text>Yes</Text> : <Text>No</Text>}
            </Container>
            <IngredientViewer
              title="Acidity Regulators"
              ingredient={item.ingredients.acidityRegulators}
            />
            <IngredientViewer
              title="Antioxidants"
              ingredient={item.ingredients.antioxidants}
            />
            <IngredientViewer
              title="Preservatives"
              ingredient={item.ingredients.preservatives}
            />
            <IngredientViewer
              title="Stabilizers"
              ingredient={item.ingredients.stabilizers}
            />
          </Container>

          {/* Allergens */}
          <Container intent="flexColLeft" className="max-w-fit">
            <Text intent="h6" variant="accent" className="font-semibold">
              Allergens
            </Text>
          </Container>
          <Container intent="grid-5" gap="large" className="">
            <Container
              intent="flexColLeft"
              gap="medium"
              className="w-full col-span-2"
            >
              <Text intent="p2" variant="dim">
                Fining Agents
              </Text>
              <Container intent="flexColLeft" gap="medium">
                <Container intent="flexRowLeft" gap="small" className="w-full">
                  <AllergenViewer
                    title="Egg Whites"
                    has={item.allergens.finingAgents.eggWhites}
                  />
                  <AllergenViewer
                    title="Milk Proteins"
                    has={item.allergens.finingAgents.milkProteins}
                  />
                  <AllergenViewer
                    title="Gelatines"
                    has={item.allergens.finingAgents.gelatines}
                  />
                </Container>
                <Container intent="flexColLeft" gap="small" className="w-full">
                  <Text intent="p2" variant="dim">
                    Other Agents
                  </Text>
                  <Container
                    intent="flexRowLeft"
                    gap="small"
                    className="w-full"
                  >
                    {item.allergens.finingAgents.other.map((agent) => (
                      <div
                        key={agent}
                        className="border border-primary-light rounded-full px-[12px] py-[6px]"
                      >
                        <Text intent="p2" variant="accent">
                          {agent}
                        </Text>
                      </div>
                    ))}
                  </Container>
                </Container>
              </Container>
            </Container>
            <AllergenViewer title="Sulphites" has={item.allergens.sulphites} />
            <AllergenViewer title="Tanins" has={item.allergens.tanins} />
            <AllergenViewer
              title="Histamines"
              has={item.allergens.histamines}
            />
          </Container>
        </div>
      ) : (
        <Container intent="flexColCenter" className="min-h-[320px]">
          <BounceLoader width="40" height="40" />
        </Container>
      )}
    </>
  );
};
