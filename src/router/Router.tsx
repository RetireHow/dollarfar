import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import MainLayout from "../layouts/MainLayout";
import CompoundInterestCalculator from "../pages/CompoundInterestRateCalculator/CompoundInterestRateCalculator";
import NetWorthCalculator from "../pages/NetWorthCalculator/NetWorthCalculator";
import BudgetCalculator from "../pages/BudgetCalculator/BudgetCalculator";
import LoanCalcualtor from "../pages/LoanCalculator/LoanCalcualtor";
import EducationSavingsCalculator from "../pages/EducationSavingsCalculator/EducationSavingsCalculator";
import CostOfLivingCalculator from "../pages/CostOfLivingCalculator/CostOfLivingCalculator";
import RegisteredRetirementSavings from "../pages/RegisteredRetirementSavings/RegisteredRetirementSavings";
import RegisteredRetirementIncome from "../pages/RegisteredRetirementIncome/RegisteredRetirementIncome";
import ComprehensiveRetirement from "../pages/ComprehensiveRetirement/ComprehensiveRetirement";
import Research from "../pages/Research";
import BgtIncomeForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtIncomeForm";
import BgtHousingForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtHousingForm";
import BgtTransportForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtTransportForm";
import BgtEduForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtEduForm";
import BgtOtherForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtOtherForm";
import BgtLoanForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtLoanForm";
import BgtSavingsForm from "../pages/BudgetCalculator/BudgetIncomeForms/BgtSavingsForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "compound-interest-rate-calculator",
        element: <CompoundInterestCalculator />,
      },

      {
        path: "net-worth-calculator",
        element: <NetWorthCalculator />,
      },
      {
        path: "loan-calculator",
        element: <LoanCalcualtor />,
      },
      {
        path: "budget-calculator",
        element: <BudgetCalculator />,
        children: [
          {
            index: true,
            element: <BgtIncomeForm />,
          },
          {
            path: "housing-expenses",
            element: <BgtHousingForm />,
          },
          {
            path: "transport-expenses",
            element: <BgtTransportForm />,
          },
          {
            path: "educational-expenses",
            element: <BgtEduForm />,
          },
          {
            path: "other-expenses",
            element: <BgtOtherForm />,
          },
          {
            path: "loans",
            element: <BgtLoanForm />,
          },
          {
            path: "savings",
            element: <BgtSavingsForm />,
          },
        ],
      },
      {
        path: "education-savings-plan-calculator",
        element: <EducationSavingsCalculator />,
      },
      {
        path: "cost-of-living-calculator",
        element: <CostOfLivingCalculator />,
      },
      {
        path: "registered-retirement-savings-plan-calculator",
        element: <RegisteredRetirementSavings />,
      },
      {
        path: "registered-retirement-income-fund-calculator",
        element: <RegisteredRetirementIncome />,
      },
      {
        path: "comprehensive-retirement-calculator",
        element: <ComprehensiveRetirement />,
      },
      {
        path: "research",
        element: <Research />,
      },
    ],
  },
]);
