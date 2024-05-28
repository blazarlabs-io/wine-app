import { Winery } from "@/typings/winery";
import { getDocsInCollection } from "@/utils/firestore";
import { useCallback, useEffect, useState } from "react";

export interface SearchUpcInterface {}

export const useSearchUpc = () => {
  const [wineries, setWineries] = useState<any[]>([]);
  const [upcs, setUpcs] = useState<string[]>([]);

  const fetchUpcCodes = () => {
    getDocsInCollection("wineries").then((data: any) => {
      setWineries(data.docs);
      wineries.forEach((winery) => {
        if (winery.wines && winery.wines.length > 0) {
          winery.wines.forEach((wine: any) => {
            if (wine.upc && wine.upc !== undefined) {
              setUpcs((upcs) => [...upcs, wine.upc]);
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
