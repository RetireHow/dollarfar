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

export default function RRIFBarChart() {
  const { ageBreakdownDataOverLifeTimeManually: data } = useAppSelector(
    (state) => state.RRIF
  );

  return (
    <div
      id="RRIF-Chart"
      className="bg-[#F8F8F8] RRIFBarChart rounded-lg border-[1px] border-gray-300 shadow-md p-5 flex-1 mb-[5rem]"
    >
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            barGap={50}
          >
            <CartesianGrid
              vertical={false}
              strokeLinejoin="miter"
              strokeWidth={1}
              strokeOpacity={0.5}
              strokeDasharray={5}
            />

            <XAxis dataKey="age" name="Age" fontSize={12} />
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
              dataKey="annualWithdrawalAmount"
              name="Withdraw Amount"
              fill="#FF9800"
              stackId="a"
              barSize={20}
            />
            <Bar
              dataKey="balanceAtEndOfTheYear"
              name="Balance"
              fill="#2196F3"
              stackId="a"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="text-[14px] flex items-center justify-center flex-wrap gap-5">
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Balance at the End of the Year</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Minimum Withdrawal Amount</p>
        </li>
      </ul>
    </div>
  );
}
