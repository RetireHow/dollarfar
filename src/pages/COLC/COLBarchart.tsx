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
  } = useAppSelector((state) => state.COLCalculator);
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );
  // Data for the chart
  const data: ChartData<"bar", number[], string> = {
    labels: ["Income", selectedCityName1, selectedCityName2],
    datasets: [
      {
        // label: 'Financial Overview',
        data: [income, city1SubTotalCost, city2SubTotalCost], // Values for Assets, Liabilities, Net Worth
        backgroundColor: [
          "#4CAF50", // Green for Assets
          "#F44336", // Red for Liabilities
          "#1E88E5", // Blue for Net Worth
        ],
      },
    ],
  };

  // Options to make the bar chart horizontal and position legend
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
            return `${currency}${numberWithCommas(value as number)}`; // Format the ticks with a dollar sign
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
          id="NWC-Chart"
          style={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.05)" }}
          className="md:max-h-[300px] bg-white shadow-md rounded-lg border-[1px] border-gray-200 p-[1rem]"
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
          <div className="flex items-center md:gap-3 gap-1">
            <p className="bg-[#4CAF50] w-[30px] h-[10px] rounded-[10px]"></p>
            <p>Income</p>
          </div>
          <div className="flex items-center md:gap-3 gap-1">
            <p className="bg-[#F44336] w-[30px] h-[10px] rounded-[10px]"></p>
            <p>{selectedCityName1}</p>
          </div>
          <div className="flex items-center md:gap-3 gap-1">
            <p className="bg-[#1E88E5] w-[30px] h-[10px] rounded-[10px]"></p>
            <p>{selectedCityName2}</p>
          </div>
          <div className="flex items-center md:gap-3 gap-1">
            <p className="">{currency}</p>
            <p>{currencyFullName}</p>
          </div>
        </div>
      </div>
      <p className="text-center mt-5 md:text-[18px] text-[16px] font-semibold">
        Living in {selectedCityName2} is approximately{" "}
        <span className="text-[#4CAF50] font-bold">
          {isNegative(subTotalIndex) ? `${subTotalIndex}` : `+${subTotalIndex}`}
          %
        </span>{" "}
        {isNegative(subTotalIndex) ? "cheaper" : "more expensive"} than living
        in {selectedCityName1}.
      </p>
    </section>
  );
};