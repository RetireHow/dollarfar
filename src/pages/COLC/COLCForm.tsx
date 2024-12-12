/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Error from "../../components/UI/Error";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDebounce from "../../hooks/useDebounce";

export default function COLCForm() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    
      // State for the input field and API response
      const [cityName1, setCityName1] = useState("");
      const [cityName2, setCityName2] = useState("");
    
      const [loading1, setLoading1] = useState(false);
      const [error1, setError1] = useState<null | string>(null);
    
      const [loading2, setLoading2] = useState(false);
      const [error2, setError2] = useState<null | string>(null);
    
      const [cities1, setCities1] = useState([]);
      const [cities2, setCities2] = useState([]);
    
    
      const debouncedCityName1 = useDebounce(cityName1, 300);
      const debouncedCityName2 = useDebounce(cityName2, 300);
    
      const fetchCities1 = async (debouncedCityName: string) => {
        try {
          const response = await fetch(
            `https://city-api-iota.vercel.app/cities?cityName=${debouncedCityName.trim()}`
          );
          const data = await response.json();
          setCities1(data?.data);
        } catch (error:any) {
          setError1(error?.message);
          console.error(error?.message);
        }finally{
          setLoading1(false)
        }
      };
    
      const fetchCities2 = async (debouncedCityName: string) => {
        try {
          const response = await fetch(
            `https://city-api-iota.vercel.app/cities?cityName=${debouncedCityName.trim()}`
          );
          const data = await response.json();
          setCities2(data?.data);
        } catch (error:any) {
          setError2(error?.message);
          console.error("Error fetching data:", error);
        }finally{
          setLoading2(false)
        }
      };
    
      console.log({error1, error2})
    
      useEffect(() => {
        if (!debouncedCityName1) return;
        setLoading1(true);
        setError1(null);
        fetchCities1(debouncedCityName1);
      }, [debouncedCityName1]);
    
    
      useEffect(() => {
        if (!debouncedCityName2) return;
        setLoading2(true);
        setError2(null);
        fetchCities2(debouncedCityName2);
      }, [debouncedCityName2]);
    
    
      console.log({ cityName1, cityName2});
  return (
    <form className="mt-10">
      <div>
        <label className="block mb-[0.5rem] font-semibold">
          City your are moving from
        </label>
        <div className="relative">
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="text"
            placeholder="Type and Pick City"
            onChange={(e) => setCityName1(e.target.value)}
            list="suggestion1"
          />
          {loading1 && (
            <Icon
              className="absolute right-5 top-2"
              icon="line-md:loading-loop"
              width="24"
              height="24"
            />
          )}
        </div>
        {error1 && <Error message={error1} />}

        <datalist
          className="border-[1px] border-green-300 w-full"
          id="suggestion1"
        >
          {cities1?.map((item: { label: string }, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </datalist>
      </div>

      <div className="mt-[1.5rem]">
            <label className="block mb-[0.5rem] font-semibold">
              City your are moving to
            </label>
            <div className="relative">
           <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
              type="text"
              placeholder="Type and Pick City"
              onChange={(e) => setCityName2(e.target.value)}
              list="suggestion2"
            />
            {loading2 && <Icon className="absolute right-5 top-2" icon="line-md:loading-loop" width="24" height="24" />}
           </div>
           {error2 && <Error message={error2}/>}

            <datalist id="suggestion2">
              {cities2?.map((item: { label: string }, index) => (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              ))}
            </datalist>
          </div>
    </form>
  );
}
