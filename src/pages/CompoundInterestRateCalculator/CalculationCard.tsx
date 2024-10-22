import { setFrequency } from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import Select from "react-select";
import { StylesConfig } from "react-select";

type TOption = {
  label: string;
  value: number;
};

const customStyles: StylesConfig<TOption, boolean> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
    borderRadius: 0,
    padding: "1px",
  }),
  control: (provided) => ({
    ...provided,
    border: "1px solid #D9D9D9",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #D9D9D9",
    },
    padding: "3px",
    borderRadius: "5px",
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

const frequencyOptions: TOption[] = [
  { value: 1, label: "Annually" },
  { value: 4, label: "Quarterly" },
  { value: 12, label: "Monthly" },
  { value: 52, label: "Weekly" },
  { value: 26, label: "Bi-Weekly" },
  { value: 365, label: "Daily" },
];

export default function CalculationCard() {
  const dispatch = useAppDispatch();
  const { frequency, compoundInterest, principal } = useAppSelector(
    (state) => state.compoundInterest
  );
  const handleChange = (value:TOption) => {
    dispatch(setFrequency(value))
  };
  return (
    <div className="space-y-[2rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] lg:w-[50%] w-full">
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-[1.25rem] font-bold md:mb-0 mb-3">
          Compounding Frequency
        </p>
        <div>

          <div>
            <Select
              onChange={handleChange}
              options={frequencyOptions}
              styles={customStyles}
              defaultValue={frequency}
            ></Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
        <p className="font-medium">Principle Amount</p>
        <div className="flex items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{numberWithCommas(principal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
        <p className="text-[1.25rem] font-medium">Total Interest</p>
        <div className="flex items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{compoundInterest}</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-black text-white px-[1.25rem] text-[1.25rem] rounded-[10px] py-[0.3rem]">
        <p className="text-[1.25rem] font-medium">Total Amount</p>
        <div className="flex items-center gap-[2px]">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          <p>{(compoundInterest + principal).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
