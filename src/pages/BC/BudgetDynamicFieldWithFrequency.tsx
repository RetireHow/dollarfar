import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "../../redux/hooks";
import {
  addDynamicField,
  calculateCashFlow,
  calculateTotalEducationalExpenses,
  calculateTotalExpenses,
  calculateTotalHousingExpenses,
  calculateTotalIncome,
  calculateTotalLoansExpenses,
  calculateTotalOtherExpenses,
  calculateTotalSavingsExpenses,
  calculateTotalTransportExpenses,
  deleteDynamicField,
  updateDynamicFieldFrequency,
  updateDynamicFieldTitle,
  updateDynamicFieldValue,
} from "../../redux/features/BgtSlice/BgtSlice";
import { Select } from "antd";
import { BCFrequencyOptions } from "./BCFrequencyOptions";
import { isNegative } from "../../utils/isNegative";
import Error from "../../components/UI/Error";
import { ChangeEvent } from "react";

type TDynamicField = {
  title: string;
  amount: string;
  frequency: string;
  totalAnnualAmount: number;
};

export default function BudgetDynamicFieldWithFrequency({
  stepName,
  field,
  dynamicFields,
  addBtnTitle,
  buttonInfoText,
}: {
  stepName: string;
  field: string;
  addBtnTitle: string;
  buttonInfoText?: string;
  dynamicFields: TDynamicField[];
}) {
  const dispatch = useAppDispatch();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    dispatch(
      updateDynamicFieldValue({
        stepName,
        field,
        value: e.target.value,
        index,
      }),
    );

    if (stepName === "income") {
      dispatch(calculateTotalIncome());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "housing") {
      dispatch(calculateTotalHousingExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "transport") {
      dispatch(calculateTotalTransportExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "education") {
      dispatch(calculateTotalEducationalExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "other") {
      dispatch(calculateTotalOtherExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "loans") {
      dispatch(calculateTotalLoansExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "savings") {
      dispatch(calculateTotalSavingsExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    }
  };

  const handleSelectChange = (value: string, index: number) => {
    dispatch(
      updateDynamicFieldFrequency({
        stepName,
        field,
        value,
        index,
      }),
    );

    if (stepName === "income") {
      dispatch(calculateTotalIncome());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "housing") {
      dispatch(calculateTotalHousingExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "transport") {
      dispatch(calculateTotalTransportExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "education") {
      dispatch(calculateTotalEducationalExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "other") {
      dispatch(calculateTotalOtherExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "loans") {
      dispatch(calculateTotalLoansExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "savings") {
      dispatch(calculateTotalSavingsExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    }
  };

  const handleDelete = (index: number) => {
    dispatch(
      deleteDynamicField({
        stepName,
        field,
        index,
      }),
    );

    if (stepName === "income") {
      dispatch(calculateTotalIncome());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "housing") {
      dispatch(calculateTotalHousingExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "transport") {
      dispatch(calculateTotalTransportExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "education") {
      dispatch(calculateTotalEducationalExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "other") {
      dispatch(calculateTotalOtherExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "loans") {
      dispatch(calculateTotalLoansExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    } else if (stepName === "savings") {
      dispatch(calculateTotalSavingsExpenses());
      dispatch(calculateTotalExpenses());
      dispatch(calculateCashFlow());
    }
  };

  return (
    <>
      {dynamicFields?.map((salary, index) => {
        const { title, amount, frequency } = salary || {};
        return (
          <div
            key={index}
            className="flex md:flex-row flex-col md:items-center gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center mb-[0.3rem]">
                <input
                  className="outline-none border-b-[1px] w-full border-gray-200 font-semibold md:text-[1rem] text-[14px]"
                  placeholder="Enter title here"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    dispatch(
                      updateDynamicFieldTitle({
                        stepName,
                        field,
                        value: e.target.value,
                        index,
                      }),
                    );
                  }}
                />
              </div>
              <div>
                <input
                  className={`outline-none border-[1px] px-[12px] py-[9px] w-full duration-300 rounded-[8px] ${
                    isNegative(Number(amount))
                      ? "border-red-500 border-[2px]"
                      : "border-[#838383]"
                  }`}
                  type="number"
                  placeholder="Enter amount here"
                  onWheel={(e) => e.currentTarget.blur()}
                  value={amount}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {isNegative(Number(amount)) && (
                  <Error message="Negative value is not allowed." />
                )}
              </div>
            </div>

            <div>
              <label className="block mb-[0.3rem] font-semibold md:text-[1rem] text-[14px]">
                Frequency
              </label>
              <div className="flex items-center gap-3 md:max-w-[200px] w-full">
                <Select
                  value={frequency}
                  style={{
                    height: 45,
                    border: "1px solid #838383",
                    borderRadius: "8px",
                  }}
                  className="md:w-[300px] w-full"
                  variant="borderless"
                  options={BCFrequencyOptions}
                  suffixIcon={
                    <Icon
                      className="md:text-[1.5rem] text-[1rem] text-gray-600"
                      icon="iconamoon:arrow-down-2"
                    />
                  }
                  placeholder="Select one"
                  onChange={(value) => handleSelectChange(value, index)}
                ></Select>
                <div className="border-[1px] text-red-500  duration-200 border-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 cursor-pointer">
                  <Icon
                    onClick={() => handleDelete(index)}
                    icon="ic:baseline-delete"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <button
          onClick={() =>
            dispatch(
              addDynamicField({
                stepName,
                field,
                value: {
                  title: "",
                  amount: "",
                  frequency: "12",
                  totalAnnualAmount: 0,
                },
              }),
            )
          }
          className="border-[1px] border-[#229D00] text-[#229D00] md:text-[1rem] text-[14px] hover:bg-[#229D00] duration-200 hover:text-white px-2 py-1 rounded-md flex items-center gap-1"
        >
          <Icon icon="ic:round-plus" width="20" height="20" />
          <span>{addBtnTitle}</span>
        </button>
        <p className="text-[12px] text-[#229D00] mt-1">{buttonInfoText}</p>
      </div>
    </>
  );
}
