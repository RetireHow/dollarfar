/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // ReferenceLine,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

function CRICBarChart() {
  const {
    generalInfo: { lifeExpectency },
    pensionPlan: { selectedPP, ppStartYear },
    oldAgeSecurity: { OASPensionReceivingAge },
    retirementSavings: { TFSAorNRASavingsReceivingAge },
    calculatedResult: {
      PPResult: { PPBenefitAmount, PPBenefitsAgeByAge },
      OASResult: {
        OASBenefitAmount: { oldAgeSecurityBefore75, oldAgeSecurityAfter75 },
        OASAmountsAgeByAge,
      },
      otherIncomeResult: { otherIncomesAgeByAge, summaryText },
      retirementSavingsResult: {
        annualRetirementIncomeFromBothAccount,
        retirementSavingsAgeByAge,
      },
      employerPensionResult: { employerPensionsAgeByAge, description },
    },
    finalResult,
  } = useAppSelector((state) => state.CRICalculator);

  return (
    <div>
      <div className="gap-5">
        <div className="flex-1">
          <div
            id="CRIC-Chart"
            className="bg-[#F8F8F8] CRICBarChart rounded-lg border-[1px] border-gray-300 shadow-md p-2"
            style={{ width: "100%", height: 500 }}
          >
            <ResponsiveContainer>
              <BarChart
                data={finalResult}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                {/* Grid and Axes */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" name="Age" />
                <YAxis
                  // label={{
                  //   angle: -90,
                  //   position: "insideLeft",
                  // }}

                  tickFormatter={(value) => `${value}`}
                  fontSize={12}
                  // dataKey="annualRIG"
                />
                <Tooltip
                  formatter={(value: number) => `${numberWithCommas(value)}`}
                  contentStyle={{ fontSize: "12px" }}
                />

                <Bar
                  dataKey="PPBenefitAmount"
                  name={selectedPP}
                  fill="#4CAF50"
                  stackId="a"
                  barSize={15}
                />
                <Bar
                  dataKey="retirementSavingsAmount"
                  name="Retirement Savings"
                  fill="#2196F3"
                  stackId="a"
                  barSize={15}
                />
                <Bar
                  dataKey="employerPensionAmount"
                  name="Employer Pension"
                  fill="#FFC107"
                  stackId="a"
                  barSize={15}
                />
                <Bar
                  dataKey="otherIncomeAmount"
                  name="Other Income"
                  fill="#9C27B0"
                  stackId="a"
                  barSize={15}
                />
                <Bar
                  dataKey="OASAmount"
                  name="Old Age Security"
                  fill="#FF5722"
                  stackId="a"
                  barSize={15}
                />

                {/* <ReferenceLine
                  y={annualRetirementIncomeGoal}
                  stroke="#AA5656"
                  strokeWidth={3}
                  label={{
                    position: "right",
                    fill: "#AA5656",
                    fontSize: 12,
                  }}
                  isFront={true}
                /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <ul className="text-[14px] font-semibold space-y-[0.5rem] mt-5">
          {PPBenefitsAgeByAge?.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#4CAF50] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                {selectedPP} :
                {Number(PPBenefitAmount)
                  ? numberWithCommas(PPBenefitAmount)
                  : 0}{" "}
                Annually (starting at age {ppStartYear} - {lifeExpectency})
              </p>
            </li>
          )}

          {employerPensionsAgeByAge.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#FFC107] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>{description}</p>
            </li>
          )}

          {retirementSavingsAgeByAge.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                Accumulated Savings:
                {Number(annualRetirementIncomeFromBothAccount)
                  ? numberWithCommas(annualRetirementIncomeFromBothAccount)
                  : 0}{" "}
                Annually (from age {TFSAorNRASavingsReceivingAge} to{" "}
                {lifeExpectency})
              </p>
            </li>
          )}

          {otherIncomesAgeByAge.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#9C27B0] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                {/* Other Income: 
                {Number(otherIncomeAmountAnnually)
                  ? numberWithCommas(otherIncomeAmountAnnually)
                  : 0}{" "}
                annually (from age {otherIncomeStartReceivingAge} to{" "}
                {otherIncomeStopReceivingAge}) */}
                {summaryText}
              </p>
            </li>
          )}

          {OASAmountsAgeByAge.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#FF5722] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                Old Age Security:
                {Number(oldAgeSecurityBefore75)
                  ? numberWithCommas(
                      parseInt(oldAgeSecurityBefore75?.toString())
                    )
                  : 0}{" "}
                annually (from <span className="mx-1">age</span>
                {OASPensionReceivingAge} to 74);
                {Number(oldAgeSecurityAfter75)
                  ? numberWithCommas(
                      parseInt(oldAgeSecurityAfter75?.toString())
                    )
                  : 0}{" "}
                annually (from age 75 to {lifeExpectency})
              </p>
            </li>
          )}

          <li className="flex items-center gap-[0.5rem]">
            <p className="min-w-[30px]"></p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CRICBarChart;
