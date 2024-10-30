import { useRef } from "react";
import { Icon } from "@iconify/react";
import useBudgetDynamicInput from "../../../../../hooks/useBudgetDynamicInput";
import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";

type TOption = {
  label: string;
  value: string;
};
const selectOptions: TOption[] = [
  { value: "Weekly", label: "Weekly" },
  { value: "Biweekly", label: "Biweekly" },
  { value: "Twice a month", label: "Twice a month" },
  { value: "Monthly", label: "Monthly" },
  { value: "Annually", label: "Annually" },
  { value: "Other", label: "Other" },
];

export const RepairsField = () => {
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const {
    housing: {
      totals: { repairsOrMaintenance },
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
      <div>
        <div className="flex justify-between items-center text-[1rem] mb-1 overflow-x-auto">
          <label
            className="flex items-center gap-1 font-semibold"
            htmlFor="property"
          >
            <span className="text-nowrap">Repairs / Maintenances</span>{" "}
            <CustomTooltip title="Combined monthly cost for home repairs and maintenance." />
          </label>
          {/* No functionality on "Add Properties" button */}
          <button
            onClick={() => setShowSubInputs(!showSubInputs)}
            className="font-semibold flex items-center gap-1"
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
            <span className="text-nowrap">Add Expenses</span>
          </button>
        </div>

        <div className="flex gap-1">
          <input
            className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
            type="text"
            value={repairsOrMaintenance}
            disabled
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          <div>
            <Select
              defaultValue="Weekly"
              size="large"
              style={{ width: 130, height: 45, border: "1px solid gray" }}
              className="rounded-[9px]"
              options={selectOptions}
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

      {/* Sub Input Fields */}
      {showSubInputs && (
        <div className="mt-3 text-[14px] flex gap-[1.5rem] overflow-x-auto pb-2">
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">Repairs</span>{" "}
              <CustomTooltip title="Expenses for necessary repairs to your property." />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
              type="number"
              placeholder="$0"
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "housing",
                    subCategory:"repairsOrMaintenance",
                    field: "repairs",
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
              <span className="text-nowrap">Maintenances</span>{" "}
              <CustomTooltip title="Regular maintenance costs for your property." />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
              type="number"
              placeholder="$0"
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    category: "housing",
                    subCategory:"repairsOrMaintenance",
                    field: "maintenances",
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
                className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
                type="number"
                name={input.label.trim().split(" ").join("")}
                value={input.value}
                placeholder="$0"
                onChange={(e) =>
                  handleDynamicInputChange(
                    e,
                    input.id,
                    "income",
                    "repairsOrMaintenance"
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
                  className="border-[1px] border-[#838383] rounded-[5px] outline-none px-1 py-[2px] flex-1"
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
                        category: "housing",
                        subCategory: "repairsOrMaintenance",
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
                className="border-[1px] border-[#838383] rounded-[8px] px-2 py-[2px] outline-none mt-[2px] w-full"
                type="number"
                name="value"
                value={newInput.value}
                placeholder="$0"
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
