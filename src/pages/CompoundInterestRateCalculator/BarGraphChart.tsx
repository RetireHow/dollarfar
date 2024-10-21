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

export const BarGraphChart = () => {
  const { interestBreakdown } = useAppSelector(
    (state) => state.compoundInterest
  );

  return (
    <div className="lg:w-full lg:h-[400px] overflow-x-auto">
      <div className="lg:w-full  h-[400px]">
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
            />

            <XAxis dataKey="period" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            {/* <Tooltip cursor={{ fill: "transparent" }} content={renderTooltip} /> */}
            <Tooltip />
            <Bar dataKey="principal" fill="#22C55E" stackId="a" barSize={30} />
            <Bar dataKey="interest" fill="#EAB308" stackId="a" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
