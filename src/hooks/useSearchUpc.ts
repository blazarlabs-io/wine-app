import { getDocsInCollection } from "@/utils/firestore";
import { useCallback, useEffect, useState } from "react";

export interface SearchUpcInterface {}

export const useSearchUpc = () => {
  const [wineries, setWineries] = useState<any[]>([]);
  const [upcs, setUpcs] = useState<string[]>([]);

  const fetchUpcCodes = () => {
    getDocsInCollection("wineries").then((wineries) => {
      setWineries(wineries);
      wineries.forEach((winery) => {
        if (winery.euLabels && winery.euLabels.length > 0) {
          winery.euLabels.forEach((euLabel: any) => {
            if (euLabel.upc && euLabel.upc !== undefined) {
              setUpcs((upcs) => [...upcs, euLabel.upc]);
            }
          });
        }
      });
    });
  };

  const searchUpc = (query: string) => {
    // Convert the query to lowercase for case-insensitive search
    const searchTerm = query.toLowerCase();

    // Filter the array to get only the strings containing the search term
    const searchResults = upcs.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );

    return searchResults;
  };

  useEffect(() => {
    fetchUpcCodes();
  }, []);

  return { wineries, upcs, searchUpc };
};
