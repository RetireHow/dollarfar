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

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const NWBarChart = () => {
  const { totalAssets, totalLiabilities, netWorth } = useAppSelector(
    (state) => state.NWCalculator
  );
  // Data for the chart
  const data: ChartData<"bar", number[], string> = {
    labels: ["Assets", "Liabilities", "Net Worth"],
    datasets: [
      {
        // label: 'Financial Overview',
        data: [totalAssets, totalLiabilities, netWorth], // Values for Assets, Liabilities, Net Worth
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
            return `${numberWithCommas(value as number)}`; // Format the ticks with a dollar sign
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
    <div className="col-span-2">
      <div
        id="NWC-Chart"
        style={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.05)" }}
        className="md:max-h-[300px] bg-[#F8F8F8] dark:bg-darkModeBgColor rounded-lg border-[1px] border-gray-300 shadow-md p-[1rem]"
      >
        <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <Bar className="!w-full mb-8 !h-[260px]" data={data} options={options} />
        </div>
        </div>
      </div>

      <div className="md:text-[1rem] text-[14px] md:mt-3 mt-2 flex items-center flex-wrap md:gap-x-10 gap-x-3 my-5 md:gap-y-[1rem] gap-y-[0.5rem] font-semibold">
        <div className="flex items-center md:gap-3 gap-1">
          <p className="bg-[#4CAF50] w-[30px] h-[10px] rounded-[10px]"></p>
          <p>Assets</p>
        </div>
        <div className="flex items-center md:gap-3 gap-1">
          <p className="bg-[#F44336] w-[30px] h-[10px] rounded-[10px]"></p>
          <p>Liabilities</p>
        </div>
        <div className="flex items-center md:gap-3 gap-1">
          <p className="bg-[#1E88E5] w-[30px] h-[10px] rounded-[10px]"></p>
          <p>Net Worth</p>
        </div>
        <div className="flex items-center md:gap-3 gap-1">
          <p className=""></p>
        </div>
      </div>
    </div>
  );
};
