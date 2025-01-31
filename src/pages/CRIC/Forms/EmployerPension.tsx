import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CRICTooltip from "../CRICTooltip";
import CRICRedStar from "../CRICRedStar";
import {
  calculateEmployerPension,
  updateAgeByAgeField,
  updateEmployerPensionField,
} from "../../../redux/features/CRIC/CRICSlice";
import { handleKeyDownUtil } from "../../../utils/handleKeyDownUtil";
import MandatoryUserHints from "../MandatoryUserHints";
import Error from "../../../components/UI/Error";
import { toast } from "react-toastify";
import { Input, Select } from "antd";
import { antYesNoSelectOptions } from "../options/selectOptions";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TAntSelectOption } from "../TAntSelectOption";
import { nextStep, previousStep } from "../../../redux/features/stepperSlice/CRICStepperSlice";

const pensionPlanTypeOptions: TAntSelectOption[] = [
  { value: "Select One", label: "Select One" },
  { value: "Defined Benefit Plan", label: "Defined Benefit Plan" },
  { value: "Defined Contribution Plan", label: "Defined Contribution Plan" },
  { value: "RRIF/RRSP Plan", label: "RRIF/RRSP Plan" },
];

const employerPensionStartReceivingAgesOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 50; i <= 72; i++) {
  employerPensionStartReceivingAgesOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export default function EmployerPension() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const {
    employerPension: {
      annualPension,
      hasEmployerPension,
      inflationRate,
      isIndexedToInflation,
      pensionPlanType,
      pensionReceivingAge,
    },
  } = useAppSelector((state) => state.CRICalculator);

  const handleNext = () => {
    if (hasEmployerPension == "Yes") {
      if (
        pensionPlanType == "Select One" ||
        pensionReceivingAge == "Select One" ||
        !annualPension
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
      dispatch(calculateEmployerPension(undefined));
    }

    if (hasEmployerPension == "No") {
      dispatch(
        updateAgeByAgeField({
          mainKey: "employerPensionResult",
          subKey: "employerPensionsAgeByAge",
        })
      );
    }

    if (isIndexedToInflation == "No") {
      if (!inflationRate) {
        return setShowError(true);
      }
    }

    dispatch(nextStep());
    navigate("/CRIC/retirement-savings");
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
          Employer Pension/RRIF
        </h3>

        <MandatoryUserHints />

        <div>
          <div className="font-semibold mb-2">
            <p>
              Are you a member of an employer pension plan?
              <CRICTooltip title="Select 'Yes' if you are currently enrolled in a pension plan offered by your employer. Employer pension plans often provide retirement income based on contributions from both you and your employer." />
            </p>
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
            options={antYesNoSelectOptions}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) => {
              dispatch(
                updateEmployerPensionField({
                  key: "hasEmployerPension",
                  value: value,
                })
              );
            }}
            value={hasEmployerPension}
          ></Select>
        </div>

        {hasEmployerPension === "Yes" && (
          <>
            <div>
              <div className="font-semibold mb-2">
                <p>
                  What type of pension plan is it?
                  <CRICRedStar />
                  <CRICTooltip title="Choose the type of pension plan you are a member of. Common types include Defined Benefit Plans (fixed payout based on a formula) and Defined Contribution Plans (payout depends on investment performance and contributions)." />
                </p>
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
                options={pensionPlanTypeOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  dispatch(
                    updateEmployerPensionField({
                      key: "pensionPlanType",
                      value: value,
                    })
                  );
                }}
                value={pensionPlanType}
              ></Select>
              {pensionPlanType == "Select One" && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  What is your estimated annual pension from your above selected
                  plan?
                  <CRICRedStar />
                  <CRICTooltip title="Enter the approximate amount you expect to receive annually from your pension plan during retirement. If you're unsure, check with your employer or pension provider for an estimate." />
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
                onChange={(e) => {
                  dispatch(
                    updateEmployerPensionField({
                      key: "annualPension",
                      value: e.target.value,
                    })
                  );
                }}
                value={annualPension}
              />
              {!annualPension && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  At what age do you plan to receive your pension?
                  <CRICRedStar />
                  <CRICTooltip title="Select the age at which you plan to start receiving your pension payments. Keep in mind that starting earlier may result in smaller payouts, while delaying may increase the amount." />
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
                options={employerPensionStartReceivingAgesOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  dispatch(
                    updateEmployerPensionField({
                      key: "pensionReceivingAge",
                      value: value,
                    })
                  );
                }}
                value={pensionReceivingAge}
              ></Select>
              {pensionReceivingAge == "Select One" && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="flex items-end gap-2 font-semibold mb-2">
                <p>
                  Is your pension indexed to inflation?
                  <CRICTooltip title="Indicate whether your pension is adjusted for inflation. Indexed pensions increase periodically to match the cost of living, helping to maintain your purchasing power in retirement." />
                </p>
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
                options={antYesNoSelectOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  dispatch(
                    updateEmployerPensionField({
                      key: "isIndexedToInflation",
                      value: value,
                    })
                  );
                }}
                value={isIndexedToInflation}
              ></Select>
            </div>

            {isIndexedToInflation == "No" && (
              <div>
                <div className="font-semibold flex items-end gap-1 mb-2">
                  <p>
                    What would you like to use as inflation rate?
                    <CRICRedStar />
                    <CRICTooltip title="Enter the rate you expect inflation to grow annually during retirement. This will help calculate how inflation might affect the value of your pension and future expenses. Typical rates range from 2% to 3%" />
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
                  type="number"
                  placeholder="Enter your estimated income"
                  onWheel={(e) => e.currentTarget.blur()}
                  onKeyDown={handleKeyDownUtil}
                  onChange={(e) => {
                    dispatch(
                      updateEmployerPensionField({
                        key: "inflationRate",
                        value: e.target.value,
                      })
                    );
                  }}
                  value={inflationRate}
                />

                {!inflationRate && showError && (
                  <Error message="This field is required" />
                )}
              </div>
            )}
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
