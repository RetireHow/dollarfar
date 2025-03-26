import ReactSlider from "react-slider";
import CustomTooltip from "../../components/UI/CustomTooltip";

import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { calculate, setInput } from "../../redux/features/RRSP/RRSPSlice";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ShowNegativeMessage from "../../components/UI/ShowNegativeMessage";
import { isNegative } from "../../utils/isNegative";

type TAntSelectOption = {
  value: string;
  label: string;
};

export const antSelectFrequencyOptions: TAntSelectOption[] = [
  { value: "1", label: "Annually" },
  { value: "2", label: "Semi-Annually" },
  { value: "12", label: "Monthly" },
  { value: "4", label: "Quarterly" },
  { value: "52", label: "Weekly" },
  { value: "26", label: "Bi-weekly" },
];

export default function RRSPForm() {
  const dispatch = useAppDispatch();
  const { input } = useAppSelector((state) => state.rrspCalculator);
  const {
    contributionFrequency,
    currentAge,
    currentRRSPSavings,
    rateOfReturn,
    retirementAge,
    contributionAmount,
  } = input;

  const [showError, setShowError] = useState(false);

  const handleCalculate = () => {
    if (
      !currentAge ||
      !retirementAge ||
      (currentAge && currentAge > retirementAge)
    ) {
      return setShowError(true);
    }
    dispatch(calculate());
  };

  return (
    <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Current Age (Years)</p>
            <CustomTooltip title="Enter your current age in years. This helps calculate the time available for your savings to grow before retirement." />
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="number"
            placeholder="Enter current age"
            onWheel={(e) => e.currentTarget.blur()}
            name="currentAge"
            onChange={(e) => {
              dispatch(
                setInput({
                  key: "currentAge",
                  value: e.target.value,
                })
              );
            }}
            value={currentAge}
          />
          {!currentAge && showError && (
            <p className="text-red-500 text-[14px] font-bold">
              This field is required.
            </p>
          )}
          <ShowNegativeMessage input={currentAge} />
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Your plan to Retire in (Years)</p>
            <CustomTooltip title="Specify the number of years from now when you plan to retire. This determines your investment horizon." />
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="number"
            placeholder="Enter retirement age"
            onWheel={(e) => e.currentTarget.blur()}
            name="retirementAge"
            onChange={(e) => {
              dispatch(
                setInput({
                  key: "retirementAge",
                  value: e.target.value,
                })
              );
            }}
            value={retirementAge}
          />
          {showError &&
            Number(currentAge) > 0 &&
            Number(currentAge) >= Number(retirementAge) && (
              <p className="text-[14px] text-red-500 font-bold mt-1">
                Must be greater than current age.
              </p>
            )}
          {!retirementAge && showError && (
            <p className="text-red-500 text-[14px] font-bold">
              This field is required.
            </p>
          )}
          <ShowNegativeMessage input={retirementAge} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Current RRSP Savings</p>
          <CustomTooltip title="Provide the current total amount saved in your RRSP. This will serve as the starting point for calculations." />
        </div>
        <input
          className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
          type="number"
          placeholder={`0`}
          onWheel={(e) => e.currentTarget.blur()}
          name="currentRRSPSavings"
          onChange={(e) => {
            dispatch(
              setInput({
                key: "currentRRSPSavings",
                value: e.target.value,
              })
            );
          }}
          value={currentRRSPSavings}
        />
        <ShowNegativeMessage input={currentRRSPSavings} />
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Ongoing Contribution Amount</p>
          <CustomTooltip title="Enter the amount you plan to contribute regularly to your RRSP. This can be weekly, monthly, or annually based on your selected frequency." />
        </div>
        <input
          className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
          type="number"
          placeholder={`0`}
          onWheel={(e) => e.currentTarget.blur()}
          name="contributionAmount"
          onChange={(e) => {
            dispatch(
              setInput({
                key: "contributionAmount",
                value: e.target.value,
              })
            );
          }}
          value={contributionAmount}
        />
        <ShowNegativeMessage input={contributionAmount} />
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Contribution Frequency</p>
          <CustomTooltip title="Select how often you will contribute to your RRSP (e.g., weekly, bi-weekly, monthly, or annually). This affects the growth of your savings over time." />
        </div>
        <Select
          size="large"
          style={{
            height: 40,
            width: "100%",
            border: "1px solid #838383",
            borderRadius: "8px",
          }}
          variant="borderless"
          placeholder="Select ongoing frequency"
          options={antSelectFrequencyOptions}
          suffixIcon={
            <Icon
              className="text-[1.5rem] text-gray-600"
              icon="iconamoon:arrow-down-2"
            />
          }
          onChange={(value) => {
            dispatch(
              setInput({
                key: "contributionFrequency",
                value: value,
              })
            );
          }}
          value={contributionFrequency}
        ></Select>
      </div>

      {/* Slider - 1  */}
      <div>
        <div className="flex justify-between items-center mb-[1rem]">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Assumed Rate of Return</p>
            <CustomTooltip title="Estimate the annual rate of return you expect on your RRSP investments (e.g., 5%, 7%). Consider a realistic rate based on your investment strategy and risk tolerance." />
          </div>
          <div
            className={`relative ${
              isNegative(Number(rateOfReturn))
                ? "border-[2px] border-red-500 rounded-[10px]"
                : ""
            }`}
          >
            <input
              className="font-bold md:text-[1.2rem] no-spinner text-right text-[14px] bg-[#F8F8F8] rounded-[10px] pr-[1.8rem] py-[0.5rem] max-w-[80px] outline-none"
              type="number"
              placeholder="0"
              name="rateOfReturn"
              value={rateOfReturn}
              onChange={(e) => {
                dispatch(
                  setInput({
                    key: "rateOfReturn",
                    value: e.target.value,
                  })
                );
              }}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
            />
            <p className="absolute right-2 top-[8px] font-semibold md:text-[1.2rem] text-[14px]">
              %
            </p>
          </div>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          thumbActiveClassName="active-thumb"
          min={0}
          max={15}
          minDistance={10}
          value={Number(rateOfReturn)}
          onChange={(newValue) =>
            dispatch(
              setInput({ key: "rateOfReturn", value: newValue.toString() })
            )
          }
        />
        <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
          <p>1%</p>
          <p>15%</p>
        </div>
      </div>

      <div>
        <button
          onClick={handleCalculate}
          className={`text-white p-[0.8rem] rounded-[10px] text-[18px] w-full bg-black`}
        >
          Calculate
        </button>
      </div>
    </section>
  );
}
