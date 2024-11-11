import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RRSPBarChart() {
  const interestBreakdown = [
    {name:'RRSP Amount', RRSPAmount:5000},
    {name:'Savings', savings:2000}
  ];

  return (
    <div className="lg:flex items-center gap-5 my-[5rem]">
      <div
        id="chart-container"
        className="lg:max-w-[800px] lg:min-h-[400px] overflow-x-auto border-[1px] border-gray-300 rounded-[10px] p-5"
      >
        <div
          className="w-[800px] h-[400px]"
        >
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
              <Tooltip/>
              <Bar dataKey="RRSPAmount" fill="#2E7D32" stackId="a" barSize={150} />
              <Bar dataKey="savings" fill="#1976D2" stackId="a" barSize={150} />
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
