import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  calculatePPBenefit,
  updateAgeByAgeField,
  updatePensionPlanField,
} from "../../../redux/features/CRIC/CRICSlice";
import { useEffect, useState } from "react";
import Error from "../../../components/UI/Error";
import { toast } from "react-toastify";
import CRICRedStar from "../CRICRedStar";
import CRICTooltip from "../CRICTooltip";
import MandatoryUserHints from "../MandatoryUserHints";
import { Select } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { nextStep, previousStep } from "../../../redux/features/stepperSlice/CRICStepperSlice";

const monthlyPensionEstimateOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 10; i <= 1433; i += 10) {
  monthlyPensionEstimateOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export default function CanadaPensionPlanRough() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const { selectedPP, ppStartYear, monthlyRetirementPensionEstimate } =
    useAppSelector((state) => state.CRICalculator.pensionPlan);

  const handleNext = () => {
    if (selectedPP !== "Not Applicable") {
      if (
        ppStartYear == "Select One" ||
        monthlyRetirementPensionEstimate == "Select One"
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
      dispatch(calculatePPBenefit(undefined));
    }
    if (selectedPP == "Not Applicable") {
      dispatch(
        updateAgeByAgeField({
          mainKey: "PPResult",
          subKey: "PPBenefitsAgeByAge",
        })
      );
    }
    dispatch(nextStep());
    navigate("/CRIC/employer-pension");
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <main>
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          Canada Pension Plan
        </h3>

        <MandatoryUserHints />

        <div>
          <div className="font-semibold mb-2">
            <p>
              Individuals who contribute to the Quebec Pension Plan (QPP) or the
              Canada Pension Plan (CPP) may be eligible to receive pension
              benefits at retirement. Which pension applies to you?
              <CRICTooltip title="Select the pension plan that applies to you based on your contributions. Individuals who have worked and contributed in Quebec are typically eligible for the Quebec Pension Plan (QPP), while those who have contributed elsewhere in Canada are eligible for the Canada Pension Plan (CPP). If you have contributed to both, choose the plan that primarily applies to your contributions." />
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
            options={[
              { value: "Not Applicable", label: "Not Applicable" },
              { value: "Canada Pension Plan", label: "Canada Pension Plan" },
              { value: "Quebec Pension Plan", label: "Quebec Pension Plan" },
            ]}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updatePensionPlanField({
                  key: "selectedPP",
                  value: value,
                })
              )
            }
            value={selectedPP}
          ></Select>
          {showError && !selectedPP && (
            <Error message="This field is required*." />
          )}
        </div>

        {selectedPP !== "Not Applicable" && (
          <>
            <div>
              <div className="font-semibold mb-2">
                <p>
                  Enter your monthly retirement pension estimate (at age 65)
                  indicated on your Statement that states your retirement
                  pension estimate based on your past contributions
                  <CRICRedStar />
                  <CRICTooltip title="Enter the estimated amount of your monthly retirement pension at age 65. This information can typically be found on your pension statement, which provides an estimate based on your past contributions to the plan. If you do not have this information, refer to your latest pension statement or contact the relevant pension plan for assistance." />
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
                options={monthlyPensionEstimateOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) =>
                  dispatch(
                    updatePensionPlanField({
                      key: "monthlyRetirementPensionEstimate",
                      value: value,
                    })
                  )
                }
                value={monthlyRetirementPensionEstimate}
              ></Select>
              {showError &&
                monthlyRetirementPensionEstimate == "Select One" && (
                  <Error message="This field is required*" />
                )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  At what age do you plan to receive your{" "}
                  {selectedPP == "Canada Pension Plan" ? "CPP" : "QPP"} benefit?
                  <CRICRedStar />
                  <CRICTooltip title="Select the age at which you plan to start receiving your pension benefits. You can typically begin receiving benefits as early as age 60, but the amount may vary depending on whether you choose to start earlier, at 65, or later. Starting earlier usually results in reduced monthly payments, while delaying can increase them. Consider your financial needs and goals when making this decision." />
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
                options={[
                  { value: "Select One", label: "Select One" },
                  { value: "60", label: "60" },
                  { value: "61", label: "61" },
                  { value: "62", label: "62" },
                  { value: "63", label: "63" },
                  { value: "64", label: "64" },
                  { value: "65", label: "65" },
                  { value: "66", label: "66" },
                  { value: "67", label: "67" },
                  { value: "68", label: "68" },
                  { value: "69", label: "69" },
                  { value: "70", label: "70" },
                ]}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) =>
                  dispatch(
                    updatePensionPlanField({
                      key: "ppStartYear",
                      value: value,
                    })
                  )
                }
                value={ppStartYear}
              ></Select>
              {showError && ppStartYear == "Select One" && (
                <Error message="This field is required*" />
              )}
            </div>
          </>
        )}

        <div className="grid grid-cols-2 w-full md:gap-5 gap-3">
          <button
            onClick={handleBack}
            className="border-[1px] md:text-[1.25rem] text-[18px] w-full border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-white md:text-[1.25rem] text-[18px] p-[0.8rem] rounded-[10px] w-full bg-black"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
