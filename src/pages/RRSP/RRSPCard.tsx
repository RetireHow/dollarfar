export default function RRSPCard() {
  return (
    <section className="flex flex-col justify-center">
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between text-[1.5rem] font-semibold pb-4">
          <p>Result</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Initial RRIF Balance</p>
          <p>$500,000</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Rate of Return</p>
          <p>5%</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Remaining RRIF Balance (End of Withdrawal Period)</p>
          <p>$260,956</p>
        </div>

        <div className="flex items-center justify-between text-[1.25rem] font-medium">
          <p>Total Withdrawn Over Lifetime (Age 66 to 80)</p>
          <p>$247,651</p>
        </div>
      </div>
    </section>
  );
}
