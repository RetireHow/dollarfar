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
    marginBottom: 10,
  },
  watermark: {
    position: "absolute",
    top: "55%",
    left: "35%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: 50,
    color: "rgba(220, 220, 220, 0.2)",
    fontWeight: "bold",
    opacity: 0.5,
  },
});

interface TData {
  annualRetirementIncomeGoal: number;
  currentAnnualIncome: number;
  dobMonth: string;
  dobYear: number;
  gender: string;
  isFortyYears: number;
  lifeExpectency: number;
  oas: { oldAgeSecurityBefore75: number; oldAgeSecurityAfter75: number };
  oasStartYear: number;
  ppAnnualAmount: number;
  ppBenefitAmount: number;
  ppStartYear: number;
  selectedPP: string;
  yearsInCanada: number;
  name?: string;
  email?: string;
  base64: string;
  currency: string;
  currencyFullName: string;
  annualAverageRetirementIncome: number;
}

// Define a new PDF document component
export const CRICPdf = ({ data }: { data: TData }) => {
  const {
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    dobMonth,
    dobYear,
    gender,
    lifeExpectency,
    oas,
    oasStartYear,
    ppAnnualAmount,
    ppStartYear,
    selectedPP,
    yearsInCanada,
    name,
    email,
    base64,
    currency,
    currencyFullName,
    annualAverageRetirementIncome,
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
              marginBottom: 10,
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
            <Text>Comprehensive Retirement Income Calculator</Text>
            <Text style={styles.title}>
              {currency}-{currencyFullName}
            </Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                padding: 16,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "row",
                gap: 10,
                fontSize: 12,
              }}
            >
              <View>
                {/* Step-1  */}
                <View style={{ flexDirection: "column", gap: 10 }}>
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <Text>General information</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Date of Birth</Text>
                    <Text>
                      {dobMonth}, {dobYear}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Current Age</Text>
                    <Text>{new Date().getFullYear() - dobYear}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Life Expectancy</Text>
                    <Text>{lifeExpectency}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Gender</Text>
                    <Text>{gender}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Annual Retirement Income Goal
                    </Text>
                    <Text>
                      {currency}
                      {numberWithCommas(annualRetirementIncomeGoal)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Current Annual Income
                    </Text>
                    <Text>
                      {currency}
                      {numberWithCommas(currentAnnualIncome)}
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  backgroundColor: "#0000004D",
                  width: "1px",
                  height: "100%",
                }}
              ></Text>

              <View>
                {/* Step-6  */}
                <View
                  style={{
                    flexDirection: "column",
                    gap: 10,
                    marginTop: "16px",
                  }}
                >
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ fontSize: "16px" }}>
                      Old Age Security (OAS)
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Receiving at Age</Text>
                    <Text>{oasStartYear}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      OAS Pension (Ages 75 and up)
                    </Text>
                    <Text>
                      {currency}
                      {numberWithCommas(Math.round(oas?.oldAgeSecurityAfter75))}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      OAS Pension (Ages from {oasStartYear} to 74)
                    </Text>
                    <Text>
                      {currency}
                      {numberWithCommas(
                        Math.round(oas?.oldAgeSecurityBefore75)
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Years lived in Canada
                    </Text>
                    <Text>{yearsInCanada}</Text>
                  </View>
                </View>
                {/* Step-2  */}
                <View
                  style={{
                    flexDirection: "column",
                    gap: 10,
                    marginTop: "16px",
                  }}
                >
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <Text>{selectedPP}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Receiving at Age</Text>
                    <Text>{ppStartYear}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      {selectedPP} Annual
                    </Text>
                    <Text>
                      {currency}
                      {numberWithCommas(ppAnnualAmount)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ================Totals Card================  */}
          <View
            style={{
              border: "1px solid #EAECF0",
              width: "100%",
              padding: 16,
              borderRadius: 5,
              backgroundColor: "#F8F8F8",
              flexDirection: "column",
              gap: 16,
              fontSize: 12,
            }}
          >
            <View style={{ fontWeight: "bold", color: "#000" }}>
              <Text style={{ fontSize: "16px" }}>Totals</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>
                Annual Retirement Income Goal
              </Text>
              <Text>
                {currency}
                {numberWithCommas(annualRetirementIncomeGoal)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>
                Annual Average Retirement Income Estimate
              </Text>
              <Text>${numberWithCommas(annualAverageRetirementIncome)}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#000000",
                color: "#fff",
                borderRadius: 5,
                padding: 8,
              }}
            >
              <Text>Difference</Text>
              <Text>
                {currency}
                {numberWithCommas(
                  annualRetirementIncomeGoal - annualAverageRetirementIncome
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* Chart Container  */}
        <View style={{ padding: 15, marginTop: 30 }}>
          <Image style={{ width: "100%", height: 250 }} src={base64} />

          {/* Legends Container  */}
          <View
            style={{
              fontSize: 10,
              flexDirection: "column",
              justifyContent: "center",
              gap: 10,
              fontWeight: "extrabold",
              marginLeft: 40,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#AA5656",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                Annual Retirement Income goal : {currency}
                {numberWithCommas(annualRetirementIncomeGoal)}
              </Text>
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
              <Text>
                Old Age Security: {currency}
                {numberWithCommas(oas?.oldAgeSecurityBefore75)} annually (from
                age {oasStartYear} to 74); {currency}
                {numberWithCommas(oas?.oldAgeSecurityAfter75)} annually (from
                age 75 to {lifeExpectency})
              </Text>
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
              <Text>
                {selectedPP} : {currency}
                {numberWithCommas(ppAnnualAmount)} Annually (starting at age{" "}
                {ppStartYear} - {lifeExpectency})
              </Text>
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
                {currency}
              </Text>
              <Text>{currencyFullName}</Text>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>

        {/* Footer  */}
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
