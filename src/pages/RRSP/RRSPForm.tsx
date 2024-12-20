import ReactSlider from "react-slider";
import CustomTooltip from "../../components/UI/CustomTooltip";

import Select from "react-select";
import { StylesConfig } from "react-select";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { calculate, setInput } from "../../redux/features/RRSP/RRSPSlice";
import { useState } from "react";
import { toast } from "react-toastify";

type TOptions = {
  label: string;
  value: string;
};

const customStyles: StylesConfig<TOptions, boolean> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
    borderRadius: "5px",
    padding: "1px",
  }),
  control: (provided) => ({
    ...provided,
    border: "0px solid #D9D9D9",
    boxShadow: "none",
    "&:hover": {
      border: "0px solid #D9D9D9",
    },
    padding: "0px 0",
    borderRadius: "0",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#000" : provided.backgroundColor,
    color: state.isSelected ? "#fff" : provided.color,
    "&:hover": {
      backgroundColor: state.isSelected ? "#000" : provided.backgroundColor,
    },
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#000", // Change this to the color you want for the arrow
    "&:hover": {
      color: "#000", // Optional: change color on hover if desired
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#858585", // Set the placeholder color
    fontWeight: "normal",
  }),
};

const withdrawalFrequencyOptions = [
  { label: "Monthly", value: "Monthly" },
  { label: "Annually", value: "Annually" },
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
  } = input;

  const { currency } = useAppSelector((state) => state.globalCurrency);

  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setInput({ ...input, [name]: parseFloat(value) }));
  };

  const handleCalculate = () => {
    if(currentAge >= retirementAge){
      toast.error("Current age can not be greater than retirement age.")
    }
    if (
      !currentAge ||
      !retirementAge ||
      !rateOfReturn ||
      !contributionFrequency.value ||
      currentAge >= retirementAge
    ) {
      return setShowError(true);
    }

    if (isNaN(currentRRSPSavings)) {
      dispatch(setInput({ ...input, currentRRSPSavings: 0 }));
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
            onChange={handleChange}
          />
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
            onChange={handleChange}
          />
          {showError && currentAge >= retirementAge && (
            <p className="text-[14px] text-red-500 font-bold mt-1">
              Must be greater than current age.
            </p>
          )}
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
          placeholder={`${currency}0`}
          onWheel={(e) => e.currentTarget.blur()}
          name="currentRRSPSavings"
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Ongoing Contribution Amount</p>
          <CustomTooltip title="Enter the amount you plan to contribute regularly to your RRSP. This can be weekly, monthly, or annually based on your selected frequency." />
        </div>
        <input
          className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
          type="number"
          placeholder={`${currency}0`}
          onWheel={(e) => e.currentTarget.blur()}
          name="contributionAmount"
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Contribution Frequency</p>
          <CustomTooltip title="Select how often you will contribute to your RRSP (e.g., weekly, bi-weekly, monthly, or annually). This affects the growth of your savings over time." />
        </div>
        <Select
          name="contributionFrequency"
          onChange={(value) =>
            dispatch(setInput({ ...input, contributionFrequency: value }))
          }
          value={contributionFrequency}
          // defaultValue={{ label: "Annually", value: "Annually" }}
          options={withdrawalFrequencyOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select contribution frequency"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[999]"
        ></Select>
      </div>

      {/* Slider - 1  */}
      <div>
        <div className="flex justify-between items-center mb-[1rem]">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Assumed Rate of Return</p>
            <CustomTooltip title="Estimate the annual rate of return you expect on your RRSP investments (e.g., 5%, 7%). Consider a realistic rate based on your investment strategy and risk tolerance." />
          </div>
          <div className="max-w-[80px] relative">
            <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}
              name="rateOfReturn"
              value={rateOfReturn}
              onChange={handleChange}
            />
            <p className="absolute right-8 top-2">%</p>
          </div>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          thumbActiveClassName="active-thumb"
          min={1}
          max={15}
          minDistance={10}
          value={rateOfReturn}
          onChange={(newValue) =>
            dispatch(setInput({ ...input, rateOfReturn: newValue }))
          }
        />
        <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
          <p>1%</p>
          <p>15%</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCalculate}
          disabled={
            !currentAge ||
            !retirementAge ||
            !rateOfReturn ||
            !contributionFrequency.value
              ? true
              : false
          }
          className={`text-white p-[0.8rem] rounded-[10px] text-[18px] w-[200px] ${
            !currentAge ||
            !retirementAge ||
            !rateOfReturn ||
            !contributionFrequency.value
              ? "bg-gray-300"
              : "bg-black"
          }`}
        >
          Calculate
        </button>
      </div>
    </section>
  );
}
