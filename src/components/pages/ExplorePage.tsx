"use client";

import {
  Button,
  Container,
  DropDownFilter,
  FilterBox,
  GeneralLoaderOverlay,
  SearchFilter,
  Text,
  WineCard,
} from "@/components";
import { winesSample } from "@/data/winesSample";
import { useResponsive } from "@/hooks/useResponsive";
import { handleGridResponsiveness } from "@/utils/handleGridResponsiveness";
import { useFilters } from "@/context/filtersContext";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { EuLabelInterface } from "@/typings/winery";
import { classNames } from "@/utils/classNames";

export const ExplorePage = () => {
  const { responsiveSize } = useResponsive();
  const { showFilters, filtersLoading, filteredWines, allWines } = useFilters();

  const [winesToShow, setWinesToShow] = useState<EuLabelInterface[]>([]);

  useEffect(() => {
    console.log("filtering...");
    if (filteredWines.length > 0) {
      setWinesToShow(filteredWines);
    } else {
      setWinesToShow(allWines);
    }
  }, [filteredWines, allWines]);
  return (
    <Container
      intent={handleGridResponsiveness(responsiveSize)}
      gap={"medium"}
      className="mb-[48px] min-w-full"
    >
      {showFilters && (
        <div className="fixed top-0 left-0 z-[800] bg-surface/80 backdrop-blur-sm w-screen h-screen flex items-center justify-center">
          <FilterBox />
        </div>
      )}
      {!filtersLoading ? (
        <>
          {winesToShow.map((wine, index) => (
            <div
              key={index + "-" + wine.upc + "-" + wine.wineCollectionName}
              className={classNames(
                responsiveSize === "mobile" ? "px-[24px]" : ""
              )}
            >
              <WineCard
                imageUrl={wine.wineImageUrl || "/wine-placeholder.png"}
                wineCollectionName={wine.wineCollectionName}
                upc={wine.upc}
                wineryName={wine.wineryName}
                country={wine.country}
                harvestYear={wine.harvestYear}
                referenceNumber={wine.referenceNumber}
                alcoholLevel={wine.alcoholLevel}
                typeOfWine={wine.typeOfWine}
              />
            </div>
          ))}
        </>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </Container>
  );
};
