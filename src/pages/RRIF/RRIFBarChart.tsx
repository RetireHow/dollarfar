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

export default function RRIFBarChart() {
  // const interestBreakdown = [
  //   { period: "50", principal: 5000, interest: 300 },
  //   { period: "51", principal: 10000, interest: 700 },
  //   { period: "52", principal: 15000, interest: 1200 },
  //   { period: "53", principal: 20000, interest: 1800 },
  //   { period: "54", principal: 25000, interest: 2500 },
  //   { period: "55", principal: 30000, interest: 3300 },
  //   { period: "56", principal: 35000, interest: 4200 },
  //   { period: "57", principal: 40000, interest: 5200 },
  //   { period: "58", principal: 45000, interest: 6300 },
  //   { period: "59", principal: 50000, interest: 7500 },
  // ];

  const { ageBreakdownDataOverLifeTimeManually: data } = useAppSelector(
    (state) => state.RRIF
  );

  return (
    <div className="lg:flex items-center gap-5 my-[5rem]">
      <div
        id="RRIF-Chart"
        className="lg:max-w-[800px] lg:min-h-[400px] overflow-x-auto border-[1px] border-gray-300 rounded-[10px] p-5"
      >
        <div className="w-[800px] h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={400}
              data={data}
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

              <XAxis dataKey="age" name="Age" fontSize={12} />
              <YAxis tickFormatter={(value) => `$${value}`} fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="annualWithdrawalAmount"
                name="Minimum Withdrawal Amount"
                fill="#FF9800"
                stackId="a"
                barSize={20}
              />
              <Bar
                dataKey="balanceAtEndOfTheYear"
                name="Balance at the End of the Year"
                fill="#2196F3"
                stackId="a"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ul className="space-y-[1.5rem] lg:mt-0 mt-[2rem] text-[14px]">
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Balance at the End of the Year</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Minimum Withdrawal Amount</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <p className="min-w-[30px]">$</p>
          <p>CAD - Canadian Dollar</p>
        </li>
      </ul>
    </div>
  );
}
