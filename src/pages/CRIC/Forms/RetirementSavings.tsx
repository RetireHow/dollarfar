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

const contributionOptions = [
  { label: "0", value: "0" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
  { label: "75", value: "75" },
  { label: "100", value: "100" },
  { label: "125", value: "125" },
  { label: "150", value: "150" },
  { label: "175", value: "175" },
  { label: "200", value: "200" },
  { label: "225", value: "225" },
  { label: "250", value: "250" },
  { label: "275", value: "275" },
  { label: "300", value: "300" },
  { label: "325", value: "325" },
  { label: "350", value: "350" },
  { label: "375", value: "375" },
  { label: "400", value: "400" },
  { label: "425", value: "425" },
  { label: "450", value: "450" },
  { label: "475", value: "475" },
  { label: "500", value: "500" },
  { label: "525", value: "525" },
  { label: "550", value: "550" },
  { label: "575", value: "575" },
  { label: "600", value: "600" },
  { label: "625", value: "625" },
  { label: "650", value: "650" },
  { label: "675", value: "675" },
  { label: "700", value: "700" },
  { label: "725", value: "725" },
  { label: "750", value: "750" },
  { label: "775", value: "775" },
  { label: "800", value: "800" },
  { label: "825", value: "825" },
  { label: "850", value: "850" },
  { label: "875", value: "875" },
  { label: "900", value: "900" },
  { label: "925", value: "925" },
  { label: "950", value: "950" },
  { label: "975", value: "975" },
  { label: "1000", value: "1000" },
  { label: "1025", value: "1025" },
  { label: "1050", value: "1050" },
  { label: "1075", value: "1075" },
  { label: "1100", value: "1100" },
  { label: "1125", value: "1125" },
  { label: "1150", value: "1150" },
  { label: "1175", value: "1175" },
  { label: "1200", value: "1200" },
  { label: "1225", value: "1225" },
  { label: "1250", value: "1250" },
  { label: "1275", value: "1275" },
  { label: "1300", value: "1300" },
  { label: "1325", value: "1325" },
  { label: "1350", value: "1350" },
  { label: "1375", value: "1375" },
  { label: "1400", value: "1400" },
  { label: "1425", value: "1425" },
  { label: "1450", value: "1450" },
  { label: "1475", value: "1475" },
  { label: "1500", value: "1500" },
  { label: "1525", value: "1525" },
  { label: "1550", value: "1550" },
  { label: "1575", value: "1575" },
  { label: "1600", value: "1600" },
  { label: "1625", value: "1625" },
  { label: "1650", value: "1650" },
  { label: "1675", value: "1675" },
  { label: "1700", value: "1700" },
  { label: "1725", value: "1725" },
  { label: "1750", value: "1750" },
  { label: "1775", value: "1775" },
  { label: "1800", value: "1800" },
  { label: "1825", value: "1825" },
  { label: "1850", value: "1850" },
  { label: "1875", value: "1875" },
  { label: "1900", value: "1900" },
  { label: "1925", value: "1925" },
  { label: "1950", value: "1950" },
  { label: "1975", value: "1975" },
  { label: "2000", value: "2000" },
  { label: "2025", value: "2025" },
  { label: "2050", value: "2050" },
  { label: "2075", value: "2075" },
  { label: "2100", value: "2100" },
  { label: "2125", value: "2125" },
  { label: "2150", value: "2150" },
  { label: "2175", value: "2175" },
  { label: "2200", value: "2200" },
  { label: "2225", value: "2225" },
  { label: "2250", value: "2250" },
  { label: "2275", value: "2275" },
  { label: "2300", value: "2300" },
  { label: "2325", value: "2325" },
  { label: "2350", value: "2350" },
  { label: "2375", value: "2375" },
  { label: "2400", value: "2400" },
  { label: "2425", value: "2425" },
  { label: "2450", value: "2450" },
  { label: "2475", value: "2475" },
  { label: "2500", value: "2500" },
  { label: "2525", value: "2525" },
  { label: "2550", value: "2550" },
  { label: "2575", value: "2575" },
  { label: "2600", value: "2600" },
  { label: "2625", value: "2625" },
  { label: "2630", value: "2630" },
];

const annualIncomeReceivingRRSPOptions = [
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

export default function RetirementSavings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/other-income");
  };

  const [hasRRSP, setHasRRSP] = useState<string | undefined>("");
  const [otherSavings, setOtherSavings] = useState<string | undefined>("");

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
          <div className="z-[49]">
            <div className="font-semibold mb-2 flex justify-between items-center">
              <p>What is the current total value of your RRSP(s)?</p>
              <p>(max. 10000000)</p>
            </div>
            <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
              type="number"
              max="10000000"
              min="0"
              placeholder="Enter current value"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                On average, how much do you plan to contribute to your RRSP(s)
                from now until retirement?
              </p>
            </div>

            <div className="flex gap-5">
              <div className="w-full">
                <div className="font-semibold mb-2">
                  <p>Frequency of your contribution:</p>
                </div>
                <Select
                  onChange={(option) => option}
                  options={[
                    { label: "Weekly", value: "Weekly" },
                    { label: "Bi-Weekly", value: "Bi-Weekly" },
                    { label: "Monthly", value: "Monthly" },
                    { label: "Annually", value: "Annually" },
                    { label: "Quarterly", value: "Quarterly" },
                    { label: "Semi-annually", value: "Semi-annually" },
                  ]}
                  styles={customStyles}
                  isMulti={false}
                  placeholder="Select One"
                  className="rounded-md border-[1px] duration-300 border-[#838383] w-full z-[48]"
                ></Select>
              </div>
              <div className="w-full">
                <div className="font-semibold mb-2">
                  <p>Amount of your contribution:</p>
                </div>
                <Select
                  onChange={(option) => option}
                  options={contributionOptions}
                  styles={customStyles}
                  isMulti={false}
                  placeholder="Select One"
                  className="rounded-md border-[1px] duration-300 border-[#838383] w-full z-[47]"
                ></Select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                At what age do you plan to start receiving an annual income from
                your RRSP(s)?
              </p>
            </div>
            <Select
              onChange={(option) => option}
              options={annualIncomeReceivingRRSPOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[46]"
            ></Select>
          </div>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                At what age do you plan to stop receiving an annual income from
                your RRSP(s)?
              </p>
            </div>
            <Select
              onChange={(option) => option}
              options={annualIncomeReceivingRRSPOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[45]"
            ></Select>
          </div>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                What average annual rate of return do you believe you can earn
                on your investments until you start to receive a monthly income
                from your RRSP(s)?
              </p>
            </div>
            <Select
              onChange={(option) => option}
              options={[
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
              ]}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[44]"
            ></Select>
          </div>
        </>
      )}

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Do you have any other savings, such as a Tax-Free Savings Account
            (TFSA), that you plan on using for your retirement?
          </p>
        </div>
        <Select
          onChange={(option) => setOtherSavings(option?.value)}
          options={yesNoOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[43]"
        ></Select>
      </div>

      {otherSavings === "Yes" && (
        <>
          <div className="z-[42]">
            <div className="font-semibold mb-2 flex justify-between items-center">
              <p>What is the current total value of your RRSP(s)?</p>
              <p>(max. 1500000)</p>
            </div>
            <input
              className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
              type="number"
              max="10000000"
              min="0"
              placeholder="Enter current value"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                On average, how much do you plan to contribute to your other
                savings from now until retirement?
              </p>
            </div>

            <div className="flex gap-5">
              <div className="w-full">
                <div className="font-semibold mb-2">
                  <p>Frequency of your contribution:</p>
                </div>
                <Select
                  onChange={(option) => option}
                  options={[
                    { label: "Weekly", value: "Weekly" },
                    { label: "Bi-Weekly", value: "Bi-Weekly" },
                    { label: "Monthly", value: "Monthly" },
                    { label: "Annually", value: "Annually" },
                    { label: "Quarterly", value: "Quarterly" },
                    { label: "Semi-annually", value: "Semi-annually" },
                  ]}
                  styles={customStyles}
                  isMulti={false}
                  placeholder="Select One"
                  className="rounded-md border-[1px] duration-300 border-[#838383] w-full z-[41]"
                ></Select>
              </div>
              <div className="w-full">
                <div className="font-semibold mb-2">
                  <p>Amount of your contribution:</p>
                </div>
                <Select
                  onChange={(option) => option}
                  options={contributionOptions}
                  styles={customStyles}
                  isMulti={false}
                  placeholder="Select One"
                  className="rounded-md border-[1px] duration-300 border-[#838383] w-full z-[40]"
                ></Select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to start receiving your savings?</p>
            </div>
            <Select
              onChange={(option) => option}
              options={annualIncomeReceivingRRSPOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[39]"
            ></Select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to stop receiving your savings?</p>
            </div>
            <Select
              onChange={(option) => option}
              options={annualIncomeReceivingRRSPOptions}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[38]"
            ></Select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                What average annual rate of return do you believe you can earn
                on your investments until you start to receive a monthly income
                from your other savings?
              </p>
            </div>
            <Select
              onChange={(option) => option}
              options={[
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
              ]}
              styles={customStyles}
              isMulti={false}
              placeholder="Select One"
              className="rounded-md border-[1px] duration-300 border-[#838383] z-[37]"
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
