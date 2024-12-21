import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CRICTable() {
  const { CRIBreakdownData } = useAppSelector((state) => state.CRICalculator);
  const { currency } = useAppSelector((state) => state.globalCurrency);

  return (
    <section className="mt-[5rem]">
      <div className="overflow-x-auto">
        <table className="mb-[1.5rem] bg-[#F8F8F8] w-full rounded-[8px] text-center min-w-[350px] text-[14px]">
          <thead>
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <th className="p-3">Age</th>
              <th className="p-3">Canada Pension Plan</th>
              <th className="p-3">Old Age Security</th>
              <th className="p-3">Total Estimated Retirement Income</th>
            </tr>
          </thead>
          <tbody>
            {CRIBreakdownData?.map(
              ({
                year,
                cppAmount,
                oasAmount,
              }: {
                year: number;
                cppAmount: number;
                oasAmount: number;
              }) => (
                <tr className="border-b-[1px] border-b-[#0000001A]">
                  <td className="p-3">{year}</td>
                  <td className="p-3">{currency}{numberWithCommas(Math.round(cppAmount || 0))}</td>
                  <td className="p-3">{currency}{numberWithCommas(Math.round(oasAmount))}</td>
                  <td className="p-3">
                    {currency}{numberWithCommas(Math.round((cppAmount || 0) + oasAmount))}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
