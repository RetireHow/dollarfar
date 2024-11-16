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
    fontSize:12
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
  chartBase64: string;
  name?: string;
  email?: string;
};

// Define a new PDF document component
export const CIRCPdf = ({ data }: { data: TData }) => {
  const {
    rate,
    time,
    principal,
    compoundInterest,
    chartBase64,
    frequencyName,
    name,
    email,
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
            <Text style={styles.title}>$ - CAD</Text>
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
                <Text>${principal}</Text>
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
                <Text style={{ color: "#696969" }}>Compounding Frequency</Text>
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
                <Text>{principal}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Total Interest</Text>
                <Text>{compoundInterest}</Text>
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
                <Text>${(compoundInterest + principal).toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            {chartBase64 && (
              <Image style={{ width: "100%", height: 300 }} src={chartBase64} />
            )}
          </View>
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
          <Text>Copyright © 2024 - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
