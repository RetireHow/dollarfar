import ReactSlider from "react-slider";
import CustomTooltip from "../../components/UI/CustomTooltip";

import Select from "react-select";
import { StylesConfig } from "react-select";

type TOptions = {
  label: string;
  value: string;
};

const customStyles: StylesConfig<TOptions, boolean> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
    borderRadius: "5px",
    padding: "1px",
  }),
  control: (provided) => ({
    ...provided,
    border: "0px solid #D9D9D9",
    boxShadow: "none",
    "&:hover": {
      border: "0px solid #D9D9D9",
    },
    padding: "0px 0",
    borderRadius: "0",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#000" : provided.backgroundColor,
    color: state.isSelected ? "#fff" : provided.color,
    "&:hover": {
      backgroundColor: state.isSelected ? "#000" : provided.backgroundColor,
    },
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#000", // Change this to the color you want for the arrow
    "&:hover": {
      color: "#000", // Optional: change color on hover if desired
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#858585", // Set the placeholder color
    fontWeight: "normal",
  }),
};

const withdrawalFrequencyOptions = [
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
  { label: "Weekly", value: "Weekly" },
];

const paymentYearOptions = [
  { label: "First", value: "First" },
  { label: "Second", value: "Second" },
  { label: "Third", value: "Third" },
];

export default function RRIFForm() {
  return (
      <section className="space-y-[2rem]">
        <div>
          <label className="block mb-[0.5rem] font-semibold">
            Initial RRIF Balance
          </label>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="number"
            placeholder="$0"
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>

        {/* Slider - 1  */}
        <div>
          <div className="flex justify-between items-center mb-[1rem]">
            <h3 className="mb-[0.5rem] font-semibold">Current Age</h3>
            <div className="max-w-[80px]">
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
                type="number"
                placeholder="$0"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
          </div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            thumbActiveClassName="active-thumb"
            min={1}
            max={50}
            minDistance={10}
            onChange={(newValue) => newValue}
          />
          <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
            <p>0</p>
            <p>100</p>
          </div>
        </div>

        {/* Slider - 2  */}
        <div>
          <div className="flex justify-between items-center mb-[1rem]">
            <h3 className="mb-[0.5rem] font-semibold">
              Rate of return (maximum value 16%)
            </h3>
            <div className="max-w-[80px]">
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
                type="number"
                placeholder="%0"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
          </div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            thumbActiveClassName="active-thumb"
            min={1}
            max={50}
            minDistance={10}
            onChange={(newValue) => newValue}
          />
          <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
            <p>0</p>
            <p>100</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold">Annual Withdrawal Amount</p>
            <CustomTooltip title="This is demo toast text" />
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
            type="number"
            placeholder="$0"
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Withdrawal Frequency</p>
            <CustomTooltip title="This is demo info text" />
          </div>
          <Select
            onChange={(value) => console.log(value)}
            options={withdrawalFrequencyOptions}
            styles={customStyles}
            isMulti={false}
            className="rounded-md border-[1px] duration-300 border-[#838383]"
          ></Select>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Withdrawal Start Year</p>
              <CustomTooltip title="This is demo info text" />
            </div>
            <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
              type="number"
              placeholder="$0"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Withdrawal End Year</p>
              <CustomTooltip title="This is demo info text" />
            </div>
            <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
              type="number"
              placeholder="$0"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
        </div>


        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Start Payment in Year</p>
            <CustomTooltip title="This is demo info text" />
          </div>
          <Select
            onChange={(value) => console.log(value)}
            options={paymentYearOptions}
            styles={customStyles}
            isMulti={false}
            className="rounded-md border-[1px] duration-300 border-[#838383]"
          ></Select>
        </div>
      </section>
  );
}
