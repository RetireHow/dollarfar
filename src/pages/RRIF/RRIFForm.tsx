import ReactSlider from "react-slider";
import CustomTooltip from "../../components/UI/CustomTooltip";

// import Select from "react-select";
// import { StylesConfig } from "react-select";

import { ConfigProvider, Radio, theme as antdTheme } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  ageWithdrawalPercentages,
  calculateRRIF,
  updateRRIFState,
} from "../../redux/features/RRIF/RRIFSlice";
import { FormEvent, useEffect, useState } from "react";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { handleKeyDown } from "../../utils/handleKeyDown";
import { isNegative } from "../../utils/isNegative";
import { toast } from "react-toastify";
import { TRRIFState } from "../../redux/features/RRIF/RRIF.types";

export default function RRIFForm() {
  const dispatch = useAppDispatch();
  const {
    rateOfReturn,
    withdrawType,
    withdrawalStartYear,
    withdrawalEndYear,
    annualWithdrawalAmount,
    RRIFInitalBalance,
  } = useAppSelector((state) => state.RRIF);

  const [minWithdrowalAmount, setMinWithdrawalAbmount] = useState<number>(0);

  const [showError, setShowError] = useState(false);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    if (
      !RRIFInitalBalance ||
      !withdrawType ||
      !withdrawalStartYear ||
      !withdrawalEndYear ||
      isNegative(Number(RRIFInitalBalance)) ||
      isNegative(Number(withdrawalStartYear)) ||
      isNegative(Number(withdrawalEndYear)) ||
      isNegative(Number(rateOfReturn)) ||
      isNegative(Number(annualWithdrawalAmount))
    ) {
      return setShowError(true);
    }

    if (withdrawalStartYear && Number(withdrawalStartYear) < 50) {
      return toast.error(
        "Withdrawal start age must be greater than or equal to 50."
      );
    }

    if (ageWithdrawalPercentages[Number(withdrawalStartYear)]) {
      const result =
        Number(RRIFInitalBalance) *
        (ageWithdrawalPercentages[Number(withdrawalStartYear)] / 100);
      setMinWithdrawalAbmount(Math.round(result));
    }
    dispatch(calculateRRIF());

    //Save inputs into local storage
    const inputs = {
      rateOfReturn,
      withdrawType,
      withdrawalStartYear,
      withdrawalEndYear,
      annualWithdrawalAmount,
      RRIFInitalBalance,
    };
    const inputsString = JSON.stringify(inputs);
    localStorage.setItem("RRIFInputs", inputsString);
  };

  useEffect(() => {
    const inputsString = localStorage.getItem("RRIFInputs");
    if (!inputsString) {
      return;
    }
    const inputs = JSON.parse(inputsString as string);
    Object.entries(inputs)?.forEach((input) => {
      dispatch(
        updateRRIFState({
          key: input[0] as keyof TRRIFState,
          value: input[1] as string,
        })
      );
    });
  }, []);

  return (
    <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
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
                value: e.target.value,
              })
            )
          }
          onKeyDown={handleKeyDown}
          value={RRIFInitalBalance}
        />
        {isNegative(Number(RRIFInitalBalance)) && showError && (
          <p className="text-red-500 text-[14px] font-bold">
            Initial RRIF Balance can not be negative
          </p>
        )}
        {showError && !RRIFInitalBalance && (
          <p className="text-red-500 text-[14px] font-bold">
            This field is required.
          </p>
        )}
      </div>

      {/* Slider - 2  */}
      <div>
        <div className="flex justify-between items-center mb-[1rem]">
          <h3 className="mb-[0.5rem] font-semibold">
            Rate of return (maximum value 16%)
          </h3>
          <div className="relative">
            <input
              className="font-bold md:text-[1.2rem] no-spinner text-right text-[14px] bg-[#F8F8F8] rounded-[10px] pr-[1.8rem] py-[0.5rem] max-w-[80px] outline-none"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}
              value={rateOfReturn || ""}
              onChange={(e) =>
                dispatch(
                  updateRRIFState({
                    key: "rateOfReturn",
                    value: e.target.value,
                  })
                )
              }
              onKeyDown={handleKeyDown}
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
          max={16}
          value={Number(rateOfReturn)}
          minDistance={10}
          onChange={(newValue) =>
            dispatch(updateRRIFState({ key: "rateOfReturn", value: newValue.toString() }))
          }
        />
        <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
          <p>0%</p>
          <p>16%</p>
        </div>
        {isNegative(Number(rateOfReturn)) && showError && (
          <p className="text-red-500 text-[14px] font-bold">
            Rate of return can not be negative
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold mb-2">Withdraw Type</p>
        <div>
          <ConfigProvider
            theme={{
              algorithm:
                localStorage.getItem("theme") == "dark"
                  ? antdTheme.darkAlgorithm
                  : antdTheme.defaultAlgorithm,
            }}
          >
            <Radio.Group
              name="radiogroup"
              value={withdrawType}
              optionType="default"
              style={{ fontWeight: "bold" }}
              onChange={(e) => {
                dispatch(
                  updateRRIFState({
                    key: "withdrawType",
                    value: e.target.value,
                  })
                );
              }}
            >
              <Radio className="md:mb-0 mb-3" value="Government">
                Required minimum based on age
              </Radio>
              <Radio value="Mannual">Optional Amount</Radio>
            </Radio.Group>
          </ConfigProvider>
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
                  value: e.target.value,
                })
              )
            }
            onKeyDown={handleKeyDown}
            value={withdrawalStartYear}
          />
          {isNegative(Number(withdrawalStartYear)) && showError && (
            <p className="text-red-500 text-[14px] font-bold">
              Withdrawal Start Age can not be negative
            </p>
          )}
          {showError && !withdrawalStartYear && (
            <p className="text-red-500 text-[14px] font-bold">
              This field is required.
            </p>
          )}
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
                  value: e.target.value,
                })
              )
            }
            onKeyDown={handleKeyDown}
            value={withdrawalEndYear}
          />
          {isNegative(Number(withdrawalEndYear)) && showError && (
            <p className="text-red-500 text-[14px] font-bold">
              Withdrawal End Age can not be negative
            </p>
          )}
          {showError && !withdrawalEndYear && (
            <p className="text-red-500 text-[14px] font-bold">
              This field is required.
            </p>
          )}
        </div>
      </div>

      {withdrawType == "Mannual" && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="font-bold">Annual Withdrawal Amount</p>
            <CustomTooltip title="Specify the amount you'd like to withdraw from your RRIF annually." />
          </div>
          <input
            className={`outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]`}
            type="number"
            placeholder="$0"
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(e) => {
              dispatch(
                updateRRIFState({
                  key: "annualWithdrawalAmount",
                  value: e.target.value,
                })
              );
            }}
            onKeyDown={handleKeyDown}
            value={annualWithdrawalAmount}
          />
          {Number(annualWithdrawalAmount) > 0 &&
            Number(annualWithdrawalAmount) < minWithdrowalAmount && (
              <p className="font-semibold text-[14px]  border-[1px] border-gray-500 p-3 rounded-md mt-1">
                Please select an income stream that is greater than the required
                minimum {numberWithCommas(minWithdrowalAmount)}
              </p>
            )}
          {isNegative(Number(annualWithdrawalAmount)) && showError && (
            <p className="text-red-500 text-[14px] font-bold">
              Withdrawal Amount can not be negative
            </p>
          )}
        </div>
      )}

      <div>
        <button
          onClick={handleCalculate}
          className={`text-[18px] text-white p-[0.8rem] rounded-[10px] w-full bg-black`}
        >
          Calculate
        </button>
      </div>
    </section>
  );
}
