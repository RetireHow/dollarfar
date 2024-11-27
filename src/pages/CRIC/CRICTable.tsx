import { useAppSelector } from "../../redux/hooks";

export default function CRICTable() {
  const { oasBreakdown } = useAppSelector((state) => state.CRICalculator);
  return (
    <section className="mt-[5rem]">
      <div className="overflow-x-auto">
        <table className="mb-[1.5rem] bg-[#F8F8F8] w-full rounded-[8px] text-center min-w-[600px] text-[14px]">
          <thead>
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <th className="p-3">Age</th>
              <th className="p-3">Canada Pension Plan</th>
              <th className="p-3">Retirement savings</th>
              <th className="p-3">Total Estimated Retirement Income</th>
            </tr>
          </thead>
          <tbody>
            {oasBreakdown.map(
              (item: {
                age: number;
                annualCPPAmount: number;
                annualRetirementSavingsAmount: number;
                totalEstimatedRetirementIncome: number;
              }) => (
                <tr className="border-b-[1px] border-b-[#0000001A]">
                  <td className="p-3">{item.age}</td>
                  <td className="p-3">${item.annualCPPAmount}</td>
                  <td className="p-3">${item.annualRetirementSavingsAmount}</td>
                  <td className="p-3">${item.totalEstimatedRetirementIncome}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <p className="font-semibold text-[1.1rem] text-center leading-[2rem]">
        By age 65, you will need approximately $1.125 million in retirement
        savings to maintain your desired lifestyle.
      </p>
    </section>
  );
}
