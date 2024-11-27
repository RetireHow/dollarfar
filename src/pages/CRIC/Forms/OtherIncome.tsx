import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";

const annualIncomeReceivingRRSPOptions = [
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  69, 70, 71,
];

const estimatedIncomeOptions = [
  0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375,
  400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750,
  775, 800, 825, 850, 875, 900, 925, 950, 975, 1000, 1025, 1050, 1075, 1100,
  1125, 1150, 1175, 1200, 1225, 1250, 1275, 1300, 1325, 1350, 1375, 1400, 1425,
  1450, 1475, 1500, 1525, 1550, 1575, 1600, 1625, 1650, 1675, 1700, 1725, 1750,
  1775, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025, 2050, 2075,
  2100, 2125, 2150, 2175, 2200, 2225, 2250, 2275, 2300, 2325, 2350, 2375, 2400,
  2425, 2450, 2475, 2500, 2525, 2550, 2575, 2600, 2625, 2630,
];

export default function OtherIncome() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/old-age-security");
  };

  const {
    hasOtherIncome,
    incomeType,
    estimatedIncome,
    estimatedIncomeFrequency,
    receivingEstimatedIncomeAge,
    stopReceivingEstimatedIncomeAge,
  } = useAppSelector((state) => state.CRICalculator.otherIncome);

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Other Income</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Will you have other income?</p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={hasOtherIncome}
          onChange={(e) =>
            dispatch(
              updateField({
                section: "otherIncome",
                field: "hasOtherIncome",
                value: e.target.value,
              })
            )
          }
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {hasOtherIncome === "Yes" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>What type of income is it? *</p>
            </div>

            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={incomeType}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "otherIncome",
                    field: "incomeType",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="Select One">Select One</option>
              <option value="Employment">Employment</option>
              <option value="Rental Property">Rental Property</option>
              <option value="Business">Business</option>
              <option value="Annuities">Annuities</option>
              <option value="Personal income from other countries">
                Personal income from other countries
              </option>
              <option value="Other Pensions eg: Disability and Survivors">
                Other Pensions eg: Disability and Survivors
              </option>
              <option value="Other eg: Lump-sum and inheritance">
                Other eg: Lump-sum and inheritance
              </option>
            </select>
          </div>
        </>
      )}

      {hasOtherIncome === "Yes" &&
        (incomeType === "Employment" ||
          incomeType === "Rental Property" ||
          incomeType === "Business" ||
          incomeType === "Annuities" ||
          incomeType === "Personal income from other countries" ||
          incomeType === "Other Pensions eg: Disability and Survivors") && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Select the frequency of your estimated income.</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={estimatedIncomeFrequency}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "estimatedIncomeFrequency",
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
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>What is your estimated income?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={estimatedIncome}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "estimatedIncome",
                      value: e.target.value,
                    })
                  )
                }
              >
                {estimatedIncomeOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  At what age will you start receiving your estimated income?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={receivingEstimatedIncomeAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "receivingEstimatedIncomeAge",
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
                  At what age will you stop receiving your estimated income?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={stopReceivingEstimatedIncomeAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "stopReceivingEstimatedIncomeAge",
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
          </>
        )}

      {hasOtherIncome === "Yes" &&
        incomeType === "Other eg: Lump-sum and inheritance" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age will you receive your estimated income?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={receivingEstimatedIncomeAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "receivingEstimatedIncomeAge",
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
                <p>What is your estimated income?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={estimatedIncome}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "estimatedIncome",
                      value: e.target.value,
                    })
                  )
                }
              >
                {estimatedIncomeOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  At what age will you start receiving your estimated income?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={receivingEstimatedIncomeAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "receivingEstimatedIncomeAge",
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
                  At what age will you stop receiving your estimated income?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={stopReceivingEstimatedIncomeAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "otherIncome",
                      field: "stopReceivingEstimatedIncomeAge",
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
