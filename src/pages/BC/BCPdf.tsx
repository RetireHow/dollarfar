import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { assets } from "../../assets/assets";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";

// Define styles for the PDF
const styles = StyleSheet.create({
  section: {
    fontSize: 14,
    fontWeight: "extrabold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    border: "1px solid #EAECF0",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: 12,
  },
  section2: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    fontSize: 14,
    marginBottom: 20,
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "35%",
    transform: "translate(-50%, -50%) rotate(-30deg)",
    fontSize: 50,
    color: "rgba(220, 220, 220, 0.2)",
    fontWeight: "bold",
    opacity: 0.3,
  },

  // table
  page: {
    padding: 20,
  },
  caption: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: "#f8f7f7",
    flexDirection: "row",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 5,
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 12,
    textAlign: "left",
    borderRightWidth: 1,
    borderColor: "#e0e0e0",
  },
  tableCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 12,
    textAlign: "left",
    borderColor: "#e0e0e0",
  },
  tableRowHover: {
    backgroundColor: "#faf8f8",
  },
  totalCell: {
    flex: 3, // Span across three columns
    padding: 5,
    fontSize: 12,
    textAlign: "left",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderColor: "#e0e0e0",
  },
  totalCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 12,
    textAlign: "left",
    fontWeight: "bold",
    borderColor: "#e0e0e0",
  },
});

type TDynamicField = {
  title: string;
  amount: string;
  frequency: string;
  totalAnnualAmount: number;
}[];

// ==========================|| Income Types ||================================
type TSalarySubField = {
  salaryAmount: string;
  salaryFrequency: string;
  totalAnnualAmount: number;
};

type TGovtBenefitsSubField = {
  govtBenefitsAmount: string;
  govtBenefitsFrequency: string;
  totalAnnualAmount: number;
};

type TNetIncomeSubField = {
  netIncomeAmount: string;
  netIncomeFrequency: string;
  totalAnnualAmount: number;
};

type TOtherIncomeSubField = {
  otherIncomeAmount: string;
  otherIncomeFrequency: string;
  totalAnnualAmount: number;
};

// =======================|| Housing Types ||======================
type TMortgage1 = {
  mortgageAmount1: string;
  mortgageFrequency1: string;
  totalAnnualAmount: number;
};
type TMortgage2 = {
  mortgageAmount2: string;
  mortgageFrequency2: string;
  totalAnnualAmount: number;
};
type TMortgage3 = {
  mortgageAmount3: string;
  mortgageFrequency3: string;
  totalAnnualAmount: number;
};

type TRent = {
  rentAmount: string;
  rentFrequency: string;
  totalAnnualAmount: number;
};
type THomeInsurance = {
  homeInsuranceAmount: string;
  homeInsuranceFrequency: string;
  totalAnnualAmount: number;
};
type TUtilities = {
  utilitiesAmount: string;
  utilitiesFrequency: string;
  totalAnnualAmount: number;
};
type TTelecomService = {
  telecomServiceAmount: string;
  telecomServiceFrequency: string;
  totalAnnualAmount: number;
};
type TMaintenance = {
  maintenanceAmount: string;
  maintenanceFrequency: string;
  totalAnnualAmount: number;
};

// ==========================|| Transport Types ||======================
type TCarPayment = {
  carPaymentAmount: string;
  carPaymentFrequency: string;
  totalAnnualAmount: number;
};
type TCarInsurance = {
  carInsuranceAmount: string;
  carInsuranceFrequency: string;
  totalAnnualAmount: number;
};
type TCarRepairs = {
  carRepairsAmount: string;
  carRepairsFrequency: string;
  totalAnnualAmount: number;
};
type TGasFuelEtrToll = {
  gasFuelEtrTollAmount: string;
  gasFuelEtrTollFrequency: string;
  totalAnnualAmount: number;
};

// ==========================|| Education Types ||===================
type TSchoolCollegeFee = {
  schoolCollegeFeeAmount: string;
  schoolCollegeFeeFrequency: string;
  totalAnnualAmount: number;
};

// ======================|| Other Expenses Types ||===================
type Thousehole = {
  householeAmount: string;
  householeFrequency: string;
  totalAnnualAmount: number;
};
type Tclothing = {
  clothingAmount: string;
  clothingFrequency: string;
  totalAnnualAmount: number;
};
type TeatingOut = {
  eatingOutAmount: string;
  eatingOutFrequency: string;
  totalAnnualAmount: number;
};
type Tmedical = {
  medicalAmount: string;
  medicalFrequency: string;
  totalAnnualAmount: number;
};
type TentertainmentEvents = {
  entertainmentEventsAmount: string;
  entertainmentEventsFrequency: string;
  totalAnnualAmount: number;
};

// ======================|| Loan Types ||=========================
type TPersonalLoan = {
  personalLoanAmount: string;
  personalLoanFrequency: string;
  totalAnnualAmount: number;
};
type THomeLoan = {
  homeLoanAmount: string;
  homeLoanFrequency: string;
  totalAnnualAmount: number;
};
type TStudentLoan = {
  studentLoanAmount: string;
  studentLoanFrequency: string;
  totalAnnualAmount: number;
};

