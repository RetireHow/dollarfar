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

const OASAgeOptions = [
  { label: "60", value: "60" },
  { label: "60 + 1 months", value: "60 + 1 months" },
  { label: "60 + 2 months", value: "60 + 2 months" },
  { label: "60 + 3 months", value: "60 + 3 months" },
  { label: "60 + 4 months", value: "60 + 4 months" },
  { label: "60 + 5 months", value: "60 + 5 months" },
  { label: "60 + 6 months", value: "60 + 6 months" },
  { label: "60 + 7 months", value: "60 + 7 months" },
  { label: "60 + 8 months", value: "60 + 8 months" },
  { label: "60 + 9 months", value: "60 + 9 months" },
  { label: "60 + 10 months", value: "60 + 10 months" },
  { label: "60 + 11 months", value: "60 + 11 months" },
  { label: "61", value: "61" },
  { label: "61 + 1 months", value: "61 + 1 months" },
  { label: "61 + 2 months", value: "61 + 2 months" },
  { label: "61 + 3 months", value: "61 + 3 months" },
  { label: "61 + 4 months", value: "61 + 4 months" },
  { label: "61 + 5 months", value: "61 + 5 months" },
  { label: "61 + 6 months", value: "61 + 6 months" },
  { label: "61 + 7 months", value: "61 + 7 months" },
  { label: "61 + 8 months", value: "61 + 8 months" },
  { label: "61 + 9 months", value: "61 + 9 months" },
  { label: "61 + 10 months", value: "61 + 10 months" },
  { label: "61 + 11 months", value: "61 + 11 months" },
  { label: "62", value: "62" },
  { label: "62 + 1 months", value: "62 + 1 months" },
  { label: "62 + 2 months", value: "62 + 2 months" },
  { label: "62 + 3 months", value: "62 + 3 months" },
  { label: "62 + 4 months", value: "62 + 4 months" },
  { label: "62 + 5 months", value: "62 + 5 months" },
  { label: "62 + 6 months", value: "62 + 6 months" },
  { label: "62 + 7 months", value: "62 + 7 months" },
  { label: "62 + 8 months", value: "62 + 8 months" },
  { label: "62 + 9 months", value: "62 + 9 months" },
  { label: "62 + 10 months", value: "62 + 10 months" },
  { label: "62 + 11 months", value: "62 + 11 months" },
  { label: "63", value: "63" },
  { label: "63 + 1 months", value: "63 + 1 months" },
  { label: "63 + 2 months", value: "63 + 2 months" },
  { label: "63 + 3 months", value: "63 + 3 months" },
  { label: "63 + 4 months", value: "63 + 4 months" },
  { label: "63 + 5 months", value: "63 + 5 months" },
  { label: "63 + 6 months", value: "63 + 6 months" },
  { label: "63 + 7 months", value: "63 + 7 months" },
  { label: "63 + 8 months", value: "63 + 8 months" },
  { label: "63 + 9 months", value: "63 + 9 months" },
  { label: "63 + 10 months", value: "63 + 10 months" },
  { label: "63 + 11 months", value: "63 + 11 months" },
  { label: "64", value: "64" },
  { label: "64 + 1 months", value: "64 + 1 months" },
  { label: "64 + 2 months", value: "64 + 2 months" },
  { label: "64 + 3 months", value: "64 + 3 months" },
  { label: "64 + 4 months", value: "64 + 4 months" },
  { label: "64 + 5 months", value: "64 + 5 months" },
  { label: "64 + 6 months", value: "64 + 6 months" },
  { label: "64 + 7 months", value: "64 + 7 months" },
  { label: "64 + 8 months", value: "64 + 8 months" },
  { label: "64 + 9 months", value: "64 + 9 months" },
  { label: "64 + 10 months", value: "64 + 10 months" },
  { label: "64 + 11 months", value: "64 + 11 months" },
  { label: "65", value: "65" },
  { label: "65 + 1 months", value: "65 + 1 months" },
  { label: "65 + 2 months", value: "65 + 2 months" },
  { label: "65 + 3 months", value: "65 + 3 months" },
  { label: "65 + 4 months", value: "65 + 4 months" },
  { label: "65 + 5 months", value: "65 + 5 months" },
  { label: "65 + 6 months", value: "65 + 6 months" },
  { label: "65 + 7 months", value: "65 + 7 months" },
  { label: "65 + 8 months", value: "65 + 8 months" },
  { label: "65 + 9 months", value: "65 + 9 months" },
  { label: "65 + 10 months", value: "65 + 10 months" },
  { label: "65 + 11 months", value: "65 + 11 months" },
  { label: "66", value: "66" },
  { label: "66 + 1 months", value: "66 + 1 months" },
  { label: "66 + 2 months", value: "66 + 2 months" },
  { label: "66 + 3 months", value: "66 + 3 months" },
  { label: "66 + 4 months", value: "66 + 4 months" },
  { label: "66 + 5 months", value: "66 + 5 months" },
  { label: "66 + 6 months", value: "66 + 6 months" },
  { label: "66 + 7 months", value: "66 + 7 months" },
  { label: "66 + 8 months", value: "66 + 8 months" },
  { label: "66 + 9 months", value: "66 + 9 months" },
  { label: "66 + 10 months", value: "66 + 10 months" },
  { label: "66 + 11 months", value: "66 + 11 months" },
  { label: "67", value: "67" },
  { label: "67 + 1 months", value: "67 + 1 months" },
  { label: "67 + 2 months", value: "67 + 2 months" },
  { label: "67 + 3 months", value: "67 + 3 months" },
  { label: "67 + 4 months", value: "67 + 4 months" },
  { label: "67 + 5 months", value: "67 + 5 months" },
  { label: "67 + 6 months", value: "67 + 6 months" },
  { label: "67 + 7 months", value: "67 + 7 months" },
  { label: "67 + 8 months", value: "67 + 8 months" },
  { label: "67 + 9 months", value: "67 + 9 months" },
  { label: "67 + 10 months", value: "67 + 10 months" },
  { label: "67 + 11 months", value: "67 + 11 months" },
  { label: "68", value: "68" },
  { label: "68 + 1 months", value: "68 + 1 months" },
  { label: "68 + 2 months", value: "68 + 2 months" },
  { label: "68 + 3 months", value: "68 + 3 months" },
  { label: "68 + 4 months", value: "68 + 4 months" },
  { label: "68 + 5 months", value: "68 + 5 months" },
  { label: "68 + 6 months", value: "68 + 6 months" },
  { label: "68 + 7 months", value: "68 + 7 months" },
  { label: "68 + 8 months", value: "68 + 8 months" },
  { label: "68 + 9 months", value: "68 + 9 months" },
  { label: "68 + 10 months", value: "68 + 10 months" },
  { label: "68 + 11 months", value: "68 + 11 months" },
  { label: "69", value: "69" },
  { label: "69 + 1 months", value: "69 + 1 months" },
  { label: "69 + 2 months", value: "69 + 2 months" },
  { label: "69 + 3 months", value: "69 + 3 months" },
  { label: "69 + 4 months", value: "69 + 4 months" },
  { label: "69 + 5 months", value: "69 + 5 months" },
  { label: "69 + 6 months", value: "69 + 6 months" },
  { label: "69 + 7 months", value: "69 + 7 months" },
  { label: "69 + 8 months", value: "69 + 8 months" },
  { label: "69 + 9 months", value: "69 + 9 months" },
  { label: "69 + 10 months", value: "69 + 10 months" },
  { label: "69 + 11 months", value: "69 + 11 months" },
  { label: "70", value: "70" },
];

