import { Icon } from "@iconify/react/dist/iconify.js";
import { Collapse, CollapseProps, Divider } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { getValue } from "../../utils/getValue";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";

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
      hasOtherIncome,
      otherIncomeAmount,
      otherIncomeFrequency,
      otherIncomeStartReceivingAge,
      otherIncomeStopReceivingAge,
      otherIncomeType,
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
      otherIncomeResult: { addedOtherIncomesList },
      employerPensionResult: { addedEmployerPensionsList },
    },
  } = useAppSelector((state) => state.CRICalculator);
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          <Link
            to="/CRIC"
            className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
          >
            General information
          </Link>
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Date of Birth
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(dobMonth)}, {getValue(dobYear)}
                </Link>
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Current Age
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(dobYear) == "N/A"
                    ? "N/A"
                    : new Date().getFullYear() - Number(getValue(dobYear))}
                </Link>
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Life Expectancy
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(lifeExpectency)}
                </Link>
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Gender
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(gender)}
                </Link>
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Annual Retirement Income Goal
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {Number(getValue(annualRetirementIncomeGoal))
                    ? numberWithCommas(Number(annualRetirementIncomeGoal))
                    : getValue(annualRetirementIncomeGoal)}
                </Link>
              </p>
            </li>
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Current Annual Income
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {Number(getValue(currentAnnualIncome))
                    ? numberWithCommas(Number(currentAnnualIncome))
                    : getValue(currentAnnualIncome)}
                </Link>
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
          <Link
            to="/CRIC/PP"
            className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
          >
            {getValue(selectedPP)}
          </Link>
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC/PP"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Start Receiving Age
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/PP"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(ppStartYear)}
                </Link>
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC/PP"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Monthly Retirement Pension Estimate
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/PP"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {Number(getValue(monthlyRetirementPensionEstimate))
                    ? numberWithCommas(Number(monthlyRetirementPensionEstimate))
                    : getValue(monthlyRetirementPensionEstimate)}
                </Link>
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
          <Link
            to="/CRIC/employer-pension"
            className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
          >
            Employer Pension
          </Link>
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          {addedEmployerPensionsList?.map((item) => {
            return (
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px] border-[1px] border-gray-300 rounded-md p-3">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Pension Plan Type
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(item?.pensionPlanType)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Estimated Annual Pension
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {Number(getValue(item?.annualPension))
                        ? numberWithCommas(Number(item?.annualPension))
                        : getValue(item?.annualPension)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Age to Receive Pension
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(item?.pensionReceivingAge)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Is Pension Indexed to Inflation?
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {item?.isIndexedToInflation}
                    </Link>
                  </p>
                </li>

                {item?.isIndexedToInflation == "No" && (
                  <li className="flex md:gap-0 gap-5 justify-between items-center">
                    <p>
                      <Link
                        to="/CRIC/employer-pension"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        Inflation Rate
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/CRIC/employer-pension"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {getValue(item?.inflationRate)}%
                      </Link>
                    </p>
                  </li>
                )}
              </ul>
            );
          })}

          {hasEmployerPension == "Yes" && pensionPlanType !== "Select One" && (
            <ul className="space-y-[1rem] md:text-[1rem] text-[14px] border-[1px] border-gray-300 rounded-md p-3">
              <li className="flex md:gap-0 gap-5 justify-between items-center">
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    Pension Plan Type
                  </Link>
                </p>
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    {getValue(pensionPlanType)}
                  </Link>
                </p>
              </li>

              <li className="flex md:gap-0 gap-5 justify-between items-center">
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    Estimated Annual Pension
                  </Link>
                </p>
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    {Number(getValue(annualPension))
                      ? numberWithCommas(Number(annualPension))
                      : getValue(annualPension)}
                  </Link>
                </p>
              </li>

              <li className="flex md:gap-0 gap-5 justify-between items-center">
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    Age to Receive Pension
                  </Link>
                </p>
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    {getValue(pensionReceivingAge)}
                  </Link>
                </p>
              </li>

              <li className="flex md:gap-0 gap-5 justify-between items-center">
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    Is Pension Indexed to Inflation?
                  </Link>
                </p>
                <p>
                  <Link
                    to="/CRIC/employer-pension"
                    className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                  >
                    {isIndexedToInflation}
                  </Link>
                </p>
              </li>

              {isIndexedToInflation == "No" && (
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Inflation Rate
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/employer-pension"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(inflationRate)}%
                    </Link>
                  </p>
                </li>
              )}
            </ul>
          )}
        </div>
      ),
    },

    {
      key: "4",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          <Link
            to="/CRIC/retirement-savings"
            className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
          >
            Accumulated Savings
          </Link>
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          {TFSA.hasTFSA == "Yes" && (
            <div>
              <h3 className="font-bold text-[1.1rem] mb-[0.8rem]">
                <Link
                  to="/CRIC/retirement-savings"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Tax Free Savings Account
                </Link>
              </h3>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Current Total Value
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {Number(getValue(TFSA.TFSAcurrentTotal))
                        ? numberWithCommas(Number(TFSA.TFSAcurrentTotal))
                        : getValue(TFSA.TFSAcurrentTotal)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Ongoing Contribution Frequency
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getFrequencyTitle(
                        getValue(TFSA.TFSAOngoingContributionFrequency)
                      )}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Ongoing Contribution Amount
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {Number(getValue(TFSA.TFSAOngoingContributionAmount))
                        ? numberWithCommas(
                            Number(TFSA.TFSAOngoingContributionAmount)
                          )
                        : getValue(TFSA.TFSAOngoingContributionAmount)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Rate of Return
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(TFSA.TFSAreturnRate)}%
                    </Link>
                  </p>
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
                <Link
                  to="/CRIC/retirement-savings"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Non Registered Account
                </Link>
              </h3>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Current Total Value
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {Number(getValue(NRA.NRAcurrentTotal))
                        ? numberWithCommas(Number(NRA.NRAcurrentTotal))
                        : getValue(NRA.NRAcurrentTotal)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Ongoing Contribution Frequency
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getFrequencyTitle(
                        getValue(NRA.NRAOngoingContributionFrequency)
                      )}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Ongoing Contribution Amount
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {Number(getValue(NRA.NRAOngoingContributionAmount))
                        ? numberWithCommas(
                            Number(NRA.NRAOngoingContributionAmount)
                          )
                        : getValue(NRA.NRAOngoingContributionAmount)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Rate of Return
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(NRA.NRAreturnRate)}%
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Rate of Tax
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/retirement-savings"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(NRA.NRAtaxRate)}%
                    </Link>
                  </p>
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
              <p>
                <Link
                  to="/CRIC/employer-pension"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Start Receiving Age
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/employer-pension"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(TFSAorNRASavingsReceivingAge)}
                </Link>
              </p>
            </div>
          </div>
        </div>
      ),
    },

    {
      key: "5",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          <Link
            to="/CRIC/other-income"
            className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
          >
            Other Income
          </Link>
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul>
            {addedOtherIncomesList?.map((item) => {
              return (
                <div className="space-y-[1rem] md:text-[1rem] text-[14px] mb-8 border-[1px] border-gray-300 rounded-md p-3">
                  <li className="flex md:gap-0 gap-5 justify-between items-center">
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        Income Type
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {getValue(item.otherIncomeType)}
                      </Link>
                    </p>
                  </li>
                  <li className="flex md:gap-0 gap-5 justify-between items-center">
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        Estimated Income Frequency
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {getFrequencyTitle(getValue(item.otherIncomeFrequency))}
                      </Link>
                    </p>
                  </li>

                  <li className="flex md:gap-0 gap-5 justify-between items-center">
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {" "}
                        Estimated Income
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {" "}
                        {Number(getValue(item.otherIncomeAmount))
                          ? numberWithCommas(Number(item.otherIncomeAmount))
                          : getValue(item.otherIncomeAmount)}
                      </Link>
                    </p>
                  </li>

                  <li className="flex md:gap-0 gap-5 justify-between items-center">
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        Start Receiving Age
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {getValue(item.otherIncomeStartReceivingAge)}
                      </Link>
                    </p>
                  </li>

                  <li className="flex md:gap-0 gap-5 justify-between items-center">
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        Stop Receiving Age
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/CRIC/other-income"
                        className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                      >
                        {getValue(item.otherIncomeStopReceivingAge)}
                      </Link>
                    </p>
                  </li>
                </div>
              );
            })}

            {otherIncomeType !== "Select One" && hasOtherIncome == "Yes" && (
              <div className="space-y-[1rem] md:text-[1rem] text-[14px] mb-8 border-[1px] border-gray-300 rounded-md p-3">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Income Type
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(otherIncomeType)}
                    </Link>
                  </p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Estimated Income Frequency
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getFrequencyTitle(getValue(otherIncomeFrequency))}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {" "}
                      Estimated Income
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {" "}
                      {Number(getValue(otherIncomeAmount))
                        ? numberWithCommas(Number(otherIncomeAmount))
                        : getValue(otherIncomeAmount)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Start Receiving Age
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(otherIncomeStartReceivingAge)}
                    </Link>
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      Stop Receiving Age
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/CRIC/other-income"
                      className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                    >
                      {getValue(otherIncomeStopReceivingAge)}
                    </Link>
                  </p>
                </li>
              </div>
            )}
          </ul>
        </div>
      ),
    },

    {
      key: "6",
      label: (
        <h3 className="md:text-[1.2rem] text-[1rem] font-bold text-gray-600">
          <Link
            to="/CRIC/OAS"
            className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
          >
            Old Age Security
          </Link>
        </h3>
      ),
      children: (
        <div className="space-y-3 rounded-lg md:p-5 p-3 border-[1px] shadow-sm bg-[#FFF]">
          <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Receiving at Age
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {getValue(OASPensionReceivingAge)}
                </Link>
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  OAS Pension (Ages from {getValue(OASPensionReceivingAge)} to
                  74)
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {Number(getValue(oldAgeSecurityBefore75.toString()))
                    ? numberWithCommas(
                        parseInt(oldAgeSecurityBefore75.toString())
                      )
                    : getValue(oldAgeSecurityBefore75.toString())}
                </Link>
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  OAS Pension (Ages 75 and up)
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {Number(getValue(oldAgeSecurityAfter75.toString()))
                    ? numberWithCommas(
                        parseInt(oldAgeSecurityAfter75.toString())
                      )
                    : getValue(oldAgeSecurityAfter75.toString())}
                </Link>
              </p>
            </li>

            <li className="flex md:gap-0 gap-5 justify-between items-center">
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  Years lived in Canada
                </Link>
              </p>
              <p>
                <Link
                  to="/CRIC/OAS"
                  className="border-b-[1px] border-b-gray-600 hover:border-b-blue-600"
                >
                  {willLiveInCanadaAtleast40Years == "Yes"
                    ? 40
                    : getValue(numberOYearsLivedInCanada)}
                </Link>
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
    if (
      item.key == "6" &&
      (OASPensionReceivingAge == "Select One" ||
        willLiveInCanadaAtleast40Years == "Select One")
    ) {
      return;
    }
    return item;
  });
  return (
    <Collapse
      rootClassName="bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md"
      expandIconPosition="end"
      defaultActiveKey={["1", "2", "3", "4", "5", "6"]}
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
