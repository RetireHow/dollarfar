import { useAppSelector } from "../../redux/hooks";
import { getArrayFromObject } from "./nwc.utils";

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
          {/* Property  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Property</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(property)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{AssetTotalSeparately?.property}</td>
              </tr>
            </tbody>
          </table>
          {/* Savings & Investments  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Savings & Investments</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(savingsInvestment)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{AssetTotalSeparately?.savingsInvestment}</td>
              </tr>
            </tbody>
          </table>
          {/* Personal Items  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Personal Items</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(personalItems)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{AssetTotalSeparately?.personalItems}</td>
              </tr>
            </tbody>
          </table>
          {/* Business Interest  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Business Interest</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(businessOwnershipInterest)?.map(
                (item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-[1px] border-gray-300 p-2">
                        {item?.title}
                      </td>
                      <td className="border-[1px] border-gray-300 p-2">
                        {item?.value}
                      </td>
                    </tr>
                  );
                }
              )}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{AssetTotalSeparately?.businessOwnershipInterest}</td>
              </tr>
            </tbody>
          </table>
          {/* Vehicles  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Vehicles</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(vehicles)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{AssetTotalSeparately?.vehicles}</td>
              </tr>
            </tbody>
          </table>
          {/* Others Assets  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Others Assets</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(otherAssets)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{AssetTotalSeparately?.otherAssets}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-[1px] border-gray-300 p-5 rounded-md">
        <h3 className="font-bold text-center text-[1.2rem] mb-5">
          Liabilities
        </h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 text-[14px]">
          {/* Home Loan  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Home Loan</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(homeLoan)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{LiabilityTotalSeparately?.homeLoan}</td>
              </tr>
            </tbody>
          </table>
          {/* Personal & Other Loans  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Personal & Other Loans</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(personalOtherLoans)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{LiabilityTotalSeparately?.personalOtherLoans}</td>
              </tr>
            </tbody>
          </table>
          {/* Vehicle Loans */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Vehicle Loans</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(vehicleLoans)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{LiabilityTotalSeparately?.vehicleLoans}</td>
              </tr>
            </tbody>
          </table>
          {/* Tax liability  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Tax liability</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(taxLiability)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{LiabilityTotalSeparately?.taxLiability}</td>
              </tr>
            </tbody>
          </table>
          {/* Credit Card Dues  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Credit Card Dues</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(creditCardDues)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{LiabilityTotalSeparately?.creditCardDues}</td>
              </tr>
            </tbody>
          </table>
          {/* Other Debts  */}
          <table className="text-left md:w-auto w-full">
            <caption className="mb-1 font-bold">Other Debts</caption>
            <thead>
              <tr>
                <th className="border-[1px] border-gray-300 p-2">Name</th>
                <th className="border-[1px] border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {getArrayFromObject(otherDebts)?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.title}
                    </td>
                    <td className="border-[1px] border-gray-300 p-2">
                      {item?.value}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="border-[1px] border-gray-300 p-2">Total</td>
                <td className="border-[1px] border-gray-300 p-2">{LiabilityTotalSeparately?.otherDebts}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
