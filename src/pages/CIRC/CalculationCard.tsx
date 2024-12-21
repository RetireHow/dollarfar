import { Select } from "antd";
import {
  calculateCompoundInterest,
  calculateInterestBreakdown,
  setFrequency,
} from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

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
  const { frequency, compoundInterest, totalAmount, principal } =
    useAppSelector((state) => state.compoundInterest);
  const { currency } = useAppSelector((state) => state.globalCurrency);

  useEffect(() => {
    if (totalAmount) {
      dispatch(calculateCompoundInterest());
      dispatch(calculateInterestBreakdown());
    }
  }, [frequency]);

  return (
    <div className="space-y-[2rem] bg-[#F8F8F8] md:p-[1.5rem] p-[0.8rem] rounded-[10px] lg:w-[50%] w-full">
      <div className="flex justify-between items-center flex-wrap gap-1">
        <p className="md:text-[1.25rem] text-[18px] font-bold md:mb-0 mb-1">
          Compounding Frequency
        </p>
        <div className="lg:w-auto w-full">
          <div>
            <Select
              defaultValue={frequency}
              size="large"
              // style={{ width: 130, height: 45, border: "1px solid gray" }}
              className="!border-none md:w-[130px] w-full h-[45px] border-[1px] border-gray-300"
              onChange={(value) => dispatch(setFrequency(value))}
              options={frequencyOptions}
              suffixIcon={
                <Icon
                  className="text-[1.5rem] text-gray-600"
                  icon="iconamoon:arrow-down-2"
                />
              }
            ></Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[14px] pb-8">
        <p className="font-medium">Principle Amount</p>
        <div className="flex items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>{currency}</p>
          <p>{numberWithCommas(principal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[14px] pb-8">
        <p className="md:text-[1.25rem] text-[14px] font-medium">
          Total Interest
        </p>
        <div className="flex items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>{currency}</p>
          <p>{numberWithCommas(compoundInterest)}</p>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-between bg-black text-white md:px-[1.25rem] px-[0.5rem] md:text-[1.25rem] text-[1rem] rounded-[10px] h-[50px]">
        <p className="md:text-[1.25rem] text-[1rem] font-medium">
          Total Amount
        </p>
        <div className="flex items-center gap-[2px] md:text-[1.25rem] text-[18px]">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>{currency}</p>
          <p>{numberWithCommas(totalAmount)}</p>
        </div>
      </div>
    </div>
  );
}
