export default function RRIFCard() {
  return (
    <section className="flex flex-col justify-center">
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between text-[1.25rem] pb-4">
          <p className="font-semibold">Result</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="font-medium">Minimum first month withdrawal</p>
          <div className="flex items-center">
            <p>$</p>
            <p>{77}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">Minimum first annual withdrawal</p>
          <div className="flex items-center">
            <p>$</p>
            <p>{77}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[1.25rem]">
          <p className="text-[1.25rem] font-medium">Remaining amount</p>
          <div className="flex items-center">
            <p>$</p>
            <p>{77}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
