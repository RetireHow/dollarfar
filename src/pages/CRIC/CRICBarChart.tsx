/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

function CRICBarChart() {
  const {
    CRIBreakdownData,
    oasStartYear,
    ppStartYear,
    oas,
    lifeExpectency,
    annualRetirementIncomeGoal,
    selectedPP,
    ppAnnualAmount,
  } = useAppSelector((state) => state.CRICalculator);
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );
  console.log({CRIBreakdownData})
  return (
    <div className="mt-[5rem]">
      <div className="flex lg:flex-row flex-col lg:items-center gap-5">
        <div className="overflow-x-auto flex-1">
        <div
          id="CRIC-Chart"
          className="border-[1px] border-gray-200 min-w-[800px] shadow-sm rounded-lg p-2"
          style={{ width: "100%", height: 500 }}
        >
          <ResponsiveContainer>
            <BarChart
              data={CRIBreakdownData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* Grid and Axes */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" name="Age" />
              <YAxis
                label={{
                  angle: -90,
                  position: "insideLeft",
                }}
                // domain={[0, 50000]} // Dynamically scale Y-axis
                tickFormatter={(value) => `${currency}${value}`}
                fontSize={12}
                dataKey="annualRetirementIncomeGoal"
              />
              <Tooltip
                formatter={(value: number) =>
                  `${currency}${numberWithCommas(value)}`
                }
              />

              <Bar
                dataKey="oasAmount"
                name="Old Age Security"
                fill="#FF9800"
                stackId="a"
                barSize={20}
              />

              <Bar
                dataKey="cppAmount"
                name={selectedPP}
                fill="#2196F3"
                stackId="a"
                barSize={20}
              />

              <ReferenceLine
                y={annualRetirementIncomeGoal}
                stroke="#AA5656"
                strokeWidth={3}
                label={{
                  position: "right",
                  fill: "#AA5656",
                  fontSize: 12,
                }}
                isFront={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>

        <ul className="space-y-[1rem] text-[14px] font-semibold lg:max-w-[250px]">
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#AA5656] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                Annual Retirement Income goal : {currency}
                {numberWithCommas(annualRetirementIncomeGoal)}
              </p>
            </li>
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                Old Age Security: {currency}
                {numberWithCommas(oas.oldAgeSecurityBefore75)} annually (from{" "}
                <span className="mx-1">age</span>
                {oasStartYear} to 74); {currency}
                {numberWithCommas(oas.oldAgeSecurityAfter75)} annually (from age
                75 to {lifeExpectency})
              </p>
            </li>
            {selectedPP !== "Not Applicable" && (
              <li className="flex items-center gap-[0.5rem]">
                <div className="bg-[#03A9F4] min-w-[30px] h-[10px] rounded-[10px]"></div>
                <p>
                  {selectedPP} : {currency}
                  {numberWithCommas(ppAnnualAmount)} Annually (starting at age{" "}
                  {ppStartYear} - {lifeExpectency})
                </p>
              </li>
            )}
            <li className="flex items-center gap-[0.5rem]">
              <p className="min-w-[30px]">{currency}</p>
              <p>{currencyFullName}</p>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default CRICBarChart;
