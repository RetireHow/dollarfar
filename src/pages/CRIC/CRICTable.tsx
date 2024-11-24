export default function CRICTable() {
  return (
    <section className="mt-[5rem]">
      <div className="overflow-x-auto">
        <table className="mb-[1.5rem] bg-[#F8F8F8] w-full rounded-[8px] text-center min-w-[600px] text-[14px]">
          <thead>
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <th className="p-3">Age</th>
              <th className="p-3">Canada Pension Plan</th>
              <th className="p-3">Employer Pension</th>
              <th className="p-3">Retirement savings</th>
              <th className="p-3">Other Income</th>
              <th className="p-3">Old Age Security</th>

              <th className="p-3">OAS Recovery Tax</th>
              <th className="p-3">Total Estimated Retirement Income</th>
              <th className="p-3">
                Difference Between Your Income Goal and Estimated Income
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <td className="p-3">50</td>
              <td className="p-3">$9000</td>
              <td className="p-3">$12000</td>
              <td className="p-3">5 %</td>
              <td className="p-3">3.5%</td>
              <td className="p-3">$8000</td>
              <td className="p-3">$8000</td>
              <td className="p-3">$8000</td>
              <td className="p-3">$8000</td>
            </tr>
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
