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
  const { interestBreakdown, frequency } = useAppSelector(
    (state) => state.compoundInterest
  );

  const { currency } = useAppSelector(
    (state) => state.globalCurrency
  );

  return (
    <div
      className="lg:h-[400px] overflow-x-auto"
      id="circ-report"
    >
      <div
        className={`lg:w-full h-[400px] min-w-[800px] ${
          frequency == 365
            ? "min-w-[18000px]"
            : frequency == 52
            ? "min-w-[3000px]"
            : frequency == 26
            ? "min-w-[1800px]"
            : ""
        }`}
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

            <XAxis dataKey="period" fontSize={12} />
            <YAxis tickFormatter={(value) => `${currency}${value}`} fontSize={12} />
            {/* <Tooltip cursor={{ fill: "transparent" }} content={renderTooltip} /> */}
            <Tooltip formatter={(value: number) => `${currency}${numberWithCommas(value)}`} />
            <Bar
              dataKey="principal"
              name="Total Principal"
              fill="#22C55E"
              stackId="a"
              barSize={20}
            />
            <Bar
              dataKey="interest"
              name="Total Interest"
              fill="#EAB308"
              stackId="a"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
