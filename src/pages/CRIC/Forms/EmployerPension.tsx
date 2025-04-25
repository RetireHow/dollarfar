import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CRICTooltip from "../CRICTooltip";
import CRICRedStar from "../CRICRedStar";
import {
  addMoreEmployerPension,
  calculateEmployerPension,
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
import AddedEmployerPensionList from "../AddedEmployerPensionList";

const pensionPlanTypeOptions: TAntSelectOption[] = [
  { value: "Select One", label: "Select One" },
  { value: "Defined Benefit Plan", label: "Defined Benefit Plan" },
  { value: "Defined Contribution Plan", label: "Defined Contribution Plan" },
  { value: "RRIF/RRSP Plan", label: "RRIF/RRSP Plan" },
];

const employerPensionStartReceivingAgesOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 50; i <= 100; i++) {
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
      hasEmployerPension,
      annualPension,
      inflationRate,
      isIndexedToInflation,
      pensionPlanType,
      pensionReceivingAge,
    },
    calculatedResult: {
      employerPensionResult: { addedEmployerPensionsList },
    },
  } = useAppSelector((state) => state.CRICalculator);

  const { lifeExpectency } = useAppSelector(
    (state) => state.CRICalculator.generalInfo
  );

  const handleNext = () => {
    if (hasEmployerPension == "Yes" && addedEmployerPensionsList.length == 0) {
      if (
        pensionPlanType == "Select One" ||
        pensionReceivingAge == "Select One" ||
        !annualPension.trim()
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
    } else if (
      hasEmployerPension == "Yes" &&
      addedEmployerPensionsList.length > 0
    ) {
      if (pensionPlanType !== "Select One") {
        if (!annualPension.trim() || pensionReceivingAge == "Select One") {
          toast.error("Please fill in the required fields.");
          return setShowError(true);
        }
      }
    }
    if (isIndexedToInflation == "No" && !inflationRate.trim()) {
      toast.error("Please fill in the required field.");
      return setShowError(true);
    }
    dispatch(calculateEmployerPension(undefined));
    navigate("/CRIC/retirement-savings");
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  const handleAddMoreOtherPensionPlan = () => {
    if (
      lifeExpectency &&
      pensionPlanType !== "Select One" &&
      annualPension &&
      pensionReceivingAge !== "Select One"
    ) {
      dispatch(
        addMoreEmployerPension({
          pensionPlanType,
          annualPension,
          inflationRate,
          pensionReceivingAge,
          isIndexedToInflation,
          pensionStopReceivingAge: lifeExpectency,
        })
      );
      toast.success("Successfully Added.");
    } else {
      return toast.error("Please fill in the required fields.");
    }
  };

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
            {addedEmployerPensionsList?.length > 0 && (
              <AddedEmployerPensionList />
            )}

            {addedEmployerPensionsList?.length == 0 && (
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
            )}

            {addedEmployerPensionsList?.length > 0 && (
              <div>
                <div className="font-semibold mb-2">
                  <p>
                    If you need to estimate pension income from another employer
                    pension plan, please select one
                    <CRICTooltip title="Please select the plan(s) applicable to you (if you have more than one plan, enter one plan at a time). If you have more than one of the same types of plan, you should add all of the pension estimates together before entering the total amount in the Calculator." />
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
              </div>
            )}

            {pensionPlanType !== "Select One" && (
              <>
                <div>
                  <div className="font-semibold mb-2">
                    <p>
                      What is your estimated annual pension from your above
                      selected plan?
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
                    placeholder="Enter your estimated annual pension amount"
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
          </>
        )}

        <div className="flex justify-center items-center">
          <button
            onClick={handleAddMoreOtherPensionPlan}
            className="border-[1px] border-green-600 px-2 py-1 rounded-md hover:bg-green-600 text-green-600 hover:text-white flex items-center gap-2 duration-300"
          >
            <Icon icon="rivet-icons:plus" width="16" height="16" />
            Add Another Pension Plan
          </button>
        </div>

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
