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
});

type TData = {
  rate: number;
  time: number;
  principal: number;
  frequencyName: string;
  compoundInterest: number;
  base64: string;
  byYear: number;
  name?: string;
  email?: string;
  currency: string;
  currencyFullName: string;
};

// Define a new PDF document component
export const CIRCPdf = ({ data }: { data: TData }) => {
  const {
    rate,
    time,
    principal,
    compoundInterest,
    base64,
    frequencyName,
    byYear,
    name,
    email,
    currency,
    currencyFullName,
  } = data || {};
  return (
    <Document>
      {base64 && (
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
              <Text style={styles.title}>
                {currency} - {currencyFullName}
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
                  <Text style={{ color: "#696969" }}>Principle Amount</Text>
                  <Text>
                    {currency}
                    {principal}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Rate of Interest</Text>
                  <Text>{rate}%</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Time Period</Text>
                  <Text>{time} Years</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Compounding Frequency
                  </Text>
                  <Text>{frequencyName}</Text>
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
                  <Text style={{ color: "#696969" }}>Principle Amount</Text>
                  <Text>
                    {currency}
                    {principal}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Total Interest</Text>
                  <Text>
                    {currency}
                    {compoundInterest}
                  </Text>
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
                  <Text>
                    {currency}
                    {(compoundInterest + principal)?.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Chart Container  */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Image style={{ width: "100%", height: 300 }} src={base64} />
              </View>

              {/* Legends Container  */}
              <View
                style={{
                  fontSize: 10,
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 20,
                  fontWeight: "extrabold",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Text
                    style={{
                      width: "20px",
                      backgroundColor: "#22C55E",
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
                      backgroundColor: "#EAB308",
                      borderRadius: "30px",
                      height: "6px",
                    }}
                  ></Text>
                  <Text>Total Interest</Text>
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
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30 }}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "left",
                lineHeight: "20px",
              }}
            >
              "An investment of {currency}
              {principal} today will grow to {currency}
              {compoundInterest + principal} by {byYear}, based on an interest
              rate of {rate}% compounded annually."
            </Text>
          </View>

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
      )}
    </Document>
  );
};
