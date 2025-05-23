import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export const BarGraphChart = () => {
  const { yearByYearBreakdown } = useAppSelector(
    (state) => state.compoundInterest
  );

  return (
    <section className="border-[1px] border-gray-300 rounded-lg p-[1rem] flex-1 shadow-md bg-[#F8F8F8] dark:bg-darkModeBgColor">
      <div>
        <div id="circ-chart" className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={400}
              data={yearByYearBreakdown}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={50}
            >
              <CartesianGrid
                vertical={false}
                strokeLinejoin="miter"
                strokeWidth={1}
                strokeOpacity={0.5}
                strokeDasharray={5}
              />

              <XAxis dataKey="year" name="Year" fontSize={12} />
              <YAxis
                tickFormatter={(value) => `${value}`}
                fontSize={12}
              />
              <Tooltip
                formatter={(value: number) =>
                  `${numberWithCommas(value)}`
                }
                contentStyle={{ fontSize: "12px" }}
              />
              <Bar
                dataKey="totalValue"
                name="Total Principal"
                fill="#4A90E2"
                stackId="a"
                barSize={20}
              />

              <Bar
                dataKey="totalContribution"
                name="Total Contribution"
                fill="#50C878"
                stackId="a"
                barSize={20}
              />
              <Bar
                dataKey="totalInterest"
                name="Total Interest"
                fill="#F5C518"
                stackId="a"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-gray-700 font-bold md:text-[1.5rem] text-[1.2rem] dark:text-darkModeHeadingTextColor">
          Years
        </p>
        <ul className="flex justify-center flex-wrap gap-8 mt-3 text-[14px] dark:text-darkModeHeadingTextColor">
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#4A90E2] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p className="text-nowrap">Principle Amount</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#50C878] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Total Contribution</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#F5C518] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Total Interest</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
