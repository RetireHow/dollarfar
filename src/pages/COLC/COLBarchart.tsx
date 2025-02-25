import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { isNegative } from "../../utils/isNegative";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const COLBarChart = () => {
  const {
    income,
    selectedCityName1,
    selectedCityName2,
    city1SubTotalCost,
    city2SubTotalCost,
    subTotalIndex,
    fromCityCurrencySymbol,
  } = useAppSelector((state) => state.COLCalculator);
  // Data for the chart
  const data: ChartData<"bar", number[], string> = {
    labels: income
      ? ["Income", selectedCityName1, selectedCityName2]
      : [selectedCityName1, selectedCityName2],
    datasets: [
      {
        // label: 'Financial Overview',
        data: income
          ? [income, city1SubTotalCost, city2SubTotalCost]
          : [city1SubTotalCost, city2SubTotalCost], // Values for Assets, Liabilities, Net Worth
        backgroundColor: [
          "#4CAF50", // Green for Assets
          "#F44336", // Red for Liabilities
          "#1E88E5", // Blue for Net Worth
        ],
      },
    ],
  };

  // Define the options type
  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // This makes the chart horizontal
    elements: {
      bar: {
        borderWidth: 2,
        // Remove barThickness as it's not valid, use maxBarThickness in datasets instead
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback: function (value: number | string) {
            return `${fromCityCurrencySymbol}${numberWithCommas(
              value as number
            )}`; // Format the ticks with a dollar sign
          },
        },
        grid: {
          display: false, // Optional: Hide grid lines
        },
      },
      y: {
        grid: {
          display: false, // Optional: Hide grid lines
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom", // Position legend at the bottom
        align: "center", // Center the legend
        display: false,
      },
      title: {
        display: false,
        text: "Financial Overview Chart",
      },
    },
  };

  return (
    <section>
      <div className="col-span-2 flex md:flex-row flex-col justify-center md:items-center gap-5 mt-[3.5rem]">
        <div
          id="COLC-Chart"
          className="md:max-h-[300px] bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 p-[1rem] shadow-lg"
        >
          <div className="overflow-x-auto">
            <div className="lg:min-w-[600px] md:min-w-[500px] min-w-[400px]">
              <Bar
                className="!w-full mb-8 !h-[260px]"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>

        <div className="md:text-[1rem] text-[14px] md:mt-3 mt-0 font-semibold space-y-[1rem]">
          {income ? (
            <div className="flex items-center md:gap-3 gap-1">
              <p className="bg-[#4CAF50] w-[30px] h-[10px] rounded-[10px]"></p>
              <p>
                <span className="mr-2">Income</span>({fromCityCurrencySymbol}
                {numberWithCommas(income)})
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center md:gap-3 gap-1">
            <p className="bg-[#F44336] w-[30px] h-[10px] rounded-[10px]"></p>
            <p>
              <span className="mr-2">{selectedCityName1}</span>(
              {fromCityCurrencySymbol}
              {numberWithCommas(Number(city1SubTotalCost?.toFixed(2)))})
            </p>
          </div>
          <div className="flex items-center md:gap-3 gap-1">
            <p className="bg-[#1E88E5] w-[30px] h-[10px] rounded-[10px]"></p>
            <p>
              <span className="mr-2">{selectedCityName2}</span>(
              {fromCityCurrencySymbol}
              {numberWithCommas(Number(city2SubTotalCost?.toFixed(2)))})
            </p>
          </div>
        </div>
      </div>
      <p className="text-center mt-5 md:text-[18px] text-[16px] font-semibold">
        Living in {selectedCityName2} is approximately{" "}
        <span
          className={`font-bold ${
            isNegative(subTotalIndex) ? "text-[#4CAF50]" : "text-red-500"
          }`}
        >
          {isNegative(subTotalIndex)
            ? `${subTotalIndex?.toFixed(2)}`
            : `+${subTotalIndex?.toFixed(2)}`}
          %
        </span>{" "}
        {isNegative(subTotalIndex) ? "cheaper" : "more expensive"} than living
        in {selectedCityName1}.
      </p>
    </section>
  );
};
