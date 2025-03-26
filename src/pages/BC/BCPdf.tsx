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
});

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
  currency: string;
  currencyFullName: string;
  base64: string;
};

// Define a new PDF document component
export const BCPdf = ({ data }: { data: TCalculatorData }) => {
  const {
    name,
    email,
    currencyFullName,
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
            <Text style={styles.title}>
               - {currencyFullName}
            </Text>
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
                    
                    {numberWithCommas(
                      Number(totalAnnualCashFlow.toFixed(2))
                    )}{" "}
                    annually
                  </Text>{" "}
                  <Text> or </Text>{" "}
                  <Text style={{ color: "#06D206" }}>
                    
                    {numberWithCommas(
                      Number(totalMonthlyCashFlow.toFixed(2))
                    )}{" "}
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
    </Document>
  );
};
