export default function RRIFTable() {
  return (
    <section>
      <div className="overflow-x-auto">
      <table className="mb-[1.5rem] bg-[#EAECF0] w-full rounded-[8px] text-center min-w-full">
        <thead>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <th className="p-3">Age</th>
            <th className="p-3">Balance at Beginning of the Year</th>
            <th className="p-3">Min Withdrawal Percentage</th>
            <th className="p-3">Min Withdrawal Amount</th>
            <th className="p-3">Balance at End of the Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <td className="p-3">71</td>
            <td className="p-3">$300,00</td>
            <td className="p-3">5.28%</td>
            <td className="p-3">$26,000</td>
            <td className="p-3">$256,000</td>
          </tr>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <td className="p-3">71</td>
            <td className="p-3">$300,00</td>
            <td className="p-3">5.28%</td>
            <td className="p-3">$26,000</td>
            <td className="p-3">$256,000</td>
          </tr>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <td className="p-3">71</td>
            <td className="p-3">$300,00</td>
            <td className="p-3">5.28%</td>
            <td className="p-3">$26,000</td>
            <td className="p-3">$256,000</td>
          </tr>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <td className="p-3">71</td>
            <td className="p-3">$300,00</td>
            <td className="p-3">5.28%</td>
            <td className="p-3">$26,000</td>
            <td className="p-3">$256,000</td>
          </tr>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <td className="p-3">71</td>
            <td className="p-3">$300,00</td>
            <td className="p-3">5.28%</td>
            <td className="p-3">$26,000</td>
            <td className="p-3">$256,000</td>
          </tr>
          <tr className="border-b-[1px] border-b-[#0000001A]">
            <td className="p-3">71</td>
            <td className="p-3">$300,00</td>
            <td className="p-3">5.28%</td>
            <td className="p-3">$26,000</td>
            <td className="p-3">$256,000</td>
          </tr>
        </tbody>
      </table>
      </div>

      <p className="font-semibold text-[1.1rem] text-center leading-[2rem]">
        After 25 years, the RRIF balance will reduce gradually, providing steady
        withdrawals and accounting for the return rate. At the end of 25 years,
        the remaining balance may be $5,00,000, depending on actual return rates
        and withdrawals.
      </p>
    </section>
  );
}
