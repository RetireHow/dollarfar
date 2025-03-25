import { useNavigate, useParams } from "react-router-dom";

// Helper function to calculate indices
function calculateIndex(surveyValue: number, isInverted: boolean = true) {
  if (isInverted) {
    return (2 - surveyValue) * 25; // Inverted formula
  } else {
    return (surveyValue + 2) * 25; // Standard formula
  }
}

import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getColorForIndex, getRating, months } from "../colc.utils";
import COLCLoading from "../COLCLoading";

export interface PollutionResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: Data;
}

export interface Data {
  green_and_parks_quality: number;
  comfortable_to_spend_time: number;
  pm10: number;
  "pm2.5": number;
  air_quality: number;
  garbage_disposal_satisfaction: number;
  index_pollution: number;
  drinking_water_quality_accessibility: number;
  name: string;
  monthLastUpdate: number;
  clean_and_tidy: number;
  noise_and_light_pollution: number;
  contributors: number;
  yearLastUpdate: number;
  water_pollution: number;
  city_id: number;
}

export default function Pollution() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];
  const [pollutionData, setPollutionData] = useState<PollutionResponse>(
    {} as PollutionResponse
  );

  const [isLoading, setIsLoading] = useState(false);

  const loadPollutionData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/city-pollution?country=${country}&city=${city}`
      );
      const data: PollutionResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setPollutionData(data);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPollutionData();
  }, []);

  const {
    green_and_parks_quality,
    comfortable_to_spend_time,
    pm10,
    air_quality,
    garbage_disposal_satisfaction,
    index_pollution,
    drinking_water_quality_accessibility,
    name,
    monthLastUpdate,
    clean_and_tidy,
    noise_and_light_pollution,
    contributors,
    yearLastUpdate,
    water_pollution,
  } = pollutionData.data || {};

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
            Pollution in {name}
          </h3>
          <div className="mb-[1rem]">
            <button
              onClick={handleBack}
              className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>

          <section>
            <section className="border-[1px] bg-[#FBFBF8] border-gray-300 p-3 mb-[1rem] mt-[1rem] rounded-lg inline-block md:w-[500px] w-full">
              <div className="font-bold mb-2 text-[1rem]">
                <p>Air pollution data from World Health Organization</p>
              </div>

              <div className="space-y-[0.5rem]">
                <div className="flex items-center">
                  <span className="flex-1">PM10:</span>{" "}
                  <span>{pm10?.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1">PM2.5:</span>{" "}
                  <span>{pollutionData?.data?.["pm2.5"]?.toFixed(2)}</span>
                </div>
              </div>
            </section>
          </section>

          <section className="border-[1px] bg-[#FBFBF8] border-gray-300 p-3 mb-[1rem] mt-[1rem] rounded-lg inline-block md:w-[400px] w-full">
            <div className="font-bold mb-2 text-[1rem] flex justify-between items-center">
              <p>Index</p>
              <Link to="/cost-of-living-calculator/pollution/pollution-indices-explanation">
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
              <div className="flex items-center">
                <span className="flex-1">Pollution Index:</span>{" "}
                <span>{index_pollution?.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <section className="space-y-[1rem] mt-[3rem]">
            <h3 className="md:text-[1.3rem] font-semibold">
              Pollution in {name}
            </h3>
            <div className="overflow-x-auto">
              <table className="table-auto md:max-w-[50%] w-full border-collapse bg-[#FBFBF8]">
                <tbody>
                  {air_quality ? (
                    <tr>
                      <td className="border p-2">Air Pollution</td>
                      <td className="border p-2 min-w-[50px]">
                        <Progress
                          percent={Number(
                            calculateIndex(air_quality)?.toFixed(2)
                          )}
                          showInfo={false}
                          strokeColor="#4682b4"
                          strokeLinecap="butt"
                          size={{ height: 20 }}
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(air_quality)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(calculateIndex(air_quality)),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(air_quality))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {drinking_water_quality_accessibility ? (
                    <tr>
                      <td className="border p-2">
                        Drinking Water Pollution and Inaccessibility
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              drinking_water_quality_accessibility
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(
                          drinking_water_quality_accessibility
                        )?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(drinking_water_quality_accessibility)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(
                          calculateIndex(drinking_water_quality_accessibility)
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {garbage_disposal_satisfaction ? (
                    <tr>
                      <td className="border p-2">
                        Dissatisfaction with Garbage Disposal
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              garbage_disposal_satisfaction
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(garbage_disposal_satisfaction)?.toFixed(
                          2
                        )}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(garbage_disposal_satisfaction)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(
                          calculateIndex(garbage_disposal_satisfaction)
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {clean_and_tidy ? (
                    <tr>
                      <td className="border p-2">Dirty and Untidy</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(clean_and_tidy)?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(clean_and_tidy)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(clean_and_tidy)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(clean_and_tidy))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {noise_and_light_pollution ? (
                    <tr>
                      <td className="border p-2">Noise and Light Pollution</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              noise_and_light_pollution,
                              false
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(
                          noise_and_light_pollution,
                          false
                        )?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(noise_and_light_pollution)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(noise_and_light_pollution))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {water_pollution ? (
                    <tr>
                      <td className="border p-2">Water Pollution</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(water_pollution, false)?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(water_pollution, false)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(water_pollution, false)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(water_pollution, false))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {comfortable_to_spend_time ? (
                    <tr>
                      <td className="border p-2">
                        Dissatisfaction with Spending Time in the City
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(comfortable_to_spend_time)?.toFixed(
                              2
                            )
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(comfortable_to_spend_time)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(comfortable_to_spend_time)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(comfortable_to_spend_time))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {green_and_parks_quality ? (
                    <tr>
                      <td className="border p-2">
                        Dissatisfaction with Green and Parks in the City
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(green_and_parks_quality)?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(green_and_parks_quality)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(green_and_parks_quality)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(green_and_parks_quality))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-[1rem] mt-[3rem]">
            <h3 className="md:text-[1.3rem] font-semibold">
              Purity and Cleanliness in {name}
            </h3>
            <div className="overflow-x-auto">
              <table className="table-auto md:max-w-[50%] w-full border-collapse bg-[#FBFBF8]">
                <tbody>
                  {air_quality ? (
                    <tr>
                      <td className="border p-2">Air quality</td>
                      <td className="border p-2 min-w-[50px]">
                        <Progress
                          percent={Number(
                            calculateIndex(air_quality, false)?.toFixed(2)
                          )}
                          showInfo={false}
                          strokeColor="#4682b4"
                          strokeLinecap="butt"
                          size={{ height: 20 }}
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(air_quality, false)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(air_quality, false)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(air_quality, false))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {drinking_water_quality_accessibility ? (
                    <tr>
                      <td className="border p-2">
                        Drinking Water Quality and Accessibility
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              drinking_water_quality_accessibility,
                              false
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(
                          drinking_water_quality_accessibility,
                          false
                        )?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(
                              drinking_water_quality_accessibility,
                              false
                            )
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(
                          calculateIndex(
                            drinking_water_quality_accessibility,
                            false
                          )
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {garbage_disposal_satisfaction ? (
                    <tr>
                      <td className="border p-2">
                        Garbage Disposal Satisfaction
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              garbage_disposal_satisfaction,
                              false
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(
                          garbage_disposal_satisfaction,
                          false
                        )?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(garbage_disposal_satisfaction, false)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(
                          calculateIndex(garbage_disposal_satisfaction, false)
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {clean_and_tidy ? (
                    <tr>
                      <td className="border p-2">Clean and Tidy</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(clean_and_tidy, false)?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(clean_and_tidy, false)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(clean_and_tidy, false)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(clean_and_tidy, false))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {noise_and_light_pollution ? (
                    <tr>
                      <td className="border p-2">
                        Quiet and No Problem with Night Lights
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(noise_and_light_pollution)?.toFixed(
                              2
                            )
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(noise_and_light_pollution)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(noise_and_light_pollution)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(noise_and_light_pollution))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {water_pollution ? (
                    <tr>
                      <td className="border p-2">Water Quality</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(water_pollution)?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(water_pollution)?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(water_pollution)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(calculateIndex(water_pollution))}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {comfortable_to_spend_time ? (
                    <tr>
                      <td className="border p-2">
                        Comfortable to Spend Time in the City
                      </td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              comfortable_to_spend_time,
                              false
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(
                          comfortable_to_spend_time,
                          false
                        )?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(comfortable_to_spend_time, false)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(
                          calculateIndex(comfortable_to_spend_time, false)
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {green_and_parks_quality ? (
                    <tr>
                      <td className="border p-2">Quality of Green and Parks</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            calculateIndex(
                              green_and_parks_quality,
                              false
                            )?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {calculateIndex(
                          green_and_parks_quality,
                          false
                        )?.toFixed(2)}
                      </td>
                      <td
                        style={{
                          color: getColorForIndex(
                            calculateIndex(green_and_parks_quality, false)
                          ),
                        }}
                        className="border p-2"
                      >
                        {getRating(
                          calculateIndex(green_and_parks_quality, false)
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
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
              the past 5 years.
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
