import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import DFInputWithWatch from "../../../components/Form/DFInputWithWatch";
import DFSelectWithWatch from "../../../components/Form/DFSelectWithWatch";
import BudgetDynamicFieldWithFrequency from "../BudgetDynamicFieldWithFrequency";
import DFForm from "../../../components/Form/DFForm";
import { calculateTotalTransportExpenses } from "../../../redux/features/BgtSlice/BgtSlice";

export default function BgtTransportForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(calculateTotalTransportExpenses());
    dispatch(nextStep());
    navigate("/budget-calculator/educational-expenses");
  };
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  const {
    transport: {
      carPayment: { carPaymentAmount, carPaymentFrequency },
      carInsurance: { carInsuranceAmount, carInsuranceFrequency },
      carRepairs: { carRepairsAmount, carRepairsFrequency },
      gasFuelEtrToll: { gasFuelEtrTollAmount, gasFuelEtrTollFrequency },

      dynamicGasFuelEtrToll,
      dynamicMoreTransportExpenses,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  const { currency } = useAppSelector((state) => state.globalCurrency);

  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Transport Expenses
      </h3>

      <DFForm
        defaultValues={{
          carPayment: carPaymentAmount,
          carPaymentFrequency,

          carInsurance: carInsuranceAmount,
          carInsuranceFrequency,

          carRepairs: carRepairsAmount,
          carRepairsFrequency,

          gasFuelEtrToll: gasFuelEtrTollAmount,
          gasFuelEtrTollFrequency,
        }}
      >
        <section className="space-y-[2rem]">
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="carPayment"
              subField="carPaymentAmount"
              label="Car Payment"
              stepName="transport"
              placeholder={`${currency} 0.00`}
              tooltipTitle="Enter your monthly car loan or lease payment amount."
            />
            <DFSelectWithWatch
              name="carPaymentFrequency"
              field="carPayment"
              label="Frequency"
              stepName="transport"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="carInsurance"
              subField="carInsuranceAmount"
              label="Car Insurance"
              stepName="transport"
              placeholder={`${currency} 0.00`}
              tooltipTitle="Include your monthly car insurance premium."
            />
            <DFSelectWithWatch
              name="carInsuranceFrequency"
              field="carInsurance"
              label="Frequency"
              stepName="transport"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="carRepairs"
              subField="carRepairsAmount"
              label="Car Repairs"
              stepName="transport"
              placeholder={`${currency} 0.00`}
              tooltipTitle="Estimate your average monthly expenses for car repairs and maintenance."
            />
            <DFSelectWithWatch
              name="carRepairsFrequency"
              field="carRepairs"
              label="Frequency"
              stepName="transport"
            />
          </div>

          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="gasFuelEtrToll"
                subField="gasFuelEtrTollAmount"
                label="Travel Budgets ( e.g., fuel )"
                stepName="transport"
                placeholder={`${currency} 0.00`}
                tooltipTitle="Provide your monthly spending on fuel and toll roads combined."
              />
              <DFSelectWithWatch
                name="gasFuelEtrTollFrequency"
                field="gasFuelEtrToll"
                label="Frequency"
                stepName="transport"
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="transport"
              field="dynamicGasFuelEtrToll"
              addBtnTitle="Add more travel budgets"
              buttonInfoText="e.g., Gas, Fuel, ETR Toll Roads"
              dynamicFields={dynamicGasFuelEtrToll}
            />
          </div>

          <BudgetDynamicFieldWithFrequency
            stepName="transport"
            field="dynamicMoreTransportExpenses"
            addBtnTitle="Add more transport expenses"
            dynamicFields={dynamicMoreTransportExpenses}
          />
        </section>
      </DFForm>

      <div className="grid grid-cols-2 md:gap-10 gap-3">
        <button
          onClick={handleBack}
          className="border-[1px] md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black md:text-[1.25rem] text-[18px] text-white rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
