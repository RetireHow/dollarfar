

export default function NWTotal() {
  return (
    <div>
      <h3 className="text-[2rem] font-bold mb-[0.5rem]">Net worth</h3>
      <div className="bg-[#F8F8F8] rounded-[10px] p-[1.5rem] space-y-[1.5rem]">
        <div className="text-[1.25rem] flex items-center justify-between">
          <p>Assets</p>
          <p>$8,555</p>
        </div>
        <div className="text-[1.25rem] flex items-center justify-between">
          <p>Liabilities</p>
          <p>$8,555</p>
        </div>
        <div className="bg-black text-white text-[1.25rem] flex items-center justify-between px-[1rem] py-[0.6rem] rounded-[10px]">
          <p>Liabilities</p>
          <p>$8,555</p>
        </div>
      </div>
    </div>
  )
}
