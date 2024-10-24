import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface DynamicInput {
  id: number;
  label: string;
  value: string;
}

const PropertyInputFields = () => {
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
    const { value } = e.target;
    console.log(value, e.target.name);
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
      <div className="flex justify-between items-center text-[1.2rem] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Property</span>{" "}
          <Icon
            className="text-[#838383] text-[1rem]"
            icon="material-symbols:info-outline"
          />
        </label>
        {/* No functionality on "Add Properties" button */}
        <button className="font-semibold flex items-center gap-1">
          <span>Add Properties</span>
          <Icon className="text-[1.25rem]" icon="ic:round-plus" />
        </button>
      </div>
      <input
        className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
        type="number"
        placeholder="$0"
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          e.currentTarget.blur()
        }
      />

      {/* Static Input Fields */}
      <div className="mt-3 text-[14px] flex gap-[1.5rem] overflow-x-auto pb-2">
        <div>
          <label
            className="flex items-center gap-1 font-semibold"
            htmlFor="principalResidence"
          >
            <span className="text-nowrap">Principal Residence</span>{" "}
            <Icon
              className="text-[#838383] text-[1rem]"
              icon="material-symbols:info-outline"
            />
          </label>
          <input
            className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
            type="number"
            placeholder="$0"
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
        </div>
        <div>
          <label
            className="flex items-center gap-1 font-semibold"
            htmlFor="cottage"
          >
            <span className="text-nowrap">Cottage</span>{" "}
            <Icon
              className="text-[#838383] text-[1rem]"
              icon="material-symbols:info-outline"
            />
          </label>
          <input
            className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
            type="number"
            placeholder="$0"
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
        </div>
        <div>
          <label
            className="flex items-center gap-1 font-semibold"
            htmlFor="realEstate"
          >
            <span className="text-nowrap">Real Estate Assets</span>{" "}
            <Icon
              className="text-[#838383] text-[1rem]"
              icon="material-symbols:info-outline"
            />
          </label>
          <input
            className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
            type="number"
            placeholder="$0"
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
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
              onChange={(e) => handleDynamicInputChange(e, input.id)}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
            />
          </div>
        ))}

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

      {/* New Dynamic Input Field */}
      {showNewInputField && (
        <div className="mt-3 flex gap-2 items-center">
          <input
            className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none max-w-[140px]"
            type="text"
            name="label"
            value={newInput.label}
            placeholder="Property Name"
            onChange={handleInputChange}
          />
          <input
            className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none max-w-[100px]"
            type="number"
            name="value"
            value={newInput.value}
            placeholder="$0"
            onChange={handleInputChange}
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          <button
            className="bg-green-500 text-white font-semibold rounded px-2 py-1"
            onClick={handleSaveInput}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white font-semibold rounded px-2 py-1"
            onClick={handleRemoveNewInput}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyInputFields;