// ===================|| Savings Types ||=====================
type TVacationFund = {
  vacationFundAmount: "";
  vacationFundFrequency: "12";
  totalAnnualAmount: 0;
};
type TEmergency = {
  emergencyAmount: "";
  emergencyFrequency: "12";
  totalAnnualAmount: 0;
};
type TRetirement = {
  retirementAmount: "";
  retirementFrequency: "12";
  totalAnnualAmount: 0;
};
type TInvestments = {
  investmentsAmount: "";
  investmentsFrequency: "12";
  totalAnnualAmount: 0;
};

type TCalculatorData = {
  totalAnnualIncome: number;
  totalMonthlyIncome: number;
  totalAnnualIncomeAfterTax: number;
  totalMonthlyIncomeAfterTax: number;
  incomeTaxRate: string;
  totalAnnualExpenses: number;
  totalMonthlyExpenses: number;
  totalAnnualCashFlow: number;
  totalMonthlyCashFlow: number;
  totalAnnualCashFlowAfterTax: number;
  totalMonthlyCashFlowAfterTax: number;
  totalAnnualHousingExpenses: number;
  totalMonthlyHousingExpenses: number;
  totalAnnualTransportExpenses: number;
  totalMonthlyTransportExpenses: number;
  totalAnnualEducationalExpenses: number;
  totalMonthlyEducationalExpenses: number;
  totalAnnualOtherExpenses: number;
  totalMonthlyOtherExpenses: number;
  totalAnnualLoansExpenses: number;
  totalMonthlyLoansExpenses: number;
  totalAnnualSavingsExpenses: number;
  totalMonthlySavingsExpenses: number;
  name?: string;
  email?: string;
  base64: string;

  dynamicGovtBenefits: TDynamicField;
  dynamicMoreIncomes: TDynamicField;
  dynamicNetIncomes: TDynamicField;
  dynamicOtherIncomes: TDynamicField;
  dynamicSalaries: TDynamicField;
  govtBenefits: TGovtBenefitsSubField;
  netIncome: TNetIncomeSubField;
  otherIncome: TOtherIncomeSubField;
  salary: TSalarySubField;

  dynamicMaintenances: TDynamicField;
  dynamicMoreHousingExpenses: TDynamicField;
  dynamicTelecomServices: TDynamicField;
  dynamicUtilities: TDynamicField;
  homeInsurance: THomeInsurance;
  maintenance: TMaintenance;
  mortgage1: TMortgage1;
  mortgage2: TMortgage2;
  mortgage3: TMortgage3;
  rent: TRent;
  telecomService: TTelecomService;
  utilities: TUtilities;

  carInsurance: TCarInsurance;
  carPayment: TCarPayment;
  carRepairs: TCarRepairs;
  dynamicGasFuelEtrToll: TDynamicField;
  dynamicMoreTransportExpenses: TDynamicField;
  gasFuelEtrToll: TGasFuelEtrToll;

  dynamicMoreEducatoinExpenses: TDynamicField;
  dynamicSchoolCollegeFees: TDynamicField;
  schoolCollegeFee: TSchoolCollegeFee;

  clothing: Tclothing;
  dynamicEntertainmentEvents: TDynamicField;
  dynamicMoreOtherExpenses: TDynamicField;
  eatingOut: TeatingOut;
  entertainmentEvents: TentertainmentEvents;
  househole: Thousehole;
  medical: Tmedical;

  dynamicMoreLoansExpenses: TDynamicField;
  homeLoan: THomeLoan;
  personalLoan: TPersonalLoan;
  studentLoan: TStudentLoan;

  dynamicInvestments: TDynamicField;
  dynamicMoreInvestments: TDynamicField;
  emergency: TEmergency;
  investments: TInvestments;
  retirement: TRetirement;
  vacationFund: TVacationFund;
};

