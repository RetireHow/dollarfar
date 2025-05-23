import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getArrayFromObject } from "./nwc.utils";

const FinanceTable  = ({
  title,
  data,
  total,
}: {
  title: string;
  data: { value: number; title: string }[];
  total: number;
}) => (
  <table className="text-left md:w-auto w-full">
    <caption className="mb-1 font-bold">{title}</caption>
    <thead>
      <tr>
        <th className="border-[1px] border-gray-300 p-2">Name</th>
        <th className="border-[1px] border-gray-300 p-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border-[1px] border-gray-300 p-2">{item?.title}</td>
          <td className="border-[1px] border-gray-300 p-2">
            {numberWithCommas(Number(item?.value))}
          </td>
        </tr>
      ))}
      <tr className="bg-gray-100 dark:bg-gray-800 font-bold">
        <td className="border-[1px] border-gray-300 p-2">Total</td>
        <td className="border-[1px] border-gray-300 p-2">
          {numberWithCommas(Number(total))}
        </td>
      </tr>
    </tbody>
  </table>
);

export default function NWCInputBreakdownTable() {
  const {
    assets: {
      property,
      savingsInvestment,
      personalItems,
      businessOwnershipInterest,
      vehicles,
      otherAssets,
      totals: AssetTotalSeparately,
    },
    liabilities: {
      homeLoan,
      personalOtherLoans,
      vehicleLoans,
      taxLiability,
      creditCardDues,
      otherDebts,
      totals: LiabilityTotalSeparately,
    },
  } = useAppSelector((state) => state.NWCalculator);

  return (
    <main className="mt-10">
      <h1 className="text-[1.5rem] font-bold mb-3">Input Breakdown Data</h1>

      <section className="border-[1px] border-gray-300 p-5 rounded-md mb-10">
        <h3 className="font-bold text-center text-[1.2rem] mb-5">Assets</h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 text-[14px]">
          {/* Property */}
          {getArrayFromObject(property)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Property"
              data={getArrayFromObject(property)}
              total={AssetTotalSeparately?.property}
            />
          )}

          {/* Savings & Investments */}
          {getArrayFromObject(savingsInvestment)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Savings & Investments"
              data={getArrayFromObject(savingsInvestment)}
              total={AssetTotalSeparately?.savingsInvestment}
            />
          )}

          {/* Personal Items */}
          {getArrayFromObject(personalItems)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Personal Items"
              data={getArrayFromObject(personalItems)}
              total={AssetTotalSeparately?.personalItems}
            />
          )}

          {/* Business Interest */}
          {getArrayFromObject(businessOwnershipInterest)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Business Interest"
              data={getArrayFromObject(businessOwnershipInterest)}
              total={AssetTotalSeparately?.businessOwnershipInterest}
            />
          )}

          {/* Vehicles */}
          {getArrayFromObject(vehicles)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Vehicles"
              data={getArrayFromObject(vehicles)}
              total={AssetTotalSeparately?.vehicles}
            />
          )}

          {/* Other Assets */}
          {getArrayFromObject(otherAssets)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Other Assets"
              data={getArrayFromObject(otherAssets)}
              total={AssetTotalSeparately?.otherAssets}
            />
          )}
        </div>
      </section>

      <section className="border-[1px] border-gray-300 p-5 rounded-md">
        <h3 className="font-bold text-center text-[1.2rem] mb-5">
          Liabilities
        </h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 text-[14px]">
          {/* Home Loan */}
          {getArrayFromObject(homeLoan)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Home Loan"
              data={getArrayFromObject(homeLoan)}
              total={LiabilityTotalSeparately?.homeLoan}
            />
          )}

          {/* Personal & Other Loans */}
          {getArrayFromObject(personalOtherLoans)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Personal & Other Loans"
              data={getArrayFromObject(personalOtherLoans)}
              total={LiabilityTotalSeparately?.personalOtherLoans}
            />
          )}

          {/* Vehicle Loans */}
          {getArrayFromObject(vehicleLoans)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Vehicle Loans"
              data={getArrayFromObject(vehicleLoans)}
              total={LiabilityTotalSeparately?.vehicleLoans}
            />
          )}

          {/* Tax Liability */}
          {getArrayFromObject(taxLiability)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Tax liability"
              data={getArrayFromObject(taxLiability)}
              total={LiabilityTotalSeparately?.taxLiability}
            />
          )}

          {/* Credit Card Dues */}
          {getArrayFromObject(creditCardDues)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Credit Card Dues"
              data={getArrayFromObject(creditCardDues)}
              total={LiabilityTotalSeparately?.creditCardDues}
            />
          )}

          {/* Other Debts */}
          {getArrayFromObject(otherDebts)?.some(
            (item) => Number(item?.value) > 0
          ) && (
            <FinanceTable
              title="Other Debts"
              data={getArrayFromObject(otherDebts)}
              total={LiabilityTotalSeparately?.otherDebts}
            />
          )}
        </div>
      </section>
    </main>
  );
}
