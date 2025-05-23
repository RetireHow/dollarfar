/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PrimaryMeansPercentageMap {
  Walking: number;
  Motorcycle: number;
  "Tram/Streetcar": number;
  "Train/Metro": number;
  Car: number;
  "Bus/Trolleybus": number;
  "Working from Home": number;
  Bicycle: number;
}

// Define the type for the function props
interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Sample data for the chart

const TrafficPieChart = ({
  transportation,
}: {
  transportation: PrimaryMeansPercentageMap;
}) => {
  const {
    "Bus/Trolleybus": bus,
    "Train/Metro": train,
    "Tram/Streetcar": tram,
    "Working from Home": home,
    Bicycle,
    Car,
    Motorcycle,
    Walking,
  } = transportation || {};

  const data = [
    { name: "Bicycle", value: Number(Bicycle?.toFixed(1)), color: "#4CAF50" },
    { name: "Walking", value: Number(Walking?.toFixed(1)), color: "#FFC107" },
    {
      name: "Motorcycle",
      value: Number(Motorcycle?.toFixed(1)),
      color: "#9C27B0",
    },
    { name: "Car", value: Number(Car?.toFixed(1)), color: "#F44336" },
    {
      name: "Bus/Trolleybus",
      value: Number(bus?.toFixed(1)),
      color: "#2196F3",
    },
    { name: "Train/Metro", value: Number(train?.toFixed(1)), color: "#009688" },
    {
      name: "Tram/Streetcar",
      value: Number(tram?.toFixed(1)),
      color: "#FF5722",
    },
    {
      name: "Working from Home",
      value: Number(home?.toFixed(1)),
      color: "#607D8B",
    },
  ]?.filter((item) => item.value !== 0); // Filter out items with value 0

  return (
    <section className="overflow-x-auto">
      <div className="border-[1px] border-gray-300 bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor inline-block p-3 rounded-md mt-[3rem] mb-[2rem]">
    <h3 className="font-semibold">Main Means of Transportation to Work or School</h3>
    <div id="BC-Chart" className="flex md:flex-row flex-col gap-10 items-center md:mb-0 mb-[2rem]">
      <div className="min-w-[350px]">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={160}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${Math.round(value)}%`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="space-y-[0.5rem] text-[14px] text-[#475569] md:mt-0 mt-[-3rem]">
        {Bicycle ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#4CAF50] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p className="text-nowrap">Bicycle</p>
          </li>
        ) : (
          ""
        )}

        {Walking ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#FFC107] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Walking</p>
          </li>
        ) : (
          ""
        )}
        {Motorcycle ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#9C27B0] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p className="text-nowrap">Motorcycle</p>
          </li>
        ) : (
          ""
        )}
        {Car ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#F44336] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Car</p>
          </li>
        ) : (
          ""
        )}
        {bus ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Bus/Trolleybus</p>
          </li>
        ) : (
          ""
        )}
        {train ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#009688] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Train/Metro</p>
          </li>
        ) : (
          ""
        )}
        {tram ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#FF5722] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Tram/Streetcar</p>
          </li>
        ) : (
          ""
        )}
        {home ? (
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#607D8B] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Working from Home</p>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
    </div>
    </section>
  );
};

export default TrafficPieChart;
