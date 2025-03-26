import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import DFForm from "../../../components/Form/DFForm";
import DFInputWithWatch from "../../../components/Form/DFInputWithWatch";
import DFSelectWithWatch from "../../../components/Form/DFSelectWithWatch";
import BudgetDynamicFieldWithFrequency from "../BudgetDynamicFieldWithFrequency";
import { calculateTotalHousingExpenses } from "../../../redux/features/BgtSlice/BgtSlice";

export default function BgtHousingForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(calculateTotalHousingExpenses());
    dispatch(nextStep());
    navigate("/budget-calculator/transport-expenses");
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  const {
    housing: {
      mortgage: { mortgageFrequency, mortgageAmount },
      rent: { rentFrequency, rentAmount },
      homeInsurance: { homeInsuranceFrequency, homeInsuranceAmount },
      telecomService: { telecomServiceFrequency, telecomServiceAmount },
      maintenance: { maintenanceFrequency, maintenanceAmount },
      utilities: { utilitiesAmount, utilitiesFrequency },
      dynamicMaintenances,
      dynamicTelecomServices,
      dynamicUtilities,
      dynamicMoreHousingExpenses,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Housing Expenses
      </h3>
      <DFForm
        defaultValues={{
          mortgage: mortgageAmount,
          mortgageFrequency,

          rent: rentAmount,
          rentFrequency,

          homeInsurance: homeInsuranceAmount,
          homeInsuranceFrequency,

          telecomService: telecomServiceAmount,
          telecomServiceFrequency,

          maintenance: maintenanceAmount,
          maintenanceFrequency,

          utilities: utilitiesAmount,
          utilitiesFrequency,
        }}
      >
        <section className="space-y-[2rem]">
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="mortgage"
              subField="mortgageAmount"
              label="Mortgage"
              stepName="housing"
              placeholder={` 0.00`}
              tooltipTitle="Monthly payment towards your home loan principal and interest."
            />
            <DFSelectWithWatch
              name="mortgageFrequency"
              field="mortgage"
              label="Frequency"
              stepName="housing"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="rent"
              subField="rentAmount"
              label="Rent"
              stepName="housing"
              placeholder={` 0.00`}
              tooltipTitle="Monthly rent paid for your residence."
            />
            <DFSelectWithWatch
              name="rentFrequency"
              field="rent"
              label="Frequency"
              stepName="housing"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="homeInsurance"
              subField="homeInsuranceAmount"
              label="Home Insurance"
              stepName="housing"
              placeholder={` 0.00`}
              tooltipTitle="Insurance premium covering property damage and liabilities."
            />
            <DFSelectWithWatch
              name="homeInsuranceFrequency"
              field="homeInsurance"
              label="Frequency"
              stepName="housing"
            />
          </div>

          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="utilities"
                subField="utilitiesAmount"
                label="Utilities ( e.g., Electricity )"
                stepName="housing"
                placeholder={` 0.00`}
                tooltipTitle="Combined cost of water, gas, and electricity bills."
              />
              <DFSelectWithWatch
                name="utilitiesFrequency"
                field="utilities"
                label="Frequency"
                stepName="housing"
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="housing"
              field="dynamicUtilities"
              addBtnTitle="Add more utilities expenses"
              buttonInfoText="e.g., Water, Gas, Sewer/Drainage, Propane etc."
              dynamicFields={dynamicUtilities}
            />
          </div>

          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="telecomService"
                subField="telecomServiceAmount"
                label="Telecom Services ( e.g., Cable TV )"
                stepName="housing"
                placeholder={` 0.00`}
                tooltipTitle="Combined cost of cable TV, internet, home phone, and cell phone services."
              />
              <DFSelectWithWatch
                name="telecomServiceFrequency"
                field="telecomService"
                label="Frequency"
                stepName="housing"
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="housing"
              field="dynamicTelecomServices"
              addBtnTitle="Add more telecom service expenses"
              buttonInfoText="e.g., Home Phone, Cell Phone, Satelite, Internet etc."
              dynamicFields={dynamicTelecomServices}
            />
          </div>

          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="maintenance"
                subField="maintenanceAmount"
                label="Maintenances / Repairs"
                stepName="housing"
                placeholder={` 0.00`}
                tooltipTitle="Combined cost of cable TV, internet, home phone, and cell phone services."
              />
              <DFSelectWithWatch
                name="maintenanceFrequency"
                field="maintenance"
                label="Frequency"
                stepName="housing"
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="housing"
              field="dynamicMaintenances"
              addBtnTitle="Add more maintenance/repairs expenses"
              buttonInfoText="e.g., Vehicle Repair, Home Repair, Vehicle Maintenance, Electronic Repairs etc."
              dynamicFields={dynamicMaintenances}
            />
          </div>

          <BudgetDynamicFieldWithFrequency
            stepName="housing"
            field="dynamicMoreHousingExpenses"
            addBtnTitle="Add more housing expenses"
            dynamicFields={dynamicMoreHousingExpenses}
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
