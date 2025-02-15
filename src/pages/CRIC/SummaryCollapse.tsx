import { Icon } from "@iconify/react/dist/iconify.js";
import { Collapse, CollapseProps, Divider } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { getValue } from "../../utils/getValue";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function SummaryCollapse() {
  const {
    generalInfo: {
      annualRetirementIncomeGoal,
      currentAnnualIncome,
      dobMonth,
      dobYear,
      gender,
      lifeExpectency,
    },
    pensionPlan: { monthlyRetirementPensionEstimate, ppStartYear, selectedPP },
    employerPension: {
      annualPension,
      inflationRate,
      isIndexedToInflation,
      pensionPlanType,
      pensionReceivingAge,
      hasEmployerPension,
    },
    retirementSavings: { NRA, TFSA, TFSAorNRASavingsReceivingAge },
    otherIncome: {
      otherIncomeAmount,
      otherIncomeFrequency,
      otherIncomeStartReceivingAge,
      otherIncomeStopReceivingAge,
      otherIncomeType,
      hasOtherIncome,
    },
    oldAgeSecurity: {
      OASPensionReceivingAge,
      numberOYearsLivedInCanada,
      willLiveInCanadaAtleast40Years,
    },
    calculatedResult: {
      OASResult: {
        OASBenefitAmount: { oldAgeSecurityAfter75, oldAgeSecurityBefore75 },
      },
    },
  } = useAppSelector((state) => state.CRICalculator);
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          General information
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Date of Birth</p>
              <p>
                {getValue(dobMonth)}, {getValue(dobYear)}
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Current Age</p>
              <p>
                {getValue(dobYear) == "N/A"
                  ? "N/A"
                  : new Date().getFullYear() - Number(getValue(dobYear))}
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Life Expectancy</p>
              <p>{getValue(lifeExpectency)}</p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Gender</p>
              <p>{getValue(gender)}</p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Annual Retirement Income Goal</p>
              <p>
                {currency}
                {Number(getValue(annualRetirementIncomeGoal))
                  ? numberWithCommas(Number(annualRetirementIncomeGoal))
                  : getValue(annualRetirementIncomeGoal)}
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Current Annual Income</p>
              <p>
                {currency}
                {Number(getValue(currentAnnualIncome))
                  ? numberWithCommas(Number(currentAnnualIncome))
                  : getValue(currentAnnualIncome)}
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          {getValue(selectedPP)}
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Start Receiving Age</p>
              <p>{getValue(ppStartYear)}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Monthly Retirement Pension Estimate</p>
              <p>
                {currency}
                {Number(getValue(monthlyRetirementPensionEstimate))
                  ? numberWithCommas(Number(monthlyRetirementPensionEstimate))
                  : getValue(monthlyRetirementPensionEstimate)}
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          Employer Pension
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Pension Plan Type</p>
              <p>{getValue(pensionPlanType)}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Estimated Annual Pension</p>
              <p>
                {currency}
                {Number(getValue(annualPension))
                  ? numberWithCommas(Number(annualPension))
                  : getValue(annualPension)}
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Age to Receive Pension</p>
              <p>{getValue(pensionReceivingAge)}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Is Pension Indexed to Inflation?</p>
              <p>{isIndexedToInflation}</p>
            </li>

            {isIndexedToInflation == "No" && (
              <li className="flex md:gap-0 gap-5 justify-between items-center">
                <p>Inflation Rate</p>
                <p>{getValue(inflationRate)}%</p>
              </li>
            )}
          </ul>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          Retirement Savings
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          {TFSA.hasTFSA == "Yes" && (
            <div>
              <h3 className="font-bold text-[1.1rem] mb-[0.8rem]">
                Tax Free Savings Account
              </h3>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Current Total Value</p>
                  <p>
                    {currency}
                    {Number(getValue(TFSA.TFSAcurrentTotal))
                      ? numberWithCommas(Number(TFSA.TFSAcurrentTotal))
                      : getValue(TFSA.TFSAcurrentTotal)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Ongoing Contribution Frequency</p>
                  <p>
                    {getFrequencyTitle(
                      getValue(TFSA.TFSAOngoingContributionFrequency)
                    )}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Ongoing Contribution Amount</p>
                  <p>
                    {currency}
                    {Number(getValue(TFSA.TFSAOngoingContributionAmount))
                      ? numberWithCommas(
                          Number(TFSA.TFSAOngoingContributionAmount)
                        )
                      : getValue(TFSA.TFSAOngoingContributionAmount)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Rate of Return</p>
                  <p>{getValue(TFSA.TFSAreturnRate)}%</p>
                </li>
              </ul>
            </div>
          )}

          {TFSA.hasTFSA == "Yes" && (
            <Divider
              style={{
                borderColor: "#EAECF0",
                marginTop: "20px",
                marginBottom: "15px",
              }}
            ></Divider>
          )}

          {NRA.hasNRA == "Yes" && (
            <div>
              <h3 className="font-bold text-[1.1rem] mb-[0.8rem]">
                Non Registered Account
              </h3>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Current Total Value</p>
                  <p>
                    {currency}
                    {Number(getValue(NRA.NRAcurrentTotal))
                      ? numberWithCommas(Number(NRA.NRAcurrentTotal))
                      : getValue(NRA.NRAcurrentTotal)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Ongoing Contribution Frequency</p>
                  <p>
                    {getFrequencyTitle(
                      getValue(NRA.NRAOngoingContributionFrequency)
                    )}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Ongoing Contribution Amount</p>
                  <p>
                    {currency}
                    {Number(getValue(NRA.NRAOngoingContributionAmount))
                      ? numberWithCommas(
                          Number(NRA.NRAOngoingContributionAmount)
                        )
                      : getValue(NRA.NRAOngoingContributionAmount)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Rate of Return</p>
                  <p>{getValue(NRA.NRAreturnRate)}%</p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Rate of Tax</p>
                  <p>{getValue(NRA.NRAtaxRate)}%</p>
                </li>
              </ul>
            </div>
          )}

          <Divider
            style={{
              borderColor: "#EAECF0",
              marginTop: "20px",
              marginBottom: "15px",
            }}
          ></Divider>

          <div className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <div className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Start Receiving Age</p>
              <p>{getValue(TFSAorNRASavingsReceivingAge)}</p>
            </div>
          </div>
        </div>
      ),
    },

    {
      key: "5",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          Other Income
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Income Type</p>
              <p>{getValue(otherIncomeType)}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Estimated Income Frequency</p>
              <p>{getFrequencyTitle(getValue(otherIncomeFrequency))}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Estimated Income</p>
              <p>
                {currency}
                {Number(getValue(otherIncomeAmount))
                  ? numberWithCommas(Number(otherIncomeAmount))
                  : getValue(otherIncomeAmount)}
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Start Receiving Age</p>
              <p>{getValue(otherIncomeStartReceivingAge)}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Stop Receiving Age</p>
              <p>{getValue(otherIncomeStopReceivingAge)}</p>
            </li>
          </ul>
        </div>
      ),
    },

    {
      key: "6",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          Old Age Security
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Receiving at Age</p>
              <p>{getValue(OASPensionReceivingAge)}</p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                OAS Pension (Ages from {getValue(OASPensionReceivingAge)} to 74)
              </p>
              <p>
                {currency}
                {Number(getValue(oldAgeSecurityBefore75.toString()))
                  ? numberWithCommas(
                      parseInt(oldAgeSecurityBefore75.toString())
                    )
                  : getValue(oldAgeSecurityBefore75.toString())}
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>OAS Pension (Ages 75 and up)</p>
              <p>
                {currency}
                {Number(getValue(oldAgeSecurityAfter75.toString()))
                  ? numberWithCommas(parseInt(oldAgeSecurityAfter75.toString()))
                  : getValue(oldAgeSecurityAfter75.toString())}
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>Years lived in Canada</p>
              <p>
                {willLiveInCanadaAtleast40Years == "Yes"
                  ? 40
                  : getValue(numberOYearsLivedInCanada)}
              </p>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // Filter the items based on the condition.
  const filteredItems = items?.filter((item) => {
    if (item.key == "2" && selectedPP == "Not Applicable") {
      return;
    }
    if (item.key == "3" && hasEmployerPension == "No") {
      return;
    }
    if (item.key == "4" && TFSA.hasTFSA == "No" && NRA.hasNRA == "No") {
      return;
    }
    if (item.key == "5" && hasOtherIncome == "No") {
      return;
    }
    return item;
  });
  return (
    <Collapse
      rootClassName="bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md"
      expandIconPosition="end"
      expandIcon={(panelProps) => {
        const { isActive } = panelProps;
        return (
          <div>
            {isActive ? (
              <Icon
                className="md:w-[35px] w-[30px] md:h-[35px] h-[30px]"
                icon="iconamoon:arrow-up-2-light"
              />
            ) : (
              <Icon
                className="md:w-[35px] w-[30px] md:h-[35px] h-[30px]"
                icon="iconamoon:arrow-down-2-light"
              />
            )}
          </div>
        );
      }}
      items={filteredItems}
    />
  );
}
