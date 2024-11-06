import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import MainLayout from "../layouts/MainLayout";
import Research from "../pages/Research";
import BgtIncomeForm from "../pages/BC/BudgetIncomeForms/BgtIncomeForm";
import BgtHousingForm from "../pages/BC/BudgetIncomeForms/BgtHousingForm";
import BgtTransportForm from "../pages/BC/BudgetIncomeForms/BgtTransportForm";
import BgtEduForm from "../pages/BC/BudgetIncomeForms/BgtEduForm";
import BgtOtherForm from "../pages/BC/BudgetIncomeForms/BgtOtherForm";
import BgtLoanForm from "../pages/BC/BudgetIncomeForms/BgtLoanForm";
import BgtSavingsForm from "../pages/BC/BudgetIncomeForms/BgtSavingsForm";
import CIRC from "../pages/CIRC/CIRC";
import NWC from "../pages/NWC/NWC";
import LC from "../pages/LC/LC";
import BC from "../pages/BC/BC";
import ESP from "../pages/ESP/ESP";
import COLC from "../pages/COLC/COLC";
import RRSP from "../pages/RRSP/RRSP";
import RRIF from "../pages/RRIF/RRIF";
import CRIC from "../pages/CRIC/CRIC";

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
        element: <CIRC />,
      },

      {
        path: "net-worth-calculator",
        element: <NWC />,
      },
      {
        path: "loan-calculator",
        element: <LC />,
      },
      {
        path: "budget-calculator",
        element: <BC />,
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
        element: <ESP />,
      },
      {
        path: "cost-of-living-calculator",
        element: <COLC />,
      },
      {
        path: "registered-retirement-savings-plan-calculator",
        element: <RRSP />,
      },
      {
        path: "registered-retirement-income-fund-calculator",
        element: <RRIF />,
      },
      {
        path: "comprehensive-retirement-calculator",
        element: <CRIC />,
      },
      {
        path: "research",
        element: <Research />,
      },
    ],
  },
]);
