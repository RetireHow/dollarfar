import { Icon } from "@iconify/react";
import CustomTooltip from "../../../components/UI/CustomTooltip";
import { updateAsset } from "../../../redux/features/NWSlice/NWSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useRef } from "react";
import useDynamicInput from "../../../hooks/useDynamicInput";
import DisplayTotal from "../../../components/UI/DisplayTotal";
import { handleKeyDownUtil } from "../../../utils/handleKeyDownUtil";
import { isNegative } from "../../../utils/isNegative";

const PersonalItemsInputFields = () => {
  const dispatch = useAppDispatch();
  const {
    assets: {
      totals: { personalItems: personalItemsTotal },
    },
  } = useAppSelector((state) => state.NWCalculator);
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);

  const {
    assets: {
      personalItems: {artWork, collectibles, jewelry},
    },
  } = useAppSelector((state) => state.NWCalculator);

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
  } = useDynamicInput({ category: "personalItems", dynamicFieldTitleRef });

  return (
    <div>
      {/* Main Input Field */}
      <DisplayTotal
        data={{
          showSubInputs,
          setShowSubInputs,
          total: personalItemsTotal,
          fieldTitle: "Personal Items",
          buttonText: "Add Personal Items",
          infoText: "Value of jewelry, artwork, collectibles, etc.",
        }}
      />

      {/* Sub Input Fields */}
      {showSubInputs && (
        <div className="mt-3 text-[14px] flex flex-col gap-[0.5rem] overflow-x-auto pb-2">
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">Jewelry</span>{" "}
              <CustomTooltip title="Estimated value of valuable jewelry, including items like watches, rings, or necklaces." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(jewelry) ? "border-red-500 border-[2px]" : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "personalItems",
                    key: "jewelry",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="cottage"
            >
              <span className="text-nowrap">Art work</span>{" "}
              <CustomTooltip title="Total appraised value of art pieces you own, such as paintings or sculptures." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(artWork) ? "border-red-500 border-[2px]" : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "personalItems",
                    key: "artWork",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">Collectibles</span>{" "}
              <CustomTooltip title="The market value of collectible items, like coins, stamps, or memorabilia." />
            </label>
            <input
             className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
              isNegative(collectibles) ? "border-red-500 border-[2px]" : "border-[#838383] border-[1px]"
            }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "personalItems",
                    key: "collectibles",
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
                placeholder={`0`}
                onChange={(e) => handleDynamicInputChange(e, input.id)}
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
              <div className="flex items-center justify-between gap-4 w-full">
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
                className="border-[1px] border-[#838383] rounded-[8px] px-2 py-[8px] mt-[2px] w-full"
                type="number"
                name="value"
                value={newInput.value}
                placeholder={`0`}
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
              <span className="text-[1.3rem] pr-1">+</span> Add More Personal Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalItemsInputFields;
