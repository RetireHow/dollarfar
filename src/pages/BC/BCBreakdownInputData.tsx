import { useAppSelector } from "../../redux/hooks";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function BCBreakdownInputData() {
  const {
    income: {
      salary,
      dynamicSalaries,
      govtBenefits,
      dynamicGovtBenefits,
      netIncome,
      dynamicNetIncomes,
      otherIncome,
      dynamicOtherIncomes,
      dynamicMoreIncomes,
      totalMonthlyIncome,
      totalAnnualIncome,
    },

    housing: {
      mortgage1,
      mortgage2,
      mortgage3,
      rent,
      homeInsurance,
      utilities,
      dynamicUtilities,
      telecomService,
      dynamicTelecomServices,
      maintenance,
      dynamicMaintenances,
      dynamicMoreHousingExpenses,
      totalAnnualHousingExpenses,
      totalMonthlyHousingExpenses,
    },

    transport: {
      carPayment,
      carInsurance,
      carRepairs,
      gasFuelEtrToll,
      dynamicGasFuelEtrToll,
      dynamicMoreTransportExpenses,
      totalAnnualTransportExpenses,
      totalMonthlyTransportExpenses,
    },
    education: {
      schoolCollegeFee,
      dynamicSchoolCollegeFees,
      dynamicMoreEducatoinExpenses,
      totalAnnualEducationalExpenses,
      totalMonthlyEducationalExpenses,
    },
    other: {
      househole,
      clothing,
      eatingOut,
      medical,
      entertainmentEvents,
      dynamicEntertainmentEvents,
      dynamicMoreOtherExpenses,
      totalAnnualOtherExpenses,
      totalMonthlyOtherExpenses,
    },
    loans: {
      personalLoan,
      studentLoan,
      dynamicMoreLoansExpenses,
      totalAnnualLoansExpenses,
      totalMonthlyLoansExpenses,
    },
    savings: {
      vacationFund,
      emergency,
      retirement,
      investments,
      dynamicInvestments,
      dynamicMoreInvestments,
      totalAnnualSavingsExpenses,
      totalMonthlySavingsExpenses,
    },
  } = useAppSelector((state) => state.budgetCalculator);
  return (
    <main className="overflow-x-auto">
      <h3 className="md:text-[1.5rem] text-[18px] font-bold mt-[2.25rem]">
        Breakdown Data
      </h3>

      {/* =============|| Income Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">Income</caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| Salary / Wages ||============  */}
          {Number(salary?.salaryAmount) &&
          Number(salary?.salaryFrequency) &&
          Number(salary?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Salary/Wages</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(salary?.salaryAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(salary?.salaryFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(salary?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((salary?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicSalaries?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index}>
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">{amount}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(totalAnnualAmount)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| Government Benefits ||============  */}
          {Number(govtBenefits?.govtBenefitsAmount) &&
          Number(govtBenefits?.govtBenefitsFrequency) &&
          Number(govtBenefits?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Government Benefits
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(govtBenefits?.govtBenefitsAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(govtBenefits?.govtBenefitsFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(govtBenefits?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((govtBenefits?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicGovtBenefits?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| Net Income ||============  */}
          {Number(netIncome?.netIncomeAmount) &&
          Number(netIncome?.netIncomeFrequency) &&
          Number(netIncome?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Net Income</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(netIncome?.netIncomeAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(netIncome?.netIncomeFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(netIncome?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((netIncome?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicNetIncomes?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| Other Income ||============  */}
          {Number(otherIncome?.otherIncomeAmount) &&
          Number(otherIncome?.otherIncomeFrequency) &&
          Number(otherIncome?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Other Income</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(otherIncome?.otherIncomeAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(otherIncome?.otherIncomeFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(otherIncome?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((otherIncome?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicOtherIncomes?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============||More Other Income ||============  */}
          {dynamicMoreIncomes?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Income  */}
          {Number(totalAnnualIncome) && Number(totalMonthlyIncome) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualIncome))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlyIncome))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>

      {/* =============|| Housing Expenses Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">
          Housing Expenses
        </caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| Mortgage ||============  */}
          {Number(mortgage1?.mortgageAmount1) &&
          Number(mortgage1?.mortgageFrequency1) &&
          Number(mortgage1?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Mortgage1</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(mortgage1?.mortgageAmount1))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(mortgage1?.mortgageFrequency1)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(mortgage1?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((mortgage1?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {Number(mortgage2?.mortgageAmount2) &&
          Number(mortgage2?.mortgageFrequency2) &&
          Number(mortgage2?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Mortgage2</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(mortgage2?.mortgageAmount2))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(mortgage2?.mortgageFrequency2)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(mortgage2?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((mortgage2?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {Number(mortgage3?.mortgageAmount3) &&
          Number(mortgage3?.mortgageFrequency3) &&
          Number(mortgage3?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Mortgage3</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(mortgage3?.mortgageAmount3))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(mortgage3?.mortgageFrequency3)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(mortgage3?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((mortgage3?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {/* ============|| Rent ||============  */}
          {Number(rent?.rentAmount) &&
          Number(rent?.rentFrequency) &&
          Number(rent?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Rent</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(rent?.rentAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(rent?.rentFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(rent?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((rent?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {/* ============|| Home Insurance ||============  */}
          {Number(homeInsurance?.homeInsuranceAmount) &&
          Number(homeInsurance?.homeInsuranceFrequency) &&
          Number(homeInsurance?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Home Insurance
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(homeInsurance?.homeInsuranceAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(homeInsurance?.homeInsuranceFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(homeInsurance?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((homeInsurance?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {/* ============|| Utilities ||============  */}
          {Number(utilities?.utilitiesAmount) &&
          Number(utilities?.utilitiesFrequency) &&
          Number(utilities?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Utilities</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(utilities?.utilitiesAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(utilities?.utilitiesFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(utilities?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((utilities?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicUtilities?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| Telecom Services ||============  */}
          {Number(telecomService?.telecomServiceAmount) &&
          Number(telecomService?.telecomServiceFrequency) &&
          Number(telecomService?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Telecom Services
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(telecomService?.telecomServiceAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(telecomService?.telecomServiceFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(telecomService?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((telecomService?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicTelecomServices?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| Maintenances ||============  */}
          {Number(maintenance?.maintenanceAmount) &&
          Number(maintenance?.maintenanceFrequency) &&
          Number(maintenance?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Maintenances / Repairs
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(maintenance?.maintenanceAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(maintenance?.maintenanceFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(maintenance?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((maintenance?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicMaintenances?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| More Housing Expenses ||============  */}
          {dynamicMoreHousingExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Housing Expenses  */}
          {Number(totalAnnualHousingExpenses) &&
          Number(totalMonthlyHousingExpenses) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualHousingExpenses))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlyHousingExpenses))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>

      {/* =============|| Transport Expenses Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">
          Transport Expenses
        </caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| Car ||============  */}
          {Number(carPayment?.carPaymentAmount) &&
          Number(carPayment?.carPaymentFrequency) &&
          Number(carPayment?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Car Payment</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(carPayment?.carPaymentAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(carPayment?.carPaymentFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(carPayment?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((carPayment?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {Number(carInsurance?.carInsuranceAmount) &&
          Number(carInsurance?.carInsuranceFrequency) &&
          Number(carInsurance?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Car Insurance
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(carInsurance?.carInsuranceAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(carInsurance?.carInsuranceFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(carInsurance?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((carInsurance?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {Number(carRepairs?.carRepairsAmount) &&
          Number(carRepairs?.carRepairsFrequency) &&
          Number(carRepairs?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Car Repairs</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(carRepairs?.carRepairsAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(carRepairs?.carRepairsFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(carRepairs?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((carRepairs?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {/* ============|| Travel Budgets ||============  */}
          {Number(gasFuelEtrToll?.gasFuelEtrTollAmount) &&
          Number(gasFuelEtrToll?.gasFuelEtrTollFrequency) &&
          Number(gasFuelEtrToll?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Travel Budgets
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(gasFuelEtrToll?.gasFuelEtrTollAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(gasFuelEtrToll?.gasFuelEtrTollFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(gasFuelEtrToll?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((gasFuelEtrToll?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicGasFuelEtrToll?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| More Housing Expenses ||============  */}
          {dynamicMoreTransportExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Transport Expenses  */}
          {Number(totalAnnualTransportExpenses) &&
          Number(totalMonthlyTransportExpenses) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualTransportExpenses))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlyTransportExpenses))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>

      {/* =============|| Educational Expenses Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">
          Educational Expenses
        </caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| School College Fees / Edu. Fees ||============  */}
          {Number(schoolCollegeFee?.schoolCollegeFeeAmount) &&
          Number(schoolCollegeFee?.schoolCollegeFeeFrequency) &&
          Number(schoolCollegeFee?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Education Fees (Scheel Fee)
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number(schoolCollegeFee?.schoolCollegeFeeAmount)
                )}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(schoolCollegeFee?.schoolCollegeFeeFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(schoolCollegeFee?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((schoolCollegeFee?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicSchoolCollegeFees?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| More Edu. Expenses ||============  */}
          {dynamicMoreEducatoinExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Edu. Expenses  */}
          {Number(totalAnnualEducationalExpenses) &&
          Number(totalMonthlyEducationalExpenses) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualEducationalExpenses))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlyEducationalExpenses))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>

      {/* =============|| Other Expenses Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">
          Other Expenses
        </caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| Household ||============  */}
          {Number(househole?.householeAmount) &&
          Number(househole?.householeFrequency) &&
          Number(househole?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Household</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(househole?.householeAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(househole?.householeFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(househole?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((househole?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* ============|| Clothing ||============  */}
          {Number(clothing?.clothingAmount) &&
          Number(clothing?.clothingFrequency) &&
          Number(clothing?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Clothing</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(clothing?.clothingAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(clothing?.clothingFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(clothing?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((clothing?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* ============|| Eating Out ||============  */}
          {Number(eatingOut?.eatingOutAmount) &&
          Number(eatingOut?.eatingOutFrequency) &&
          Number(eatingOut?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Eating Out</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(eatingOut?.eatingOutAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(eatingOut?.eatingOutFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(eatingOut?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((eatingOut?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* ============|| Medical ||============  */}
          {Number(medical?.medicalAmount) &&
          Number(medical?.medicalFrequency) &&
          Number(medical?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Medical</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(medical?.medicalAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(medical?.medicalFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(medical?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((medical?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* ============|| Entertainment ||============  */}
          {Number(entertainmentEvents?.entertainmentEventsAmount) &&
          Number(entertainmentEvents?.entertainmentEventsFrequency) &&
          Number(entertainmentEvents?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Entertainment/Events ( e.g., Sports )
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number(entertainmentEvents?.entertainmentEventsAmount)
                )}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(
                  entertainmentEvents?.entertainmentEventsFrequency
                )}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number(entertainmentEvents?.totalAnnualAmount)
                )}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number(
                    (entertainmentEvents?.totalAnnualAmount / 12)?.toFixed(2)
                  )
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicEntertainmentEvents?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* ============|| More Other Expenses ||============  */}
          {dynamicMoreOtherExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Other Expenses  */}
          {Number(totalAnnualOtherExpenses) &&
          Number(totalMonthlyOtherExpenses) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualOtherExpenses))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlyOtherExpenses))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>

      {/* =============|| Loans Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">Loans</caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| Personal Loan ||============  */}
          {Number(personalLoan?.personalLoanAmount) &&
          Number(personalLoan?.personalLoanFrequency) &&
          Number(personalLoan?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Personal Loan
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(personalLoan?.personalLoanAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(personalLoan?.personalLoanFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(personalLoan?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((personalLoan?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* ============|| Student Loan ||============  */}
          {Number(studentLoan?.studentLoanAmount) &&
          Number(studentLoan?.studentLoanFrequency) &&
          Number(studentLoan?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Student Loan</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(studentLoan?.studentLoanAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(studentLoan?.studentLoanFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(studentLoan?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((studentLoan?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {/* ============|| More Loans Expenses ||============  */}
          {dynamicMoreLoansExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Loan Expenses  */}
          {Number(totalAnnualLoansExpenses) &&
          Number(totalMonthlyLoansExpenses) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualLoansExpenses))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlyLoansExpenses))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>

      {/* =============|| Savings Table ||==============  */}
      <table className="text-[14px] text-left w-full mb-[2rem]">
        <caption className="font-bold text-[1.3rem] mb-1">Savings</caption>
        <thead className="bg-[#f8f7f7]">
          <tr>
            <th className="border-[1px] border-gray-300 p-3">Title</th>
            <th className="border-[1px] border-gray-300 p-3">Amount</th>
            <th className="border-[1px] border-gray-300 p-3">Frequency</th>
            <th className="border-[1px] border-gray-300 p-3">Total Annually</th>
            <th className="border-[1px] border-gray-300 p-3">Total Monthly</th>
          </tr>
        </thead>
        <tbody>
          {/* ============|| Vacation Fund ||============  */}
          {Number(vacationFund?.vacationFundAmount) &&
          Number(vacationFund?.vacationFundFrequency) &&
          Number(vacationFund?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">
                Vacation Fund
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(vacationFund?.vacationFundAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(vacationFund?.vacationFundFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(vacationFund?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((vacationFund?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* ============|| Emergency ||============  */}
          {Number(emergency?.emergencyAmount) &&
          Number(emergency?.emergencyFrequency) &&
          Number(emergency?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Emergency</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(emergency?.emergencyAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(emergency?.emergencyFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(emergency?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((emergency?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}

          {/* ============|| Retirement Savings ||============  */}
          {Number(retirement?.retirementAmount) &&
          Number(retirement?.retirementFrequency) &&
          Number(retirement?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Retirement</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(retirement?.retirementAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(retirement?.retirementFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(retirement?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((retirement?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {/* =================|| Investments ||===============  */}
          {Number(investments?.investmentsAmount) &&
          Number(investments?.investmentsFrequency) &&
          Number(investments?.totalAnnualAmount) ? (
            <tr className="hover:bg-[#faf8f8]">
              <td className="border-[1px] border-gray-300 p-3">Investments</td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(investments?.investmentsAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {getFrequencyTitle(investments?.investmentsFrequency)}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(investments?.totalAnnualAmount))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(
                  Number((investments?.totalAnnualAmount / 12)?.toFixed(2))
                )}
              </td>
            </tr>
          ) : (
            ""
          )}
          {dynamicInvestments?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* More Savings  */}
          {dynamicMoreInvestments?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <tr key={index} className="hover:bg-[#faf8f8]">
                <td className="border-[1px] border-gray-300 p-3">{title}</td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(amount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {getFrequencyTitle(frequency)}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(Number(totalAnnualAmount))}
                </td>
                <td className="border-[1px] border-gray-300 p-3">
                  {numberWithCommas(
                    Number((totalAnnualAmount / 12)?.toFixed(2))
                  )}
                </td>
              </tr>
            );
          })}

          {/* Total Savings  */}
          {Number(totalAnnualSavingsExpenses) &&
          Number(totalMonthlySavingsExpenses) ? (
            <tr className="bg-[#f8f7f7] font-bold">
              <td colSpan={3} className="border-[1px] border-gray-300 p-3">
                Total
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalAnnualSavingsExpenses))}
              </td>
              <td className="border-[1px] border-gray-300 p-3">
                {numberWithCommas(Number(totalMonthlySavingsExpenses))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
    </main>
  );
}
