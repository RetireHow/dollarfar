import { Icon } from "@iconify/react";
import { useRef } from "react";
import useBudgetDynamicInput from "../../../../../hooks/useBudgetDynamicInput";

export const AddMoreHousingField = () => {
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);
  const {
    newInput,
    dynamicInputs,
    handleSaveInput,
    handleInputChange,
    handleDynamicInputChange,
    handleRemoveNewInput,
    showNewInputField,
    handleAddNewInput,
  } = useBudgetDynamicInput({ dynamicFieldTitleRef });

  return (
    <div>
      {/* Sub Input Fields */}
      <div className="text-[1rem] gap-[1.5rem] overflow-x-auto pb-2">
        {/* Dynamic Input Fields */}
        {dynamicInputs.map((input) => (
          <div key={input.id} className="mb-[2rem] mt-[1rem]">
            <label
              className="flex items-center gap-1 font-semibold mb-1"
              htmlFor="realEstate"
            >
              <span className="text-nowrap font-semibold">{input.label}</span>{" "}
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
              onChange={(e) => handleDynamicInputChange(e, input.id, "housing")}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
            />
          </div>
        ))}

        {/* New Dynamic Input Field */}
        {showNewInputField && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between gap-4 w-full">
              <input
                ref={dynamicFieldTitleRef}
                className="border-[1px] border-[#838383] rounded-[5px] outline-none px-1 py-[2px] flex-1"
                type="text"
                name="label"
                value={newInput.label}
                placeholder="Housing Expense Title"
                onChange={handleInputChange}
              />
              <div className="flex items-center gap-3">
                <button
                  className="bg-[#000000] text-white font-semibold rounded px-2 py-[2px]"
                  onClick={() => handleSaveInput({ category: "housing" })}
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
              className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none mt-1 w-full"
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
          <button
            className="font-semibold text-nowrap border-[1px] border-[#E5E5E5] rounded-[8px] py-[0.2rem] px-[1rem]"
            onClick={handleAddNewInput}
          >
            <span className="text-[1.3rem] pr-1">+</span> Add More Housing
          </button>
        </div>
      </div>
    </div>
  );
};