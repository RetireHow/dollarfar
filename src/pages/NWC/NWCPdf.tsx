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
    top: "55%",
    left: "35%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: 50,
    color: "rgba(220, 220, 220, 0.2)",
    fontWeight: "bold",
    opacity: 0.5,
  },
});

type TAssets = {
  property: number;
  savingsInvestment: number;
  personalItems: number;
  businessOwnershipInterest: number;
  vehicles: number;
  otherAssets: number;
  totalAssets: number;
};

type TLiabilities = {
  homeLoan: number;
  personalOtherLoans: number;
  vehicleLoans: number;
  taxLiability: number;
  creditCardDues: number;
  otherDebts: number;
  totalLiabilities: number;
};

type TData = {
  assets: TAssets;
  liabilities: TLiabilities;
  name?: string;
  email?: string;
  base64: string;
  currency: string;
  currencyFullName: string;
};

// Define a new PDF document component
export const NWCPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    base64,
    currency,
    currencyFullName,
    assets: {
      property,
      vehicles,
      personalItems,
      businessOwnershipInterest,
      otherAssets,
      savingsInvestment,
      totalAssets,
    },
    liabilities: {
      creditCardDues,
      homeLoan,
      otherDebts,
      personalOtherLoans,
      taxLiability,
      vehicleLoans,
      totalLiabilities,
    },
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
            <Text>Net Worth Calculator</Text>
            <Text style={styles.title}>
              {currency} - {currencyFullName}
            </Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontWeight: "extrabold",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Assets
              </Text>
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
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Property</Text>
                  <Text>
                    {currency}
                    {property}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Savings & Investments
                  </Text>
                  <Text>
                    {currency}
                    {savingsInvestment}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Personal Items</Text>
                  <Text>
                    {currency}
                    {personalItems}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Business Ownership</Text>
                  <Text>
                    {currency}
                    {businessOwnershipInterest}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Vehicles</Text>
                  <Text>
                    {currency}
                    {vehicles}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Other Assets</Text>
                  <Text>
                    {currency}
                    {otherAssets}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontWeight: "extrabold",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Liabilities
              </Text>
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
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Home Loan</Text>
                  <Text>
                    {currency}
                    {homeLoan}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Personal & Other Loans
                  </Text>
                  <Text>
                    {currency}
                    {personalOtherLoans}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Vehicle Loans</Text>
                  <Text>
                    {currency}
                    {vehicleLoans}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Tax liability</Text>
                  <Text>
                    {currency}
                    {taxLiability}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Credit Card Dues</Text>
                  <Text>
                    {currency}
                    {creditCardDues}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Other Debts</Text>
                  <Text>
                    {currency}
                    {otherDebts}
                  </Text>
                </View>
              </View>
            </View>
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
              marginBottom: 20,
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
              <Text style={{ color: "#696969" }}>Assets</Text>
              <Text>
                {currency}
                {totalAssets}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Liabilities</Text>
              <Text>
                {currency}
                {totalLiabilities}
              </Text>
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
              <Text>Net Worth</Text>
              <Text>
                {currency}
                {totalAssets - totalLiabilities}
              </Text>
            </View>
          </View>

          {/* Chart Container  */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image style={{ width: "90%", height: 150 }} src={base64} />
            </View>

            {/* Legends Container  */}
            <View
              style={{
                fontSize: 12,
                flexDirection: "column",
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
                    backgroundColor: "#4CAF50",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Assets</Text>
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
                <Text>Liabilities</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#1E88E5",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>Net Worth</Text>
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
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              marginTop: 12,
              lineHeight: "20px",
            }}
          >
            "Based on the information provided, your total assets are {currency}
            {totalAssets}, and your total liabilities are {currency}
            {totalLiabilities}. This gives you a net worth of {currency}
            {totalAssets - totalLiabilities}."
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
          <Text>Copyright © {new Date().getFullYear()} - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
