/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useCitySearch = (debouncedCityName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [cities, setCities] = useState<any[]>([]);

  const fetchCities = async () => {
    if (!debouncedCityName) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://city-api-iota.vercel.app/cities?cityName=${debouncedCityName.trim()}`
      );
      const data = await response.json();
      setCities(data?.data);
    } catch (error: any) {
      setError(error?.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [debouncedCityName]);

  return { loading, error, cities };
};

export default useCitySearch;
