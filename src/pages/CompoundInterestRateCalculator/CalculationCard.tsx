import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFrequency } from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CalculationCard() {
  const dispatch = useAppDispatch();
  const { frequency, compoundInterest, principal } = useAppSelector((state) => state.compoundInterest);
  return (
    <div className="space-y-[2rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] lg:w-[50%] w-full">
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-[1.25rem] font-bold md:mb-0 mb-3">
          Compounding Frequency
        </p>
        <div className="flex items-center justify-between gap-2 border-[1px] border-[#0000001A] px-[1.25rem] py-[10px] rounded-[10px] font-medium w-[140px] cursor-pointer">
          <select
            onChange={(e) => dispatch(setFrequency(Number(e.target.value)))}
            className="outline-none"
            name="frequency"
            id="frequency"
            defaultValue={frequency}
          >
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="52">Weekly</option>
            <option value="26">Bi-Weekly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
        <p className="font-medium">Principle Amount</p>
        <div className="flex items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{numberWithCommas(principal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
        <p className="text-[1.25rem] font-medium">Total Interest</p>
        <div className="flex items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{compoundInterest}</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-black text-white px-[1.25rem] text-[1.25rem] rounded-[10px] py-[0.3rem]">
        <p className="text-[1.25rem] font-medium">Total Amount</p>
        <div className="flex items-center gap-[2px]">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{(compoundInterest+principal).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
