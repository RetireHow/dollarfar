/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";

function CRICBarChart() {
  const {generalInfo, oasBreakdown} = useAppSelector(state => state.CRICalculator)

  return (
    <div className="overflow-x-auto mt-[5rem]">
      <div
        id="CRIC-Chart"
        className="min-w-[900px] flex items-center gap-5"
      >
        <div
          className="border-[1px] border-gray-200 shadow-sm rounded-lg p-2"
          style={{ width: "100%", height: 500 }}
        >
          <ResponsiveContainer>
            <BarChart
              data={oasBreakdown}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* Grid and Axes */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                label={{ value: "Age", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[0, 20000]} // Dynamically scale Y-axis
                tickFormatter={(value) => `$${value}`}
                fontSize={12}
              />
              <Tooltip formatter={(value: number) => `CAD $${value}`} />

              {/* Bars for Old Age Security */}
              <Bar dataKey="annualOASAmount" barSize={30} name="Old Age Security">
                {oasBreakdown.map((entry:any, index:number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={parseInt(entry.age) <= 75 ? "#FF9800" : "#2196F3"} // Yellow for 71-75, Green for 76+
                  />
                ))}
              </Bar>

              {/* Reference Line */}
              <ReferenceLine
                y={generalInfo.annualRetirementIncomeGoal}
                stroke="#AA5656"
                strokeWidth={3}
                label={{
                  // value: `Annual Goal: CAD $${AnnualGoal}`,
                  position: "right",
                  fill: "#AA5656",
                  fontSize: 12,
                }}
                isFront={true} // Ensure the line is in front of bars
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-[1rem] lg:mt-0 mt-[2rem] text-[14px]">
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#AA5656] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Annual Retirement Income goal : ${generalInfo.annualRetirementIncomeGoal}</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Old age security : $2,000 (from age 71 - 75)</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#03A9F4] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Old age security : $3,000 (from age 76 - 79)</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <p className="min-w-[30px]">C$</p>
          <p>Canadian Dollar</p>
        </li>
      </ul>
      </div>

     
    </div>
  );
}

export default CRICBarChart;
