import CustomTooltip from "../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import RedStar from "../../../components/UI/RedStar";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";
import { useState } from "react";
import Error from "../../../components/UI/Error";
import CRICResultCard from "../CRICResultCard";

const yearOptions = [
  "Select One",
  "1952",
  "1953",
  "1954",
  "1955",
  "1956",
  "1957",
  "1958",
  "1959",
  "1960",
  "1961",
  "1962",
  "1963",
  "1964",
  "1965",
  "1966",
  "1967",
  "1968",
  "1969",
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "1975",
  "1976",
  "1977",
  "1978",
  "1979",
  "1980",
  "1981",
  "1982",
  "1983",
  "1984",
  "1985",
  "1986",
  "1987",
  "1988",
  "1989",
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
];

const monthOptions = [
  "Select One",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const annualIncomeOptions = [
  "Select One",
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000,
  9000,
  10000,
  11000,
  12000,
  13000,
  14000,
  15000,
  16000,
  17000,
  18000,
  19000,
  20000,
  21000,
  22000,
  23000,
  24000,
  25000,
  26000,
  27000,
  28000,
  29000,
  30000,
  31000,
  32000,
  33000,
  34000,
  35000,
  36000,
  37000,
  38000,
  39000,
  40000,
  41000,
  42000,
  43000,
  44000,
  45000,
  46000,
  47000,
  48000,
  49000,
  50000,
  51000,
  52000,
  53000,
  54000,
  55000,
  56000,
  57000,
  58000,
  59000,
  60000,
  61000,
  62000,
  63000,
  64000,
  65000,
  66000,
  67000,
  68000,
  69000,
  70000,
  71000,
  72000,
  73000,
  74000,
  75000,
  76000,
  77000,
  78000,
  79000,
  80000,
  81000,
  82000,
  83000,
  84000,
  85000,
  86000,
  87000,
  88000,
  89000,
  90000,
  91000,
  92000,
  93000,
  94000,
  95000,
  96000,
  97000,
  98000,
  99000,
  100000,
  101000,
  102000,
  103000,
  104000,
  105000,
  106000,
  107000,
  108000,
  109000,
  110000,
  111000,
  112000,
  113000,
  114000,
  115000,
  116000,
  117000,
  118000,
  119000,
  120000,
  121000,
  122000,
  123000,
  124000,
  125000,
  126000,
  127000,
  128000,
  129000,
  130000,
  131000,
  132000,
  133000,
  134000,
  135000,
  136000,
  137000,
  138000,
  139000,
  140000,
  141000,
  142000,
  143000,
  144000,
  145000,
  146000,
  147000,
  148000,
  149000,
  150000,
  151000,
  152000,
  153000,
  154000,
  155000,
  156000,
  157000,
  158000,
  159000,
  160000,
  161000,
  162000,
  163000,
  164000,
  165000,
  166000,
  167000,
  168000,
  169000,
  170000,
  171000,
  172000,
  173000,
  174000,
  175000,
  176000,
  177000,
  178000,
  179000,
  180000,
  181000,
  182000,
  183000,
  184000,
  185000,
  186000,
  187000,
  188000,
  189000,
  190000,
  191000,
  192000,
  193000,
  194000,
  195000,
  196000,
  197000,
  198000,
  199000,
  200000,
];

const annualRetirementIncomeOptions = [
  "Select One",
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000,
  9000,
  10000,
  11000,
  12000,
  13000,
  14000,
  15000,
  16000,
  17000,
  18000,
  19000,
  20000,
  21000,
  22000,
  23000,
  24000,
  25000,
  26000,
  27000,
  28000,
  29000,
  30000,
  31000,
  32000,
  33000,
  34000,
  35000,
  36000,
  37000,
  38000,
  39000,
  40000,
  41000,
  42000,
  43000,
  44000,
  45000,
  46000,
  47000,
  48000,
  49000,
  50000,
  51000,
  52000,
  53000,
  54000,
  55000,
  56000,
  57000,
  58000,
  59000,
  60000,
  61000,
  62000,
  63000,
  64000,
  65000,
  66000,
  67000,
  68000,
  69000,
  70000,
  71000,
  72000,
  73000,
  74000,
  75000,
  76000,
  77000,
  78000,
  79000,
  80000,
  81000,
  82000,
  83000,
  84000,
  85000,
  86000,
  87000,
  88000,
  89000,
  90000,
  91000,
  92000,
  93000,
  94000,
  95000,
  96000,
  97000,
  98000,
  99000,
  100000,
  101000,
  102000,
  103000,
  104000,
  105000,
  106000,
  107000,
  108000,
  109000,
  110000,
  111000,
  112000,
  113000,
  114000,
  115000,
  116000,
  117000,
  118000,
  119000,
  120000,
  121000,
  122000,
  123000,
  124000,
  125000,
  126000,
  127000,
  128000,
  129000,
  130000,
  131000,
  132000,
  133000,
  134000,
  135000,
  136000,
  137000,
  138000,
  139000,
  140000,
  141000,
  142000,
  143000,
  144000,
  145000,
  146000,
  147000,
  148000,
  149000,
  150000,
  151000,
  152000,
  153000,
  154000,
  155000,
  156000,
  157000,
  158000,
  159000,
  160000,
  161000,
  162000,
  163000,
  164000,
  165000,
  166000,
  167000,
  168000,
  169000,
  170000,
  171000,
  172000,
  173000,
  174000,
  175000,
  176000,
  177000,
  178000,
  179000,
  180000,
  181000,
  182000,
  183000,
  184000,
  185000,
  186000,
  187000,
  188000,
  189000,
  190000,
  191000,
  192000,
  193000,
  194000,
  195000,
  196000,
  197000,
  198000,
  199000,
  200000,
];

export default function GeneralInformation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const {
    dobMonth,
    dobYear,
    gender,
    currentAnnualIncome,
    annualRetirementIncomeGoal,
    lifeExpectency,
  } = useAppSelector((state) => state.CRICalculator);

  const handleNext = () => {
    if (
      !dobMonth ||
      !dobYear ||
      !annualRetirementIncomeGoal ||
      !lifeExpectency
    ) {
      return setShowError(true);
    }

    dispatch(nextStep());
    navigate("/CRIC/PP");
  };

  return (
    <main className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          General Information
        </h3>
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <div className="flex items-center gap-1 font-semibold">
                <p>DOB Month</p>
                <RedStar />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
                value={dobMonth}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "dobMonth",
                      value: e.target.value,
                    })
                  )
                }
              >
                {monthOptions.map((month) => (
                  <option value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center gap-1 font-semibold">
                <p>DOB Year</p>
                <RedStar />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
                value={dobYear}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "dobYear",
                      value: e.target.value,
                    })
                  )
                }
              >
                {yearOptions.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          {showError && (!dobYear || !dobMonth) && (
            <Error message="Please select both DOB month and year." />
          )}
        </div>

        <div>
          <div className="flex items-center gap-1 font-semibold">
            <p>Gender</p>
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
            value={gender}
            onChange={(e) =>
              dispatch(
                updateField({
                  field: "gender",
                  value: e.target.value,
                })
              )
            }
          >
            <option value="Select One">Select One</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>Current Annual Income of all Sources (Before Tax)</p>
            <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
            value={currentAnnualIncome}
            onChange={(e) =>
              dispatch(
                updateField({
                  field: "currentAnnualIncome",
                  value: e.target.value,
                })
              )
            }
          >
            {annualIncomeOptions.map((income) => (
              <option value={income}>{income}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              What would you like to set as your annual retirement income goal
              (Net of tax, in today’s dollars)?
              <RedStar />
            </p>
            <CustomTooltip title="Set your annual retirement income goal (after tax) in today’s dollars to reflect your desired lifestyle." />
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
            value={annualRetirementIncomeGoal}
            onChange={(e) =>
              dispatch(
                updateField({
                  field: "annualRetirementIncomeGoal",
                  value: e.target.value,
                })
              )
            }
          >
            {annualRetirementIncomeOptions.map((annualRetirementIncome) => (
              <option value={annualRetirementIncome}>
                {annualRetirementIncome}
              </option>
            ))}
          </select>
          {showError && !annualRetirementIncomeGoal && (
            <Error message="This field is required" />
          )}
        </div>

        <div>
          <div className="font-semibold mb-2">
            <p>
              Please enter the age you would like your retirement income to stop
              <RedStar />
            </p>
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
            type="number"
            placeholder="Enter your life expectancy"
            onWheel={(e) => e.currentTarget.blur()}
            value={lifeExpectency || ""}
            onChange={(e) =>
              dispatch(
                updateField({
                  field: "lifeExpectency",
                  value: e.target.value,
                })
              )
            }
          />
          {showError && !lifeExpectency && (
            <Error message="Life expectancy is required" />
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="text-white p-[0.8rem] rounded-[10px] md:w-[200px] w-full text-[18px] bg-black"
          >
            Next
          </button>
        </div>
      </section>
      <CRICResultCard />
    </main>
  );
}
