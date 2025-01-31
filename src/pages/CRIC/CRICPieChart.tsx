/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { isNegative } from "../../utils/isNegative";
import { calculateTotalFields } from "../../utils/calculateTotalFields";

const CRICPieChart = () => {
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );
  const {
    generalInfo: { annualRetirementIncomeGoal },
    finalResult,
  } = useAppSelector((state) => state.CRICalculator);

  const retirementOnset = calculateTotalFields(finalResult[0]);
  const difference =
    parseInt(calculateTotalFields(finalResult[0]).toString()) -
    parseInt(annualRetirementIncomeGoal);

  const data = [
    {
      name: "Annual Retirement Income Goal",
      value: Number(annualRetirementIncomeGoal),
      color: "#AA5656",
    },

    // {
    //   name: "Current Annual Income",
    //   value: Number(currentAnnualIncome),
    //   color: "#FF8C00",
    // },

    {
      name: "Retirement income at the onset",
      value: retirementOnset,
      color: "#4682B4",
    },
  ];

  return (
    <div className="flex md:flex-row flex-col justify-center md:items-center md:gap-[2rem] gap-[1rem] my-[5rem]">
      <div
        id="BC-Chart"
        className="md:flex-1 overflow-x-auto border-[1px] border-gray-200 rounded-lg"
      >
        <div className="md:h-auto h-[300px] min-w-[250px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
                label={({ cx, cy }) => (
                  <>
                    {/* Total Income Value */}
                    <text
                      x={cx}
                      y={cy - 10} // Position above the "Total Income" text
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "geist",
                        fill: isNegative(difference) ? "red" : "#10B981",
                      }}
                    >
                      {currency}
                      {numberWithCommas(difference)}
                    </text>
                    {/* Total Income Label */}
                    <text
                      x={cx}
                      y={cy + 27}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontSize: "35px",
                        fontWeight: "normal",
                        fill: isNegative(difference) ? "red" : "",
                      }}
                    >
                      {isNegative(parseInt(difference.toString()))
                        ? "😢"
                        : "😃"}
                    </text>
                  </>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${currency}${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${currency}${numberWithCommas(value)}`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ul className="md:space-y-[1.5rem] space-y-[0.5rem] text-[14px] text-[#475569]">
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#AA5656] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>
            Annual Retirement Income Goal : {currency}
            {numberWithCommas(Number(annualRetirementIncomeGoal))}
          </p>
        </li>

        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#4682B4] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>
            Retirement income at the onset (Age {finalResult[0]?.age}) :{" "}
            {currency}
            {numberWithCommas(
              parseInt(calculateTotalFields(finalResult[0])?.toString())
            )}
          </p>
        </li>

        {/* <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF8C00] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>
            Current Annual Income ({currency}
            {numberWithCommas(Number(currentAnnualIncome))})
          </p>
        </li> */}

        <li className="flex items-center gap-[0.5rem] font-semibold">
          <p className="min-w-[30px]">{currency}</p>
          <p>{currencyFullName}</p>
        </li>
      </ul>
    </div>
  );
};

export default CRICPieChart;
