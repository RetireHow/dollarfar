import { useRef } from "react";
import { Icon } from "@iconify/react";
import useBudgetDynamicInput from "../../../../../hooks/useBudgetDynamicInput";
import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  updateBgtFrequency,
  updateField,
} from "../../../../../redux/features/BgtSlice/BgtSlice";
import { handleKeyDownUtil } from "../../../../../utils/handleKeyDownUtil";
import { Select } from "antd";
import { BCFrequencyOptions } from "../../../BCFrequencyOptions";

const SalaryWagesInputFields = () => {
  const dispatch = useAppDispatch();
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);
  const {
    income: {
      totals: { salaryOrWages },
      salaryOrWages: { salary1, wages },
      frequency,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  const { currency } = useAppSelector((state) => state.globalCurrency);

  const {
    newInput,
    dynamicInputs,
    handleSaveInput,
    handleInputChange,
    handleDynamicInputChange,
    handleRemoveNewInput,
    showNewInputField,
    showSubInputs,
    setShowSubInputs,
    handleAddNewInput,
  } = useBudgetDynamicInput({
    dynamicFieldTitleRef,
    categoryActive: "SalaryWages",
  });

  const handleShowInputs = () => {
    setShowSubInputs(!showSubInputs);
  };

  return (
    <div>
      {/* Main Input Field */}
      <div>
        <div className="flex justify-between items-center md:text-[1rem] text-[14px] mb-1 overflow-x-auto">
          <label
            className="flex items-center gap-1 font-semibold text-nowrap"
            htmlFor="property"
          >
            <span>Salary / Wages</span>{" "}
            <CustomTooltip title="Enter the combined monthly income from all employment sources, including regular wages and salaries." />
          </label>
          {/* No functionality on "Add Properties" button */}
          <button
            onClick={() => setShowSubInputs(!showSubInputs)}
            className="font-semibold flex items-center gap-1 text-nowrap"
          >
            {showSubInputs ? (
              // <Icon className="text-[1.25rem]" icon="ic:round-minus" />
              <Icon
                className="text-[1.5rem]"
                icon="iconamoon:arrow-up-2-light"
              />
            ) : (
              <Icon className="text-[1.25rem]" icon="ic:round-plus" />
            )}
            <span>Add Salary / Wages</span>
          </button>
        </div>

        <div className="flex gap-1">
          <div
            onClick={handleShowInputs}
            className="border-[1px] md:text-[1rem] text-[14px] border-[#838383] rounded-[8px] p-[0.6rem] cursor-pointer w-full"
          >
            Total: {currency}
            {salaryOrWages || "0.00"}
          </div>
          <div>
            <Select
              value={frequency}
              size="large"
              style={{ height: 45 }}
              className="rounded-[9px] md:w-[130px] w-[90px] hover:border-gray-400 border-[1px] border-gray-400 md:text-[1rem] text-[12px]"
              options={BCFrequencyOptions}
              suffixIcon={
                <Icon
                  className="md:text-[1.5rem] text-[1rem] text-gray-600"
                  icon="iconamoon:arrow-down-2"
                />
              }
              onChange={(value) =>
                dispatch(
                  updateBgtFrequency({
                    category: "income",
                    key: "frequency",
                    value,
                  })
                )
              }
            ></Select>
          </div>
        </div>
      </div>

      {/* Sub Input Fields */}
      {showSubInputs && (
        <div className="mt-3 text-[14px] flex gap-[1.5rem] overflow-x-auto pb-2">
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">Salary 1</span>{" "}
              <CustomTooltip title="Specify income from your primary employment or main source of salary." />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
              type="number"
              value={salary1}
              placeholder={`${currency}0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "income",
                    subCategory: "salaryOrWages",
                    field: "salary1",
                    value: e.target.value,
                  })
                )
              }
              onKeyDown={handleKeyDownUtil}
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="cottage"
            >
              <span className="text-nowrap">Wages</span>{" "}
              <CustomTooltip title="Include any additional income from hourly work, part-time jobs, or freelancing that contributes to your monthly budget." />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
              type="number"
              value={wages}
              placeholder={`${currency}0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "income",
                    subCategory: "salaryOrWages",
                    field: "wages",
                    value: e.target.value,
                  })
                )
              }
              onKeyDown={handleKeyDownUtil}
            />
          </div>

          {/* Dynamic Input Fields */}
          {dynamicInputs?.map((input) => (
            <div key={input.id}>
              <label
                className="flex items-center gap-1 font-semibold"
                htmlFor="realEstate"
              >
                <span className="text-nowrap">{input.label}</span>{" "}
                <Icon
                  className="text-[#838383] text-[1rem]"
                  icon="material-symbols:info-outline"
                />
              </label>
              <input
                className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
                type="number"
                name={input.label?.trim().split(" ").join("")}
                value={input.value}
                placeholder={`${currency}0`}
                onChange={(e) =>
                  handleDynamicInputChange(
                    e,
                    input.id,
                    "income",
                    "salaryOrWages"
                  )
                }
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
                onKeyDown={handleKeyDownUtil}
              />
            </div>
          ))}

          {/* New Dynamic Input Field */}
          {showNewInputField && (
            <div className="mt-3 flex flex-col items-center">
              <div className="flex items-center justify-between gap-4">
                <input
                  ref={dynamicFieldTitleRef}
                  className="border-[1px] border-[#838383] rounded-[5px]  px-1 py-[2px] flex-1"
                  type="text"
                  name="label"
                  value={newInput.label}
                  placeholder="Enter name"
                  onChange={handleInputChange}
                />
                <div className="flex items-center gap-3">
                  <button
                    className="bg-[#000000] text-white font-semibold rounded px-2 py-[2px]"
                    onClick={() =>
                      handleSaveInput({
                        category: "income",
                        subCategory: "salaryOrWages",
                      })
                    }
                  >
                    Save
                  </button>
                  <button onClick={handleRemoveNewInput}>
                    <Icon
                      className="text-[#FF0000] text-[1.7rem]"
                      icon="material-symbols:delete"
                    />
                  </button>
                </div>
              </div>
              <input
                className="border-[1px] border-[#838383] rounded-[8px] px-2 py-[2px]  mt-[2px] w-full"
                type="number"
                name="value"
                value={newInput.value}
                placeholder={`${currency}0`}
                onChange={handleInputChange}
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
                onKeyDown={handleKeyDownUtil}
              />
            </div>
          )}

          {/* "+ Add More" button in Sub-menu Container */}
          <div>
            <div className="mb-1 opacity-0">
              <label
                className="flex items-center gap-1 font-medium"
                htmlFor="property"
              >
                <span className="text-nowrap">Real Estate Assets</span>{" "}
                <Icon
                  className="text-[#838383] text-[1rem] min-w-[1rem] min-h-[1rem]"
                  icon="material-symbols:info-outline"
                />
              </label>
            </div>
            <button
              className="font-semibold text-nowrap border-[1px] border-[#E5E5E5] rounded-[8px] py-[0.2rem] px-[1rem]"
              onClick={handleAddNewInput}
            >
              <span className="text-[1.3rem] pr-1">+</span> Add More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryWagesInputFields;
