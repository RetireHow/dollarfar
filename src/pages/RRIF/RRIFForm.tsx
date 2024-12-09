import ReactSlider from "react-slider";
import CustomTooltip from "../../components/UI/CustomTooltip";

import Select from "react-select";
import { StylesConfig } from "react-select";
import { Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  ageWithdrawalPercentages,
  updateRRIFState,
} from "../../redux/features/RRIF/RRIFSlice";
import { useEffect, useState } from "react";
import { numberWithCommas } from "../../utils/numberWithCommas";

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

export default function RRIFForm() {
  const dispatch = useAppDispatch();
  const {
    rateOfReturn,
    withdrawType,
    withdrawalStartYear,
    annualWithdrawalAmount,
    RRIFInitalBalance,
  } = useAppSelector((state) => state.RRIF);

  const [minWithdrowalAmount, setMinWithdrawalAbmount] = useState<number>(0);

  useEffect(() => {
    if (ageWithdrawalPercentages[withdrawalStartYear]) {
      const result =
        RRIFInitalBalance *
        (ageWithdrawalPercentages[withdrawalStartYear] / 100);
      setMinWithdrawalAbmount(Math.round(result));
    }
  }, [annualWithdrawalAmount, withdrawalStartYear]);


  return (
    <section className="space-y-[2rem]">
      <div>
        <label className="block mb-[0.5rem] font-semibold">
          Initial RRIF Balance
        </label>
        <input
          className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
          type="number"
          placeholder="$0"
          onWheel={(e) => e.currentTarget.blur()}
          onChange={(e) =>
            dispatch(
              updateRRIFState({
                key: "RRIFInitalBalance",
                value: Number(e.target.value),
              })
            )
          }
        />
      </div>

      {/* Slider - 2  */}
      <div>
        <div className="flex justify-between items-center mb-[1rem]">
          <h3 className="mb-[0.5rem] font-semibold">
            Rate of return (maximum value 16%)
          </h3>
          <div className="max-w-[80px] relative">
            <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
              type="number"
              placeholder="%0"
              onWheel={(e) => e.currentTarget.blur()}
              value={rateOfReturn}
              onChange={(e) =>
                dispatch(
                  updateRRIFState({
                    key: "rateOfReturn",
                    value: Number(e.target.value),
                  })
                )
              }
            />
            <span className="absolute top-2 right-8 font-extrabold">%</span>
          </div>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          thumbActiveClassName="active-thumb"
          min={0}
          max={16}
          value={rateOfReturn}
          minDistance={10}
          onChange={(newValue) =>
            dispatch(updateRRIFState({ key: "rateOfReturn", value: newValue }))
          }
        />
        <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
          <p>0%</p>
          <p>16%</p>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Withdraw Type</p>
        <div>
          <Radio.Group
            name="radiogroup"
            value={withdrawType}
            optionType="default"
            style={{ fontWeight: "bold" }}
            onChange={(e) =>
              dispatch(
                updateRRIFState({
                  key: "withdrawType",
                  value: e.target.value,
                })
              )
            }
          >
            <Radio value="Government">Required minimum based on age</Radio>
            <Radio value="Mannual">Optional Amount</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Withdrawal Start Age</p>
            <CustomTooltip title="Enter the year you plan to begin withdrawals from your RRIF." />
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="number"
            placeholder="Enter your start age"
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(e) =>
              dispatch(
                updateRRIFState({
                  key: "withdrawalStartYear",
                  value: Number(e.target.value),
                })
              )
            }
          />
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Withdrawal End Age</p>
            <CustomTooltip title="Specify the year you plan to end withdrawals." />
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="number"
            placeholder="Enter your end age"
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(e) =>
              dispatch(
                updateRRIFState({
                  key: "withdrawalEndYear",
                  value: Number(e.target.value),
                })
              )
            }
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Withdrawal Frequency</p>
          <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
        </div>
        <Select
          onChange={(value) =>
            dispatch(
              updateRRIFState({
                key: "withdrawalFrequency",
                value: value,
              })
            )
          }
          options={withdrawalFrequencyOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select withdrawal frequency"
          className="rounded-md border-[1px] duration-300 border-[#838383]"
        ></Select>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <p
            className={`font-semibold ${
              withdrawType === "Government" && "text-gray-300"
            }`}
          >
            Annual Withdrawal Amount
          </p>
          {withdrawType === "Mannual" && (
            <CustomTooltip title="Specify the amount you'd like to withdraw from your RRIF annually." />
          )}
        </div>
        <input
          className={`outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383] ${
            withdrawType === "Government" &&
            "cursor-not-allowed border-gray-200 text-gray-200"
          } duration-300`}
          type="number"
          placeholder="$0"
          onWheel={(e) => e.currentTarget.blur()}
          disabled={withdrawType === "Government" ? true : false}
          onChange={(e) => {
            dispatch(
              updateRRIFState({
                key: "annualWithdrawalAmount",
                value: Number(e.target.value),
              })
            );
          }}
        />
        {annualWithdrawalAmount > 0 && annualWithdrawalAmount < minWithdrowalAmount && (
          <p className="font-semibold text-[14px]  border-[1px] border-gray-500 p-3 rounded-md mt-1">
            Please select an income stream that is greater than the required minimum {numberWithCommas(minWithdrowalAmount)}
          </p>
        )}
      </div>

      {/* <button
        onClick={handleCalculate}
        className="bg-black text-white p-[0.8rem] rounded-[10px] w-[300px]"
      >
        Calculate
      </button> */}
    </section>
  );
}