const canadaLivingAgeOptions = [
  { label: "50", value: "50" },
  { label: "51", value: "51" },
  { label: "52", value: "52" },
  { label: "53", value: "53" },
  { label: "54", value: "54" },
  { label: "55", value: "55" },
  { label: "56", value: "56" },
  { label: "57", value: "57" },
  { label: "58", value: "58" },
  { label: "59", value: "59" },
  { label: "60", value: "60" },
  { label: "61", value: "61" },
  { label: "62", value: "62" },
  { label: "63", value: "63" },
  { label: "64", value: "64" },
  { label: "65", value: "65" },
  { label: "66", value: "66" },
  { label: "67", value: "67" },
  { label: "68", value: "68" },
  { label: "69", value: "69" },
  { label: "70", value: "70" },
  { label: "71", value: "71" },
];

export default function OldAgeSecurity() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/CRIC/summary");
  };

  // const [livingInCanada, setLivingInCanada] = useState<string | undefined>("");

  const [livedInCanada40Years, setLivedInCanada40Years] = useState<
    string | undefined
  >("");

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Old Age Security</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Do you expect to be living in Canada when you reach the age of 65?
          </p>
        </div>
        <Select
          onChange={(option) => option}
          options={yesNoOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[50]"
        ></Select>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Will you have lived in Canada for at least 40 years between age 18
            and 65? *
          </p>
        </div>
        <Select
          onChange={(option) => setLivedInCanada40Years(option?.value)}
          options={yesNoOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[50]"
        ></Select>
      </div>

      {livedInCanada40Years === "Yes" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to receive your OAS pension?</p>
            </div>
            <Select
              // onChange={(option) => setIncomeType(option?.value)}
              options={OASAgeOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[46]"
            ></Select>
          </div>
        </>
      )}

      {livedInCanada40Years === "No" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                How many years will you have lived in Canada between age 18 and
                65?
              </p>
            </div>
            <Select
              // onChange={(option) => setIncomeType(option?.value)}
              options={canadaLivingAgeOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[46]"
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
