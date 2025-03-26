import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { assets } from "../../assets/assets";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";
import { numberWithCommas } from "../../utils/numberWithCommas";

// Define styles for the PDF
const styles = StyleSheet.create({
  section: {
    fontSize: 14,
    fontWeight: "bold",
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
    alignItems: "center",
    gap: 16,
    fontSize: 12,
    marginBottom: 20,
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

type TYearByYearBreakdown = {
  year: number;
  totalValue: string;
  totalContribution: string;
  totalInterest: string;
};

type TData = {
  currency: string;
  currencyFullName: string;
  name: string;
  email: string;
  base64: string;
  totalFutureValue: string;
  totalContribution: string;
  totalInterestEarned: string;
  yearByYearBreakdown: TYearByYearBreakdown[];
  annualInterestRate: string;
  compoundingFrequency: string;
  contribution: string;
  contributionFrequency: string;
  initialInvestment: string;
  years: string;
};

// Define a new PDF document component
export const CIRCPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    base64,
    totalFutureValue,
    totalContribution,
    totalInterestEarned,
    yearByYearBreakdown,
    annualInterestRate,
    compoundingFrequency,
    contribution,
    contributionFrequency,
    initialInvestment,
    years,
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
              fontSize: 14,
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
            <Text>Compound Interest Rate</Text>
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
                <Text style={{ color: "#696969" }}>Initial Principle</Text>
                <Text>{numberWithCommas(Number(initialInvestment))}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Rate of Interest</Text>
                <Text>{annualInterestRate}%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Compounding Frequency</Text>
                <Text>{getFrequencyTitle(compoundingFrequency)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Contribution Amount</Text>
                <Text>{numberWithCommas(Number(contribution))}</Text>
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
                <Text style={{ color: "#696969" }}>Years to Grow</Text>
                <Text>{years}</Text>
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
                <Text style={{ color: "#696969" }}>Total Contribution</Text>
                <Text>{numberWithCommas(Number(totalContribution))}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Total Interest</Text>
                <Text>{numberWithCommas(Number(totalInterestEarned))}</Text>
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
                <Text>Total Amount</Text>
                <Text>{numberWithCommas(Number(totalFutureValue))}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 5,
              flexWrap: "wrap",
              fontSize: 12,
            }}
          >
            <Text>Your initial principal amount of</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              {numberWithCommas(Number(initialInvestment))}
            </Text>
            <Text>plus your</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              {getFrequencyTitle(contributionFrequency)}
            </Text>
            <Text>contribution of</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              {numberWithCommas(Number(contribution))}
            </Text>
            <Text>at an annualized interest rate of</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              {annualInterestRate}%
            </Text>
            <Text>will be worth</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              {numberWithCommas(Number(totalFutureValue))}
            </Text>
            <Text>after</Text>
            <Text style={{ fontWeight: "extrabold" }}>{years}</Text>
            <Text>years when compounded</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              {getFrequencyTitle(compoundingFrequency)}
            </Text>
            .
          </View>

          {/* Chart Container  */}
          <View style={{ marginTop: 20 }}>
            <View>
              <Image style={{ width: "100%", height: 250 }} src={base64} />
            </View>

            {/* Legends Container  */}
            <View
              style={{
                fontSize: 10,
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
                fontWeight: "bold",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#4A90E2",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Principle Amount</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#50C878",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Total Contribution</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#F5C518",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Total Interest</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* ================Totals Card================  */}
        <View style={{ margin: 30 }}>
          <View>
            <Text style={{ fontSize: "14px", marginBottom: 10 }}>
              Yearly Breakdown Data
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
              <Text style={{ width: "170px", textAlign: "center" }}>Year</Text>
              <Text style={{ width: "170px", textAlign: "center" }}>
                Total Contribution
              </Text>
              <Text style={{ width: "170px", textAlign: "center" }}>
                Total Interest
              </Text>
              <Text style={{ width: "170px", textAlign: "center" }}>
                Total Principal
              </Text>
            </View>
            {/* Table Body  */}
            <View style={{ backgroundColor: "#F8F8F8" }}>
              {yearByYearBreakdown?.map((item) => {
                const { year, totalContribution, totalInterest, totalValue } =
                  item || {};
                return (
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
                      {year}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {numberWithCommas(Number(totalContribution))}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {numberWithCommas(Number(totalInterest))}
                    </Text>
                    <Text style={{ width: "170px", textAlign: "center" }}>
                      {numberWithCommas(Number(totalValue))}
                    </Text>
                  </View>
                );
              })}
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
