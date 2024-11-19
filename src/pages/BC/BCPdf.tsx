import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { assets } from "../../assets/assets";

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
    opacity: 0.5,
  },
});

type TCalculatorData = {
  totalIncome: number;
  houseExpenses: number;
  transportExpenses: number;
  educationalExpenses: number;
  otherExpenses: number;
  totalLoans: number;
  totalSavings: number;
  totalExpenses: number;
  cashflowDeficit: number;
  base64: string;
  name?: string;
  email?: string;
};

// Define a new PDF document component
export const BCPdf = ({ data }: { data: TCalculatorData }) => {
  const {
    name,
    email,
    totalIncome,
    totalSavings,
    totalLoans,
    educationalExpenses,
    houseExpenses,
    otherExpenses,
    transportExpenses,
    totalExpenses,
    cashflowDeficit,
    base64,
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
          <View style={styles.section}>
            <Text>Budget Calculator</Text>
            <Text style={styles.title}>$ - CAD</Text>
          </View>

          {/* Totals Card  */}
          <View
            style={{
              border: "1px solid #EAECF0",
              padding: 16,
              borderRadius: 5,
              backgroundColor: "#F8F8F8",
              flexDirection: "column",
              gap: 16,
              fontSize: 12,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: "extrabold", fontSize: 14 }}>
              Totals
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Income</Text>
              <Text>${totalIncome}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Housing Expenses</Text>
              <Text>${houseExpenses}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Transport Expenses</Text>
              <Text>${transportExpenses}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Educational Expenses</Text>
              <Text>${educationalExpenses}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Other Expenses</Text>
              <Text>${otherExpenses}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Loans</Text>
              <Text>${totalLoans}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Savings</Text>
              <Text>${totalSavings}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#000000",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              <Text>Cashflow Deficit</Text>
              <Text>${cashflowDeficit}</Text>
            </View>
          </View>

          {/* Chart Container  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "400px",
              margin: "auto",
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Image style={{ width: "90%", height: 250 }} src={base64} />
            </View>

            {/* Legends Container  */}
            <View
              style={{
                fontSize: 12,
                flexDirection: "column",
                gap: 10,
                fontWeight: "extrabold",
                color: "#475569",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#2196F3",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Housing Expenses (${houseExpenses})</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#FF9800",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Transport Expenses (${transportExpenses})</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#03A9F4",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Educational Expenses (${educationalExpenses})</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#FF5722",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Other Expenses (${otherExpenses})</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#F44336",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Loans (${totalLoans})</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#9C27B0",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Savings (${totalSavings})</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#009688",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Cashflow Deficit (${cashflowDeficit})</Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    color: "#000",
                    width: 20,
                  }}
                >
                  $
                </Text>
                <Text>CAD - Canadian Dollar</Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              lineHeight: "20px",
            }}
          >
            "Your total annual income is ${totalIncome}, and after your expenses
            of ${totalExpenses}, you have ${cashflowDeficit} left for savings or
            investments."
          </Text>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            color: "#4D4D4D",
            fontSize: 12,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: "#F6F8FC",
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
        >
          <Text>dollarfar.com</Text>
          <Text>Copyright © 2024 - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
