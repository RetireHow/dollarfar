import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TrafficPieChart from "./TrafficPieChart";
import COLCProgressBar from "../COLCProgressBar";
import COLCLoading from "../COLCLoading";

export interface TTrafficDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: Data;
}

export interface Data {
  "analyze using Train/Metro": AnalyzeUsingTrainMetro;
  overall_average_analyze: OverallAverageAnalyze;
  "analyze using Bus/Trolleybus": AnalyzeUsingBusTrolleybus;
  index_co2_emission: number;
  "analyze using Car": AnalyzeUsingCar;
  primary_means_percentage_map: PrimaryMeansPercentageMap;
  index_time_exp: number;
  "analyze using Bicycle": AnalyzeUsingBicycle;
  "analyze using Motorcycle": AnalyzeUsingMotorcycle;
  index_time: number;
  index_traffic: number;
  name: string;
  index_inefficiency: number;
  "analyze using Walking": AnalyzeUsingWalking;
  contributors: number;
  city_id: number;
}

export interface AnalyzeUsingTrainMetro {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}

export interface OverallAverageAnalyze {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}

export interface AnalyzeUsingBusTrolleybus {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}

export interface AnalyzeUsingCar {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}

export interface PrimaryMeansPercentageMap {
  Walking: number;
  Motorcycle: number;
  "Tram/Streetcar": number;
  "Train/Metro": number;
  Car: number;
  "Bus/Trolleybus": number;
  "Working from Home": number;
  Bicycle: number;
}

export interface AnalyzeUsingBicycle {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}
export interface AnalyzeUsingMotorcycle {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}

export interface AnalyzeUsingWalking {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
}

type TTrafficTableData = {
  time_waiting: number;
  time_driving: number;
  time_tram: number;
  time_other: number;
  distance: number;
  time_bike: number;
  time_train: number;
  time_motorbike: number;
  time_walking: number;
  count: number;
  time_bus: number;
};

