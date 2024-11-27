import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { Icon } from "@iconify/react/dist/iconify.js";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";

const annualPensionAmountsOptions = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
  13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000,
  24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000,
  35000, 36000, 37000, 38000, 39000, 40000, 41000, 42000, 43000, 44000, 45000,
  46000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000,
  57000, 58000, 59000, 60000, 61000, 62000, 63000, 64000, 65000, 66000, 67000,
  68000, 69000, 70000, 71000, 72000, 73000, 74000, 75000, 76000, 77000, 78000,
  79000, 80000, 81000, 82000, 83000, 84000, 85000, 86000, 87000, 88000, 89000,
  90000, 91000, 92000, 93000, 94000, 95000, 96000, 97000, 98000, 99000, 100000,
  101000, 102000, 103000, 104000, 105000, 106000, 107000, 108000, 109000,
  110000, 111000, 112000, 113000, 114000, 115000, 116000, 117000, 118000,
  119000, 120000, 121000, 122000, 123000, 124000, 125000, 126000, 127000,
  128000, 129000, 130000, 131000, 132000, 133000, 134000, 135000, 136000,
  137000, 138000, 139000, 140000, 141000, 142000, 143000, 144000, 145000,
  146000, 147000, 148000, 149000, 150000, 151000, 152000, 153000, 154000,
  155000, 156000, 157000, 158000, 159000, 160000, 161000, 162000, 163000,
  164000, 165000, 166000, 167000, 168000, 169000, 170000, 171000, 172000,
  173000, 174000, 175000,
];

const annualContributionAmountsOptions = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
  13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000,
  24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000,
];

const pensionReceiveAgeOptions = [
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  69, 70, 71, 72,
];

export default function EmployerPension() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/retirement-savings");
  };

  const {
    isMemberOfPensionPlan,
    pensionPlanType,
    addedPlan,
    averageAnnualRateOfReturn,
    currentValueOfPlan,
    employerContributeToPlanYearly,
    estimatedPensionFromDefinedPlan,
    isPensionIndexedInflation,
    pensionReceivingAge,
    yearlyContributionOfYourPlan,
  } = useAppSelector((state) => state.CRICalculator.employerPension);

  const handleAddPlan = () => {
    dispatch(
      updateField({
        section: "employerPension",
        field: "addedPlan",
        value: pensionPlanType,
      })
    );
  };

  const handleRemovePlan = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) {
      return;
    }
    dispatch(
      updateField({
        section: "employerPension",
        field: "addedPlan",
        value: "",
      })
    );
  };

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Employer Pension</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Are you a member of an employer pension plan?</p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={isMemberOfPensionPlan}
          onChange={(e) =>
            dispatch(
              updateField({
                section: "employerPension",
                field: "isMemberOfPensionPlan",
                value: e.target.value,
              })
            )
          }
        >
          <option value="Select One">Select One</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {addedPlan && (
        <div className="flex justify-between items-center gap-2">
          <div className="w-full">
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Selected Plans</p>
            </div>

            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={pensionPlanType}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "employerPension",
                    field: "pensionPlanType",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value={addedPlan}>{addedPlan}</option>
            </select>
          </div>
          <Icon
            onClick={handleRemovePlan}
            className="text-red-500 text-[2rem] mt-8 cursor-pointer"
            icon="material-symbols:delete"
          />
        </div>
      )}

      {isMemberOfPensionPlan === "Yes" && (
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>What type of pension plan is it?</p>
          </div>

          <select
            id="options"
            className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
            value={pensionPlanType}
            onChange={(e) =>
              dispatch(
                updateField({
                  section: "employerPension",
                  field: "pensionPlanType",
                  value: e.target.value,
                })
              )
            }
          >
            <option value="Select One">Select One</option>
            <option value="Defined Benefit plan">Defined Benefit plan</option>
            <option value="Defined Contribution Plan">
              Defined Contribution Plan
            </option>
            <option value="Pooled Registered Plan">
              Pooled Registered Plan
            </option>
            <option value="Deferred profit sharing plans">
              Deferred profit sharing plans
            </option>
            <option value="Group RRSPs">Group RRSPs</option>
          </select>
        </div>
      )}

      {isMemberOfPensionPlan === "Yes" &&
        pensionPlanType === "Defined Benefit plan" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  What is your estimated annual pension from your Defined
                  Benefit Plan?
                </p>
              </div>

              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={estimatedPensionFromDefinedPlan}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "estimatedPensionFromDefinedPlan",
                    value: e.target.value,
                  })
                )}
              >
                {annualPensionAmountsOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age do you plan to receive your pension?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={pensionReceivingAge}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "pensionReceivingAge",
                    value: e.target.value,
                  })
                )}
              >
                {pensionReceiveAgeOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Is your pension indexed to inflation?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={isPensionIndexedInflation}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "isPensionIndexedInflation",
                    value: e.target.value,
                  })
                )}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </>
        )}

      {isMemberOfPensionPlan === "Yes" &&
        (pensionPlanType === "Defined Contribution Plan" ||
          pensionPlanType === "Pooled Registered Plan" ||
          pensionPlanType === "Deferred profit sharing plans" ||
          pensionPlanType === "Group RRSPs") && (
          <>
            <div>
              <div className="font-semibold mb-2 flex justify-between items-center">
                <p>What is the current value of your plan?</p>
                <p>(max. 10000000)</p>
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                max="10000000"
                min="0"
                placeholder="Enter current value"
                onWheel={(e) => e.currentTarget.blur()}
                value={currentValueOfPlan}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "currentValueOfPlan",
                    value: e.target.value,
                  })
                )}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age do you plan to receive your pension?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={pensionReceivingAge}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "pensionReceivingAge",
                    value: e.target.value,
                  })
                )}
              >
                {pensionReceiveAgeOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  How much does your employer contribute to your plan each year?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={employerContributeToPlanYearly}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "employerContributeToPlanYearly",
                    value: e.target.value,
                  })
                )}
              >
                {annualContributionAmountsOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>How much do you contribute to the plan each year?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={yearlyContributionOfYourPlan}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "yearlyContributionOfYourPlan",
                    value: e.target.value,
                  })
                )}
              >
                {annualContributionAmountsOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  What do you think your plan's average annual rate of return
                  will be until you start to receive your pension?
                </p>
              </div>

              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={averageAnnualRateOfReturn}
                onChange={(e) =>  dispatch(
                  updateField({
                    section: "employerPension",
                    field: "averageAnnualRateOfReturn",
                    value: e.target.value,
                  })
                )}
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

      {pensionPlanType && (
        <button
          onClick={handleAddPlan}
          className="flex items-center justify-between border-[1px] border-gray-300 px-3 py-2 rounded-lg gap-3 font-semibold"
        >
          <Icon className="text-[1.5rem]" icon="ic:round-plus" />
          <span>Add Another Plan</span>
        </button>
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
