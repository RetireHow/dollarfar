/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { assets } from "../../assets/assets";
import { RRSPInput, RRSPResult } from "../../redux/features/RRSP/RRSP.types";
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
    top: "48%",
    left: "35%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: 50,
    color: "rgba(220, 220, 220, 0.2)",
    fontWeight: "bold",
    opacity: 0.5,
  },
});

interface TRRSPPdfData {
  input: RRSPInput;
  result: RRSPResult;
  name?: string;
  email?: string;
  base64: string;
  currency: string;
  currencyFullName: string;
}

// Define a new PDF document component
export const RRSPPdf = ({ data }: { data: TRRSPPdfData }) => {
  const { name, email, base64, input, result, currencyFullName } =
    data || {};
  const {
    contributionAmount,
    contributionFrequency,
    currentAge,
    currentRRSPSavings,
    rateOfReturn,
    retirementAge,
  } = input || {};

  const { investmentEarnings, totalContributions, totalSavings } = result || {};

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
            <Text>Registered Retirement Savings Plan (RRSP) Calculator</Text>
            <Text style={styles.title}>
               - {currencyFullName}
            </Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "50%",
                padding: 16,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "column",
                gap: 16,
                fontSize: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Current Age (Years)</Text>
                <Text>{currentAge}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  Your plan to Retire in (Years)
                </Text>
                <Text>{retirementAge}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  Ongoing Contribution Amount
                </Text>
                <Text>
                  
                  {contributionAmount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Current RRSP Savings</Text>
                <Text>
                  
                  {currentRRSPSavings}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Contribution Frequency</Text>
                <Text>{getFrequencyTitle(contributionFrequency)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Assumed rate of Return</Text>
                <Text>{rateOfReturn}%</Text>
              </View>
            </View>

            <View
              style={{
                border: "1px solid #EAECF0",
                width: "50%",
                padding: 16,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "column",
                gap: 16,
                fontSize: 12,
                height: "130px",
              }}
            >
              <View style={{ fontWeight: "bold", color: "#000" }}>
                <Text>Totals</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969", marginRight: 3 }}>
                  RRSP Balance at Retirement
                </Text>
                <Text>
                  
                  {totalSavings}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Investment Earnings</Text>
                <Text>
                  
                  {investmentEarnings}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Total Contributions</Text>
                <Text>
                  
                  {totalContributions}
                </Text>
              </View>
            </View>
          </View>

          {/* Chart Container  */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image style={{ width: "100%", height: 300 }} src={base64} />
            </View>
          </View>
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
          <Text>Copyright © {new Date().getFullYear()} - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
