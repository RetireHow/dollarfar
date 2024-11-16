import { Icon } from "@iconify/react";
import CustomTooltip from "../../../components/UI/CustomTooltip";
import { useAppDispatch } from "../../../redux/hooks";
import { updateLiabilities } from "../../../redux/features/NWSlice/NWSlice";
import { useRef } from "react";
import useDynamicInput from "../../../hooks/useDynamicInput";

const OtherDebtsFields = () => {
  const dispatch = useAppDispatch();
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
  } = useDynamicInput({
    category: "otherDebts",
    dynamicFieldTitleRef,
    type: "Liabilities",
  });

  return (
    <div>
      {/* Main Input Field */}
      <div className="flex justify-between items-center text-[1rem] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Other Debts</span>{" "}
          <CustomTooltip title="Outstanding medical bills, business loan balance (if applicable) and any other miscellaneous debts" />
        </label>
      </div>
      <input
        className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
        type="number"
        placeholder="$0"
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          e.currentTarget.blur()
        }
        onChange={(e) =>
          dispatch(
            updateLiabilities({
              category: "otherDebts",
              key: "otherDebt",
              value: Number(e.target.value),
            })
          )
        }
      />

      {/* Sub Input Fields */}
      <div className="mt-3 text-[14px] gap-[1.5rem] overflow-x-auto pb-2">
        {/* Dynamic Input Fields */}
        {dynamicInputs.map((input) => (
          <div key={input.id} className="mb-[2rem] mt-[1rem]">
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">{input.label}</span>{" "}
              <Icon
                className="text-[#838383] text-[1rem]"
                icon="material-symbols:info-"
              />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem]  w-full"
              type="number"
              name={input.label.trim().split(" ").join("")}
              value={input.value}
              placeholder="$0"
              onChange={(e) => handleDynamicInputChange(e, input.id)}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
            />
          </div>
        ))}

        {/* New Dynamic Input Field */}
        {showNewInputField && (
          <div className="mt-3 flex flex-col items-center">
            <div className="flex items-center justify-between gap-4 w-full">
              <input
                ref={dynamicFieldTitleRef}
                className="border-[1px] border-[#838383] rounded-[5px]  px-1 py-[2px] flex-1"
                type="text"
                name="label"
                value={newInput.label}
                placeholder="Debt Name"
                onChange={handleInputChange}
              />
              <div className="flex items-center gap-3">
                <button
                  className="bg-[#000000] text-white font-semibold rounded px-2 py-[2px]"
                  onClick={handleSaveInput}
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
              className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem]  mt-1 w-full"
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
        <div className="mt-5">
          <button
            className="font-semibold text-nowrap border-[1px] border-[#E5E5E5] rounded-[8px] py-[0.2rem] px-[1rem]"
            onClick={handleAddNewInput}
          >
            <span className="text-[1.3rem] pr-1">+</span> Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherDebtsFields;
