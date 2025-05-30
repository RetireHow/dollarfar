import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CRICTooltip from "../CRICTooltip";
import CRICRedStar from "../CRICRedStar";
import {
  addMoreOtherIncome,
  calculateOtherIncome,
  updateOtherIncomeField,
} from "../../../redux/features/CRIC/CRICSlice";
import MandatoryUserHints from "../MandatoryUserHints";
import Error from "../../../components/UI/Error";
import { toast } from "react-toastify";
import { TAntSelectOption } from "../TAntSelectOption";
import { Select } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  antSelectFrequencyOptions,
  antYesNoSelectOptions,
} from "../options/selectOptions";
import { TOtherIncomeItem } from "../../../redux/features/CRIC/CRIC.types";
import AddedOtherIncomeList from "../AddedOtherIncomeList";

//Other Income Options
const otherIncomeAmountAnnuallyOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 100; i <= 35000; i = i + 100) {
  otherIncomeAmountAnnuallyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountSemiAnnuallyOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 100; i <= 17000; i = i + 100) {
  otherIncomeAmountSemiAnnuallyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountMonthlyOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 25; i <= 3000; i = i + 25) {
  otherIncomeAmountMonthlyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountWeeklyOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 25; i <= 700; i = i + 25) {
  otherIncomeAmountWeeklyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountBiWeeklyOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 25; i <= 1300; i = i + 25) {
  otherIncomeAmountBiWeeklyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountQuarterlyOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 100; i <= 900; i = i + 100) {
  otherIncomeAmountQuarterlyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeTypeOptions: TAntSelectOption[] = [
  { value: "Select One", label: "Select One" },
  { value: "Employment", label: "Employment" },
  { value: "Rental Property", label: "Rental Property" },
  { value: "Business", label: "Business" },
  { value: "Annuities", label: "Annuities" },
  {
    value: "Pension from other Countries",
    label: "Pension from other Countries",
  },
];

const estimatedIncomeStartOrStopReceivingAgesOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 50; i <= 100; i++) {
  estimatedIncomeStartOrStopReceivingAgesOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export default function OtherIncome() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const {
    otherIncome: {
      hasOtherIncome,
      otherIncomeAmount,
      otherIncomeFrequency,
      otherIncomeStartReceivingAge,
      otherIncomeStopReceivingAge,
      otherIncomeType,
    },
    calculatedResult: {
      otherIncomeResult: { addedOtherIncomesList },
    },
  } = useAppSelector((state) => state.CRICalculator);

  const handleNext = () => {
    if (hasOtherIncome == "Yes" && addedOtherIncomesList.length == 0) {
      if (
        otherIncomeAmount == "Select One" ||
        otherIncomeFrequency == "Select One" ||
        otherIncomeStartReceivingAge == "Select One" ||
        otherIncomeStopReceivingAge == "Select One" ||
        otherIncomeType == "Select One"
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
    } else if (hasOtherIncome == "Yes" && addedOtherIncomesList.length > 0) {
      if (otherIncomeType !== "Select One") {
        if (
          otherIncomeAmount == "Select One" ||
          otherIncomeFrequency == "Select One" ||
          otherIncomeStartReceivingAge == "Select One" ||
          otherIncomeStopReceivingAge == "Select One"
        ) {
          toast.error("Please fill in the required fields.");
          return setShowError(true);
        }
      }
    }
    dispatch(calculateOtherIncome(undefined));
    navigate("/CRIC/OAS");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddMoreOtherIncome = (incomeItem: TOtherIncomeItem) => {
    if (
      otherIncomeAmount != "Select One" &&
      otherIncomeFrequency != "Select One" &&
      otherIncomeStartReceivingAge != "Select One" &&
      otherIncomeStopReceivingAge != "Select One" &&
      otherIncomeType != "Select One"
    ) {
      dispatch(addMoreOtherIncome(incomeItem));
      toast.success("Successfully Added.");
      setShowError(false);
    } else {
      toast.error("Please fill in the required fields.");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <main>
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          Other Income
        </h3>

        <MandatoryUserHints />

        <div>
          <div className="font-semibold mb-2">
            <p>
              Will you have other income?
              <CRICTooltip title="Select 'Yes' if you expect to have income beyond your main job." />
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
                updateOtherIncomeField({
                  key: "hasOtherIncome",
                  value: value,
                })
              );
            }}
            value={hasOtherIncome}
          ></Select>
        </div>

        {hasOtherIncome == "Yes" ? (
          <>
            {addedOtherIncomesList?.length > 0 && <AddedOtherIncomeList />}

            {addedOtherIncomesList?.length == 0 && (
              <div>
                <div className="font-semibold mb-2">
                  <p>
                    What type of income is it?
                    <CRICRedStar />
                    <CRICTooltip title="Please input your aggregate income during retirement from the following sources : Employment/Business, Rental property net income, Annuity, Pension from other countries" />
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
                  options={otherIncomeTypeOptions}
                  suffixIcon={
                    <Icon
                      className="text-[1.5rem] text-gray-600"
                      icon="iconamoon:arrow-down-2"
                    />
                  }
                  onChange={(value) => {
                    dispatch(
                      updateOtherIncomeField({
                        key: "otherIncomeType",
                        value: value,
                      })
                    );
                  }}
                  value={otherIncomeType}
                ></Select>

                {otherIncomeType == "Select One" && showError && (
                  <Error message="This field is required" />
                )}
              </div>
            )}

            {/* For adding other income  */}
            {addedOtherIncomesList?.length > 0 && (
              <div>
                <div className="font-semibold mb-2">
                  <p>
                    If you need to estimate other income, please select one.
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
                  options={otherIncomeTypeOptions}
                  suffixIcon={
                    <Icon
                      className="text-[1.5rem] text-gray-600"
                      icon="iconamoon:arrow-down-2"
                    />
                  }
                  onChange={(value) => {
                    dispatch(
                      updateOtherIncomeField({
                        key: "otherIncomeType",
                        value: value,
                      })
                    );
                  }}
                  value={otherIncomeType}
                ></Select>
              </div>
            )}

            {otherIncomeType !== "Select One" ? (
              <>
                {" "}
                <div>
                  <div className="font-semibold mb-2">
                    <p>
                      Select the frequency of your estimated income
                      <CRICRedStar />
                      <CRICTooltip title="Indicate how frequently you expect to receive this income (e.g., monthly, weekly, annually)." />
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
                    options={antSelectFrequencyOptions}
                    suffixIcon={
                      <Icon
                        className="text-[1.5rem] text-gray-600"
                        icon="iconamoon:arrow-down-2"
                      />
                    }
                    onChange={(value) => {
                      dispatch(
                        updateOtherIncomeField({
                          key: "otherIncomeFrequency",
                          value: value,
                        })
                      );
                      dispatch(
                        updateOtherIncomeField({
                          key: "otherIncomeAmount",
                          value: "Select One",
                        })
                      );
                    }}
                    value={otherIncomeFrequency}
                  ></Select>
                  {otherIncomeFrequency == "Select One" && showError && (
                    <Error message="This field is required" />
                  )}
                </div>
                <div>
                  <div className="font-semibold mb-2">
                    <p>
                      What is your estimated income?
                      <CRICRedStar />
                      <CRICTooltip title="Enter the estimated amount of income you receive. For example, if you selected 'Monthly' and expect to earn $3,000 per month, enter 3000." />
                    </p>
                  </div>
                  <Select
                    size="large"
                    disabled={
                      otherIncomeFrequency == "Select One" ? true : false
                    }
                    showSearch
                    style={{
                      height: 45,
                      width: "100%",
                      border: "1px solid #838383",
                      borderRadius: "8px",
                    }}
                    className={`${
                      otherIncomeFrequency == "Select One"
                        ? "bg-gray-100 !border-gray-200"
                        : ""
                    }`}
                    variant="borderless"
                    options={
                      otherIncomeFrequency == "1"
                        ? otherIncomeAmountAnnuallyOptions
                        : otherIncomeFrequency == "2"
                        ? otherIncomeAmountSemiAnnuallyOptions
                        : otherIncomeFrequency == "12"
                        ? otherIncomeAmountMonthlyOptions
                        : otherIncomeFrequency == "52"
                        ? otherIncomeAmountWeeklyOptions
                        : otherIncomeFrequency == "26"
                        ? otherIncomeAmountBiWeeklyOptions
                        : otherIncomeFrequency == "4"
                        ? otherIncomeAmountQuarterlyOptions
                        : []
                    }
                    suffixIcon={
                      <Icon
                        className="text-[1.5rem] text-gray-600"
                        icon="iconamoon:arrow-down-2"
                      />
                    }
                    onChange={(value) => {
                      dispatch(
                        updateOtherIncomeField({
                          key: "otherIncomeAmount",
                          value: value,
                        })
                      );
                    }}
                    value={otherIncomeAmount}
                  ></Select>
                  {otherIncomeAmount == "Select One" && showError && (
                    <Error message="This field is required" />
                  )}
                </div>
                <div>
                  <div className="font-semibold mb-2">
                    <p>
                      At what age will you start receiving your estimated
                      income?
                      <CRICRedStar />
                      <CRICTooltip title="Enter the age at which you expect to start receiving this income. For example, if you expect to start receiving income at age 60, enter 60." />
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
                    options={estimatedIncomeStartOrStopReceivingAgesOptions}
                    suffixIcon={
                      <Icon
                        className="text-[1.5rem] text-gray-600"
                        icon="iconamoon:arrow-down-2"
                      />
                    }
                    onChange={(value) => {
                      dispatch(
                        updateOtherIncomeField({
                          key: "otherIncomeStartReceivingAge",
                          value: value,
                        })
                      );
                    }}
                    value={otherIncomeStartReceivingAge}
                  ></Select>
                  {otherIncomeStartReceivingAge == "Select One" &&
                    showError && <Error message="This field is required" />}
                </div>
                <div>
                  <div className="font-semibold mb-2">
                    <p>
                      At what age will you stop receiving your estimated income?
                      <CRICRedStar />
                      <CRICTooltip title="Enter the age at which you expect to stop receiving this income. For example, if you expect to stop receiving income at age 70, enter 70." />
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
                    options={estimatedIncomeStartOrStopReceivingAgesOptions}
                    suffixIcon={
                      <Icon
                        className="text-[1.5rem] text-gray-600"
                        icon="iconamoon:arrow-down-2"
                      />
                    }
                    onChange={(value) => {
                      dispatch(
                        updateOtherIncomeField({
                          key: "otherIncomeStopReceivingAge",
                          value: value,
                        })
                      );
                    }}
                    value={otherIncomeStopReceivingAge}
                  ></Select>
                  {otherIncomeStopReceivingAge == "Select One" && showError && (
                    <Error message="This field is required" />
                  )}
                  {Number(otherIncomeStartReceivingAge) >
                    Number(otherIncomeStopReceivingAge) &&
                    showError && (
                      <Error message="Stop age must be greater than start age." />
                    )}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => {
                      handleAddMoreOtherIncome({
                        otherIncomeAmount,
                        otherIncomeFrequency,
                        otherIncomeStartReceivingAge,
                        otherIncomeStopReceivingAge,
                        otherIncomeType,
                      });
                    }}
                    className="border-[1px] border-green-600 px-2 py-1 rounded-md hover:bg-green-600 text-green-600 hover:text-white flex items-center gap-2 duration-300"
                  >
                    <Icon icon="rivet-icons:plus" width="16" height="16" />
                    Add Another Income
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
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