// Define a new PDF document component
export const BCPdf = ({ data }: { data: TCalculatorData }) => {
  const {
    name,
    email,
    totalAnnualIncome,
    totalMonthlyIncome,
    totalAnnualIncomeAfterTax,
    totalMonthlyIncomeAfterTax,
    incomeTaxRate,
    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlow,
    totalMonthlyCashFlow,
    totalAnnualCashFlowAfterTax,
    totalMonthlyCashFlowAfterTax,
    totalAnnualHousingExpenses,
    totalMonthlyHousingExpenses,
    totalAnnualTransportExpenses,
    totalMonthlyTransportExpenses,
    totalAnnualEducationalExpenses,
    totalMonthlyEducationalExpenses,
    totalAnnualOtherExpenses,
    totalMonthlyOtherExpenses,
    totalAnnualLoansExpenses,
    totalMonthlyLoansExpenses,
    totalAnnualSavingsExpenses,
    totalMonthlySavingsExpenses,

    // Breakdown data
    dynamicGovtBenefits,
    dynamicMoreIncomes,
    dynamicNetIncomes,
    dynamicOtherIncomes,
    dynamicSalaries,
    govtBenefits,
    netIncome,
    otherIncome,
    salary,

    dynamicMoreHousingExpenses,
    dynamicMaintenances,
    maintenance,
    dynamicTelecomServices,
    telecomService,
    dynamicUtilities,
    homeInsurance,
    mortgage1,
    mortgage2,
    mortgage3,
    rent,
    utilities,

    carInsurance,
    carPayment,
    carRepairs,
    dynamicGasFuelEtrToll,
    dynamicMoreTransportExpenses,
    gasFuelEtrToll,

    dynamicMoreEducatoinExpenses,
    dynamicSchoolCollegeFees,
    schoolCollegeFee,

    clothing,
    dynamicEntertainmentEvents,
    dynamicMoreOtherExpenses,
    eatingOut,
    entertainmentEvents,
    medical,
    househole,

    dynamicMoreLoansExpenses,
    personalLoan,
    studentLoan,

    dynamicInvestments,
    dynamicMoreInvestments,
    emergency,
    investments,
    retirement,
    vacationFund,
  } = data || {};

  return (
    <Document>
      <Page style={{ position: "relative" }}>
        <View style={{ padding: 30 }}>
          {/* Header  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            <Image
              style={{ width: 80, height: 80 }}
              src={assets.dollarfarPngLogo}
            />
            {(name || email) && (
              <View>
                <Text style={{ fontWeight: "bold" }}>Created By:</Text>
                <View
                  style={{ flexDirection: "row", gap: 40, margin: "10px 0" }}
                >
                  <Text style={{ color: "#696969" }}>Name</Text>
                  <Text>{name || "NA"}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 40 }}>
                  <Text style={{ color: "#696969" }}>Email</Text>
                  <Text>{email || "NA"}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Title  */}
          <View
            style={{
              fontSize: 16,
              fontWeight: "extrabold",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text>Budget Calculator</Text>
            <Text style={styles.title}></Text>
          </View>

          {/* ======================|| Budget Overview Table ||=================================================   */}
          {!Number(incomeTaxRate) && (
            <View style={{ marginBottom: 40 }}>
              <Text style={{ fontSize: "14px", marginBottom: 10 }}>
                Budget at a Glance
              </Text>
              {/* Table Heading  */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 10,
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Total
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Annual
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Monthly
                </Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {/* row 1 */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#000",
                    padding: 10,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                  }}
                >
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    Total Income
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalAnnualIncome}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalMonthlyIncome.toFixed(2)}
                  </Text>
                </View>
                {/* row 2 */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#000",
                    padding: 10,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                  }}
                >
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    Total Expenses
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalAnnualExpenses}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalMonthlyExpenses.toFixed(2)}
                  </Text>
                </View>
                {/* row 3 */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color:
                      totalAnnualIncome < totalAnnualExpenses
                        ? "red"
                        : totalAnnualIncome > totalAnnualExpenses
                        ? "#06D206"
                        : "black",
                    padding: 10,
                  }}
                >
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalAnnualIncome > totalAnnualExpenses
                      ? "Cashflow Surplus"
                      : totalAnnualIncome < totalAnnualExpenses
                      ? "Cashflow Deficit"
                      : "Cashflow"}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalAnnualCashFlow}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {totalMonthlyCashFlow.toFixed(2)}
                  </Text>
                </View>
              </View>

              {totalAnnualIncome > totalAnnualExpenses ? (
                <View
                  style={{
                    fontWeight: "medium",
                    marginTop: "10px",
                    fontSize: "12px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text>Great job! You have </Text>{" "}
                  <Text style={{ color: "#06D206" }}>
                    {numberWithCommas(Number(totalAnnualCashFlow.toFixed(2)))}{" "}
                    annually
                  </Text>{" "}
                  <Text> or </Text>{" "}
                  <Text style={{ color: "#06D206" }}>
                    {numberWithCommas(Number(totalMonthlyCashFlow.toFixed(2)))}{" "}
                    monthly
                  </Text>{" "}
                  <Text> left to save or invest.</Text>
                </View>
              ) : totalAnnualIncome < totalAnnualExpenses ? (
                <View
                  style={{
                    fontWeight: "medium",
                    marginTop: "10px",
                    fontSize: "12px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text>Heads up! Your expenses exceed your income by </Text>{" "}
                  <Text style={{ color: "red" }}>
                    {numberWithCommas(
                      Number(Math.abs(totalAnnualCashFlow).toFixed(2))
                    )}{" "}
                    annually{" "}
                  </Text>
                  <Text>or </Text>{" "}
                  <Text style={{ color: "red" }}>
                    {numberWithCommas(
                      Math.abs(Number(totalMonthlyCashFlow.toFixed(2)))
                    )}{" "}
                    monthly.
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontWeight: "medium",
                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  Your income matches your expenses. Consider saving for
                  unexpected costs or future goals.
                </Text>
              )}
            </View>
          )}

          {/* ======================|| Budget Overview Table : After Tax ||==================================   */}
          {Number(incomeTaxRate) &&
            totalAnnualIncomeAfterTax &&
            totalMonthlyIncomeAfterTax && (
              <View style={{ marginBottom: 40 }}>
                <Text style={{ fontSize: "14px", marginBottom: 10 }}>
                  Budget at a Glance
                </Text>
                {/* Table Heading  */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    backgroundColor: "black",
                    color: "#fff",
                    padding: 10,
                  }}
                >
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    Total
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    Annual
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    Monthly
                  </Text>
                </View>
                {/* Table Body  */}
                <View style={{ backgroundColor: "#F8F8F8" }}>
                  {/* row 1 */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#000",
                      padding: 10,
                      borderBottomColor: "#e5e7eb",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                    }}
                  >
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      Total Income Before Tax
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalAnnualIncome}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalMonthlyIncome.toFixed(2)}
                    </Text>
                  </View>
                  {/* row 2 */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#000",
                      padding: 10,
                      borderBottomColor: "#e5e7eb",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                    }}
                  >
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      Total Income After Tax
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalAnnualIncomeAfterTax.toFixed(2)}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalMonthlyIncomeAfterTax.toFixed(2)}
                    </Text>
                  </View>
                  {/* row 3 */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#000",
                      padding: 10,
                      borderBottomColor: "#e5e7eb",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                    }}
                  >
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      Total Expenses
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalAnnualExpenses}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalMonthlyExpenses.toFixed(2)}
                    </Text>
                  </View>
                  {/* row 4 */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color:
                        totalAnnualIncomeAfterTax < totalAnnualExpenses
                          ? "red"
                          : totalAnnualIncomeAfterTax > totalAnnualExpenses
                          ? "#06D206"
                          : "black",
                      padding: 10,
                    }}
                  >
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalAnnualIncomeAfterTax > totalAnnualExpenses
                        ? "Cashflow Surplus"
                        : totalAnnualIncomeAfterTax < totalAnnualExpenses
                        ? "Cashflow Deficit"
                        : "Cashflow"}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalAnnualCashFlowAfterTax.toFixed(2)}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {totalMonthlyCashFlowAfterTax.toFixed(2)}
                    </Text>
                  </View>
                </View>

                {totalAnnualIncomeAfterTax > totalAnnualExpenses ? (
                  <View
                    style={{
                      fontWeight: "medium",
                      marginTop: "10px",
                      fontSize: "12px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text>Great job! You have </Text>{" "}
                    <Text style={{ color: "#06D206" }}>
                      {numberWithCommas(
                        Number(totalAnnualCashFlowAfterTax.toFixed(2))
                      )}{" "}
                      annually
                    </Text>{" "}
                    <Text> or </Text>{" "}
                    <Text style={{ color: "#06D206" }}>
                      {numberWithCommas(
                        Number(totalMonthlyCashFlowAfterTax.toFixed(2))
                      )}{" "}
                      monthly
                    </Text>{" "}
                    <Text> left to save or invest.</Text>
                  </View>
                ) : totalAnnualIncomeAfterTax < totalAnnualExpenses ? (
                  <View
                    style={{
                      fontWeight: "medium",
                      marginTop: "10px",
                      fontSize: "12px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text>Heads up! Your expenses exceed your income by </Text>{" "}
                    <Text style={{ color: "red" }}>
                      {numberWithCommas(
                        Number(Math.abs(totalAnnualCashFlowAfterTax).toFixed(2))
                      )}{" "}
                      annually{" "}
                    </Text>
                    <Text>or </Text>{" "}
                    <Text style={{ color: "red" }}>
                      {numberWithCommas(
                        Math.abs(
                          Number(totalMonthlyCashFlowAfterTax.toFixed(2))
                        )
                      )}{" "}
                      monthly.
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontWeight: "medium",
                      marginTop: "10px",
                      fontSize: "12px",
                    }}
                  >
                    Your income matches your expenses. Consider saving for
                    unexpected costs or future goals.
                  </Text>
                )}
              </View>
            )}

          {/* ======================|| Category-Wise Expenses ||================================== */}
          <View>
            <Text style={{ fontSize: "14px", marginBottom: 10 }}>
              Category-Wise Expenses
            </Text>
            {/* Table Heading  */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                backgroundColor: "black",
                color: "#fff",
                padding: 10,
              }}
            >
              <Text style={{ width: "170px", textAlign: "center" }}>
                Categories
              </Text>
              <Text style={{ width: "170px", textAlign: "center" }}>
                Annual
              </Text>
              <Text style={{ width: "170px", textAlign: "center" }}>
                Monthly
              </Text>
            </View>
            {/* Table Body  */}
            <View style={{ backgroundColor: "#F8F8F8" }}>
              {/* row 1 */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#000",
                  padding: 10,
                  borderBottomColor: "#e5e7eb",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Housing
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalAnnualHousingExpenses}
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalMonthlyHousingExpenses}
                </Text>
              </View>
              {/* row 2 */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#000",
                  padding: 10,
                  borderBottomColor: "#e5e7eb",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Transport
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalAnnualTransportExpenses}
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalMonthlyTransportExpenses}
                </Text>
              </View>
              {/* row 3 */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#000",
                  padding: 10,
                  borderBottomColor: "#e5e7eb",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Education
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalAnnualEducationalExpenses}
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalMonthlyEducationalExpenses}
                </Text>
              </View>
              {/* row 4 */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#000",
                  padding: 10,
                  borderBottomColor: "#e5e7eb",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Other
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalAnnualOtherExpenses}
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalMonthlyOtherExpenses}
                </Text>
              </View>
              {/* row 5 */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#000",
                  padding: 10,
                  borderBottomColor: "#e5e7eb",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Loans
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalAnnualLoansExpenses}
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalMonthlyLoansExpenses}
                </Text>
              </View>
              {/* row 6 */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#000",
                  padding: 10,
                  borderBottomColor: "#e5e7eb",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                }}
              >
                <Text style={{ width: "170px", textAlign: "center" }}>
                  Savings
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalAnnualSavingsExpenses}
                </Text>
                <Text style={{ width: "170px", textAlign: "center" }}>
                  {totalMonthlySavingsExpenses}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* Page 2  */}
      <Page style={styles.page}>
        {/* ===============================|| Income Table ||=============================  */}
        <Text style={styles.caption}>Income</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Title
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Frequency
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Total Annually
            </Text>
            <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
              Total Monthly
            </Text>
          </View>

          {/* Salary / Wages */}
          {Number(salary?.salaryAmount) &&
            Number(salary?.salaryFrequency) &&
            Number(salary?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Salary/Wages</Text>
                <Text style={styles.tableCell}>{salary?.salaryAmount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(salary?.salaryFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {salary?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(salary?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Salaries */}
          {dynamicSalaries?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Government Benefits */}
          {Number(govtBenefits?.govtBenefitsAmount) &&
            Number(govtBenefits?.govtBenefitsFrequency) &&
            Number(govtBenefits?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Government Benefits</Text>
                <Text style={styles.tableCell}>
                  {govtBenefits?.govtBenefitsAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(govtBenefits?.govtBenefitsFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {govtBenefits?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(govtBenefits?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Government Benefits */}
          {dynamicGovtBenefits?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Net Income */}
          {Number(netIncome?.netIncomeAmount) &&
            Number(netIncome?.netIncomeFrequency) &&
            Number(netIncome?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Net Income</Text>
                <Text style={styles.tableCell}>
                  {netIncome?.netIncomeAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(netIncome?.netIncomeFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {netIncome?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(netIncome?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Net Incomes */}
          {dynamicNetIncomes?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Other Income */}
          {Number(otherIncome?.otherIncomeAmount) &&
            Number(otherIncome?.otherIncomeFrequency) &&
            Number(otherIncome?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Other Income</Text>
                <Text style={styles.tableCell}>
                  {otherIncome?.otherIncomeAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(otherIncome?.otherIncomeFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {otherIncome?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(otherIncome?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Other Incomes */}
          {dynamicOtherIncomes?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Dynamic More Incomes */}
          {dynamicMoreIncomes?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Total Income - Spanning three columns */}
          {Number(totalAnnualIncome) && Number(totalMonthlyIncome) && (
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.totalCell}>Total</Text>
              <Text style={styles.tableCell}>{totalAnnualIncome}</Text>
              <Text style={styles.totalCellLast}>{totalMonthlyIncome}</Text>
            </View>
          )}
        </View>

        {/* ===============================|| Housing Expenses Table ||=============================  */}
        <View style={styles.table}>
          <Text style={styles.caption}>Housing Expenses</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                Title
              </Text>
              <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                Amount
              </Text>
              <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                Frequency
              </Text>
              <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                Total Annually
              </Text>
              <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
                Total Monthly
              </Text>
            </View>

            {/* Mortgage 1 */}
            {Number(mortgage1?.mortgageAmount1) &&
            Number(mortgage1?.mortgageFrequency1) &&
            Number(mortgage1?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Mortgage1</Text>
                <Text style={styles.tableCell}>
                  {mortgage1?.mortgageAmount1}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(mortgage1?.mortgageFrequency1)}
                </Text>
                <Text style={styles.tableCell}>
                  {mortgage1?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(mortgage1?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}

            {/* Mortgage 2 */}
            {Number(mortgage2?.mortgageAmount2) &&
            Number(mortgage2?.mortgageFrequency2) &&
            Number(mortgage2?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Mortgage2</Text>
                <Text style={styles.tableCell}>
                  {mortgage2?.mortgageAmount2}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(mortgage2?.mortgageFrequency2)}
                </Text>
                <Text style={styles.tableCell}>
                  {mortgage2?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(mortgage2?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}

            {/* Mortgage 3 */}
            {Number(mortgage3?.mortgageAmount3) &&
            Number(mortgage3?.mortgageFrequency3) &&
            Number(mortgage3?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Mortgage2</Text>
                <Text style={styles.tableCell}>
                  {mortgage3?.mortgageAmount3}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(mortgage3?.mortgageFrequency3)}
                </Text>
                <Text style={styles.tableCell}>
                  {mortgage3?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(mortgage3?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}

            {/* Rent */}
            {Number(rent?.rentAmount) &&
            Number(rent?.rentFrequency) &&
            Number(rent?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Rent</Text>
                <Text style={styles.tableCell}>{rent?.rentAmount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(rent?.rentFrequency)}
                </Text>
                <Text style={styles.tableCell}>{rent?.totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(rent?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}

            {/* Home Insurance */}
            {Number(homeInsurance?.homeInsuranceAmount) &&
            Number(homeInsurance?.homeInsuranceFrequency) &&
            Number(homeInsurance?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Home Insurance</Text>
                <Text style={styles.tableCell}>
                  {homeInsurance?.homeInsuranceAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(homeInsurance?.homeInsuranceFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {homeInsurance?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(homeInsurance?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}

            {/* Utilities */}
            {Number(utilities?.utilitiesAmount) &&
            Number(utilities?.utilitiesFrequency) &&
            Number(utilities?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Utilities</Text>
                <Text style={styles.tableCell}>
                  {utilities?.utilitiesAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(utilities?.utilitiesFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {utilities?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(utilities?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}
            {/* Dynamic Utilities */}
            {dynamicUtilities?.map((item, index) => {
              const { amount, frequency, title, totalAnnualAmount } =
                item || {};
              return (
                <View
                  key={index}
                  style={[styles.tableRow, styles.tableRowHover]}
                >
                  <Text style={styles.tableCell}>{title}</Text>
                  <Text style={styles.tableCell}>{amount}</Text>
                  <Text style={styles.tableCell}>
                    {getFrequencyTitle(frequency)}
                  </Text>
                  <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                  <Text style={styles.tableCellLast}>
                    {(totalAnnualAmount / 12)?.toFixed(2)}
                  </Text>
                </View>
              );
            })}

            {/* Telecom Services */}
            {Number(telecomService?.telecomServiceAmount) &&
            Number(telecomService?.telecomServiceFrequency) &&
            Number(telecomService?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Utilities</Text>
                <Text style={styles.tableCell}>
                  {telecomService?.telecomServiceAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(telecomService?.telecomServiceFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {telecomService?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(telecomService?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}
            {/* Dynamic Telecom Services */}
            {dynamicTelecomServices?.map((item, index) => {
              const { amount, frequency, title, totalAnnualAmount } =
                item || {};
              return (
                <View
                  key={index}
                  style={[styles.tableRow, styles.tableRowHover]}
                >
                  <Text style={styles.tableCell}>{title}</Text>
                  <Text style={styles.tableCell}>{amount}</Text>
                  <Text style={styles.tableCell}>
                    {getFrequencyTitle(frequency)}
                  </Text>
                  <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                  <Text style={styles.tableCellLast}>
                    {(totalAnnualAmount / 12)?.toFixed(2)}
                  </Text>
                </View>
              );
            })}

            {/* Maintenances */}
            {Number(maintenance?.maintenanceAmount) &&
            Number(maintenance?.maintenanceFrequency) &&
            Number(maintenance?.totalAnnualAmount) ? (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Utilities</Text>
                <Text style={styles.tableCell}>
                  {maintenance?.maintenanceAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(maintenance?.maintenanceFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {maintenance?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(maintenance?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            ) : null}
            {/* Dynamic Maintenances */}
            {dynamicMaintenances?.map((item, index) => {
              const { amount, frequency, title, totalAnnualAmount } =
                item || {};
              return (
                <View
                  key={index}
                  style={[styles.tableRow, styles.tableRowHover]}
                >
                  <Text style={styles.tableCell}>{title}</Text>
                  <Text style={styles.tableCell}>{amount}</Text>
                  <Text style={styles.tableCell}>
                    {getFrequencyTitle(frequency)}
                  </Text>
                  <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                  <Text style={styles.tableCellLast}>
                    {(totalAnnualAmount / 12)?.toFixed(2)}
                  </Text>
                </View>
              );
            })}

            {/* Dynamic More Housing Expenses */}
            {dynamicMoreHousingExpenses?.map((item, index) => {
              const { amount, frequency, title, totalAnnualAmount } =
                item || {};
              return (
                <View
                  key={index}
                  style={[styles.tableRow, styles.tableRowHover]}
                >
                  <Text style={styles.tableCell}>{title}</Text>
                  <Text style={styles.tableCell}>{amount}</Text>
                  <Text style={styles.tableCell}>
                    {getFrequencyTitle(frequency)}
                  </Text>
                  <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                  <Text style={styles.tableCellLast}>
                    {(totalAnnualAmount / 12)?.toFixed(2)}
                  </Text>
                </View>
              );
            })}

            {/* Total Housing Expenses */}
            {Number(totalAnnualHousingExpenses) &&
            Number(totalMonthlyHousingExpenses) ? (
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.totalCell}>Total</Text>
                <Text style={styles.tableCell}>
                  {totalAnnualHousingExpenses}
                </Text>
                <Text style={styles.totalCellLast}>
                  {totalMonthlyHousingExpenses}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        {/* ===============================|| Transport Expenses Table ||=============================  */}
        <Text style={styles.caption}>Transport Expenses</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Title
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Frequency
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Total Annually
            </Text>
            <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
              Total Monthly
            </Text>
          </View>

          {/* Car Payment */}
          {Number(carPayment?.carPaymentAmount) &&
            Number(carPayment?.carPaymentFrequency) &&
            Number(carPayment?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Car Payment</Text>
                <Text style={styles.tableCell}>
                  {carPayment?.carPaymentAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(carPayment?.carPaymentFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {carPayment?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(carPayment?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Car Insurance */}
          {Number(carInsurance?.carInsuranceAmount) &&
            Number(carInsurance?.carInsuranceFrequency) &&
            Number(carInsurance?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Car Insurance</Text>
                <Text style={styles.tableCell}>
                  {carInsurance?.carInsuranceAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(carInsurance?.carInsuranceFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {carInsurance?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(carInsurance?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Car Repairs */}
          {Number(carRepairs?.carRepairsAmount) &&
            Number(carRepairs?.carRepairsFrequency) &&
            Number(carRepairs?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Car Repairs</Text>
                <Text style={styles.tableCell}>
                  {carRepairs?.carRepairsAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(carRepairs?.carRepairsFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {carRepairs?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(carRepairs?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Travel Budgets */}
          {Number(gasFuelEtrToll?.gasFuelEtrTollAmount) &&
            Number(gasFuelEtrToll?.gasFuelEtrTollFrequency) &&
            Number(gasFuelEtrToll?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Travel Budgets</Text>
                <Text style={styles.tableCell}>
                  {gasFuelEtrToll?.gasFuelEtrTollAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(gasFuelEtrToll?.gasFuelEtrTollFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {gasFuelEtrToll?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(gasFuelEtrToll?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Travel Budgets */}
          {dynamicGasFuelEtrToll?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Dynamic More Transport Expenses */}
          {dynamicMoreTransportExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Total Transport Expenses */}
          {Number(totalAnnualTransportExpenses) &&
            Number(totalMonthlyTransportExpenses) && (
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.totalCell}>Total</Text>
                <Text style={styles.tableCell}>
                  {totalAnnualTransportExpenses}
                </Text>
                <Text style={styles.totalCellLast}>
                  {totalMonthlyTransportExpenses}
                </Text>
              </View>
            )}
        </View>

        {/* ===============================|| Educational Expenses Table ||=============================  */}
        <Text style={styles.caption}>Educational Expenses</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Title
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Frequency
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Total Annually
            </Text>
            <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
              Total Monthly
            </Text>
          </View>

          {/* School College Fees */}
          {Number(schoolCollegeFee?.schoolCollegeFeeAmount) &&
            Number(schoolCollegeFee?.schoolCollegeFeeFrequency) &&
            Number(schoolCollegeFee?.totalAnnualAmount) && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>
                  Education Fees (School Fee)
                </Text>
                <Text style={styles.tableCell}>
                  {schoolCollegeFee?.schoolCollegeFeeAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(
                    schoolCollegeFee?.schoolCollegeFeeFrequency
                  )}
                </Text>
                <Text style={styles.tableCell}>
                  {schoolCollegeFee?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(schoolCollegeFee?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic School College Fees */}
          {dynamicSchoolCollegeFees?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Dynamic More Education Expenses */}
          {dynamicMoreEducatoinExpenses?.map((item, index) => {
            const { amount, frequency, title, totalAnnualAmount } = item || {};
            return (
              <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>{title}</Text>
                <Text style={styles.tableCell}>{amount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(frequency)}
                </Text>
                <Text style={styles.tableCell}>{totalAnnualAmount}</Text>
                <Text style={styles.tableCellLast}>
                  {(totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            );
          })}

          {/* Total Educational Expenses */}
          {Number(totalAnnualEducationalExpenses) &&
            Number(totalMonthlyEducationalExpenses) && (
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.totalCell}>Total</Text>
                <Text style={styles.tableCell}>
                  {totalAnnualEducationalExpenses}
                </Text>
                <Text style={styles.totalCellLast}>
                  {totalMonthlyEducationalExpenses}
                </Text>
              </View>
            )}
        </View>

        {/* ===============================|| Other Expenses Table ||=============================  */}
        <Text style={styles.caption}>Other Expenses</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Title
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Frequency
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Total Annually
            </Text>
            <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
              Total Monthly
            </Text>
          </View>

          {/* Household Row */}
          {househole?.householeAmount &&
            househole?.householeFrequency &&
            househole?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Household</Text>
                <Text style={styles.tableCell}>
                  {househole?.householeAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(househole?.householeFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {househole?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(househole?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Clothing Row */}
          {clothing?.clothingAmount &&
            clothing?.clothingFrequency &&
            clothing?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Clothing</Text>
                <Text style={styles.tableCell}>{clothing?.clothingAmount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(clothing?.clothingFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {clothing?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(clothing?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Eating Out Row */}
          {eatingOut?.eatingOutAmount &&
            eatingOut?.eatingOutFrequency &&
            eatingOut?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Eating Out</Text>
                <Text style={styles.tableCell}>
                  {eatingOut?.eatingOutAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(eatingOut?.eatingOutFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {eatingOut?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(eatingOut?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Medical Row */}
          {medical?.medicalAmount &&
            medical?.medicalFrequency &&
            medical?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Eating Out</Text>
                <Text style={styles.tableCell}>{medical?.medicalAmount}</Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(medical?.medicalFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {medical?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(medical?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Entertainment Row */}
          {entertainmentEvents?.entertainmentEventsAmount &&
            entertainmentEvents?.entertainmentEventsFrequency &&
            entertainmentEvents?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Eating Out</Text>
                <Text style={styles.tableCell}>
                  {entertainmentEvents?.entertainmentEventsAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(
                    entertainmentEvents?.entertainmentEventsFrequency
                  )}
                </Text>
                <Text style={styles.tableCell}>
                  {entertainmentEvents?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(entertainmentEvents?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Entertainment Events */}
          {dynamicEntertainmentEvents?.map((item, index) => (
            <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.tableCell}>{item?.title}</Text>
              <Text style={styles.tableCell}>{item?.amount}</Text>
              <Text style={styles.tableCell}>
                {getFrequencyTitle(item?.frequency)}
              </Text>
              <Text style={styles.tableCell}>{item?.totalAnnualAmount}</Text>
              <Text style={styles.tableCellLast}>
                {(item?.totalAnnualAmount / 12)?.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Dynamic More Other Expenses */}
          {dynamicMoreOtherExpenses?.map((item, index) => (
            <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.tableCell}>{item?.title}</Text>
              <Text style={styles.tableCell}>{item?.amount}</Text>
              <Text style={styles.tableCell}>
                {getFrequencyTitle(item?.frequency)}
              </Text>
              <Text style={styles.tableCell}>{item?.totalAnnualAmount}</Text>
              <Text style={styles.tableCellLast}>
                {(item?.totalAnnualAmount / 12)?.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          {totalAnnualOtherExpenses && totalMonthlyOtherExpenses && (
            <View style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.totalCell}>Total</Text>
              <Text style={styles.tableCell}>{totalAnnualOtherExpenses}</Text>
              <Text style={styles.totalCellLast}>
                {totalMonthlyOtherExpenses}
              </Text>
            </View>
          )}
        </View>
        {/* ===============================|| Loans Expenses Table ||=============================  */}
        <Text style={styles.caption}>Loans</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Title
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Frequency
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Total Annually
            </Text>
            <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
              Total Monthly
            </Text>
          </View>

          {/* Personal Loan Row */}
          {personalLoan?.personalLoanAmount &&
            personalLoan?.personalLoanFrequency &&
            personalLoan?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Personal Loan</Text>
                <Text style={styles.tableCell}>
                  {personalLoan?.personalLoanAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(personalLoan?.personalLoanFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {personalLoan?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(personalLoan?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Student Loan Row */}
          {studentLoan?.studentLoanAmount &&
            studentLoan?.studentLoanFrequency &&
            studentLoan?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Student Loan</Text>
                <Text style={styles.tableCell}>
                  {studentLoan?.studentLoanAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(studentLoan?.studentLoanFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {studentLoan?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(studentLoan?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Loans Expenses */}
          {dynamicMoreLoansExpenses?.map((item, index) => (
            <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.tableCell}>{item?.title}</Text>
              <Text style={styles.tableCell}>{item?.amount}</Text>
              <Text style={styles.tableCell}>
                {getFrequencyTitle(item?.frequency)}
              </Text>
              <Text style={styles.tableCell}>{item?.totalAnnualAmount}</Text>
              <Text style={styles.tableCellLast}>
                {(item?.totalAnnualAmount / 12)?.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          {totalAnnualLoansExpenses && totalMonthlyLoansExpenses && (
            <View style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.totalCell}>Total</Text>
              <Text style={styles.tableCell}>{totalAnnualLoansExpenses}</Text>
              <Text style={styles.totalCellLast}>
                {totalMonthlyLoansExpenses}
              </Text>
            </View>
          )}
        </View>
        {/* ===============================|| Savings Expenses Table ||=============================  */}
        <Text style={styles.caption}>Savings</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Title
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Frequency
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Total Annually
            </Text>
            <Text style={[styles.tableCellLast, { fontWeight: "bold" }]}>
              Total Monthly
            </Text>
          </View>

          {/* Vacation Fund Row */}
          {vacationFund?.vacationFundAmount &&
            vacationFund?.vacationFundFrequency &&
            vacationFund?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Vacation Fund</Text>
                <Text style={styles.tableCell}>
                  {vacationFund?.vacationFundAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(vacationFund?.vacationFundFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {vacationFund?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(vacationFund?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Emergency Fund Row */}
          {emergency?.emergencyAmount &&
            emergency?.emergencyFrequency &&
            emergency?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Emergency</Text>
                <Text style={styles.tableCell}>
                  {emergency?.emergencyAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(emergency?.emergencyFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {emergency?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(emergency?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Retirement Savings Row */}
          {retirement?.retirementAmount &&
            retirement?.retirementFrequency &&
            retirement?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Retirement</Text>
                <Text style={styles.tableCell}>
                  {retirement?.retirementAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(retirement?.retirementFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {retirement?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(retirement?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Investments Row */}
          {investments?.investmentsAmount &&
            investments?.investmentsFrequency &&
            investments?.totalAnnualAmount && (
              <View style={[styles.tableRow, styles.tableRowHover]}>
                <Text style={styles.tableCell}>Investments</Text>
                <Text style={styles.tableCell}>
                  {investments?.investmentsAmount}
                </Text>
                <Text style={styles.tableCell}>
                  {getFrequencyTitle(investments?.investmentsFrequency)}
                </Text>
                <Text style={styles.tableCell}>
                  {investments?.totalAnnualAmount}
                </Text>
                <Text style={styles.tableCellLast}>
                  {(investments?.totalAnnualAmount / 12)?.toFixed(2)}
                </Text>
              </View>
            )}

          {/* Dynamic Investments */}
          {dynamicInvestments?.map((item, index) => (
            <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.tableCell}>{item?.title}</Text>
              <Text style={styles.tableCell}>{item?.amount}</Text>
              <Text style={styles.tableCell}>
                {getFrequencyTitle(item?.frequency)}
              </Text>
              <Text style={styles.tableCell}>{item?.totalAnnualAmount}</Text>
              <Text style={styles.tableCellLast}>
                {(item?.totalAnnualAmount / 12)?.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Dynamic More Investments */}
          {dynamicMoreInvestments?.map((item, index) => (
            <View key={index} style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.tableCell}>{item?.title}</Text>
              <Text style={styles.tableCell}>{item?.amount}</Text>
              <Text style={styles.tableCell}>
                {getFrequencyTitle(item?.frequency)}
              </Text>
              <Text style={styles.tableCell}>{item?.totalAnnualAmount}</Text>
              <Text style={styles.tableCellLast}>
                {(item?.totalAnnualAmount / 12)?.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Total Savings Row */}
          {totalAnnualSavingsExpenses && totalMonthlySavingsExpenses && (
            <View style={[styles.tableRow, styles.tableRowHover]}>
              <Text style={styles.totalCell}>Total</Text>
              <Text style={styles.tableCell}>{totalAnnualSavingsExpenses}</Text>
              <Text style={styles.totalCellLast}>
                {totalMonthlySavingsExpenses}
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
