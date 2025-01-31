import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { updateGeneralInfoField } from "../../../redux/features/CRIC/CRICSlice";
import { useEffect, useState } from "react";
import Error from "../../../components/UI/Error";
import { toast } from "react-toastify";
import CRICRedStar from "../CRICRedStar";
import CRICTooltip from "../CRICTooltip";
import MandatoryUserHints from "../MandatoryUserHints";
import { Input, Select } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { handleKeyDownUtil } from "../../../utils/handleKeyDownUtil";
import {
  nextStep,
  resetActiveStep,
  setTotalSteps,
} from "../../../redux/features/stepperSlice/CRICStepperSlice";

const dobYearOptions = [{ value: "Select One", label: "Select One" }];
for (let i = 1952; i <= 2006; i++) {
  dobYearOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const dobMonthOptions = [
  { value: "Select One", label: "Select One" },
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const annualIncomeOptions = [{ value: "Select One", label: "Select One" }];
for (let i = 1000; i <= 200000; i += 1000) {
  annualIncomeOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const annualRetirementIncomeGoalOptions = annualIncomeOptions;

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
  } = useAppSelector((state) => state.CRICalculator.generalInfo);

  const handleNext = () => {
    if (
      dobMonth == "Select One" ||
      dobYear == "Select One" ||
      annualRetirementIncomeGoal == "Select One" ||
      currentAnnualIncome == "Select One" ||
      !lifeExpectency
    ) {
      toast.error("Please fill in the required fields.");
      return setShowError(true);
    }

    dispatch(nextStep());
    navigate("/CRIC/PP");
  };

  useEffect(() => {
    dispatch(resetActiveStep());
    dispatch(setTotalSteps(7));
  }, [dispatch]);

  return (
    <main>
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          General Information
        </h3>
        <MandatoryUserHints />
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <div className="font-semibold relative mb-2">
                DOB Month
                <CRICRedStar />
              </div>
              <Select
                size="large"
                showSearch
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                options={dobMonthOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) =>
                  dispatch(
                    updateGeneralInfoField({
                      key: "dobMonth",
                      value: value,
                    })
                  )
                }
                value={dobMonth}
              ></Select>
            </div>

            <div>
              <div className="font-semibold mb-2">
                DOB Year
                <CRICRedStar />
              </div>
              <Select
                size="large"
                showSearch
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                options={dobYearOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) =>
                  dispatch(
                    updateGeneralInfoField({
                      key: "dobYear",
                      value: value,
                    })
                  )
                }
                value={dobYear}
              ></Select>
            </div>
          </div>
          {showError &&
            (dobYear == "Select One" || dobMonth == "Select One") && (
              <Error message="Please select both DOB month and year." />
            )}
        </div>

        <div>
          <div className="flex items-center gap-1 font-semibold mb-2">
            <p>Gender</p>
          </div>
          <Select
            size="large"
            style={{
              height: 45,
              width: "100%",
              border: "1px solid #838383",
              borderRadius: "8px",
            }}
            variant="borderless"
            options={[
              { value: "Select One", label: "Select One" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updateGeneralInfoField({
                  key: "gender",
                  value: value,
                })
              )
            }
            value={gender}
          ></Select>
        </div>

        <div>
          <div className="flex font-semibold mb-2">
            <p>
              Current Annual Income of all Sources (Before Tax)
              <CRICRedStar />
              <CRICTooltip title="Please select your current annual income from all sources before taxes. Include all earnings such as salary, investments, pensions, and any other income sources to ensure accurate calculations." />
            </p>
          </div>
          <Select
            size="large"
            showSearch
            style={{
              height: 45,
              width: "100%",
              border: "1px solid #838383",
              borderRadius: "8px",
            }}
            variant="borderless"
            options={annualIncomeOptions}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updateGeneralInfoField({
                  key: "currentAnnualIncome",
                  value: value,
                })
              )
            }
            value={currentAnnualIncome}
          ></Select>
          {showError && currentAnnualIncome == "Select One" && (
            <Error message="This field is required" />
          )}
        </div>

        <div>
          <div className="font-semibold mb-2">
            <p>
              What would you like to set as your annual retirement income goal
              (Net of tax, in today’s dollars)?
              <CRICRedStar />
              <CRICTooltip title="Set your annual retirement income goal (after tax) in today’s dollars to reflect your desired lifestyle." />
            </p>
          </div>
          <Select
            size="large"
            showSearch
            style={{
              height: 45,
              width: "100%",
              border: "1px solid #838383",
              borderRadius: "8px",
            }}
            variant="borderless"
            options={annualRetirementIncomeGoalOptions}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updateGeneralInfoField({
                  key: "annualRetirementIncomeGoal",
                  value: value,
                })
              )
            }
            value={annualRetirementIncomeGoal}
          ></Select>
          {showError && annualRetirementIncomeGoal == "Select One" && (
            <Error message="This field is required" />
          )}
        </div>

        <div>
          <div className="font-semibold mb-2">
            <p>
              Please enter the age you would like your retirement income to stop
              <CRICRedStar />
              <CRICTooltip title="Enter the age at which you would like your retirement income to stop. This is typically based on your expected lifespan or the duration you plan to receive retirement funds. If unsure, consider consulting with a financial advisor to estimate the appropriate age for your financial needs." />
            </p>
          </div>
          <Input
            size="large"
            style={{
              height: 45,
              width: "100%",
              border: "1px solid #838383",
              borderRadius: "8px",
            }}
            variant="borderless"
            placeholder="Enter your estimated income"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={handleKeyDownUtil}
            onChange={(e) =>
              dispatch(
                updateGeneralInfoField({
                  key: "lifeExpectency",
                  value: e.target.value,
                })
              )
            }
            value={lifeExpectency}
          />
          {showError && !lifeExpectency && (
            <Error message="This field is required" />
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="text-white p-[0.8rem] rounded-[10px] w-full text-[18px] bg-black"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
