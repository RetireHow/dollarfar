import { message, Popconfirm, PopconfirmProps, Select } from "antd";
import CIRCTooltip from "./CIRCTooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  calculateCRIInvestmentReducer,
  clearCIRCFields,
  updateCRICField,
} from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import Error from "../../components/UI/Error";
import { handleKeyDownUtil } from "../../utils/handleKeyDownUtil";
import { delay } from "../../utils/delay";
import { toast } from "react-toastify";

type TOption = {
  label: string;
  value: string;
};
export const CIRCFrequencyOptions: TOption[] = [
  { value: "1", label: "Annually" },
  { value: "2", label: "Semi-Annually" },
  { value: "12", label: "Monthly" },
  { value: "52", label: "Weekly" },
  { value: "26", label: "Bi-weekly" },
  { value: "4", label: "Quarterly" },
  { value: "365", label: "Daily" },
];

interface TCRICFormProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isCalculationCompleted: boolean;
  setIsCalculationCompleted: Dispatch<SetStateAction<boolean>>;
}

const PopConfirm = () => {
  const dispatch = useAppDispatch();
  const confirm: PopconfirmProps["onConfirm"] = () => {
    dispatch(clearCIRCFields());
    message.success("All input fields are cleared!");
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.error("Fields are not cleared!");
  };
  return (
    <Popconfirm
      title="Clear the input fields."
      description="Are you sure to clear all input fields?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <button
        className="bg-green-700 text-white border-[1px] w-full  md:text-[1.25rem] text-[18px] duration-200 rounded-[10px] px-[1.5rem] h-[50px]"
        type="button"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Clear
      </button>
    </Popconfirm>
  );
};

function CIRCRedStar() {
  return <span className="text-red-500 text-[1.5rem] mx-1 absolute">*</span>;
}

