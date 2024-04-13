import { useEffect, useState } from "react";

export interface ResponsiveInterface {
  width: number | undefined;
  height: number | undefined;
}

export type ResponsiveSize = "mobile" | "desktop";

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState<ResponsiveInterface>({
    width: undefined,
    height: undefined,
  });

  const [responsiveSize, setResponsiveSize] = useState<string>(
    windowSize.width !== undefined && windowSize.width < 640
      ? "mobile"
      : "desktop"
  );

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth as number,
        height: window.innerHeight as number,
      });

      if (window.innerWidth < 640) {
        setResponsiveSize("mobile");
      } else if (window.innerWidth < 1280) {
        setResponsiveSize("desktop");
      }
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return { windowSize, responsiveSize };
};
