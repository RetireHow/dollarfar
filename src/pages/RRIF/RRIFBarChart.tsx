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

  const { currency, currencyFullName } = useAppSelector((state) => state.globalCurrency);

  return (
    <div className="lg:flex items-center gap-5 my-[5rem]">
      <div
        id="RRIF-Chart"
        className="lg:min-h-[400px] overflow-x-auto border-[1px] border-gray-300 rounded-[10px] p-5 flex-1"
      >
        <div className="h-[400px] min-w-[800px]">
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
              <YAxis tickFormatter={(value) => `${currency}${value}`} fontSize={12} />
              <Tooltip 
            formatter={(value: number) => `${currency}${numberWithCommas(value)}`} 
            contentStyle={{fontSize:'12px'}}
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
      </div>

      <ul className="md:space-y-[1.5rem] space-y-[0.5rem] lg:mt-0 mt-[0.8rem] text-[14px]">
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Balance at the End of the Year</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Minimum Withdrawal Amount</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <p className="min-w-[30px]">{currency}</p>
          <p>{currencyFullName}</p>
        </li>
      </ul>
    </div>
  );
}