export default function CRICForm({
  isLoading,
  setIsLoading,
  setIsCalculationCompleted,
}: TCRICFormProps) {
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();
  const {
    annualInterestRate,
    years,
    compoundingFrequency,
    contribution,
    contributionFrequency,
    initialInvestment,
  } = useAppSelector((state) => state.compoundInterest);
  const handleCalculate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // reset the local states
    setIsLoading(false);
    setIsCalculationCompleted(false);

    if (!Number(initialInvestment) || !Number(years)) {
      return setShowError(true);
    }

    setIsLoading(true);
    await delay(1000);
    setIsLoading(false);
    setIsCalculationCompleted(true);
    dispatch(calculateCRIInvestmentReducer());
    toast.success("Your investment calculation is complete!");
  };
  return (
    <form className="space-y-[2rem] border-[1px] border-gray-300 md:p-5 p-3 rounded-lg md:w-[70%] w-full m-auto shadow-md">
      <div>
        <div className="flex items-center mb-[0.5rem]">
          <label
            className="block font-semibold md:text-[1rem] text-[14px]"
            htmlFor="Initial-investment"
          >
            Initial principal amount
            <CIRCRedStar />
          </label>
          <CIRCTooltip title="The starting amount you invest or deposit. This is the base amount on which interest will be calculated." />
        </div>
        <input
          className={`outline-none border-[1px] border-[#d1d5db] px-[12px] py-[9px] w-full duration-300 rounded-[8px] `}
          type="number"
          id="Initial-investment"
          placeholder="$0.00"
          value={initialInvestment}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={handleKeyDownUtil}
          onChange={(e) => {
            dispatch(
              updateCRICField({
                key: "initialInvestment",
                value: e.target.value,
              })
            );
          }}
        />
        {showError && !Number(initialInvestment) && (
          <Error message="This field is required" />
        )}
      </div>

      <div>
        <div className="flex items-center mb-[0.5rem]">
          <label
            className="block font-semibold md:text-[1rem] text-[14px]"
            htmlFor="contribution-amount"
          >
            Ongoing contribution amount
          </label>
          <CIRCTooltip title="The additional amount you plan to add to your investment periodically. This can help grow your savings over time." />
        </div>
        <input
          className={`outline-none border-[1px] border-[#d1d5db] px-[12px] py-[9px] w-full duration-300 rounded-[8px] `}
          type="number"
          id="contribution-amount"
          placeholder="$0.00"
          value={contribution}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={handleKeyDownUtil}
          onChange={(e) => {
            dispatch(
              updateCRICField({
                key: "contribution",
                value: e.target.value,
              })
            );
          }}
        />
      </div>

      <div>
        <div className="flex items-center mb-[0.5rem]">
          <label className="block font-semibold md:text-[1rem] text-[14px]">
            Ongoing contribution frequency
          </label>
          <CIRCTooltip title="How often you will add the ongoing contribution to your investment (e.g., monthly, quarterly, annually)." />
        </div>

        <Select
          style={{
            height: 45,
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
          className="w-full"
          variant="borderless"
          options={CIRCFrequencyOptions}
          suffixIcon={
            <Icon
              className="md:text-[1.5rem] text-[1rem] text-gray-600"
              icon="iconamoon:arrow-down-2"
            />
          }
          onChange={(value) => {
            dispatch(
              updateCRICField({
                key: "contributionFrequency",
                value,
              })
            );
          }}
          value={contributionFrequency}
        ></Select>
      </div>

      <div>
        <div className="flex items-center mb-[0.5rem]">
          <label
            className="block font-semibold md:text-[1rem] text-[14px]"
            htmlFor="interest-rate"
          >
            Rate of interest
          </label>
          <CIRCTooltip title="The percentage at which your investment grows annually. This is the return provided by your investment or savings account." />
        </div>
        <div className="flex md:flex-row flex-col gap-3 items-center">
          <input
            className={`outline-none border-[1px] border-[#d1d5db] px-[12px] py-[9px] w-full duration-300 rounded-[8px] `}
            type="number"
            id="interest-rate"
            placeholder="0%"
            value={annualInterestRate}
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={handleKeyDownUtil}
            onChange={(e) => {
              dispatch(
                updateCRICField({
                  key: "annualInterestRate",
                  value: e.target.value,
                })
              );
            }}
          />
          <div className="border-[1px] border-[#d1d5db] px-[12px] pt-[20px] pb-[24px] w-full duration-300 rounded-[8px]">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              thumbActiveClassName="active-thumb"
              min={0}
              max={50}
              value={Number(annualInterestRate)}
              minDistance={10}
              onChange={(value) => {
                dispatch(
                  updateCRICField({
                    key: "annualInterestRate",
                    value: value.toString(),
                  })
                );
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-[0.5rem]">
          <label className="block font-semibold md:text-[1rem] text-[14px]">
            Interest is compounded
          </label>
          <CIRCTooltip title="The frequency at which interest is applied to your total balance (e.g., daily, monthly, quarterly, annually). More frequent compounding leads to faster growth." />
        </div>

        <Select
          defaultValue="1"
          style={{
            height: 45,
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
          className="w-full"
          variant="borderless"
          options={CIRCFrequencyOptions}
          suffixIcon={
            <Icon
              className="md:text-[1.5rem] text-[1rem] text-gray-600"
              icon="iconamoon:arrow-down-2"
            />
          }
          onChange={(value) => {
            dispatch(
              updateCRICField({
                key: "compoundingFrequency",
                value: value.toString(),
              })
            );
          }}
          value={compoundingFrequency}
        ></Select>
      </div>

      <div>
        <div className="flex items-center mb-[0.5rem]">
          <label
            className="block font-semibold md:text-[1rem] text-[14px]"
            htmlFor="interest-rate"
          >
            Years to grow
            <CIRCRedStar />
          </label>
          <CIRCTooltip title="The number of years you plan to keep the investment growing before withdrawing funds. Longer durations allow more time for compounding to maximize returns." />
        </div>
        <div className="flex md:flex-row flex-col items-center gap-3">
          <div>
            <input
              className={`outline-none border-[1px] border-[#d1d5db] px-[12px] py-[9px] w-full duration-300 rounded-[8px] `}
              type="number"
              id="interest-rate"
              placeholder="$0.00"
              value={years}
              onWheel={(e) => e.currentTarget.blur()}
              onKeyDown={handleKeyDownUtil}
              onChange={(e) => {
                dispatch(
                  updateCRICField({
                    key: "years",
                    value: e.target.value,
                  })
                );
              }}
            />
            {showError && !Number(years) && (
              <Error message="This field is required" />
            )}
          </div>
          <div className="border-[1px] border-[#d1d5db] px-[12px] pt-[20px] pb-[24px] w-full duration-300 rounded-[8px]">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              thumbActiveClassName="active-thumb"
              min={0}
              max={50}
              value={Number(years)}
              minDistance={10}
              onChange={(value) => {
                dispatch(
                  updateCRICField({
                    key: "years",
                    value: value.toString(),
                  })
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:items-center gap-5">
        <PopConfirm />
        <button
          onClick={handleCalculate}
          disabled={isLoading}
          className={`border-[1px] w-full  md:text-[1.25rem] text-[18px] duration-200 rounded-[10px] px-[1.5rem] h-[50px] flex items-center justify-center ${
            isLoading
              ? "bg-gray-200 text-white border-gray-200"
              : "bg-black text-white border-gray-600"
          }`}
        >
          {isLoading ? (
            <Icon icon="eos-icons:three-dots-loading" width="70" height="70" />
          ) : (
            "Calculate"
          )}
        </button>
      </div>
    </form>
  );
}
