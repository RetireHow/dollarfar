import { FormEvent, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import CitySearch from "./CitySearch";
import useCitySearch from "../../hooks/useCitySearch";

export default function COLCForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // State for the input field and API response
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState("");

  const debouncedCityName1 = useDebounce(cityName1, 500);
  const debouncedCityName2 = useDebounce(cityName2, 500);

  const {
    cities: cities1,
    loading: loading1,
    error: error1,
  } = useCitySearch(debouncedCityName1);

  const {
    cities: cities2,
    loading: loading2,
    error: error2,
  } = useCitySearch(debouncedCityName2);

  const handleCompare = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form>
      <CitySearch
        cities={cities1}
        cityName={cityName1}
        setCityName={setCityName1}
        loading={loading1}
        error={error1}
        title="City your are moving from"
      />
      <CitySearch
        cities={cities2}
        cityName={cityName2}
        setCityName={setCityName2}
        loading={loading2}
        error={error2}
        title="City you are moving to"
      />
      <button
        onClick={handleCompare}
        disabled={cityName1 && cityName2 ? false : true}
        className={`text-white p-[0.8rem] rounded-[10px] w-[150px] mt-[2rem] ${cityName1 && cityName2 ? 'bg-black' : 'bg-gray-300'}`}
      >
        Compare
      </button>
    </form>
  );
}
