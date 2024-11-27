import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";

const contributionOptions = [
  0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375,
  400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750,
  775, 800, 825, 850, 875, 900, 925, 950, 975, 1000, 1025, 1050, 1075, 1100,
  1125, 1150, 1175, 1200, 1225, 1250, 1275, 1300, 1325, 1350, 1375, 1400, 1425,
  1450, 1475, 1500, 1525, 1550, 1575, 1600, 1625, 1650, 1675, 1700, 1725, 1750,
  1775, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025, 2050, 2075,
  2100, 2125, 2150, 2175, 2200, 2225, 2250, 2275, 2300, 2325, 2350, 2375, 2400,
  2425, 2450, 2475, 2500, 2525, 2550, 2575, 2600, 2625, 2630,
];

const annualIncomeReceivingRRSPOptions = [
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  69, 70, 71,
];

export default function RetirementSavings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/other-income");
  };

  const {
    hasRRSP,
    otherSavings,
    averageAnnualRateOfReturn,
    contributionAmount,
    contributionFrequency,
    currentTotalOfRRSP,
    receivinSavingsgAge,
    receivingIncomeFromRRSPAge,
    stopReceivingIncomeFromRRSPAge,
    stopReceivingSavingsAge,
  } = useAppSelector((state) => state.CRICalculator.retirementSavings);

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Retirement Savings</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Do you have a registered retirement savings plan (RRSP)?</p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={hasRRSP}
          onChange={(e) =>
            dispatch(
              updateField({
                section: "retirementSavings",
                field: "hasRRSP",
                value: e.target.value,
              })
            )
          }
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
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
              value={currentTotalOfRRSP}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "currentTotalOfRRSP",
                    value: e.target.value,
                  })
                )
              }
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
                <select
                  id="options"
                  className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                  value={contributionFrequency}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        section: "retirementSavings",
                        field: "contributionFrequency",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option value="Select One">Select One</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Annually">Annually</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                </select>
              </div>
              <div className="w-full">
                <div className="font-semibold mb-2">
                  <p>Amount of your contribution:</p>
                </div>
                <select
                  id="options"
                  className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                  value={contributionAmount}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        section: "retirementSavings",
                        field: "contributionAmount",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {contributionOptions.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
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
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={receivingIncomeFromRRSPAge}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "receivingIncomeFromRRSPAge",
                    value: e.target.value,
                  })
                )
              }
            >
              {annualIncomeReceivingRRSPOptions.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                At what age do you plan to stop receiving an annual income from
                your RRSP(s)?
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={stopReceivingIncomeFromRRSPAge}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "stopReceivingIncomeFromRRSPAge",
                    value: e.target.value,
                  })
                )
              }
            >
              {annualIncomeReceivingRRSPOptions.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                What average annual rate of return do you believe you can earn
                on your investments until you start to receive a monthly income
                from your RRSP(s)?
              </p>
            </div>

            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={averageAnnualRateOfReturn}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "averageAnnualRateOfReturn",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
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

        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={otherSavings}
          onChange={(e) =>
            dispatch(
              updateField({
                section: "retirementSavings",
                field: "otherSavings",
                value: e.target.value,
              })
            )
          }
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
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
              value={currentTotalOfRRSP}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "currentTotalOfRRSP",
                    value: e.target.value,
                  })
                )
              }
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
                <select
                  id="options"
                  className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                  value={contributionFrequency}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        section: "retirementSavings",
                        field: "contributionFrequency",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option value="Select One">Select One</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Annually">Annually</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                </select>
              </div>
              <div className="w-full">
                <div className="font-semibold mb-2">
                  <p>Amount of your contribution:</p>
                </div>
                <select
                  id="options"
                  className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                  value={contributionAmount}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        section: "retirementSavings",
                        field: "contributionAmount",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {contributionOptions.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to start receiving your savings?</p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={receivinSavingsgAge}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "receivinSavingsgAge",
                    value: e.target.value,
                  })
                )
              }
            >
              {annualIncomeReceivingRRSPOptions.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to stop receiving your savings?</p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={stopReceivingSavingsAge}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "stopReceivingSavingsAge",
                    value: e.target.value,
                  })
                )
              }
            >
              {annualIncomeReceivingRRSPOptions.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                What average annual rate of return do you believe you can earn
                on your investments until you start to receive a monthly income
                from your other savings?
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={averageAnnualRateOfReturn}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "retirementSavings",
                    field: "averageAnnualRateOfReturn",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
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
