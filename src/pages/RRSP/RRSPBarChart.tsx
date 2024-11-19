/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";

export default function RRSPBarChart() {
  const {
    result,
    input: { contributionFrequency },
  } = useAppSelector((state) => state.rrspCalculator);
  const { rrspBalanceAtRetirement, totalSavings } = result || {};

  const interestBreakdown = [
    { name: "RRSP Amount", RRSPAmount: rrspBalanceAtRetirement?.toFixed(2) },
    { name: "Savings", savings: totalSavings?.toFixed() },
  ];

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, name } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#000"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {name === "Savings"
            ? `$${value} / ${contributionFrequency.value.toLowerCase()}`
            : `$${value}`}
        </text>
      </g>
    );
  };

  return (
    <>
      {rrspBalanceAtRetirement ? (
        <div className="lg:flex items-center justify-center gap-5 my-[5rem]">
          <div
            id="RRSP-Chart"
            className="lg:max-w-[800px] lg:min-h-[300px] overflow-x-auto border-[1px] border-gray-300 rounded-[10px] p-5"
          >
            <div className="w-[500px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={400}
                  data={interestBreakdown}
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

                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis tickFormatter={(value) => `$${value}`} fontSize={12} />
                  <Bar
                    dataKey="RRSPAmount"
                    fill="#2E7D32"
                    stackId="a"
                    barSize={150}
                  >
                    <LabelList content={renderCustomizedLabel} />
                  </Bar>
                  <Bar
                    dataKey="savings"
                    fill="#1976D2"
                    stackId="a"
                    barSize={150}
                  >
                    <LabelList content={renderCustomizedLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ul className="space-y-[1.5rem] lg:mt-0 mt-[2rem] text-[14px]">
            <li className="flex items-center gap-[0.5rem] font-semibold">
              <div className="bg-[#2E7D32] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p className="text-nowrap">RRSP Amount</p>
            </li>
            <li className="flex items-center gap-[0.5rem] font-semibold">
              <div className="bg-[#1976D2] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>Savings</p>
            </li>
            <li className="flex items-center gap-[0.5rem] font-semibold">
              <p className="min-w-[30px]">$</p>
              <p>CAD - Canadian Dollar</p>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-end space-x-5">
            <div className="w-[150px] h-[250px] bg-gray-100 rounded-md"></div>
            <div className="w-[150px] h-[100px] bg-gray-100 rounded-md"></div>
          </div>
          <p className="text-gray-500 text-center mt-5">
            Please enter your data and press 'Calculate' button to generate the
            chart.
          </p>
        </div>
      )}
    </>
  );
}
