import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  setDynamicLiability,
  setOtherDebts,
} from "../../../redux/features/NWSlice/NWSlice";

interface DynamicInput {
  id: number;
  label: string;
  value: string;
}

const OtherDebtsFields = () => {
  const dispatch = useDispatch();
  // State to manage dynamic inputs
  const [dynamicInputs, setDynamicInputs] = useState<DynamicInput[]>([]);
  const [newInput, setNewInput] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });
  const [showNewInputField, setShowNewInputField] = useState(false);

  // Add new input field when "+ Add More" button is clicked
  const handleAddNewInput = () => {
    setShowNewInputField(true);
  };

  // Save the new dynamic input field
  const handleSaveInput = () => {
    if (newInput.label) {
      console.log("New Input Value===> ", newInput);
      dispatch(
        setDynamicLiability({
          key: newInput.label.trim().split(" ").join(""),
          value: Number(newInput.value),
        })
      );
      setDynamicInputs([
        ...dynamicInputs,
        { id: Date.now(), label: newInput.label, value: newInput.value },
      ]);
      setNewInput({ label: "", value: "" });
      setShowNewInputField(false);
    }
  };

  // Remove unsaved new input field
  const handleRemoveNewInput = () => {
    setNewInput({ label: "", value: "" });
    setShowNewInputField(false);
  };

  // Handle input value changes for dynamic inputs
  const handleDynamicInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value, name } = e.target;
    console.log(value, e.target.name);
    dispatch(setDynamicLiability({ key: name, value: Number(value) }));
    setDynamicInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  // Handle input value changes for the new (unsaved) input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInput({ ...newInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Main Input Field */}
      <div className="flex justify-between items-center text-[1rem] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Other Debts</span>{" "}
          <Icon
            className="text-[#838383] text-[1rem]"
            icon="material-symbols:info-outline"
          />
        </label>
      </div>
      <input
        className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
        type="number"
        placeholder="$0"
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          e.currentTarget.blur()
        }
        onChange={(e) => dispatch(setOtherDebts(Number(e.target.value)))}
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
                icon="material-symbols:info-outline"
              />
            </label>
            <input
              className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
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
                className="border-[1px] border-[#838383] rounded-[5px] outline-none px-1 py-[2px] flex-1"
                type="text"
                name="label"
                value={newInput.label}
                placeholder="Asset Name"
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
