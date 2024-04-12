"use client";

import { Container, WineCard } from "@/components";
import { winesSample } from "@/data/winesSample";
import { useResponsive } from "@/hooks/useResponsive";
import { handleGridResponsiveness } from "@/utils/handleGridResponsiveness";

export const ExplorePage = () => {
  const { responsiveSize } = useResponsive();

  return (
    <Container
      intent={handleGridResponsiveness(responsiveSize)}
      gap="medium"
      className=""
    >
      {winesSample.map((wine, index) => (
        <div key={index + "-" + wine.upc + "-" + wine.wineName}>
          <WineCard
            imageUrl="/wine-sample.png"
            wineName={wine.wineName}
            upc={wine.upc}
            wineryName={wine.wineryName}
            country={wine.country}
            harvestYear={wine.harvestYear}
          />
        </div>
      ))}
    </Container>
  );
};
