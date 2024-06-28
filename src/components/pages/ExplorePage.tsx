"use client";

import {
  Container,
  FilterBox,
  GeneralLoaderOverlay,
  WineCard,
} from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { handleGridResponsiveness } from "@/utils/handleGridResponsiveness";
import { useFilters } from "@/context/filtersContext";
import { useEffect, useState } from "react";
import { Wine } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { getAssetsByPolicyId } from "@/utils/firestore";

export const ExplorePage = () => {
  const { responsiveSize } = useResponsive();
  const {
    showFilters,
    filtersLoading,
    filteredWines,
    allWines,
    tokenizedWines,
    nonTokenizedWines,
  } = useFilters();

  const [winesToShow, setWinesToShow] = useState<Wine[]>([]);

  useEffect(() => {
    if (filteredWines.length > 0) {
      setWinesToShow(filteredWines);
      console.log(filteredWines);
    } else {
      setWinesToShow(allWines);
    }
  }, [filteredWines, allWines]);

  // useEffect(() => {
  //   getAssetsByPolicyId({
  //     policyId: "78015c70e9ef4f76c0f01465fe16f084c4e22b6c6c34bb1ce57668c3",
  //   })
  //     .then((response: any) => {
  //       console.log(response);
  //     })
  //     .catch((error: any) => {
  //       console.error(error);
  //     });
  // }, []);

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
              key={
                index +
                "-" +
                wine.referenceNumber +
                "-" +
                wine.generalInformation.wineCollectionName
              }
              className={classNames(
                responsiveSize === "mobile" ? "px-[24px]" : ""
              )}
            >
              <WineCard
                imageUrl={
                  wine.generalInformation.wineImageUrl ||
                  wine.minifiedWine.wineImageUrl ||
                  "/wine-placeholder.png"
                }
                wineCollectionName={
                  (wine.generalInformation.wineCollectionName as string) ||
                  (wine.minifiedWine.wineCollectionName as string)
                }
                upc={wine.packagingAndBranding.upc as string}
                wineryName={wine.generalInformation.wineryName as string}
                country={
                  (wine.generalInformation.country as string) ||
                  (wine.minifiedWine.country as string)
                }
                // harvestYear={wine.generalInformation.harvestYear}
                harvestYear=""
                referenceNumber={wine.referenceNumber as string}
                alcoholLevel={
                  (wine.characteristics.alcoholLevel as string) ||
                  wine.minifiedWine.alcoholLevel
                }
                typeOfWine={
                  (wine.characteristics.wineType as string) ||
                  wine.minifiedWine.wineType
                }
                isTokenized={wine.tokenization?.isTokenized}
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
