import { BlendComponent } from "@/typings/winery";
import { useForms } from "@/context/FormsContext";
import { useEffect, useState } from "react";

export const useGetBlendComponentIndex = (component: BlendComponent) => {
  const { wineForm } = useForms();

  const [componentIndex, setComponentIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = wineForm.formData.blendComponents.findIndex(
      (c) => c.name === component.name
    );
    if (index !== -1) {
      setComponentIndex(index);
    }
  }, [component]);

  return { componentIndex };
};
