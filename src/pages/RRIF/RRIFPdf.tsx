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

type TAgePeriod = {
  balanceAtBeginningOfTheYear: number;
  balanceAtEndOfTheYear: number;
  annualWithdrawalAmount?: number;
  age: number;
  minWithdrawalPercentage?: number;
  mannualWithdrawalPercentage?: string;
};

type TData = {
  RRIFInitalBalance: number;
  currentAge: number;
  rateOfReturn: number;
  annualWithdrawalAmount: number;
  withdrawalFrequency: { label: string; value: string };
  withdrawalStartYear: number;
  withdrawalEndYear: number;
  totalWithdrawnOverLifeTime: number;
  remainingRRRIFBalanceEndOfPeriod: number;
  ageBreakdownDataOverLifeTimeManually: TAgePeriod[];
  withdrawType: string;
  name: string;
  email: string;
  base64: string;
};

// Define a new PDF document component
export const RRIFPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    base64,
    RRIFInitalBalance,
    rateOfReturn,
    annualWithdrawalAmount,
    withdrawalFrequency,
    withdrawalStartYear,
    withdrawalEndYear,
    remainingRRRIFBalanceEndOfPeriod,
    totalWithdrawnOverLifeTime,
    withdrawType,
    ageBreakdownDataOverLifeTimeManually,
  } = data || {};

  const remainingBalanceInRRIF =
    ageBreakdownDataOverLifeTimeManually[
      ageBreakdownDataOverLifeTimeManually.length - 1
    ]?.balanceAtEndOfTheYear || 0;

  const years = withdrawalEndYear - withdrawalStartYear;

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
            <Text>Registered Retirement Income Fund (RRIF) Calculator</Text>
            <Text style={styles.title}></Text>
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
                <Text style={{ color: "#696969" }}>Initial RRIF Balance</Text>
                <Text>{numberWithCommas(RRIFInitalBalance)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  Rate of Return(maximum value 16%)
                </Text>
                <Text>{rateOfReturn}%</Text>
              </View>

              {withdrawType === "Mannual" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Annual Withdrawal Amount
                  </Text>
                  <Text>{numberWithCommas(annualWithdrawalAmount)}</Text>
                </View>
              )}

              {withdrawType == "Mannual" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Monthly Withdrawal Amount
                  </Text>
                  <Text>
                    {numberWithCommas(Math.round(annualWithdrawalAmount / 12))}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Withdrawal Frequency</Text>
                <Text>{withdrawalFrequency?.value}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Withdrawal Start Year</Text>
                <Text>{withdrawalStartYear}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Withdrawal End Year</Text>
                <Text>{withdrawalEndYear}</Text>
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
                height: "170px",
              }}
            >
              <View style={{ fontWeight: "bold", color: "#000" }}>
                <Text>Totals</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  Total Withdrawn Over Lifetime (Age {withdrawalStartYear} to{" "}
                  {withdrawalEndYear})
                </Text>
                <Text>{numberWithCommas(totalWithdrawnOverLifeTime)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  Remaining RRIF Balance (End of Withdrawal Period)
                </Text>
                <Text>
                  {numberWithCommas(
                    Math.round(remainingRRRIFBalanceEndOfPeriod)
                  )}
                </Text>
              </View>
            </View>
          </View>

          {/* Chart Container  */}
          <View>
            <Image style={{ width: "100%", height: 300 }} src={base64} />
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* ======================|| RRIF Table ||================================== */}
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: "14px", marginBottom: 10 }}>
            Age Breakdown Data
          </Text>
          {/* Table Heading  */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: "10px",
              backgroundColor: "black",
              color: "#fff",
              padding: 10,
              gap: 10,
            }}
          >
            <Text style={{ width: "170px", textAlign: "center" }}>Age</Text>
            <Text style={{ width: "170px", textAlign: "center" }}>
              Balance at Beginning of the Year
            </Text>
            <Text style={{ width: "170px", textAlign: "center" }}>
              Min Annual Withdrawal Amount
            </Text>
            <Text style={{ width: "170px", textAlign: "center" }}>
              Monthly Withdrawal Amount
            </Text>
            <Text style={{ width: "170px", textAlign: "center" }}>
              Min Withdrawal Percentage
            </Text>
            <Text style={{ width: "170px", textAlign: "center" }}>
              Rate of Interest
            </Text>
            <Text style={{ width: "170px", textAlign: "center" }}>
              Balance at End of the Year
            </Text>
          </View>
          {/* Table Body  */}
          <View style={{ backgroundColor: "#F8F8F8" }}>
            {ageBreakdownDataOverLifeTimeManually?.map((item: TAgePeriod) => {
              const {
                age,
                balanceAtBeginningOfTheYear,
                annualWithdrawalAmount,
                balanceAtEndOfTheYear,
                mannualWithdrawalPercentage,
                minWithdrawalPercentage,
              } = item || {};
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 10,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                  }}
                >
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {age}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {balanceAtBeginningOfTheYear}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {annualWithdrawalAmount}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {(Number(item.annualWithdrawalAmount) / 12).toFixed(2)}
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {minWithdrawalPercentage || mannualWithdrawalPercentage}%
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {rateOfReturn}%
                  </Text>
                  <Text style={{ width: "170px", textAlign: "center" }}>
                    {balanceAtEndOfTheYear}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ fontSize: "12px", paddingLeft: 15, paddingRight: 15 }}>
          <Text>
            After {years} years, the RRIF balance will reduce gradually,
            providing steady withdrawals and accounting for the return rate. At
            the end of {years} years, the remaining balance may be{" "}
            {remainingBalanceInRRIF}, depending on actual return rates and
            withdrawals.
          </Text>
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
