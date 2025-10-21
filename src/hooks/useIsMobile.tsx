import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
};
