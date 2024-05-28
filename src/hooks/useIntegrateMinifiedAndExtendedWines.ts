import { useForms } from "@/context/FormsContext";
import { blendComponentInitialData } from "@/data";
import { BlendComponent } from "@/typings/winery";
import { generateId } from "@/utils/generateId";
import { useEffect, useState } from "react";

export const useIntegrateMinifiedAndExtendedWines = () => {
  const { wineForm, updateWineForm } = useForms();
  const [formsIntegrated, setFormsIntegrated] = useState(false);

  useEffect(() => {
    const resolvedFormData = wineForm.formData;

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
      // const name = wineForm.formData.minifiedWine.grapes[0]?.name || "";
      // const id =
      //   wineForm.formData.minifiedWine.grapes[0]?.name
      //     .split(" ")
      //     .join("-")
      //     .toLocaleLowerCase() || "";
      // blendComponentInitialData.name = name;
      // blendComponentInitialData.id = id;
      components.push(blendComponentInitialData);
      resolvedFormData.blendComponents = components;
    } else {
      // * Wine Making Technique
      resolvedFormData.blendComponents[0].ingredients =
        wineForm.formData.minifiedWine.blendIngredients;

      // * Vineyard Grapes
      resolvedFormData.blendComponents[0].vineyardDetails.grape =
        wineForm.formData.minifiedWine.grapes[0];
    }

    // * Update the resolved wine form
    updateWineForm({
      ...wineForm,
      formData: resolvedFormData,
    });

    setFormsIntegrated(true);
  }, []);

  return { formsIntegrated };
};
