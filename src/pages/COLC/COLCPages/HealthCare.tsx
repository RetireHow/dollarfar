import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getColorForIndex, getIndex, getRating, months } from "../colc.utils";
import { toast } from "react-toastify";
import COLCProgressBar from "../COLCProgressBar";
import { baseUrl } from "../../../api/apiConstant";
import { useAppSelector } from "../../../redux/hooks";
import HealthcareSkeleton from "../SkeletonLoaders/HealthcareSkeletonLoader";

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

function HealthCareDynamicComponent({
  city,
}: {
  city: string;
}) {
  const [healthCareData, setHealthCareData] = useState<THealthCareDataResponse>(
    {} as THealthCareDataResponse
  );
  const [isLoading, setIsLoading] = useState(false);
  const loadHealthCareData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${baseUrl}/numbeo/city-healthcare?&city=${city}`
      );
      const data: THealthCareDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setHealthCareData(data);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
      setIsLoading(false);
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

  // Decide what to render
  if (isLoading) {
    return <HealthcareSkeleton />;
  }

  return (
    <div>
      <div className="border-[1px] border-gray-300 p-3 mb-[3rem] mt-[1rem] rounded-lg bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor">
        <div className="font-bold mb-2 text-[1.3rem] flex justify-between items-center">
          <p>{name}</p>
          <Link to="/cost-of-living-calculator/health-care/healthcare-explanation">
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
      </div>

      <div className="mb-[0.5rem]">
        <h3 className="text-[1.3rem] mb-[1.5rem] font-semibold dark:text-darkModeHeadingTextColor">
          Healthcare Overview : {name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor border-collapse">
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
                  <COLCProgressBar value={getIndex(skill_and_competency)} />
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
                  <COLCProgressBar value={getIndex(speed)} />
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
                  <COLCProgressBar value={getIndex(modern_equipment)} />
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
                  <COLCProgressBar
                    value={getIndex(accuracy_and_completeness)}
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
                  <COLCProgressBar
                    value={getIndex(friendliness_and_courtesy)}
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
                  <COLCProgressBar value={getIndex(responsiveness_waitings)} />
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
                  <COLCProgressBar value={getIndex(cost)} />
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
                  <COLCProgressBar value={getIndex(location)} />
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
      </div>

      <div className="space-y-[0.3rem] dark:text-darkModeNormalTextColor">
        <p>Contributors: {contributors}</p>

        <p>
          Last update: {months[monthLastUpdate - 1]} {yearLastUpdate}
        </p>

        <p>
          These data are based on perceptions of visitors of this website in the
          past 5 years.
        </p>

        <p>
          If the value is 0, it means it is perceived as very low, and if the
          value is 100, it means it is perceived as very high.
        </p>
      </div>
    </div>
  );
}

export default function HealthCare() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { selectedCityName2, selectedCityName1 } = useAppSelector(
    (state) => state.COLCalculator
  );

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="md:m-10 m-3">
      <h3 className="md:text-[1.5rem] font-semibold mb-[2rem] dark:text-darkModeHeadingTextColor">
        Health Care comparasion between {selectedCityName2} and{" "}
        {selectedCityName1}
      </h3>

      <div className="mb-[1rem] dark:text-darkModeHeadingTextColor">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>

      <section className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <HealthCareDynamicComponent
          city={selectedCityName2}
        />
        <HealthCareDynamicComponent
          city={selectedCityName1}
        />
      </section>
    </main>
  );
}
