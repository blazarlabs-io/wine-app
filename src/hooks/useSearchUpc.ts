import { useEffect, useState } from "react";
import { useWineClient } from "@/context/wineClientSdkContext";

export interface SearchUpcInterface {}

export const useSearchUpc = () => {
  const { wineClient } = useWineClient();

  const [wineries, setWineries] = useState<any[]>([]);
  const [upcs, setUpcs] = useState<string[]>([]);

  const fetchUpcCodes = () => {
    if (wineClient) {
      wineClient.db.getDocsInCollection("wineries").then((res: any) => {
        console.log("WINERIES", res.data);
        setWineries(res.data);
        res.data.forEach((winery: any) => {
          if (winery.wines && winery.wines.length > 0) {
            winery.wines.forEach((wine: any) => {
              if (wine.upc && wine.upc !== undefined) {
                setUpcs((upcs) => [...upcs, wine.upc]);
              }
            });
          }
        });
      });
    }
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
  }, [wineClient]);

  return { wineries, upcs, searchUpc };
};
