import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getColorForIndex, getIndex, getRating, months } from "../colc.utils";
import { toast } from "react-toastify";
import COLCProgressBar from "../COLCProgressBar";
import COLCLoading from "../COLCLoading";
import { baseUrl } from "../../../api/apiConstant";

export interface TCrimeDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: TCrimeData;
}

export interface TCrimeData {
  worried_attacked: number;
  level_of_crime: number;
  problem_property_crimes: number;
  safe_alone_night: number;
  worried_skin_ethnic_religion: number;
  index_safety: number;
  worried_car_stolen: number;
  worried_home_broken: number;
  worried_things_car_stolen: number;
  crime_increasing: number;
  problem_corruption_bribery: number;
  safe_alone_daylight: number;
  problem_drugs: number;
  name: string;
  worried_insulted: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  index_crime: number;
  problem_violent_crimes: number;
  city_id: number;
  worried_mugged_robbed: number;
}

export default function Crime() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];
  const [crimeData, setCrimeData] = useState<TCrimeDataResponse>(
    {} as TCrimeDataResponse
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadCrimeData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${baseUrl}/api/city-crime?country=${country}&city=${city}`
      );
      const data: TCrimeDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setCrimeData(data);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCrimeData();
  }, []);

  const {
    worried_attacked,
    level_of_crime,
    problem_property_crimes,
    safe_alone_night,
    worried_skin_ethnic_religion,
    index_safety,
    worried_car_stolen,
    worried_home_broken,
    worried_things_car_stolen,
    crime_increasing,
    problem_corruption_bribery,
    safe_alone_daylight,
    problem_drugs,
    name,
    worried_insulted,
    monthLastUpdate,
    contributors,
    yearLastUpdate,
    index_crime,
    problem_violent_crimes,
    worried_mugged_robbed,
  } = crimeData?.data || {};
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <COLCLoading />
      ) : (
        <main className="md:m-10 m-3">
          <h3 className="md:text-[1.5rem] font-semibold mb-[2rem]">
            Crime in {name}
          </h3>
          <div className="mb-[1rem]">
            <button
              onClick={handleBack}
              className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>
          <section className="border-[1px] border-gray-300 p-3 mb-[3rem] mt-[1rem] rounded-lg inline-block md:w-[300px] bg-[#FBFBF8]">
            <div className="font-bold mb-2 text-[1.3rem] flex justify-between items-center">
              <p>Index</p>
              <Link to="/cost-of-living-calculator/crime/crime-explanation">
                <p title="About these indices">
                  <Icon
                    className="text-green-500 cursor-pointer"
                    icon="rivet-icons:exclamation-mark-circle-solid"
                    width="18"
                    height="18"
                  />
                </p>
              </Link>
            </div>

            <div className="space-y-[0.5rem]">
              <div>
                <span>Crime Index</span> :{" "}
                <span>{index_crime?.toFixed(2)}</span>
              </div>
              <div>
                <span>Safety Index</span> :{" "}
                <span>{index_safety?.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <section className="space-y-[1rem] mb-[3rem]">
            <h3 className="md:text-[1.3rem] font-semibold">
              Crime rates in {name}
            </h3>

            <div className="overflow-x-auto">
              <table className="table-auto bg-[#FBFBF8] md:max-w-[70%] w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border p-2">Level of crime</td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(level_of_crime)} />
                    </td>
                    <td className="border p-2">{getIndex(level_of_crime)}</td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(level_of_crime)),
                      }}
                      className={`border p-2`}
                    >
                      {getRating(getIndex(level_of_crime))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Crime increasing in the past 5 years
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(crime_increasing)} />
                    </td>
                    <td className="border p-2">{getIndex(crime_increasing)}</td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(crime_increasing)),
                      }}
                      className={`border p-2`}
                    >
                      {getRating(getIndex(crime_increasing))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Worries home broken and things stolen
                    </td>
                    <td className={`border p-2`}>
                      <COLCProgressBar value={getIndex(worried_home_broken)} />
                    </td>
                    <td className="border p-2">
                      {getIndex(worried_home_broken)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(worried_home_broken)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_home_broken))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Worries being mugged or robbed
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar
                        value={getIndex(worried_mugged_robbed)}
                      />
                    </td>
                    <td className="border p-2">
                      {getIndex(worried_mugged_robbed)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(
                          getIndex(worried_mugged_robbed)
                        ),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_mugged_robbed))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">Worries car stolen</td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(worried_car_stolen)} />
                    </td>
                    <td className="border p-2">
                      {getIndex(worried_car_stolen)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(worried_car_stolen)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_car_stolen))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Worries things from car stolen
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar
                        value={getIndex(worried_things_car_stolen)}
                      />
                    </td>
                    <td className="border p-2">
                      {getIndex(worried_things_car_stolen)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(
                          getIndex(worried_things_car_stolen)
                        ),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_things_car_stolen))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">Worries attacked</td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(worried_attacked)} />
                    </td>
                    <td className="border p-2">{getIndex(worried_attacked)}</td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(worried_attacked)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_attacked))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">Worries being insulted</td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(worried_insulted)} />
                    </td>
                    <td className="border p-2">{getIndex(worried_insulted)}</td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(worried_insulted)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_insulted))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Worries being subject to a physical attack because of your
                      skin color, ethnic origin, gender, or religion
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar
                        value={getIndex(worried_skin_ethnic_religion)}
                      />
                    </td>
                    <td className="border p-2">
                      {getIndex(worried_skin_ethnic_religion)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(
                          getIndex(worried_skin_ethnic_religion)
                        ),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(worried_skin_ethnic_religion))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Problem people using or dealing drugs
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(problem_drugs)} />
                    </td>
                    <td className="border p-2">{getIndex(problem_drugs)}</td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(problem_drugs)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(problem_drugs))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Problem property crimes such as vandalism and theft
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar
                        value={getIndex(problem_property_crimes)}
                      />
                    </td>
                    <td className="border p-2">
                      {getIndex(problem_property_crimes)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(
                          getIndex(problem_property_crimes)
                        ),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(problem_property_crimes))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Problem violent crimes such as assault and armed robbery
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar
                        value={getIndex(problem_violent_crimes)}
                      />
                    </td>
                    <td className="border p-2">
                      {getIndex(problem_violent_crimes)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(
                          getIndex(problem_violent_crimes)
                        ),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(problem_violent_crimes))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Problem corruption and bribery
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar
                        value={getIndex(problem_corruption_bribery)}
                      />
                    </td>
                    <td className="border p-2">
                      {getIndex(problem_corruption_bribery)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(
                          getIndex(problem_corruption_bribery)
                        ),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(problem_corruption_bribery))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-[1rem]">
            <h3 className="md:text-[1.3rem] font-semibold">Safety in {name}</h3>

            <div className="overflow-x-auto">
              <table className="table-auto bg-[#FBFBF8] md:max-w-[70%] w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border p-2">
                      Safety walking alone during daylight
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(safe_alone_daylight)} />
                    </td>
                    <td className="border p-2">
                      {getIndex(safe_alone_daylight)}
                    </td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(safe_alone_daylight)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(safe_alone_daylight))}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      Safety walking alone during night
                    </td>
                    <td className="border p-2">
                      <COLCProgressBar value={getIndex(safe_alone_night)} />
                    </td>
                    <td className="border p-2">{getIndex(safe_alone_night)}</td>
                    <td
                      style={{
                        color: getColorForIndex(getIndex(safe_alone_night)),
                      }}
                      className="border p-2"
                    >
                      {getRating(getIndex(safe_alone_night))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-[0.5rem] space-y-[0.3rem]">
            <p>Contributors: {contributors}</p>

            <p>
              Last update: {months[monthLastUpdate - 1]} {yearLastUpdate}
            </p>

            <p>
              These data are based on perceptions of visitors of this website in
              the past 0 years.
            </p>

            <p>
              If the value is 0, it means it is perceived as very low, and if
              the value is 100, it means it is perceived as very high.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
