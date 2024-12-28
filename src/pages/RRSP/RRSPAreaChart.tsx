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

  const { currency } = useAppSelector((state) => state.globalCurrency);

  const maxSavings = Math.ceil(
    Math.max(...savingsByAge!.map((entry) => parseFloat(entry.Savings)))
  );
  return (
    <div
      className="md:w-[90%] lg:min-h-[400px] overflow-x-auto mx-auto border-[1px] border-gray-300 p-5 rounded-md"
      id="RRSP-Chart"
    >
      <div className="min-w-[800px] h-[400px]">
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
              dataKey="Savings"
              tickFormatter={(value) => `${currency}${value}`}
              domain={[0, maxSavings]}
            />
            <Tooltip formatter={(value:number)=>`${currency}${numberWithCommas(Math.round(value))}`}/>
            <Area
              type="monotone"
              dataKey="Savings"
              stroke="#25CD25"
              fill="#25CD2566"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-center text-gray-500 py-2">Years to Retirement</h3>
    </div>
  );
}
