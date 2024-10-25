import { Select } from "antd";
import { setFrequency } from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Icon } from "@iconify/react/dist/iconify.js";

type TOption = {
  label: string;
  value: number;
};

const frequencyOptions: TOption[] = [
  { value: 1, label: "Annually" },
  { value: 4, label: "Quarterly" },
  { value: 12, label: "Monthly" },
  { value: 52, label: "Weekly" },
  { value: 26, label: "Bi-Weekly" },
  { value: 365, label: "Daily" },
];

export default function CalculationCard() {
  const dispatch = useAppDispatch();
  const { frequency, compoundInterest, principal } = useAppSelector(
    (state) => state.compoundInterest
  );
  return (
    <div className="space-y-[2rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] lg:w-[50%] w-full">
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-[1.25rem] font-bold md:mb-0 mb-3">
          Compounding Frequency
        </p>
        <div>
          <div>
            <Select
              defaultValue={frequency}
              size="large"
              style={{ width: 130, height: 45, border: "1px solid gray"}}
              className="custom-select"
              onChange={(value) => dispatch(setFrequency(value))}
              options={frequencyOptions}
              suffixIcon={<Icon className="text-[1.5rem]" icon="iconamoon:arrow-down-2" />}
            ></Select>
          </div>
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

      <div className="flex items-center justify-between bg-black text-white px-[1.25rem] text-[1.25rem] rounded-[10px] h-[50px]">
        <p className="text-[1.25rem] font-medium">Total Amount</p>
        <div className="flex items-center gap-[2px]">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{(compoundInterest + principal).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
