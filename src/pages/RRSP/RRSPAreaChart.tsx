import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function RRSPAreaChart() {
  const { result } = useAppSelector((state) => state.rrspCalculator);
  const { savingsByAge } = result || {};

  const maxSavings = Math.ceil(
    Math.max(
      ...savingsByAge!.map((entry) =>
        parseFloat(entry.savingsAmount.toString())
      )
    )
  );
  return (
    <div
      className="bg-[#F8F8F8] RRSPAreaChart rounded-lg border-[1px] border-gray-300 shadow-md p-5"
      id="RRSP-Chart"
    >
      <div className="w-[100%] h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={300}
            height={200}
            data={savingsByAge}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="age" />
            <YAxis
              dataKey="savingsAmount"
              tickFormatter={(value) => `${value}`}
              domain={[0, maxSavings]}
            />
            <Tooltip
              formatter={(value: number) =>
                `${numberWithCommas(Math.round(value))}`
              }
            />
            <Area
              type="monotone"
              dataKey="savingsAmount"
              name="Savings"
              stroke="#25CD25"
              fill="#25CD2566"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-center text-gray-500">Years to Retirement</h3>
    </div>
  );
}
