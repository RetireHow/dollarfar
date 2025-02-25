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
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );

  const {
    generalInfo: { lifeExpectency },
    pensionPlan: { selectedPP, ppStartYear },
    oldAgeSecurity: { OASPensionReceivingAge },
    employerPension: { isIndexedToInflation, pensionReceivingAge },
    otherIncome: { otherIncomeStartReceivingAge, otherIncomeStopReceivingAge },
    retirementSavings: { TFSAorNRASavingsReceivingAge },
    calculatedResult: {
      PPResult: { PPBenefitAmount, PPBenefitsAgeByAge },
      OASResult: {
        OASBenefitAmount: { oldAgeSecurityBefore75, oldAgeSecurityAfter75 },
        OASAmountsAgeByAge,
      },
      otherIncomeResult: { otherIncomeAmountAnnually, otherIncomesAgeByAge },
      retirementSavingsResult: {
        annualRetirementIncomeFromBothAccount,
        retirementSavingsAgeByAge,
      },
      employerPensionResult: { employerPensionsAgeByAge },
    },
    finalResult,
  } = useAppSelector((state) => state.CRICalculator);

  return (
    <div>
      <div className="flex lg:flex-row flex-col lg:items-center gap-5">
        <div className="overflow-x-auto flex-1">
          <div
            id="CRIC-Chart"
            className="bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md min-w-[800px] p-2"
            style={{ width: "100%", height: 500 }}
          >
            <ResponsiveContainer>
              <BarChart
                data={finalResult}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                {/* Grid and Axes */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" name="Age" />
                <YAxis
                  // label={{
                  //   angle: -90,
                  //   position: "insideLeft",
                  // }}

                  tickFormatter={(value) => `${currency}${value}`}
                  fontSize={12}
                  // dataKey="annualRIG"
                />
                <Tooltip
                  formatter={(value: number) =>
                    `${currency}${numberWithCommas(value)}`
                  }
                  contentStyle={{ fontSize: "12px" }}
                />

                <Bar
                  dataKey="PPBenefitAmount"
                  name={selectedPP}
                  fill="#4CAF50"
                  stackId="a"
                  barSize={20}
                />
                <Bar
                  dataKey="retirementSavingsAmount"
                  name="Retirement Savings"
                  fill="#2196F3"
                  stackId="a"
                  barSize={20}
                />
                <Bar
                  dataKey="employerPensionAmount"
                  name="Employer Pension"
                  fill="#FFC107"
                  stackId="a"
                  barSize={20}
                />
                <Bar
                  dataKey="otherIncomeAmount"
                  name="Other Income"
                  fill="#9C27B0"
                  stackId="a"
                  barSize={20}
                />
                <Bar
                  dataKey="OASAmount"
                  name="Old Age Security"
                  fill="#FF5722"
                  stackId="a"
                  barSize={20}
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

        <ul className="md:space-y-[1rem] space-y-[0.5rem] md:mt-0 mt-[-0.5rem] text-[14px] font-semibold lg:max-w-[250px]">
          {/* <li className="flex items-center gap-[0.5rem]">
            <div className="bg-[#AA5656] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>
              Annual Retirement Income goal : {currency}
              {annualRetirementIncomeGoal}
            </p>
          </li> */}

          {PPBenefitsAgeByAge?.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#4CAF50] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                {selectedPP} : {currency}
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
              {isIndexedToInflation == "Yes" ? (
                <p>
                  Employer Pension: {currency}
                  {Number(employerPensionsAgeByAge[0]?.employerPensionAmount)
                    ? numberWithCommas(
                        employerPensionsAgeByAge[0]?.employerPensionAmount
                      )
                    : 0}{" "}
                  annually (starting at age {pensionReceivingAge})
                </p>
              ) : (
                <p>
                  Employer Pension: Declining from {currency}
                  {Number(employerPensionsAgeByAge[0]?.employerPensionAmount)
                    ? numberWithCommas(
                        employerPensionsAgeByAge[0]?.employerPensionAmount
                      )
                    : 0}{" "}
                  to {currency}
                  {numberWithCommas(
                    employerPensionsAgeByAge[
                      employerPensionsAgeByAge?.length - 1
                    ]?.employerPensionAmount
                  )}{" "}
                  annually between age {pensionReceivingAge} and{" "}
                  {lifeExpectency}
                </p>
              )}
            </li>
          )}

          {retirementSavingsAgeByAge.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                Accumulated Savings: {currency}
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
                Other Income: {currency}
                {Number(otherIncomeAmountAnnually)
                  ? numberWithCommas(otherIncomeAmountAnnually)
                  : 0}{" "}
                annually (from age {otherIncomeStartReceivingAge} to{" "}
                {otherIncomeStopReceivingAge})
              </p>
            </li>
          )}

          {OASAmountsAgeByAge.length > 0 && (
            <li className="flex items-center gap-[0.5rem]">
              <div className="bg-[#FF5722] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>
                Old Age Security: {currency}
                {Number(oldAgeSecurityBefore75)
                  ? numberWithCommas(parseInt(oldAgeSecurityBefore75?.toString()))
                  : 0}{" "}
                annually (from <span className="mx-1">age</span>
                {OASPensionReceivingAge} to 74); {currency}
                {Number(oldAgeSecurityAfter75)
                  ? numberWithCommas(parseInt(oldAgeSecurityAfter75?.toString()))
                  : 0}{" "}
                annually (from age 75 to {lifeExpectency})
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
