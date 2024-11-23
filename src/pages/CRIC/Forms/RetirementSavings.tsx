import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { useState } from "react";

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

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export default function RetirementSavings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/other-income");
  };

  const [hasRRSP, setHasRRSP] = useState<string | undefined>("");

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Retirement Savings</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Do you have a registered retirement savings plan (RRSP)?</p>
        </div>
        <Select
          onChange={(option) => setHasRRSP(option?.value)}
          options={yesNoOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[50]"
        ></Select>
      </div>

      {hasRRSP === "Yes" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>What is the current total value of your RRSP(s)? *</p>
            </div>
            <Select
              // onChange={(option) => setPensionPlanType(option?.value)}
              // options={pensionTypeOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[49]"
            ></Select>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="text-white p-[0.8rem] rounded-[10px] w-[200px] bg-black"
        >
          Next
        </button>
      </div>
    </section>
  );
}
