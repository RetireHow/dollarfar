import { useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";

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

const pensionPlanOptions = [
  { label: "Not Applicable", value: "Not Applicable" },
  { label: "Canada Pension Plan", value: "Canada Pension Plan" },
  { label: "Quebec Pension Plan", value: "Quebec Pension Plan" },
];

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const yesNoOptionsWithExtraInto = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  {
    label: "No-Estimate based on my expected earnings",
    value: "No-Estimate based on my expected earnings",
  },
  {
    label: "No-Let me select a different value",
    value: "No-Let me select a different value",
  },
];

const statementYearOptions = [
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
];

const monthlyRetirementPensionOptions = [
  { label: "0", value: "0" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
  { label: "60", value: "60" },
  { label: "70", value: "70" },
  { label: "80", value: "80" },
  { label: "90", value: "90" },
  { label: "100", value: "100" },
  { label: "110", value: "110" },
  { label: "120", value: "120" },
  { label: "130", value: "130" },
  { label: "140", value: "140" },
  { label: "150", value: "150" },
  { label: "160", value: "160" },
  { label: "170", value: "170" },
  { label: "180", value: "180" },
  { label: "190", value: "190" },
  { label: "200", value: "200" },
  { label: "210", value: "210" },
  { label: "220", value: "220" },
  { label: "230", value: "230" },
  { label: "240", value: "240" },
  { label: "250", value: "250" },
  { label: "260", value: "260" },
  { label: "270", value: "270" },
  { label: "280", value: "280" },
  { label: "290", value: "290" },
  { label: "300", value: "300" },
  { label: "310", value: "310" },
  { label: "320", value: "320" },
  { label: "330", value: "330" },
  { label: "340", value: "340" },
  { label: "350", value: "350" },
  { label: "360", value: "360" },
  { label: "370", value: "370" },
  { label: "380", value: "380" },
  { label: "390", value: "390" },
  { label: "400", value: "400" },
  { label: "410", value: "410" },
  { label: "420", value: "420" },
  { label: "430", value: "430" },
  { label: "440", value: "440" },
  { label: "450", value: "450" },
  { label: "460", value: "460" },
  { label: "470", value: "470" },
  { label: "480", value: "480" },
  { label: "490", value: "490" },
  { label: "500", value: "500" },
  { label: "510", value: "510" },
  { label: "520", value: "520" },
  { label: "530", value: "530" },
  { label: "540", value: "540" },
  { label: "550", value: "550" },
  { label: "560", value: "560" },
  { label: "570", value: "570" },
  { label: "580", value: "580" },
  { label: "590", value: "590" },
  { label: "600", value: "600" },
  { label: "610", value: "610" },
  { label: "620", value: "620" },
  { label: "630", value: "630" },
  { label: "640", value: "640" },
  { label: "650", value: "650" },
  { label: "660", value: "660" },
  { label: "670", value: "670" },
  { label: "680", value: "680" },
  { label: "690", value: "690" },
  { label: "700", value: "700" },
  { label: "710", value: "710" },
  { label: "720", value: "720" },
  { label: "730", value: "730" },
  { label: "740", value: "740" },
  { label: "750", value: "750" },
  { label: "760", value: "760" },
  { label: "770", value: "770" },
  { label: "780", value: "780" },
  { label: "790", value: "790" },
  { label: "800", value: "800" },
  { label: "810", value: "810" },
  { label: "820", value: "820" },
  { label: "830", value: "830" },
  { label: "840", value: "840" },
  { label: "850", value: "850" },
  { label: "860", value: "860" },
  { label: "870", value: "870" },
  { label: "880", value: "880" },
  { label: "890", value: "890" },
  { label: "900", value: "900" },
  { label: "910", value: "910" },
  { label: "920", value: "920" },
  { label: "930", value: "930" },
  { label: "940", value: "940" },
  { label: "950", value: "950" },
  { label: "960", value: "960" },
  { label: "970", value: "970" },
  { label: "980", value: "980" },
  { label: "990", value: "990" },
  { label: "1000", value: "1000" },
  { label: "1010", value: "1010" },
  { label: "1020", value: "1020" },
  { label: "1030", value: "1030" },
  { label: "1040", value: "1040" },
  { label: "1050", value: "1050" },
  { label: "1060", value: "1060" },
  { label: "1070", value: "1070" },
  { label: "1080", value: "1080" },
  { label: "1090", value: "1090" },
  { label: "1100", value: "1100" },
  { label: "1110", value: "1110" },
  { label: "1120", value: "1120" },
  { label: "1130", value: "1130" },
  { label: "1140", value: "1140" },
  { label: "1150", value: "1150" },
  { label: "1160", value: "1160" },
  { label: "1170", value: "1170" },
  { label: "1175", value: "1175" },
];

const cppBenefitAgeOptions = [
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

const employmentIncomeEndAgeOptions = [
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
];

const annualEmploymentEarningsOptions = [
  { label: "0", value: "0" },
  { label: "1000", value: "1000" },
  { label: "2000", value: "2000" },
  { label: "3000", value: "3000" },
  { label: "4000", value: "4000" },
  { label: "5000", value: "5000" },
  { label: "6000", value: "6000" },
  { label: "7000", value: "7000" },
  { label: "8000", value: "8000" },
  { label: "9000", value: "9000" },
  { label: "10000", value: "10000" },
  { label: "11000", value: "11000" },
  { label: "12000", value: "12000" },
  { label: "13000", value: "13000" },
  { label: "14000", value: "14000" },
  { label: "15000", value: "15000" },
  { label: "16000", value: "16000" },
  { label: "17000", value: "17000" },
  { label: "18000", value: "18000" },
  { label: "19000", value: "19000" },
  { label: "20000", value: "20000" },
  { label: "21000", value: "21000" },
  { label: "22000", value: "22000" },
  { label: "23000", value: "23000" },
  { label: "24000", value: "24000" },
  { label: "25000", value: "25000" },
  { label: "26000", value: "26000" },
  { label: "27000", value: "27000" },
  { label: "28000", value: "28000" },
  { label: "29000", value: "29000" },
  { label: "30000", value: "30000" },
  { label: "31000", value: "31000" },
  { label: "32000", value: "32000" },
  { label: "33000", value: "33000" },
  { label: "34000", value: "34000" },
  { label: "35000", value: "35000" },
  { label: "36000", value: "36000" },
  { label: "37000", value: "37000" },
  { label: "38000", value: "38000" },
  { label: "39000", value: "39000" },
  { label: "40000", value: "40000" },
  { label: "41000", value: "41000" },
  { label: "42000", value: "42000" },
  { label: "43000", value: "43000" },
  { label: "44000", value: "44000" },
  { label: "45000", value: "45000" },
  { label: "46000", value: "46000" },
  { label: "47000", value: "47000" },
  { label: "48000", value: "48000" },
  { label: "49000", value: "49000" },
  { label: "50000", value: "50000" },
  { label: "51000", value: "51000" },
  { label: "52000", value: "52000" },
  { label: "53000", value: "53000" },
  { label: "54000", value: "54000" },
  { label: "55000", value: "55000" },
  { label: "56000", value: "56000" },
  { label: "57000", value: "57000" },
  { label: "58000", value: "58000" },
  { label: "59000", value: "59000" },
  { label: "60000", value: "60000" },
  { label: "61000", value: "61000" },
  { label: "62000", value: "62000" },
  { label: "63000", value: "63000" },
  { label: "64000", value: "64000" },
  { label: "65000", value: "65000" },
  { label: "66000", value: "66000" },
  { label: "67000", value: "67000" },
  { label: "68000", value: "68000" },
  { label: "69000", value: "69000" },
  { label: "69500", value: "69500" },
];

const monthlyQPPAmounts = [
  { label: "100", value: "100" },
  { label: "200", value: "200" },
  { label: "300", value: "300" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "600", value: "600" },
  { label: "700", value: "700" },
  { label: "800", value: "800" },
  { label: "900", value: "900" },
  { label: "1000", value: "1000" },
  { label: "1100", value: "1100" },
  { label: "1200", value: "1200" },
  { label: "1300", value: "1300" },
  { label: "1364", value: "1364" },
];

export default function CanadaPensionPlan() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/employer-pension");
  };

  const [pensionPlan, setPensionPlan] = useState<string | undefined>("");

  const [hasCPPStatement, setHasCPPStatement] = useState<string | undefined>(
    ""
  );

  const [plansToWorkAfterCPP, setPlansToWorkAfterCPP] = useState<
    string | undefined
  >("");

  const [useAverageCPPEstimate, setUseAverageCPPEstimate] = useState<
    string | undefined
  >("");

  const [hasStatementOfParticipation, setHasStatementOfParticipation] =
    useState<string | undefined>("");

  // Second step plans to work after cpp
  const [plansToWorkAfterCPP2, setPlansToWorkAfterCPP2] = useState<
    string | undefined
  >("");

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Canada Pension Plan</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Individuals who contribute to the Quebec Pension Plan (QPP) or the
            Canada Pension Plan (CPP) may be eligible to receive pension
            benefits at retirement. Which pension applies to you?
          </p>
        </div>
        <Select
          onChange={(option) => setPensionPlan(option?.value)}
          options={pensionPlanOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[50]"
        ></Select>
      </div>

      {/* ================|| Canada Pension Plan and Yes ||================= */}
      {pensionPlan === "Canada Pension Plan" && (
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              Do you have a Canada Pension Plan (CPP) Statement of Contributions
              that states your retirement pension estimate based on your past
              contributions?*
            </p>
          </div>
          <Select
            onChange={(option) => setHasCPPStatement(option?.value)}
            options={yesNoOptions}
            styles={customStyles}
            isMulti={false}
            placeholder="Select One"
            className="rounded-md border-[1px] duration-300 border-[#838383] z-[40]"
          ></Select>
        </div>
      )}

      {pensionPlan === "Canada Pension Plan" && hasCPPStatement === "Yes" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Enter the year of your statement*</p>
            </div>
            <Select
              onChange={(option) => setPensionPlan(option?.value)}
              options={statementYearOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[30]"
            ></Select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                Enter your monthly retirement pension estimate (at age 65)
                indicated on your statement.
              </p>
            </div>
            <Select
              onChange={(option) => setPensionPlan(option?.value)}
              options={monthlyRetirementPensionOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[20]"
            ></Select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to receive your CPP benefit?</p>
            </div>
            <Select
              onChange={(option) => option}
              options={cppBenefitAgeOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[10]"
            ></Select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Do you plan on working after you start receiving your CPP?</p>
            </div>
            <Select
              onChange={(option) => setPlansToWorkAfterCPP(option?.value)}
              options={yesNoOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[9]"
            ></Select>
          </div>

          {plansToWorkAfterCPP === "Yes" &&
            pensionPlan === "Canada Pension Plan" && (
              <>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>Until what age will you receive employment income?</p>
                  </div>
                  <Select
                    onChange={(option) => setPensionPlan(option?.value)}
                    options={employmentIncomeEndAgeOptions}
                    styles={customStyles}
                    isMulti={false}
                    placeholder="Select One"
                    className="rounded-md border-[1px] duration-300 border-[#838383] z-[8]"
                  ></Select>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      On average, what will be your annual employment earnings
                      from age 60 to age 69?
                    </p>
                  </div>
                  <Select
                    onChange={(option) => setPensionPlan(option?.value)}
                    options={annualEmploymentEarningsOptions}
                    styles={customStyles}
                    isMulti={false}
                    placeholder="Select One"
                    className="rounded-md border-[1px] duration-300 border-[#838383] z-[7]"
                  ></Select>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      Would you like to contribute to the CPP Post Retirement
                      Benefit when you reach age 65?
                    </p>
                  </div>
                  <Select
                    onChange={(option) => option}
                    options={yesNoOptions}
                    styles={customStyles}
                    isMulti={false}
                    placeholder="Select One"
                    className="rounded-md border-[1px] duration-300 border-[#838383] z-[6]"
                  ></Select>
                </div>
              </>
            )}
        </>
      )}

      {hasCPPStatement === "No" && pensionPlan === "Canada Pension Plan" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                The average monthly amount for a new CPP retirement pension
                (taken at age 65) is approximately $717 per month ($8,604 per
                year). Would you like to use this as your estimate?
              </p>
            </div>
            <Select
              onChange={(option) => setUseAverageCPPEstimate(option?.value)}
              options={yesNoOptionsWithExtraInto}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[7]"
            ></Select>
          </div>

          {useAverageCPPEstimate === "Yes" &&
            pensionPlan === "Canada Pension Plan" && (
              <>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>At what age do you plan to receive your CPP benefit?</p>
                  </div>
                  <Select
                    onChange={(option) => option}
                    options={cppBenefitAgeOptions}
                    styles={customStyles}
                    isMulti={false}
                    placeholder="Select One"
                    className="rounded-md border-[1px] duration-300 border-[#838383] z-[6]"
                  ></Select>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      Do you plan on working after you start receiving your CPP?
                    </p>
                  </div>
                  <Select
                    onChange={(option) =>
                      setPlansToWorkAfterCPP2(option?.value)
                    }
                    options={yesNoOptions}
                    styles={customStyles}
                    isMulti={false}
                    placeholder="Select One"
                    className="rounded-md border-[1px] duration-300 border-[#838383] z-[5]"
                  ></Select>
                </div>
              </>
            )}
        </>
      )}

      {hasCPPStatement === "No" &&
        pensionPlan === "Canada Pension Plan" &&
        plansToWorkAfterCPP2 === "Yes" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Until what age will you receive employment income?</p>
              </div>
              <Select
                onChange={(option) => option}
                options={[
                  { label: "65", value: "65" },
                  { label: "66", value: "66" },
                  { label: "67", value: "67" },
                  { label: "68", value: "68" },
                  { label: "69", value: "69" },
                  { label: "70", value: "70" },
                ]}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[4]"
              ></Select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  On average, what will be your annual employment earnings from
                  age 65 to age 65?
                </p>
              </div>
              <Select
                onChange={(option) => option}
                options={annualEmploymentEarningsOptions}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[3]"
              ></Select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  Would you like to contribute to the CPP Post Retirement
                  Benefit when you reach age 65?
                </p>
              </div>
              <Select
                onChange={(option) => option}
                options={yesNoOptions}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[2]"
              ></Select>
            </div>
          </>
        )}

      {/* ================|| Quebec Pension Plan and Yes ||================= */}
      {pensionPlan === "Quebec Pension Plan" && (
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              Do you have a Statement of Participation that states your
              retirement pension estimate based on your past contributions?
            </p>
          </div>
          <Select
            onChange={(option) => setHasStatementOfParticipation(option?.value)}
            options={yesNoOptions}
            styles={customStyles}
            isMulti={false}
            placeholder="Select One"
            className="rounded-md border-[1px] duration-300 border-[#838383] z-[40]"
          ></Select>
        </div>
      )}

      {pensionPlan === "Quebec Pension Plan" &&
        hasStatementOfParticipation === "Yes" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Enter the year of your statement</p>
              </div>
              <Select
                onChange={(option) => option}
                options={[
                  { label: "2020", value: "2020" },
                  { label: "2021", value: "2021" },
                  { label: "2022", value: "2022" },
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                ]}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[39]"
              ></Select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  Enter your monthly retirement pension estimate (at age 65)
                  indicated on your statement.
                </p>
              </div>
              <Select
                onChange={(option) => option}
                options={monthlyRetirementPensionOptions}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[38]"
              ></Select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age do you plan to receive your QPP benefit?</p>
              </div>
              <Select
                onChange={(option) => option}
                options={cppBenefitAgeOptions}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[37]"
              ></Select>
            </div>
          </>
        )}

      {pensionPlan === "Quebec Pension Plan" &&
        hasStatementOfParticipation === "No" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  Please select the monthly amount of QPP you expect to receive
                  at age 65.
                </p>
              </div>
              <Select
                onChange={(option) => option}
                options={monthlyQPPAmounts}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[39]"
              ></Select>
            </div>

            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age do you plan to receive your QPP benefit?</p>
              </div>
              <Select
                onChange={(option) => option}
                options={cppBenefitAgeOptions}
                styles={customStyles}
                isMulti={false}
                placeholder="Select One"
                className="rounded-md border-[1px] duration-300 border-[#838383] z-[38]"
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
