import { Icon } from "@iconify/react/dist/iconify.js";

export default function CalculationCard() {
  return (
    <div className="space-y-[2rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] lg:w-[50%] w-full">
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-[1.25rem] font-bold md:mb-0 mb-3">
          Compounding Frequency
        </p>
        <div className="flex items-center justify-between gap-2 border-[1px] border-[#0000001A] px-[1.25rem] py-[10px] rounded-[10px] font-medium w-[140px] cursor-pointer">
          <select className="outline-none" name="frequency" id="frequency">
            <option value="Annually">Annually</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
        <p className="font-medium">Principle Amount</p>
        <div className="flex items-center">
          <Icon className="text-[1.2rem]" icon="mdi:dollar" />
          <p> 9999</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
        <p className="text-[1.25rem] font-medium">Total Interest</p>
        <div className="flex items-center">
          <Icon className="text-[1.2rem]" icon="mdi:dollar" />
          <p> 9999</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-black text-white px-[1.25rem] text-[1.25rem] rounded-[10px] py-[0.3rem]">
        <p className="text-[1.25rem] font-medium">Total Amount</p>
        <div className="flex items-center gap-[2px]">
          <Icon className="text-[1.2rem]" icon="mdi:dollar" />
          <p> 9999</p>
        </div>
      </div>
    </div>
  );
}
