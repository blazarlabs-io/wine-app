import { BlendComponent, Grape } from "@/typings/winery";
import { useCallback, useEffect, useState } from "react";
import { blendComponentInitialData } from "@/data";

export const useGetAndResolveGrapes = (blendComponents: BlendComponent[]) => {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [resolvedBlendComponents, setResolvedBlendComponents] = useState<
    BlendComponent[]
  >([]);

  const updateGrapes = (gs: Grape[]) => {
    setGrapes(gs);
  };

  const resolveBlendComponents = useCallback(() => {
    grapes.forEach((grape: Grape, grapeIndex: number) => {
      const newBlendComponent: BlendComponent = blendComponentInitialData;

      // if grape exists in resolvedBlendComponents
      // const found = resolvedBlendComponents.find(
      //   (component) => component.vineyardDetails.grape?.name === grape.name
      // );

      // if (found) {
      //   return;
      // }

      newBlendComponent.vineyardDetails.grape = grape;
      setResolvedBlendComponents((prev) => [...prev, newBlendComponent]);
    });
  }, [blendComponents, grapes, resolvedBlendComponents]);

  // * Initialize the grapes
  const init = () => {
    if (
      blendComponents !== undefined &&
      blendComponents !== null &&
      blendComponents.length > 0
    ) {
      // Loop through the blend components and get the grapes
      blendComponents.forEach((component) => {
        const grape = component.vineyardDetails.grape;
        // If grape exists in the blend component
        if (grape) {
          setGrapes((prev) => [...prev, grape as Grape]);
        }
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    resolveBlendComponents();
  }, [grapes]);

  return { grapes, updateGrapes, resolvedBlendComponents };
};
