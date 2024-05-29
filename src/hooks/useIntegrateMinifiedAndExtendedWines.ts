import { useForms } from "@/context/FormsContext";
import { blendComponentInitialData } from "@/data";
import { minifiedWineInitData } from "@/data/minifiedWineInitData";
import { BlendComponent, MinifiedWine, Wine } from "@/typings/winery";
import { useEffect, useState } from "react";

export const useIntegrateMinifiedAndExtendedWines = () => {
  const { wineForm, updateWineForm } = useForms();
  const [formsIntegrated, setFormsIntegrated] = useState(false);

  useEffect(() => {
    const resolvedFormData: Wine | null = wineForm.formData;

    if (wineForm.formData.isMinified) {
      // * General Information
      resolvedFormData.generalInformation.wineryName =
        wineForm.formData.minifiedWine.wineryName;
      resolvedFormData.generalInformation.wineCollectionName =
        wineForm.formData.minifiedWine.wineCollectionName;
      resolvedFormData.generalInformation.country =
        wineForm.formData.minifiedWine.country;
      resolvedFormData.generalInformation.wineImageUrl =
        wineForm.formData.minifiedWine.wineImageUrl;
      resolvedFormData.generalInformation.qrCodeUrl =
        wineForm.formData.minifiedWine.qrCodeUrl;

      // * Characteristics
      resolvedFormData.characteristics.wineColour =
        wineForm.formData.minifiedWine.wineColour;
      resolvedFormData.characteristics.wineType =
        wineForm.formData.minifiedWine.wineType;
      resolvedFormData.characteristics.alcoholLevel =
        wineForm.formData.minifiedWine.alcoholLevel;
      resolvedFormData.characteristics.residualSugar =
        wineForm.formData.minifiedWine.residualSugar;

      // * Check if blendcomponent exists, if not, create one
      if (resolvedFormData.blendComponents.length === 0) {
        const components: BlendComponent[] = [];
        components.push(blendComponentInitialData);
        resolvedFormData.blendComponents = components;
      }
      // else {
      //   // * Wine Making Technique
      //   resolvedFormData.blendComponents[0].ingredients =
      //     wineForm.formData.minifiedWine.blendIngredients;
      //   // * Vineyard Grapes
      //   resolvedFormData.blendComponents[0].vineyardDetails.grape =
      //     wineForm.formData.minifiedWine.grapes[0];
      // }
    } else {
      // * Minified Wine
      const newMinifiedWine: MinifiedWine = minifiedWineInitData;
      resolvedFormData.minifiedWine = newMinifiedWine;
      resolvedFormData.minifiedWine.wineryName =
        resolvedFormData.generalInformation.wineryName;
      resolvedFormData.minifiedWine.wineCollectionName =
        resolvedFormData.generalInformation.wineCollectionName;
      resolvedFormData.minifiedWine.country =
        resolvedFormData.generalInformation.country;
      resolvedFormData.minifiedWine.wineType =
        resolvedFormData.characteristics.wineType;
      resolvedFormData.minifiedWine.wineColour =
        resolvedFormData.characteristics.wineColour;
      resolvedFormData.minifiedWine.alcoholLevel =
        resolvedFormData.characteristics.alcoholLevel;
      resolvedFormData.minifiedWine.residualSugar =
        resolvedFormData.characteristics.residualSugar;
      resolvedFormData.minifiedWine.wineImageUrl =
        resolvedFormData.generalInformation.wineImageUrl;
      resolvedFormData.minifiedWine.qrCodeUrl =
        resolvedFormData.generalInformation.qrCodeUrl;
      resolvedFormData.minifiedWine.bottleSize =
        resolvedFormData.packagingAndBranding.bottleSize;

      // * Check if blendcomponent exists, if it does, update the minified wine ingredients
      if (resolvedFormData.blendComponents.length > 0) {
        resolvedFormData.minifiedWine.blendIngredients =
          resolvedFormData.blendComponents[0].ingredients;
        // * Check if grape exists, if it does, update the minified wine grapes
        // resolvedFormData.blendComponents.forEach((component) => {
        //   if (
        //     component.vineyardDetails.grape !== undefined &&
        //     component.vineyardDetails.grape !== null &&
        //     component.vineyardDetails.grape.name !== null
        //   ) {
        //     resolvedFormData?.minifiedWine.grapes.push(
        //       component.vineyardDetails.grape
        //     );
        //   }
        // });
      }
    }

    // * Update the resolved wineForm.formData form
    updateWineForm({
      ...wineForm,
      formData: resolvedFormData,
    });

    resolvedFormData.minifiedWine.grapes = [];

    setFormsIntegrated(true);
  }, []);

  return { formsIntegrated };
};
