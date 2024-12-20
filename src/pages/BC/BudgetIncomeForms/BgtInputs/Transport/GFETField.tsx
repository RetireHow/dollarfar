import { useRef } from "react";
import { Icon } from "@iconify/react";
import useBudgetDynamicInput from "../../../../../hooks/useBudgetDynamicInput";
import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
import BCTotalDisplay from "../../../../../components/UI/BCTotalDisplay";

export const GFETField = () => {
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {
    transport: {
      totals: { gasFuelEtrToll },
      gasFuelEtrToll:{etrToll, fuel, gas}
    },
  } = useAppSelector((state) => state.budgetCalculator);
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
  });

  return (
    <div>
      {/* Main Input Field */}
      <BCTotalDisplay
        data={{
          showSubInputs,
          setShowSubInputs,
          total: gasFuelEtrToll as number,
          buttonText: "Add Expenses",
          fieldTitle: "Gas / Fuel / ETR Toll Roads",
          infoText:
            "Specify your take-home pay after taxes, deductions, and other adjustments.",
        }}
      />

      {/* Sub Input Fields */}
      {showSubInputs && (
        <div className="mt-3 text-[14px] flex gap-[1.5rem] overflow-x-auto pb-2">
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">Gas</span>{" "}
              <CustomTooltip title="For net earnings from a business after expenses are deducted" />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
              type="number"
              value={gas}
              placeholder={`${currency}0`}
              autoFocus
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "transport",
                    subCategory: "gasFuelEtrToll",
                    field: "gas",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">Fuel</span>{" "}
              <CustomTooltip title="For net earnings from a business after expenses are deducted" />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
              type="number"
              value={fuel}
              placeholder={`${currency}0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "transport",
                    subCategory: "gasFuelEtrToll",
                    field: "fuel",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">ETR Toll Roads</span>{" "}
              <CustomTooltip title="For net earnings from a business after expenses are deducted" />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
              type="number"
              value={etrToll}
              placeholder={`${currency}0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "transport",
                    subCategory: "gasFuelEtrToll",
                    field: "etrToll",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          {/* Dynamic Input Fields */}
          {dynamicInputs.map((input) => (
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
                name={input.label.trim().split(" ").join("")}
                value={input.value}
                placeholder={`${currency}0`}
                onChange={(e) =>
                  handleDynamicInputChange(
                    e,
                    input.id,
                    "transport",
                    "gasFuelEtrToll"
                  )
                }
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
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
                  autoFocus
                  onChange={handleInputChange}
                />
                <div className="flex items-center gap-3">
                  <button
                    className="bg-[#000000] text-white font-semibold rounded px-2 py-[2px]"
                    onClick={() =>
                      handleSaveInput({
                        category: "transport",
                        subCategory: "gasFuelEtrToll",
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