const TrafficTable = ({
  data,
  title,
}: {
  data: TTrafficTableData;
  title: string;
}) => {
  const {
    time_waiting,
    time_driving,
    time_tram,
    time_other,
    distance,
    time_bike,
    time_train,
    time_motorbike,
    time_walking,
    time_bus,
  } = data || {};
  const test = [
    time_waiting,
    time_driving,
    time_tram,
    time_other,
    distance,
    time_bike,
    time_train,
    time_motorbike,
    time_walking,
    time_bus,
  ];
  const isAllZero = test?.some((item) => item > 0);

  return (
    <>
      {isAllZero ? (
        <section className="space-y-[1rem] mt-[3rem]">
          <h3 className="md:text-[1.3rem] font-semibold">{title}</h3>
          <div className="overflow-x-auto">
            <table className="table-auto md:max-w-[50%] bg-[#FBFBF8] w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-2">Distance</td>
                  <td className="border p-2 min-w-[50px]">
                    <COLCProgressBar value={distance} />
                  </td>
                  <td className="border p-2">
                    {distance?.toFixed(2)}
                    <span className="ml-1">km</span>
                  </td>
                </tr>

                {time_walking ? (
                  <tr>
                    <td className="border p-2">Walking</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_walking} />
                    </td>
                    <td className="border p-2">
                      {time_walking?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_waiting ? (
                  <tr>
                    <td className="border p-2">Waiting</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_waiting} />
                    </td>
                    <td className="border p-2">
                      {time_waiting?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_driving ? (
                  <tr>
                    <td className="border p-2">Driving Car</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_driving} />
                    </td>
                    <td className="border p-2">
                      {time_driving?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_bike ? (
                  <tr>
                    <td className="border p-2">Bicycle</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_bike} />
                    </td>
                    <td className="border p-2">
                      {time_bike?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_motorbike ? (
                  <tr>
                    <td className="border p-2">Motorcycle</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_motorbike} />
                    </td>
                    <td className="border p-2">
                      {time_motorbike?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_tram ? (
                  <tr>
                    <td className="border p-2">Tram</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_tram} />
                    </td>
                    <td className="border p-2">
                      {time_tram?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_bus ? (
                  <tr>
                    <td className="border p-2">Bus/Trolleybus Ride</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_bus} />
                    </td>
                    <td className="border p-2">
                      {time_bus?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_train ? (
                  <tr>
                    <td className="border p-2">Train/Metro Ride</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_train} />
                    </td>
                    <td className="border p-2">
                      {time_train?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {time_other ? (
                  <tr>
                    <td className="border p-2">Other</td>
                    <td className="border p-2">
                      <COLCProgressBar value={time_other} />
                    </td>
                    <td className="border p-2">
                      {time_other?.toFixed(2)}
                      <span className="ml-1">min</span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                <tr>
                  <td className="border p-2 font-semibold">Overall</td>
                  <td className="border p-2">
                    <COLCProgressBar
                      value={
                        time_walking +
                        time_waiting +
                        time_driving +
                        time_bike +
                        time_motorbike +
                        time_tram +
                        time_bus +
                        time_train +
                        time_other
                      }
                    />
                  </td>
                  <td className="border p-2">
                    {(
                      time_walking +
                      time_waiting +
                      time_driving +
                      time_bike +
                      time_motorbike +
                      time_tram +
                      time_bus +
                      time_train +
                      time_other
                    ).toFixed(2)}
                    <span className="ml-1">min</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default function Traffic() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];
  const [trafficData, setTrafficData] = useState<TTrafficDataResponse>(
    {} as TTrafficDataResponse
  );

  const [isLoading, setIsLoading] = useState(false);

  const loadCrimeData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/city-traffic?country=${country}&city=${city}`
      );
      const data: TTrafficDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setTrafficData(data);
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
    "analyze using Train/Metro": trainMetro,
    overall_average_analyze,
    "analyze using Bus/Trolleybus": busTrolleybus,
    index_co2_emission,
    "analyze using Car": car,
    primary_means_percentage_map,
    index_time_exp,
    "analyze using Bicycle": bicycle,
    "analyze using Motorcycle": motorcycle,
    index_time,
    index_traffic,
    name,
    index_inefficiency,
    "analyze using Walking": walking,
    contributors,
  } = trafficData.data || {};

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
            Traffic in {name}
          </h3>
          <div className="mb-[1rem]">
            <button
              onClick={handleBack}
              className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>

          <div className="border-[1px] border-gray-300 rounded-lg p-3 bg-[#FBFBF8]">
            In this city, we estimate that each passenger produces approximately{" "}
            <span className="font-semibold">
              {((240 * index_co2_emission) / 1000)?.toFixed(2)}kg
            </span>{" "}
            of CO2 annually as a result of commuting to work or school. To
            counterbalance this carbon emission, it would require approximately{" "}
            <span className="font-semibold">
              {((240 * index_co2_emission) / 1000 / 21.77)?.toFixed(2)} trees
            </span>{" "}
            per passenger to produce enough oxygen.{" "}
            <Link
              to="/cost-of-living-calculator/traffic/traffic-index-explanation"
              className="text-blue-600 hover:underline"
            >
              The following formulas are used to make these estimations.
            </Link>
          </div>

          <TrafficPieChart transportation={primary_means_percentage_map} />

          <section className="border-[1px] bg-[#FBFBF8] border-gray-300 p-3 mb-[3rem] mt-[1rem] rounded-lg inline-block md:w-[400px] w-full">
            <div className="font-bold mb-2 text-[1.3rem] flex justify-between items-center">
              <p>Index</p>
              <Link to="/cost-of-living-calculator/traffic/traffic-index-explanation">
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
                <span className="flex-1">Traffic Index:</span>{" "}
                <span>{index_traffic?.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">Time Index (in minutes):</span>{" "}
                <span>{index_time?.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">Time Exp. Index:</span>{" "}
                <span>{index_time_exp?.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">Inefficiency Index:</span>{" "}
                <span>{index_inefficiency?.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">CO2 Emission Index:</span>{" "}
                <span>{index_co2_emission?.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <section className="space-y-[1rem] mb-[3rem]">
            <h3 className="md:text-[1.3rem] font-semibold">
              Main Means of Transportation to Work or School
            </h3>

            <div className="overflow-x-auto">
              <table className="table-auto md:max-w-[50%] bg-[#FBFBF8] w-full border-collapse">
                <tbody>
                  {primary_means_percentage_map?.["Working from Home"] ? (
                    <tr>
                      <td className="border p-2">Working from Home</td>
                      <td className="border p-2 min-w-[50px]">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.[
                              "Working from Home"
                            ]?.toFixed(2)
                          )}
                          showInfo={false}
                          strokeColor="#4682b4"
                          strokeLinecap="butt"
                          size={{ height: 20 }}
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.[
                          "Working from Home"
                        ]?.toFixed(2)}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.Walking ? (
                    <tr>
                      <td className="border p-2">Walking</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.Walking?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.Walking?.toFixed(2)}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.Car ? (
                    <tr>
                      <td className="border p-2">Car</td>
                      <td className={`border p-2`}>
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.Car?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.Car?.toFixed(2)}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.Bicycle ? (
                    <tr>
                      <td className="border p-2">Bicycle</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.Bicycle?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.Bicycle?.toFixed(2)}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.Motorcycle ? (
                    <tr>
                      <td className="border p-2">Motorcycle</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.Motorcycle?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.Motorcycle?.toFixed(2)}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.["Bus/Trolleybus"] ? (
                    <tr>
                      <td className="border p-2">Bus/Trolleybus</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.[
                              "Bus/Trolleybus"
                            ]?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.[
                          "Bus/Trolleybus"
                        ]?.toFixed(2)}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.["Train/Metro"] ? (
                    <tr>
                      <td className="border p-2">Tram/Streetcar</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.[
                              "Train/Metro"
                            ]?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.["Train/Metro"]?.toFixed(
                          2
                        )}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {primary_means_percentage_map?.["Train/Metro"] ? (
                    <tr>
                      <td className="border p-2">Train/Metro</td>
                      <td className="border p-2">
                        <Progress
                          percent={Number(
                            primary_means_percentage_map?.[
                              "Train/Metro"
                            ]?.toFixed(2)
                          )}
                          showInfo={false}
                          size={{ height: 20 }}
                          strokeLinecap="butt"
                          strokeColor="#4682b4"
                        />
                      </td>
                      <td className="border p-2">
                        {primary_means_percentage_map?.["Train/Metro"]?.toFixed(
                          2
                        )}
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <TrafficTable
            data={walking}
            title="Average when primarily using Walking"
          />
          <TrafficTable data={car} title="Average when primarily using Car" />
          <TrafficTable
            data={bicycle}
            title="Average when primarily using Bicycle"
          />
          <TrafficTable
            data={motorcycle}
            title="Average when primarily using Motorcycle"
          />
          <TrafficTable
            data={busTrolleybus}
            title="Average when primarily using Bus/Trolleybus"
          />
          <TrafficTable
            data={trainMetro}
            title=" Average when primarily using Train/Metro"
          />
          <TrafficTable
            data={overall_average_analyze}
            title="Overall Average Travel Time and Distance to Work (School)"
          />

          <div className="mt-[0.5rem] space-y-[0.3rem]">
            <p>Contributors: {contributors}</p>
            <p>
              These data are based on perceptions of visitors of this website in
              the past 5 years.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
