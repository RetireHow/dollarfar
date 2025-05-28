import { Icon } from "@iconify/react";
import CustomTooltip from "../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateAsset } from "../../../redux/features/NWSlice/NWSlice";
import useDynamicInput from "../../../hooks/useDynamicInput";
import { useRef } from "react";
import DisplayTotal from "../../../components/UI/DisplayTotal";
import { handleKeyDownUtil } from "../../../utils/handleKeyDownUtil";
import { isNegative } from "../../../utils/isNegative";

const PropertyInputFields = () => {
  const dispatch = useAppDispatch();
  const {
    assets: {
      totals: { property: totalProperty }
    },
  } = useAppSelector((state) => state.NWCalculator);
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);
  const {
    assets: {
      property: { principalResidence, cottage, realEstateAssets },
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
  } = useDynamicInput({ category: "property", dynamicFieldTitleRef });

  return (
    <div>
      {/* Main Input Field */}
      <DisplayTotal
        data={{
          showSubInputs,
          setShowSubInputs,
          total: totalProperty,
          fieldTitle: "Property",
          buttonText: "Add Properties",
          infoText:
            "Current market value of primary residence and Current market value of any other properties (e.g., vacation home, rental property).",
        }}
      />
      {/* Sub Input Fields */}
      {showSubInputs && (
        <div className="mt-3 text-[14px] flex flex-col gap-[0.5rem] pb-2">
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">Principal Residence</span>{" "}
              <CustomTooltip title="The current market value of your primary home or residence." />
            </label>
            <input
              className={`rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(principalResidence)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "property",
                    key: "principalResidence",
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
              <span className="text-nowrap">Cottage</span>{" "}
              <CustomTooltip title="The estimated market value of your secondary residence or vacation property." />
            </label>
            <input
              className={`rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(cottage)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "property",
                    key: "cottage",
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
              <span className="text-nowrap">Real Estate Assets</span>{" "}
              <CustomTooltip title="Any additional real estate holdings or properties you own, excluding your primary residence and cottage." />
            </label>
            <input
              className={`rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(realEstateAssets)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "property",
                    key: "realEstateAssets",
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
                className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] w-full"
                type="number"
                name={input.label.trim().split(" ").join()}
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
                  className="border-[1px] border-[#838383] rounded-[5px] flex-1 px-1 py-[2px]"
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
            <div className="opacity-0">
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
              <span className="text-[1.3rem] pr-1">+</span> Add More Property
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyInputFields;
