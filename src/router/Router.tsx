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
import BC from "../pages/BC/BC";
import COLC from "../pages/COLC/COLC";
import RRSP from "../pages/RRSP/RRSP";
import RRIF from "../pages/RRIF/RRIF";
// import PendingCRI from "../pages/PendingCRI";

import CRIC from "../pages/CRIC/CRIC";
import GeneralInformation from "../pages/CRIC/Forms/GeneralInformation";
import CanadaPensionPlan from "../pages/CRIC/Forms/CanadaPensionPlan";
import OldAgeSecurity from "../pages/CRIC/Forms/OldAgeSecurity";
import Summary from "../pages/CRIC/Summary";
import EmployerPension from "../pages/CRIC/Forms/EmployerPension";
import RetirementSavings from "../pages/CRIC/Forms/RetirementSavings";
import OtherIncome from "../pages/CRIC/Forms/OtherIncome";
import BCSummary from "../pages/BC/BCSummary/BCSummary";
import IndexExplanation from "../pages/COLC/IndexExplanation";
import QualityLife from "../pages/COLC/COLCPages/QualityLife";
import Crime from "../pages/COLC/COLCPages/Crime";
import HealthCare from "../pages/COLC/COLCPages/HealthCare";
import Pollution from "../pages/COLC/COLCPages/Pollution";
import PropertyPrice from "../pages/COLC/COLCPages/PropertyPrice";
import Traffic from "../pages/COLC/COLCPages/Traffic";
import TrafficIndexExplanation from "../pages/COLC/COLCPages/TrafficIndexExplanation";
import QualityLifeIndexExplanation from "../pages/COLC/COLCPages/QualityLifeIndexExplanation";
import PollutionIndicesExplanation from "../pages/COLC/COLCPages/PollutionIndicesExplanation";
import StickyCurrencyPage from "../pages/COLC/COLCPages/StickyCurrencyPage";
import CloseCityLivingCost from "../pages/COLC/COLCPages/CloseCityLivingCost";
import PropertyPriceExplanationPage from "../pages/COLC/COLCPages/PropertyPriceExplanationPage";
import HealthCareExplanationPage from "../pages/COLC/COLCPages/HealthCareExplanationPage";
import EstimatedCostCalculatorPage from "../pages/COLC/COLCPages/EstimatedCostCalculatorPage";
import CrimeExplanation from "../pages/COLC/COLCPages/CrimeExplanation";
import AdminLogin from "../pages/Admin/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import SendOtpForm from "../pages/Admin/OTPVerification/SendOtpForm";
import VerifyOtpForm from "../pages/Admin/OTPVerification/VerifyOtpForm";
import ResetPasswordForm from "../pages/Admin/OTPVerification/ResetPasswordForm";
import { Ebook1 } from "../pages/Ebook/Ebook1";
import CostOfLivingPersonalizedCalculator from "../pages/COLC/PersonalizedCostOfLivingCalculator/CostOfLivingPersonalizedCalculator";
import CostOfLivingEstimator from "../pages/AdvanceEstimator";
import { MortgageCalculatorCanada } from "../pages/MortgageCalculatorCanada/MortgageCalculatorCanada";
import { MortgageCalculatorAmerica } from "../pages/MortgageCalculatorAmerica/MortgageCalculatorAmerica";
import { MortgageCalculator } from "../pages/Mortgage/MortgageCalculator";
import BookLandingPage from "../pages/Landing/BookLandingPage/BookLandingPage";
import PrivacyPolicy from "../pages/Policies/PrivacyPolicy";
import RefundPolicy from "../pages/Policies/RefundPolicy";
import TermsAndConditions from "../pages/Policies/TermsAndConditions";
import FeedbackForm from "../pages/Landing/BookLandingPage/FeedbackForm";
import PaymentSuccess from "../pages/Landing/BookLandingPage/PaymentSuccess";
import PaymentCancel from "../pages/Landing/BookLandingPage/PaymentCancel";
import CompoundInterestComparisonCalculator from "../pages/CompoundInterestComparisonCalculator/CompoundInterestComparisonCalculator";
import NetIncomeYieldCalculator from "../pages/NetIncomeYieldCalculator/NetIncomeYieldCalculator";
import InvestmentCalculator from "../pages/Investor/InvestmentCalculator";
import RetirementSimulator from "../pages/RetirementCalculator/RetirementSimulator";

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
        path: "compound-interest-comparison-calculator",
        element: <CompoundInterestComparisonCalculator />,
      },
      {
        path: "net-worth-calculator",
        element: <NWC />,
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
          {
            path: "summary",
            element: <BCSummary />,
          },
        ],
      },
      {
        path: "cost-of-living-calculator",
        element: <COLC />,
      },
      {
        path: "cost-of-living-calculator/estimated-cost-calculator",
        element: <EstimatedCostCalculatorPage />,
      },

      {
        path: "cost-of-living-calculator/quality-life/:countryCity",
        element: <QualityLife />,
      },
      {
        path: "cost-of-living-calculator/quality-life/quality-life-indices-explanation",
        element: <QualityLifeIndexExplanation />,
      },

      {
        path: "cost-of-living-calculator/crime/:countryCity",
        element: <Crime />,
      },
      {
        path: "cost-of-living-calculator/crime/crime-explanation",
        element: <CrimeExplanation />,
      },
      {
        path: "cost-of-living-calculator/health-care/:countryCity",
        element: <HealthCare />,
      },
      {
        path: "cost-of-living-calculator/health-care/healthcare-explanation",
        element: <HealthCareExplanationPage />,
      },
      {
        path: "cost-of-living-calculator/pollution/:countryCity",
        element: <Pollution />,
      },
      {
        path: "cost-of-living-calculator/pollution/pollution-indices-explanation",
        element: <PollutionIndicesExplanation />,
      },
      {
        path: "cost-of-living-calculator/property-prices/:countryCity",
        element: <PropertyPrice />,
      },
      {
        path: "cost-of-living-calculator/property-prices/property-price-index-explanation",
        element: <PropertyPriceExplanationPage />,
      },
      {
        path: "cost-of-living-calculator/traffic/:countryCity",
        element: <Traffic />,
      },
      {
        path: "cost-of-living-calculator/traffic/traffic-index-explanation",
        element: <TrafficIndexExplanation />,
      },

      {
        path: "cost-of-living-calculator/indices-explanation",
        element: <IndexExplanation />,
      },

      {
        path: "cost-of-living-calculator/property-prices/sticky-currency",
        element: <StickyCurrencyPage />,
      },
      {
        path: "cost-of-living-calculator/close-city-living-cost/:countryCity",
        element: <CloseCityLivingCost />,
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
        path: "CRIC",
        element: <CRIC />,
        // element: <PendingCRI />,
        children: [
          {
            index: true,
            element: <GeneralInformation />,
          },
          {
            path: "PP",
            element: <CanadaPensionPlan />,
          },
          {
            path: "employer-pension",
            element: <EmployerPension />,
          },
          {
            path: "retirement-savings",
            element: <RetirementSavings />,
          },
          {
            path: "other-income",
            element: <OtherIncome />,
          },
          {
            path: "OAS",
            element: <OldAgeSecurity />,
          },
          {
            path: "summary",
            element: <Summary />,
          },
        ],
      },

      {
        path: "admin-login",
        element: <AdminLogin />,
      },
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "send-otp",
        element: <SendOtpForm />,
      },
      {
        path: "verify-otp-form",
        element: <VerifyOtpForm />,
      },
      {
        path: "reset-password-form",
        element: <ResetPasswordForm />,
      },

      {
        path: "/ebook1",
        element: <Ebook1 />,
      },

      {
        path: "research",
        element: <Research />,
      },
      {
        path: "personalized-calculator",
        element: <CostOfLivingPersonalizedCalculator />,
      },
      {
        path: "estimator",
        element: <CostOfLivingEstimator />,
      },
      {
        path: "mortgage-calculator-canada",
        element: <MortgageCalculatorCanada />,
      },
      {
        path: "mortgage-calculator-america",
        element: <MortgageCalculatorAmerica />,
      },
      {
        path: "mortgage-calculator",
        element: <MortgageCalculator />,
      },
      {
        path: "net-income-yield-calculator",
        element: <NetIncomeYieldCalculator />,
      },
      {
        path: "book-landing",
        element: <BookLandingPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "terms-and-condition",
        element: <TermsAndConditions />,
      },
      {
        path: "feedback-form",
        element: <FeedbackForm />,
      },
      {
        path: "success",
        element: <PaymentSuccess />,
      },
      {
        path: "cancel",
        element: <PaymentCancel />,
      },
      {
        path: "investment-calcualtor",
        element: <InvestmentCalculator />,
      },
      {
        path: "retirement-simulator",
        element: <RetirementSimulator />,
      },
    ],
  },
]);
