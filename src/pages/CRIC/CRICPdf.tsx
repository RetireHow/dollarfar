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

interface GeneralInfo {
  dobMonth: string;
  dobYear: string;
  gender: string;
  currentAnnualIncome: number;
  annualRetirementIncomeGoal: number;
  useLifeExpectancy: "Yes" | "No";
  customRetirementAge: number;
}

interface TData {
  generalInfo: GeneralInfo;
  name: string;
  email: string;
  base64: string;
}

// Define a new PDF document component
export const CRICPdf = ({ data }: { data: TData }) => {
  const { name, email, base64, generalInfo } = data || {};
  const {
    dobMonth,
    dobYear,
    gender,
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    useLifeExpectancy,
  } = generalInfo || {};

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
            <Text style={styles.title}>$ - CAD</Text>
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
                gap: 30,
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
                    <Text>{dobMonth}, {dobYear}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Life Expectancy</Text>
                    <Text>{useLifeExpectancy}</Text>
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
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Annual Retirement Income Goal
                    </Text>
                    <Text>{annualRetirementIncomeGoal}</Text>
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
                    <Text>{currentAnnualIncome}</Text>
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
                    <Text>Canada Pension Plan (CPP)</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Receiving at Age</Text>
                    <Text>65</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Average PRB Annual Pension
                    </Text>
                    <Text>N/A</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>CPP Annual Pension</Text>
                    <Text>N/A</Text>
                  </View>
                </View>

                {/* Step-3  */}
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
                    <Text style={{ fontSize: "16px" }}>Employer Pension</Text>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Defined Benefit Plan
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Receiving at Age</Text>
                    <Text>65</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Index of Inflation</Text>
                    <Text>N/A</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Employer Annual Pension
                    </Text>
                    <Text>N/A</Text>
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
                {/* Step-4  */}
                <View style={{ flexDirection: "column", gap: 10 }}>
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ fontSize: "16px" }}>Retirement Savings</Text>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      N/A
                    </Text>
                  </View>
                </View>
                {/* Step-5  */}
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
                    <Text style={{ fontSize: "16px" }}>Other Income</Text>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Other Income Type: Employment
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Starting at Age</Text>
                    <Text>65</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Ending at Age</Text>
                    <Text>N/A</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Annual Income</Text>
                    <Text>N/A</Text>
                  </View>
                </View>
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
                    <Text style={{ color: "#696969" }}>
                      OAS Age Eligibility
                    </Text>
                    <Text>65</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Receiving at Age</Text>
                    <Text>Not Eligible</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      OAS Pension (Ages Not Eligible to 74)
                    </Text>
                    <Text>Not Eligible</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      OAS Pension (Ages 75 and up)
                    </Text>
                    <Text>Not Eligible</Text>
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
                    <Text>0</Text>
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
              <Text>Totals</Text>
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
              <Text>${0}</Text>
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
              <Text>${0}</Text>
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
              <Text>${0 + 0}</Text>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* Chart Container  */}
        <View style={{ padding: 15 }}>
          <Image style={{ width: "100%", height: 250 }} src={base64} />
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
          <Text>Copyright © 2024 - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
