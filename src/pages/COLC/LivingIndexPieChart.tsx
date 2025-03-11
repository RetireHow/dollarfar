/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { useAppSelector } from "../../redux/hooks";

const LivingIndexPieChart = () => {
  const { city1Indices, city2Indices, selectedCityName1, selectedCityName2 } =
    useAppSelector((state) => state.COLCalculator);
  const data = [
    {
      name: selectedCityName1,
      value: Number(city1Indices?.cost_of_living_index?.toFixed(2)),
      color: "#FF7043",
    },
    {
      name: selectedCityName2,
      value: Number(city2Indices?.cost_of_living_index?.toFixed(2)),
      color: "#26C6DA",
    },
  ];

  return (
    <div className="my-[5rem]">
      <div
        id="BC-Chart"
        className="md:flex-1 overflow-x-auto bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md"
      >
        <h3 className="font-semibold text-[1.2rem] text-center pt-5">
          Cost of living index by city
        </h3>
        <div className="md:h-auto h-[300px] min-w-[250px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${numberWithCommas(value)}`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex md:flex-row flex-col justify-center items-center gap-8 pb-5">
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#FF7043] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>
              {selectedCityName1} :{" "}
              {city1Indices?.cost_of_living_index?.toFixed(2)}
            </p>
          </li>

          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#26C6DA] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>
              {selectedCityName2} :{" "}
              {city2Indices?.cost_of_living_index?.toFixed(2)}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LivingIndexPieChart;
