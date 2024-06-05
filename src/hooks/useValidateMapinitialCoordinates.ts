import { useModal } from "@/context/modalContext";
import { CoordinateInterface } from "@/typings/winery";
import { useEffect, useState } from "react";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const useValidateMapinitialCoordinates = () => {
  const { wineryGeneralInfo } = useRealtimeDb();
  const { updateModal } = useModal();
  const [isMapDataValid, setIsMapDataValid] = useState<boolean>(false);

  useEffect(() => {
    const coordinate: CoordinateInterface =
      wineryGeneralInfo.wineryHeadquarters;

    if (
      coordinate &&
      coordinate.lat &&
      coordinate.lng &&
      coordinate.lat !== 0 &&
      coordinate.lng !== 0 &&
      coordinate.lat !== null &&
      coordinate.lng !== null &&
      coordinate.lat !== undefined &&
      coordinate.lng !== undefined
    ) {
      setIsMapDataValid(true);
    } else {
      updateModal({
        show: true,
        title: "Invalid Coordinates",
        description:
          "The coordinates for the vineyard are invalid. Please set valid coordinates to continue.",
        action: {
          label: "Ok",
          onAction: () => {
            updateModal({
              show: false,
              title: "",
              description: "",
              action: {
                label: "",
                onAction: () => {},
              },
            });
          },
        },
      });
    }
  }, [wineryGeneralInfo.wineryHeadquarters]);

  return { isMapDataValid };
};
