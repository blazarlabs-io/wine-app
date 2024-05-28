"use client";

import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { AccordionExtendedItem } from "./AccordionExtendedItem";
import { AccordionMinifiedItem } from "./AccordionMinifiedItem";
export interface WineAccordionProps {
  generalInfo: WineryGeneralInfo;
  data: Wine[];
  onEdit: (item: Wine) => void;
}

export const WinesAccordion = ({
  generalInfo,
  data,
  onEdit,
}: WineAccordionProps) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <div className="w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center min-w-full gap-[12px]">
            {data.map((item) => (
              <div
                key={item.generalInformation.wineCollectionName}
                className="w-full"
              >
                {!item.isMinified ? (
                  <AccordionExtendedItem
                    item={item}
                    generalInfo={generalInfo}
                    onEdit={() => onEdit(item)}
                  />
                ) : (
                  <AccordionMinifiedItem
                    item={item}
                    generalInfo={generalInfo}
                    onEdit={() => onEdit(item)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
