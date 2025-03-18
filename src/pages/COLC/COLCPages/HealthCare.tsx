import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getColorForIndex, getIndex, getRating, months } from "../colc.utils";
import { toast } from "react-toastify";

export interface THealthCareDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: THealthCareData;
}

export interface THealthCareData {
  skill_and_competency: number;
  cost: number;
  responsiveness_waitings: number;
  index_healthcare: number;
  speed: number;
  accuracy_and_completeness: number;
  friendliness_and_courtesy: number;
  insurance_type: TInsuranceType;
  modern_equipment: number;
  name: string;
  monthLastUpdate: number;
  location: number;
  contributors: number;
  yearLastUpdate: number;
  city_id: number;
}

export interface TInsuranceType {
  "Employer Sponsored": number;
  Private: number;
  Public: number;
  None: number;
}

export default function HealthCare() {
  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];

  const [healthCareData, setHealthCareData] = useState<THealthCareDataResponse>(
    {} as THealthCareDataResponse
  );

  const loadHealthCareData = async () => {
    try {
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/city-healthcare?country=${country}&city=${city}`
      );
      const data: THealthCareDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setHealthCareData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };

  useEffect(() => {
    loadHealthCareData();
  }, []);

  const {
    skill_and_competency,
    cost,
    responsiveness_waitings,
    index_healthcare,
    speed,
    accuracy_and_completeness,
    friendliness_and_courtesy,
    modern_equipment,
    name,
    monthLastUpdate,
    location,
    contributors,
    yearLastUpdate,
  } = healthCareData?.data || {};

  return (
    <main className="md:m-10 m-3">
      <h3 className="md:text-[1.5rem] font-semibold mb-[2rem]">
        Health Care in {name}
      </h3>

      <div className="mb-[1rem]">
        <Link to="/cost-of-living-calculator">
          <button className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md">
            Go Back
          </button>
        </Link>
      </div>

      <section className="border-[1px] border-gray-300 p-3 mb-[3rem] mt-[1rem] rounded-lg inline-block md:w-[300px]">
        <div className="font-bold mb-2 text-[1.3rem] flex justify-between items-center">
          <p>Index</p>
          <Link to="/cost-of-living-calculator/health-care">
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
            <span>Health Care System Index</span> :{" "}
            <span>{index_healthcare?.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <section className="mb-[0.5rem]">
        <h3 className="text-[1.3rem] mb-[1.5rem] font-semibold">
          Healthcare Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="table-auto md:max-w-[70%] w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">
                  Component of health care surveyed
                </th>
                <th colSpan={3} className="border p-2">
                  Satisfaction %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  Skill and competency of medical staff
                </td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(skill_and_competency)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">{getIndex(skill_and_competency)}</td>
                <td
                  style={{
                    color: getColorForIndex(getIndex(skill_and_competency)),
                  }}
                  className={`border p-2`}
                >
                  {getRating(getIndex(skill_and_competency))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">
                  Speed in completing examinations and reports
                </td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(speed)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">{getIndex(speed)}</td>
                <td
                  style={{
                    color: getColorForIndex(getIndex(speed)),
                  }}
                  className={`border p-2`}
                >
                  {getRating(getIndex(speed))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">
                  Equipment for modern diagnosis and treatment
                </td>
                <td className={`border p-2`}>
                  <Progress
                    percent={getIndex(modern_equipment)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">{getIndex(modern_equipment)}</td>
                <td
                  style={{
                    color: getColorForIndex(getIndex(modern_equipment)),
                  }}
                  className="border p-2"
                >
                  {getRating(getIndex(modern_equipment))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">
                  Accuracy and completeness in filling out reports
                </td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(accuracy_and_completeness)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">
                  {getIndex(accuracy_and_completeness)}
                </td>
                <td
                  style={{
                    color: getColorForIndex(
                      getIndex(accuracy_and_completeness)
                    ),
                  }}
                  className="border p-2"
                >
                  {getRating(getIndex(accuracy_and_completeness))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">
                  Friendliness and courtesy of the staff
                </td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(friendliness_and_courtesy)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">
                  {getIndex(friendliness_and_courtesy)}
                </td>
                <td
                  style={{
                    color: getColorForIndex(
                      getIndex(friendliness_and_courtesy)
                    ),
                  }}
                  className="border p-2"
                >
                  {getRating(getIndex(friendliness_and_courtesy))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">
                  Satisfaction with responsiveness (waitings) in medical
                  institutions
                </td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(responsiveness_waitings)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">
                  {getIndex(responsiveness_waitings)}
                </td>
                <td
                  style={{
                    color: getColorForIndex(getIndex(responsiveness_waitings)),
                  }}
                  className="border p-2"
                >
                  {getRating(getIndex(responsiveness_waitings))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">Satisfaction with cost to you</td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(cost)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">{getIndex(cost)}</td>
                <td
                  style={{
                    color: getColorForIndex(getIndex(cost)),
                  }}
                  className="border p-2"
                >
                  {getRating(getIndex(cost))}
                </td>
              </tr>

              <tr>
                <td className="border p-2">Convenience of location for you</td>
                <td className="border p-2">
                  <Progress
                    percent={getIndex(location)}
                    showInfo={false}
                    size={[150, 20]}
                    strokeColor="#4682b4"
                  />
                </td>
                <td className="border p-2">{getIndex(location)}</td>
                <td
                  style={{
                    color: getColorForIndex(getIndex(location)),
                  }}
                  className="border p-2"
                >
                  {getRating(getIndex(location))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-[0.3rem]">
        <p>Contributors: {contributors}</p>

        <p>
          Last update: {months[monthLastUpdate - 1]} {yearLastUpdate}
        </p>

        <p>
          These data are based on perceptions of visitors of this website in the
          past 0 years.
        </p>

        <p>
          If the value is 0, it means it is perceived as very low, and if the
          value is 100, it means it is perceived as very high.
        </p>
      </div>
    </main>
  );
}
